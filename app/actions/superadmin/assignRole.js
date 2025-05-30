'use server'
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function assignRole(id,role){
   try {
     const data = await prisma.user.update({
       where:{id:id},
       data:{
        roleId:role
       }
     })
    console.log(data);
     return{success:true,message:"Role Assigned Successfull!!"}
 
   } catch (error) {
        console.log(error);
        return { error: "Something went wrong" };
   }
}