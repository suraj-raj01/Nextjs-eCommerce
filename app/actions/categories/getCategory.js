'use server';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function getCategory() {
  try {
    const data = await prisma.addCategory.findMany();
    console.log(data);
    return {success:true, data};
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}
