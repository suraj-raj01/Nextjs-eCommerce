// 'use server';
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
// import axios from "axios";

// export async function productData(prevState, formData) {
//   const title = formData.get("title");
//   const products = formData.get("products");
//   const price = Number(formData.get("price"));
//   const details = formData.get("details");
//   const category = formData.get("category");
//   const proinfo = formData.get("proinfo");
//   const myimg = formData.get("imgurl");
//   const samedaydelivery = formData.get("sameday");
//   const type = formData.get("type");
//   const id = formData.get('id');
//   const vendorId = id;
//   console.log("vendorid",vendorId);
//   console.log("forms",formData);

//   if (!title || !products || !price || !details || !category || !proinfo || !myimg || !vendorId) {
//     return { error: 'All fields are required' };
//   }

//   let imgurl = "";

//   if (myimg) {
//     const formData1 = new FormData();
//     formData1.append("file", myimg);
//     formData1.append("upload_preset", "myphotos");
//     formData1.append("cloud_name", "dtrpmtbie");
//     let cloudinary_api = "https://api.cloudinary.com/v1_1/dtrpmtbie/auto/upload";
//     try {
//       const response = await axios.post(cloudinary_api, formData1);
//       console.log(response.data.url);
//       imgurl = response.data.url;
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   console.log(formData, imgurl);

//   try {
//     const data = await prisma.product.create({
//       data: {
//         proname: products,
//         protitle: title,
//         proprice: price,
//         prodesc: details,
//         proCategory: category,
//         samedaydelivery: samedaydelivery,
//         proinfo: proinfo,
//         proimgurl: imgurl,
//         type: type,
//         userId: vendorId
//       }
//     });
//     console.log(data);
//     return { success: true, productId: data };
//   } catch (error) {
//     console.error('Error registering user:', error);
//     return { error: 'Failed to register user' };
//   }
// }


'use server';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import axios from "axios";

export async function productData(formData) {
  try {
    // Extract form data
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

    // Validate required fields
    if (!title || !products || !price || !details || !category || !proinfo || !myimg || !vendorId || !type || !samedaydelivery) {
      const missingFields = [];
      if (!title) missingFields.push('title');
      if (!products) missingFields.push('products');
      if (!price) missingFields.push('price');
      if (!details) missingFields.push('details');
      if (!category) missingFields.push('category');
      if (!proinfo) missingFields.push('proinfo');
      if (!myimg) missingFields.push('image');
      if (!vendorId) missingFields.push('vendor ID');
      if (!type) missingFields.push('type');
      if (!samedaydelivery) missingFields.push('same day delivery');

      return {
        error: `Missing required fields: ${missingFields.join(', ')}`,
        success: false
      };
    }

    // Validate price
    if (isNaN(price) || price <= 0) {
      return {
        error: 'Price must be a valid positive number',
        success: false
      };
    }

    let imgurl = "";

    // Upload image to Cloudinary
    if (myimg && myimg instanceof File) {
      const cloudinaryFormData = new FormData();
      cloudinaryFormData.append("file", myimg);
      cloudinaryFormData.append("upload_preset", "myphotos");
      cloudinaryFormData.append("cloud_name", "dtrpmtbie");

      const cloudinary_api = "https://api.cloudinary.com/v1_1/dtrpmtbie/auto/upload";

      try {
        console.log("Uploading image to Cloudinary...");
        const response = await axios.post(cloudinary_api, cloudinaryFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          timeout: 30000, // 30 second timeout
        });

        console.log("Image uploaded successfully:", response.data.url);
        imgurl = response.data.url;
      } catch (error) {
        console.error("Cloudinary upload error:", error.response?.data || error.message);
        return {
          error: 'Failed to upload image. Please try again.',
          success: false
        };
      }
    } else {
      return {
        error: 'Invalid image file',
        success: false
      };
    }

    // Create product in database
    console.log("Creating product in database...");
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
        vendorId: vendorId
      }
    });

    return {
      success: true,
      productId: data.id,
      message: 'Product created successfully'
    };

  } catch (error) {
    console.error('Error creating product:', error);

    // Handle specific Prisma errors
    if (error.code === 'P2002') {
      return {
        error: 'A product with this information already exists',
        success: false
      };
    }

    if (error.code === 'P2003') {
      return {
        error: 'Invalid vendor ID. Please log in again.',
        success: false
      };
    }

    return {
      error: 'Failed to create product. Please try again.',
      success: false
    };
  } finally {
    // Clean up Prisma connection
    await prisma.$disconnect();
  }
}