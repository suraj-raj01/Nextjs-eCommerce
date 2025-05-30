'use server';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function searchVendor(searchData) {
  console.log("Search Query:", searchData);

  if (!searchData.trim()) {
    return { success: false, message: "Search query cannot be empty.", data: [] };
  }

  try {
    const vendorRole = await prisma.role.findFirst({
      where: { role: "Vendor" },
    });

    if (!vendorRole) {
      return { success: false, message: "Vendor role not found.", data: [] };
    }

    const vendors = await prisma.user.findMany({
      where: {
        role: {
          role: "Vendor",
        },
        OR: [
          {
            name: {
              contains: searchData,
              mode: "insensitive",
            },
          },
          {
            email: {
              contains: searchData,
              mode: "insensitive",
            },
          },
        ],
      },
    });

    console.log("Search Results:", vendors);
    return {
      success: true,
      message: `${vendors.length} result(s) found.`,
      data: vendors,
    };
  } catch (error) {
    console.error("Search error:", error);
    return { success: false, message: "An error occurred while searching.", data: [] };
  }
}
