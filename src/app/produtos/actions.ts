"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function requiredString(formData: FormData, field: string) {
  const value = String(formData.get(field) ?? "").trim();
  if (!value) {
    throw new Error(`Campo obrigatorio: ${field}`);
  }
  return value;
}

function numberField(formData: FormData, field: string) {
  const value = Number(formData.get(field));
  if (!Number.isFinite(value)) {
    throw new Error(`Numero invalido: ${field}`);
  }
  return value;
}

export async function createProduct(formData: FormData) {
  await requireAdmin();
  const title = requiredString(formData, "title");
  const slug = String(formData.get("slug") ?? "").trim() || slugify(title);

  await prisma.product.create({
    data: {
      slug,
      title,
      author: requiredString(formData, "author"),
      category: requiredString(formData, "category"),
      publisher: requiredString(formData, "publisher"),
      description: requiredString(formData, "description"),
      imageUrl: requiredString(formData, "imageUrl"),
      priceInCents: Math.round(numberField(formData, "price") * 100),
      stock: Math.round(numberField(formData, "stock")),
      active: formData.get("active") === "on"
    }
  });
  revalidatePath("/produtos");
  revalidatePath("/");
  revalidatePath(`/livros/${slug}`);
}

export async function updateProduct(formData: FormData) {
  await requireAdmin();
  const id = requiredString(formData, "id");
  const title = requiredString(formData, "title");
  const slug = String(formData.get("slug") ?? "").trim() || slugify(title);

  await prisma.product.update({
    where: { id },
    data: {
      slug,
      title,
      author: requiredString(formData, "author"),
      category: requiredString(formData, "category"),
      publisher: requiredString(formData, "publisher"),
      description: requiredString(formData, "description"),
      imageUrl: requiredString(formData, "imageUrl"),
      priceInCents: Math.round(numberField(formData, "price") * 100),
      stock: Math.round(numberField(formData, "stock")),
      active: formData.get("active") === "on"
    }
  });
  revalidatePath("/produtos");
  revalidatePath("/");
  revalidatePath(`/livros/${slug}`);
}

export async function deleteProduct(formData: FormData) {
  await requireAdmin();
  const id = requiredString(formData, "id");
  await prisma.product.delete({ where: { id } });
  revalidatePath("/produtos");
  revalidatePath("/");
  revalidatePath("/livros/[slug]", "page");
}
