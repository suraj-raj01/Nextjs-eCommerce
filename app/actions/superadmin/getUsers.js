'use server'
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function getUser(){
   try {
     const data = await prisma.user.findMany()
     return{success:true, data}
   } catch (error) {
        console.log(error);
        return { error: "Something went wrong" };
   }
}