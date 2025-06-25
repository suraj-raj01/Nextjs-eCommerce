'use server';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export default async function getOneProduct(id) {
  console.log(id,"Product id")
  try {
    const product = await prisma.product.findUnique({
      where: { id:id },
    });
    console.log(product,"Products")
    return product;
  } catch (error) {
    console.error('Error fetching users:', error);
    return {error:"data not found"};
  }
}
