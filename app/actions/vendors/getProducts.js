'use server';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function getProducts(id) {
  try {
    const users = await prisma.customerOrder.findMany({
    where:{
      id
    }
  });
    console.log(users)
    return {success:true,data:users};
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}
