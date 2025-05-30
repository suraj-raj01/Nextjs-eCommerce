'use server';

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function adminRequest() {
  try {
    const users = await prisma.admin.findMany({
        where: { status:"pending" },
    });
    console.log(users)
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}
