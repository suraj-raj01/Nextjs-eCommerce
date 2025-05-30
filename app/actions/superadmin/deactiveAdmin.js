'use server';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default async function deActivateAdmin(id) {

    try {
        const updatedVendor = await prisma.admin.update({
            where: {
                id: Number(id),
            },
            data: {
                status: "pending"
            },
        });
        console.log('Vendor updated:', updatedVendor);
        return {success:true,updatedVendor}
    } catch (error) {
        console.error('Error updating vendor:', error);
    }
}