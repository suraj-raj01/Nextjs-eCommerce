'use server';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export default async function getOneProduct(id) {
  try {
    const user = await prisma.product.delete({
      where: { id: Number(id) },
    });
    return user;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}
