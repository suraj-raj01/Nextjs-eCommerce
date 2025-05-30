'use server';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export default async function getUserProducts(email) {
  try {
    const user = await prisma.customerOrder.findMany({
      where: { useremail: email },
    });
    return user;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}
