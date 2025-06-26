'use server';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function newArrivals() {
  try {
    const users = await prisma.product.findMany({
      where: {
        proCategory: {
          equals: "New Arrivals",
          mode: "insensitive"
        }
      }
    });
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}
