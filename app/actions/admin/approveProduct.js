'use server';
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export default async function approveProduct(id) {
  try {
    const data = await prisma.product.update({
      where: {
        id,
      },
      data: {
        approve: "yes",
      },
    });

    console.log("Product data updated", data);
    return { success: true, data: data };

  } catch (error) {
    console.error("Error updating vendor:", error);
    return { success: false, error: error.message };
  } 
}
