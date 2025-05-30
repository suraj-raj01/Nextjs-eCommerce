"use client";
import editProduct from "../../../actions/editProduct";
import { useState, useRef, ChangeEvent, useEffect, startTransition } from 'react';
import getCategory from "../../../actions/categories/getCategory";
import React from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

const initialstate = {
  success: undefined,
  error: "",
  data: undefined
};

export default function Form() {
  const id = localStorage.getItem('id');
  const [state, setState] = useState(initialstate);

  const formAction = (formData) => {
    setState({ ...state, success: true, data: formData });
  };
  
  const [image, setImage] = useState(null);
  const [formdata, setFormData] = useState(null);
  const [cateData, setCategory] = useState([]);
  const [editData, setEditData] = useState({});
  const fileInputRef = useRef(null);

  const params = useParams();
  const formdataid = params.id ? Number(params.id) : undefined;

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
    startTransition(() => {
      const formData = new FormData(event.currentTarget);
      formData.append('id', id);
      formAction(formData);
      setFormData(null);
    });
  };

  useEffect(() => {
    if (state.success) {
      setFormData(null);
      alert('Data inserted successfully!');
    }
  }, [state.success]);

  const formDataLoad = async () => {
    if (formdataid !== undefined) {
      const data = await editProduct(formdataid);
      setEditData(data);
      console.log(data);
    } else {
      console.error("formdataid is undefined");
    }
  };

  useEffect(() => {
    formDataLoad();
    getCategories();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit} id="formdata" className="bg-gray-100 p-6 rounded-lg">
        <div id="form-main" className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <div id="insertform" className="space-y-6">
            <div id="box" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                value={editData?.users?.proname}
                type="text"
                required
                name="products"
                placeholder="Product Name"
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
              <input
                value={editData?.users?.protitle}
                type="text"
                required
                name="title"
                placeholder="Product Title"
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
              <input
                value={editData?.users?.proprice}
                type="number"
                required
                name="price"
                placeholder="Product Price"
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
              <select
                name="type"
                value={editData?.users?.type}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                title="Product Type"
              >
                <option value={editData?.users?.type}>{editData?.users?.type}</option>
                <option value="Birthday Gift">Birthday Gift</option>
                <option value="Aniversary Gift">Anniversary Gift</option>
                <option value="International">International</option>
                <option value="Plants">Plants</option>
                <option value="Personalized">Personalized</option>
                <option value="Gift Flower">Gift Flower</option>
              </select>
            </div>

            {/* Category, Same Day, and Type Selects */}
            <div id="box" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <select
                name="category"
                value={editData?.users?.catename}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                title="Choose a category"
              >
                <option value={editData?.users?.prodesc}>{editData?.users?.prodesc}</option>
                {cateData.map((item, index) => (
                  <option key={index} value={item.catename}>
                    {item.catename}
                  </option>
                ))}
              </select>

              <select
                name="sameday"
                value={editData?.users?.sameday}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                title="Same Day Delivery"
              >
                <option value={editData?.users?.sameday}>{editData?.users?.samedaydelivery}</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>

              <textarea
                value={editData?.users?.prodesc}
                name="details"
                required
                placeholder="Details"
                rows={4}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              ></textarea>

              <textarea
                required
                name="proinfo"
                value={editData?.users?.proinfo}
                placeholder="Product Info"
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              ></textarea>

              {/* File Upload */}
              <input
                type="file"
                name="imgurl"
                multiple
                required
                placeholder="Choose file"
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                onChange={handleFileChange}
              />

              {image && (
                <div className="flex items-center gap-2 mt-4">
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
            {/* Submit Button */}
            <div id="btn" className="text-center mt-6">
              <button
                type="submit"
                className="w-full p-2 bg-red-500 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Submit
              </button>
            </div>
          </div>

        </div>
      </form>
    </>
  );
}
