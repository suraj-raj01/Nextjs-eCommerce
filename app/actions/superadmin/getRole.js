'use server'
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function getRoles(){
   try {
     const data = await prisma.role.findMany()
     return{success:true, data}
 
   } catch (error) {
        console.log(error);
        return { error: "Something went wrong" };
   }
}