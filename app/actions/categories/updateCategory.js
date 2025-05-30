'use server';

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export default async function updateCategory(id) {
  await prisma.addCategory.delete({
    where: { id: Number(id) },
  });
}