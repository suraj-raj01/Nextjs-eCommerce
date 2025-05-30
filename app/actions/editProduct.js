'use server';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function editProduct(id) {
   try {
     const data = await prisma.product.findFirst({
         where:{id:Number(id)}
     })
     return {success:true,data}
   } catch (error) {
        console.log(error);
   }
}