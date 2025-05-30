'use server';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function searchProduct(searchData) {
  console.log("Search Query:", searchData);

  if (!searchData.trim()) {
    return { success: false, message: "Search query cannot be empty.", data: [] };
  }

  try {

    const product = await prisma.product.findMany({
      where: {
        proname: searchData
      },
    });

    console.log("Search Results:", product);
    return {
      success: true,
      message: `${product.length} result(s) found.`,
      data: product,
    };
  } catch (error) {
    console.error("Search error:", error);
    return { success: false, message: "An error occurred while searching.", data: [] };
  }
}
