"use server";

import { Role } from "@prisma/client";
import { hash } from "bcryptjs";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";

function requiredString(formData: FormData, field: string) {
  const value = String(formData.get(field) ?? "").trim();
  if (!value) {
    throw new Error(`Campo obrigatorio: ${field}`);
  }
  return value;
}

export async function createUser(formData: FormData) {
  await requireAdmin();
  const password = requiredString(formData, "password");
  await prisma.user.create({
    data: {
      name: requiredString(formData, "name"),
      email: requiredString(formData, "email").toLowerCase(),
      role: requiredString(formData, "role") === "ADMIN" ? Role.ADMIN : Role.USER,
      passwordHash: await hash(password, 12)
    }
  });
  revalidatePath("/usuarios");
}

export async function deleteUser(formData: FormData) {
  await requireAdmin();
  const id = requiredString(formData, "id");
  await prisma.user.delete({ where: { id } });
  revalidatePath("/usuarios");
}
