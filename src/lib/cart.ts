import { cookies } from "next/headers";
import { buildCartDetails, parseCartCookie, type CartLine } from "@/lib/cart-core";
import { prisma } from "@/lib/prisma";

const cartCookieName = "livraria67_cart";

export async function readCart() {
  const cookieStore = await cookies();
  return parseCartCookie(cookieStore.get(cartCookieName)?.value);
}

export async function writeCart(lines: CartLine[]) {
  const cookieStore = await cookies();
  cookieStore.set(cartCookieName, JSON.stringify(lines), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30
  });
}

export async function getCartDetails() {
  const lines = await readCart();
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: lines.map((line) => line.productId)
      },
      active: true
    },
    orderBy: { title: "asc" }
  });

  return buildCartDetails(lines, products);
}
