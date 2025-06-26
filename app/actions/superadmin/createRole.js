'use server'
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function createRole(prevState,formData){
    const userrole = formData.get("role");
   try {
     await prisma.role.create({
        data: {
          role: userrole
        }
     })
     return{success:true}
 
   } catch (error) {
        console.log(error);
        return { error: "Something went wrong" };
   }
}

