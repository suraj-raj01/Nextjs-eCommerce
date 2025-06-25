'use server';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default async function Registration(prevState, formData) {
    const name = formData.get('username');
    const email = formData.get('useremail');
    const password = formData.get('password');

    console.log(formData);

    if (!name || !email || !password) {
        return {
            success: false,
            error: "All fields are required.",
            message: ""
        };
    }

    try {

        const data = await prisma.role.findFirst({
            where:{
                role:"User"
            }
        })

        console.log(data);

        await prisma.user.create({ 
            data:{
                roleId:data?.id,
                name,
                email,
                password
            }
         });

        return {
            success: true,
            error: "",
            message: "User Registration successfully!"
        };
    } catch (error) {
        return {
            success: false,
            error: "Failed to add user.",
            message: ""
        };
    }
}
