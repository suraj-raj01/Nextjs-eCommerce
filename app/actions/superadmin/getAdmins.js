'use server';
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function getAdmin() {
  try {
    const users = await prisma.admin.findMany({
      where :{status:"active"}
    });
    console.log(users)
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}
