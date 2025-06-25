'use server';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function getFlower() {
  try {
    const users = await prisma.product.findMany({
      where: {
        proCategory: {
          equals: "flower",
          mode: "insensitive"
        }
      }
    });
    console.log(users);
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}
