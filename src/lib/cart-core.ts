export type CartLine = {
  productId: string;
  quantity: number;
};

export type CartProduct = {
  id: string;
  priceInCents: number;
};

export function normalizeQuantity(value: unknown) {
  const quantity = Number(value ?? 1);
  if (!Number.isFinite(quantity)) {
    return 1;
  }
  return Math.max(1, Math.min(99, Math.floor(quantity)));
}

export function parseCartCookie(value?: string): CartLine[] {
  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .map((item) => ({
        productId: String(item.productId ?? ""),
        quantity: normalizeQuantity(item.quantity)
      }))
      .filter((item) => item.productId);
  } catch {
    return [];
  }
}

export function addLineToCart(
  lines: CartLine[],
  product: { id: string; stock: number },
  quantity: number
) {
  const nextLines = lines.map((line) => ({ ...line }));
  const normalizedQuantity = normalizeQuantity(quantity);
  const existing = nextLines.find((item) => item.productId === product.id);

  if (existing) {
    existing.quantity = Math.min(product.stock, existing.quantity + normalizedQuantity);
    return nextLines;
  }

  return [
    ...nextLines,
    {
      productId: product.id,
      quantity: Math.min(product.stock, normalizedQuantity)
    }
  ];
}

export function buildCartDetails<
  TProduct extends CartProduct,
  TLine extends CartLine
>(lines: TLine[], products: TProduct[]) {
  const items = lines
    .map((line) => {
      const product = products.find((item) => item.id === line.productId);
      if (!product) {
        return null;
      }
      return {
        product,
        quantity: line.quantity,
        subtotalInCents: product.priceInCents * line.quantity
      };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return {
    items,
    totalInCents: items.reduce((total, item) => total + item.subtotalInCents, 0),
    totalQuantity: items.reduce((total, item) => total + item.quantity, 0)
  };
}
