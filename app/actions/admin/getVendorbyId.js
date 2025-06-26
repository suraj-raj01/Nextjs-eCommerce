'use server';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function getVendorbyId(id) {
  try {
    const users = await prisma.user.findFirst({
      where :{
        id:id,
        role:{
          role:"Vendor"
        }
      }
    });

    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}
