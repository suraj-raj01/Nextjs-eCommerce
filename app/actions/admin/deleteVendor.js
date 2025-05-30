'use server';

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export default async function deleteVendor(id) {
  await prisma.vendor.delete({
    where: { id: id },
  });
  return { success: true }
}