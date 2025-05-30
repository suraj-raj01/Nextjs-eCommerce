'use server';
import axios from "axios"
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createCategory(prevState, formData) {
  const category = formData.get("category");
  const myimg = formData.get("cateurl");

  if (!category || !myimg) {
    return { error: 'All fields are required' };
  }
  let imgurl="";

  if(myimg){
    const formData1 = new FormData();
    formData1.append("file", myimg);
    formData1.append("upload_preset", "myphotos");
    formData1.append("cloud_name", "dtrpmtbie");
    const cloudinary_api = "https://api.cloudinary.com/v1_1/dtrpmtbie/auto/upload";
    try {
      const response = await axios.post(cloudinary_api,formData1);
      console.log(response.data.url);
      imgurl = response.data.url;
  } catch (error) {
      console.log(error);
  }
  }
  console.log(formData,imgurl);

  try {
    const data = await prisma.addCategory.create({ 
        data: {
          catename:category, 
          cateurl:imgurl
        }
    })
    console.log(data);
    return { success: true };
  } catch (error) {
    console.error('Error registering user:', error);
    return { error: 'Failed to register user' };
  }
}