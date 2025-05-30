'use server';
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export default async function getProduct() {
  try {
    const users = await prisma.product.findMany();
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}
