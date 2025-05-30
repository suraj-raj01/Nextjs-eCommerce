'use server';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function verifyEmail(email, role) {
    if (!email || !role) {
      return { success: false, error: "Missing required fields" };
    }
  
    let user = null;
  
    if (role === "Vendor") {
      user = await prisma.vendor.findFirst({ where: { email } });
    } else if (role === "Admin") {
      user = await prisma.admin.findFirst({ where: { email } });
    } else {
      return { success: false, error: "Invalid role" };
    }
  
    if (!user) {
      return { success: false, error: "User not found" };
    }
  
    return { success: true, user };
  }
  