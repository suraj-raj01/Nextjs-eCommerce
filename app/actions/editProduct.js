'use server';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import axios from "axios";

export default async function editProduct(formData) {
  try {
    // Extract form data
    const id = formData.get('id');
    const title = formData.get("proname");
    const products = formData.get("protitle");
    const price = Number(formData.get("proprice"));
    const details = formData.get("prodesc");
    const category = formData.get("category");
    const proinfo = formData.get("proinfo");
    const myimg = formData.get("imgurl");
    const samedaydelivery = formData.get("sameday");
    const type = formData.get("type");

    console.log("Editing product ID:", id);
    console.log("Received form data fields:", {
      id,
      title,
      products,
      price,
      details,
      category,
      proinfo,
      samedaydelivery,
      type,
      hasNewImage: !!myimg
    });

    // Validate product ID
    if (!id) {
      return {
        error: 'Product ID is required for editing',
        success: false
      };
    }

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id: Number(id) }
    });

    if (!existingProduct) {
      return {
        error: 'Product not found',
        success: false
      };
    }

    // Validate required fields (excluding image as it's optional for edit)
    if (!title || !products || !price || !details || !category || !proinfo || !type || !samedaydelivery) {
      const missingFields = [];
      if (!title) missingFields.push('title');
      if (!products) missingFields.push('products');
      if (!price) missingFields.push('price');
      if (!details) missingFields.push('details');
      if (!category) missingFields.push('category');
      if (!proinfo) missingFields.push('proinfo');
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

    let imgurl = existingProduct.proimgurl; // Keep existing image by default

    // Upload new image to Cloudinary if provided
    if (myimg && myimg instanceof File && myimg.size > 0) {
      const cloudinaryFormData = new FormData();
      cloudinaryFormData.append("file", myimg);
      cloudinaryFormData.append("upload_preset", "myphotos");
      cloudinaryFormData.append("cloud_name", "dtrpmtbie");

      const cloudinary_api = "https://api.cloudinary.com/v1_1/dtrpmtbie/auto/upload";

      try {
        console.log("Uploading new image to Cloudinary...");
        const response = await axios.post(cloudinary_api, cloudinaryFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          timeout: 30000, // 30 second timeout
        });

        console.log("New image uploaded successfully:", response.data.url);
        imgurl = response.data.url;
      } catch (error) {
        console.error("Cloudinary upload error:", error.response?.data || error.message);
        return {
          error: 'Failed to upload new image. Please try again.',
          success: false
        };
      }
    }

    // Update product in database
    console.log("Updating product in database...");
    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
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
        // Note: vendorId is not updated as it should remain the same
      }
    });

    console.log("Product updated successfully:", updatedProduct.id);
    return {
      success: true,
      productId: updatedProduct.id,
      message: 'Product updated successfully',
      data: updatedProduct
    };

  } catch (error) {
    console.error('Error updating product:', error);

    // Handle specific Prisma errors
    if (error.code === 'P2002') {
      return {
        error: 'A product with this information already exists',
        success: false
      };
    }

    if (error.code === 'P2025') {
      return {
        error: 'Product not found or has been deleted',
        success: false
      };
    }

    return {
      error: 'Failed to update product. Please try again.',
      success: false
    };
  } finally {
    // Clean up Prisma connection
    await prisma.$disconnect();
  }
}

// Helper function to get a single product by ID
export async function getProductById(id) {
  try {
    if (!id) {
      return {
        error: 'Product ID is required',
        success: false
      };
    }

    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
      include: {
        vendor: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    if (!product) {
      return {
        error: 'Product not found',
        success: false
      };
    }

    return {
      success: true,
      data: product
    };

  } catch (error) {
    console.error('Error fetching product:', error);
    return {
      error: 'Failed to fetch product',
      success: false
    };
  } finally {
    await prisma.$disconnect();
  }
}