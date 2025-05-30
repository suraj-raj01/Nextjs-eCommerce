'use server';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export default async function deActivateVendor(id) {

    try {
        const updatedVendor = await prisma.vendor.update({
            where: {
                id: Number(id),
            },
            data: {
                status: "pending"
            },
        });
        console.log('Vendor updated:', updatedVendor);
    } catch (error) {
        console.error('Error updating vendor:', error);
    } finally {
        await prisma.$disconnect();
    }

    return { success: true }
}