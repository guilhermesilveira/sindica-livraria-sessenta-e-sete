"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { readCart, writeCart } from "@/lib/cart";
import { addLineToCart } from "@/lib/cart-core";
import { prisma } from "@/lib/prisma";

export async function addToCart(formData: FormData) {
  const productId = String(formData.get("productId") ?? "");
  const quantity = Math.max(1, Number(formData.get("quantity") ?? 1));

  const product = await prisma.product.findFirst({
    where: { id: productId, active: true }
  });

  if (!product) {
    throw new Error("Produto indisponivel.");
  }

  await writeCart(addLineToCart(await readCart(), product, quantity));
  revalidatePath("/carrinho");
  redirect("/carrinho");
}
