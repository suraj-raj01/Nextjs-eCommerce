'use server';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function getAllVendors() {
  try {
    const users = await prisma.user.findMany({
      where:{
        role:{
          role:"Vendor"
        }
      },
    });
    return{success:true,users}
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}
