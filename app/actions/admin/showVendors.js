'use server';
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function getVendors() {
  try {
    const users = await prisma.vendor.findMany({
      where :{status:"active"}
    });

    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}
