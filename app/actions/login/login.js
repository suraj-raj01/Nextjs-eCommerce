'use server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function loginUser(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email
      },
      include: {
        role: true,
      },
    });

    if (!user) {
      return { error: "User not found!!!" };
    }

    if (!(user.password === password)) {
      return { error: "Wrong Password!!!" };
    }

    return { success: true, user };
  } catch (error) {
    return { error: "Something went wrong!!" };
  }
}



// let otp = 0;

// export default async function loginUser(prevState: any, formData: FormData) {
//   try {
//     const role = formData.get("role") as string;
//     const email = formData.get("email") as string;
//     const enteredOtp = formData.get("otp") as string;
//     const password = formData.get("password") as string;

//     if (!role || !email || !password) {
//       return { error: "Missing required fields" };
//     }

//     const user = await (role === "Vendor"
//       ? prisma.vendor.findFirst({ where: { email } })
//       : role === "Admin"
//       ? prisma.admin.findFirst({ where: { email } })
//       : null);

//     if (!user) return { error: "User not found" };

//     if (user.isverified === "pending" && enteredOtp !== otp.toString()) {
//       return { error: "Otp Incorrect" };
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return { error: "Incorrect password" };

//     if (user.role === "Vendor") {
//     await prisma.vendor.update({
//         where: { email },
//         data: { isverified: "success" },
//       });
//     }

//     if(user.role === "Admin"){
//       await prisma.admin.update({
//         where: { email },
//         data: { isverified: "success" },
//       });
//     }

//     return { success: true, data: user };
//   } catch (error) {
//     console.error("Error logging in user:", error);
//     return { error: "Something went wrong" };
//   }
// }


// // -----------------------------------------------------------------

// import { sendEmail } from '../../../lib/sendEmail';
// import { revalidatePath } from 'next/cache';

// export async function sendOtp(role: any, email: any) {

//   otp = Math.floor(Math.random() * 10000);
//   otp.toString().padStart(4, '0');

//   let user;
//   let username;
//   if (role === "Vendor") {
//     user = await prisma.vendor.findFirst({
//       where: { email: email },
//     });
//     username = user?.name;
//   } else if (role === "Admin") {
//     user = await prisma.admin.findFirst({
//       where: { email },
//     });
//     username = user?.name;
//   } else {
//     return { error: "Invalid role" };
//   }
//   if (user) {
//     const result = await sendEmail({
//       to: email,
//       subject: `Contact Form Submission from ${email}`,
//       html: `<p>Name: ${username}</p><p>Email: ${email}</p><p>OTP: ${otp}</p>`,
//     });

//     if (result.success) {
//       return { success: true, message: 'Email sent successfully!' };
//     } else {
//       return { success: false, message: 'Failed to send email.', error: result.error };
//     }
//   } else {
//     return { error: "user not found" }
//   }
// } 