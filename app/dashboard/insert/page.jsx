"use client";
import { productData } from '../../actions/products';
import { useState, useRef, useEffect } from 'react';
import getCategory from "../../actions/categories/getCategory";
import React from "react";
import Image from "next/image";
import Swal from "sweetalert2";

export default function Form() {
  const [image, setImage] = useState(null);
  const [cateData, setCategory] = useState([]);
  const [id, setId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getCategories = async () => {
    try {
      const response = await getCategory();
      if (response && response.data && Array.isArray(response.data)) {
        setCategory(response.data);
      } else if (Array.isArray(response)) {
        setCategory(response);
      } else {
        setCategory([]);
        console.error('Invalid category response format');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategory([]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (isSubmitting) return;

    setIsSubmitting(true);

    const formData = new FormData(form);
    formData.append("id", id);

    try {
      // Call the server action directly with FormData
      const response = await productData(formData);
      
      if (response?.success) {
        Swal.fire({
          title: "Success!",
          text: "Product added successfully!",
          icon: "success",
        }).then(() => {
          form.reset();
          setImage(null);
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        });
      } else {
        Swal.fire({
          title: "Failed!",
          text: response?.error || "Something went wrong!",
          icon: "error",
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong while submitting the form.",
        icon: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    getCategories();
    
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setId(user?.id || "");
      }
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
    }
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit} className="pl-6 pt-1 pr-6 rounded-lg">
        <div className="max-w-full mx-auto bg-white p-6 rounded-lg shadow-lg">
          <p className='font-bold text-2xl text-center'>Insert Product</p>
          <div className="space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                required
                name="products"
                placeholder="Product Name"
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
              <input
                type="text"
                required
                name="title"
                placeholder="Product Title"
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
              <input
                type="number"
                required
                name="price"
                placeholder="Product Price"
                min="0"
                step="0.01"
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
              <select
                name="type"
                required
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                title="Product Type"
              >
                <option value="">Select Gift Type</option>
                <option value="Birthday Gift">Birthday Gift</option>
                <option value="Anniversary Gift">Anniversary Gift</option>
                <option value="International">International</option>
                <option value="Plants">Plants</option>
                <option value="Personalized">Personalized</option>
                <option value="Gift Flower">Gift Flower</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <select
                name="category"
                required
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                title="Choose a category"
              >
                <option value="">Select Category</option>
                {cateData.map((item, index) => (
                  <option key={item.id || index} value={item.catename}>
                    {item.catename}
                  </option>
                ))}
              </select>

              <select
                name="sameday"
                required
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                title="Same Day Delivery"
              >
                <option value="">Select Same Day Delivery</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>

              <textarea
                name="details"
                required
                placeholder="Product Details"
                rows={3}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black col-span-1 sm:col-span-2"
              ></textarea>

              <textarea
                required
                name="proinfo"
                placeholder="Product Info"
                rows={2}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black col-span-1 sm:col-span-2"
              ></textarea>

              <div className="col-span-1 sm:col-span-2">
                <input
                  type="file"
                  name="imgurl"
                  required
                  ref={fileInputRef}
                  accept="image/*"
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black w-full"
                  onChange={handleFileChange}
                />

                {image && (
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="cursor-pointer text-red-500 text-lg hover:text-red-700 bg-transparent border-none"
                      title="Remove image"
                    >
                      ✕
                    </button>
                    <Image 
                      src={image} 
                      alt="Selected Image" 
                      width={50} 
                      height={50} 
                      className="rounded border"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="text-center mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full p-2 bg-red-500 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}