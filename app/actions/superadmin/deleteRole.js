'use server'
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function deleteRole(id) {
    try {
        await prisma.role.delete(
            {
                where: { id: id.toString() }
            }
        )
        return{success:true,message:"Role Deleted Successfull!!"}
    } catch (error) {
        console.log(error);
        return { error: "Something went wrong" };
    }
}