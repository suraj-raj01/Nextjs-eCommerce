'use server';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export default async function activateVendor(id) {
  try {
    const updatedVendor = await prisma.vendor.update({
      where: {
        id,
      },
      data: {
        status: "active",
      },
    });

    return { success: true, data: updatedVendor };

  } catch (error) {
    console.error("Error updating vendor:", error);
    return { success: false, error: error.message };
  }
}
