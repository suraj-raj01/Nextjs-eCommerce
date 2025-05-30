'use server';

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function deleteAdmin(id) {
 try {
  await prisma.admin.delete({
    where: { id: Number(id) },
  });
  return { success: true }
 } catch (error) {
  console.log(error);
 }
}