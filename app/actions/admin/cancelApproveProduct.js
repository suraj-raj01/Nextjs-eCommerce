'use server';
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export default async function cancelApproveProduct(id) {
  try {
    const data = await prisma.product.update({
      where: {
        id,
      },
      data: {
        approve: "no",
      },
    });

  
    return { success: true, data: data };

  } catch (error) {
    console.error("Error updating vendor:", error);
    return { success: false, error: error.message };
  } 
}
