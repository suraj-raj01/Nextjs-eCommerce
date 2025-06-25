'use server';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function AddUserAction(prevState, formData) {
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
        // Example: create user logic here
        await prisma.user.create({
            data: {
                name,
                email,
                password
            }
        });

        return {
            success: true,
            error: "",
            message: "User added successfully!"
        };
    } catch (error) {
        return {
            success: false,
            error: "Failed to add user.",
            message: ""
        };
    }
}
