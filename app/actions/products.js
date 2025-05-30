'use server';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import axios from "axios";

export async function productData(prevState, formData) {
  const title = formData.get("title");
  const products = formData.get("products");
  const price = Number(formData.get("price"));
  const details = formData.get("details");
  const category = formData.get("category");
  const proinfo = formData.get("proinfo");
  const myimg = formData.get("imgurl");
  const samedaydelivery = formData.get("sameday");
  const type = formData.get("type");
  const id = formData.get('id');
  const vendorId = id;
  console.log(vendorId);

  if (!title || !products || !price || !details || !category || !proinfo || !myimg || !vendorId) {
    return { error: 'All fields are required' };
  }

  let imgurl = "";

  if (myimg) {
    const formData1 = new FormData();
    formData1.append("file", myimg);
    formData1.append("upload_preset", "myphotos");
    formData1.append("cloud_name", "dtrpmtbie");
    let cloudinary_api = "https://api.cloudinary.com/v1_1/dtrpmtbie/auto/upload";
    try {
      const response = await axios.post(cloudinary_api, formData1);
      console.log(response.data.url);
      imgurl = response.data.url;
    } catch (error) {
      console.log(error);
    }
  }
  console.log(formData, imgurl);

  try {
    const data = await prisma.product.create({
      data: {
        proname: products,
        protitle: title,
        proprice: price,
        prodesc: details,
        proCategory: category,
        samedaydelivery: samedaydelivery,
        proinfo: proinfo,
        proimgurl: imgurl,
        type: type,
        userId: vendorId
      }
    });
    console.log(data);
    return { success: true, productId: data };
  } catch (error) {
    console.error('Error registering user:', error);
    return { error: 'Failed to register user' };
  }
}
