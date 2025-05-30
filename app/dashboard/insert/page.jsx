"use client";
import { productData } from '../../actions/products';
import { useState, useRef, ChangeEvent, useEffect, startTransition } from 'react';
import getCategory from "../../actions/categories/getCategory";
import React from "react";
import Image from "next/image";
import Swal from "sweetalert2";

const initialstate = {
  success: undefined,
  error: "",
  data: undefined
};

export default function Form() {

  const [state, formAction] = React.useState(initialstate);
  const [image, setImage] = useState(null);
  const [cateData, setCategory] = useState([]);
  const [id, setId] = useState("");
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
    const response = await getCategory();
    if (Array.isArray(response)) {
      setCategory([]);
    } else {
      setCategory(response.data || []);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    startTransition(() => {
      const formData = new FormData(form);
      formData.append('id', id);
      formAction(formData);
      form.reset();
      setImage(null);
      Swal.fire({
        title: "Data inserted successfully!",
        icon: "success"
      });
    });
  };

  useEffect(() => {
    getCategories();
    const storedUser = localStorage.getItem('user');
    if (!storedUser) return;
    const user = JSON.parse(storedUser);
    setId(user?.id);
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit} id="formdata" className="p-4 rounded-lg">
        <div id="form-main" className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <div id="insertform" className="space-y-6">
            <div id="box" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
              <select
                name="type"
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                title="Product Type"
              >
                <option value="">Gift Type</option>
                <option value="Birthday Gift">Birthday Gift</option>
                <option value="Aniversary Gift">Anniversary Gift</option>
                <option value="International">International</option>
                <option value="Plants">Plants</option>
                <option value="Personalized">Personalized</option>
                <option value="Gift Flower">Gift Flower</option>
              </select>
            </div>

            <div id="box" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <select
                name="category"
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                title="Choose a category"
              >
                <option>Select Category</option>
                {cateData.map((item, index) => (
                  <option key={index} value={item.catename}>
                    {item.catename}
                  </option>
                ))}
              </select>

              <select
                name="sameday"
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                title="Same Day Delivery"
              >
                <option value="">Same Day Delivery</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>

              <textarea
                name="details"
                required
                placeholder="Details"
                rows={5}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              ></textarea>

              <textarea
                required
                name="proinfo"
                placeholder="Product Info"
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              ></textarea>

              <input
                type="file"
                name="imgurl"
                multiple
                required
                placeholder="Choose File"
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                onChange={handleFileChange}
              />

              {image && (
                <div className="flex items-center gap-2">
                  <span
                    onClick={handleRemoveImage}
                    className="cursor-pointer text-red-500 text-lg"
                  >
                    X
                  </span>
                  <Image src={image} alt="Selected Image" width={30} height={30} />
                </div>
              )}
            </div>
          </div>

          <div id="btn" className="text-center mt-6">
            <button
              type="submit"
              className="w-full p-2 bg-red-500 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-black"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
