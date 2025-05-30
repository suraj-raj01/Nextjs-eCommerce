'use server';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function getProductDetails(id) {
  try {
    const users = await prisma.product.findFirst({
        where:{id:Number(id)}
    });
    return {success:true,users};
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}
