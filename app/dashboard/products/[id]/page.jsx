"use client";
import editProduct from "../../../actions/editProduct";
import { useState, useRef, ChangeEvent, useEffect, startTransition } from 'react';
import getCategory from "../../../actions/categories/getCategory";
import React from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import getOneProduct from "../../../actions/getOneProduct";
import Swal from "sweetalert2";

const initialstate = {
  success: undefined,
  error: "",
  data: undefined
};

export default function Form() {
  const [state, setState] = useState(initialstate);

  const formAction = (formData) => {
    setState({ ...state, success: true, data: formData });
  };

  const [image, setImage] = useState(null);
  const [formdata, setFormData] = useState({
    proname: '',
    protitle: '',
    proprice: '',
    type: '',
    prodesc: '',
    proinfo: '',
    sameday: '',
    proimgurl: ''
  });
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

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const fetchProduct = async () => {
    try {
      const response = await getOneProduct(formdataid);
      console.log("Data", response);
      if (response) {
        setFormData({
          proname: response.proname || '',
          protitle: response.protitle || '',
          proprice: response.proprice || '',
          type: response.type || '',
          prodesc: response.prodesc || '',
          proinfo: response.proinfo || '',
          sameday: response.sameday || '',
          proimgurl: response.proimgurl || ''
        });
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const getCategories = async () => {
    try {
      const response = await getCategory();
      if (Array.isArray(response)) {
        setCategory(response);
      } else {
        setCategory(response?.data || []);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategory([]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      startTransition(async () => {
        const formDataObj = new FormData(event.currentTarget);
        if (formdataid) {
          formDataObj.append('id', formdataid);
        }
        const result = await editProduct(formDataObj);
        console.log(result,"result")
        if (result.success) {
          setState({ ...state, success: true, data: result });
         Swal.fire("Updated!", "Data Updated Successfull!", "success");
        } else {
          setState({ ...state, error: result.error || 'Something went wrong' });
        }
      });
    } catch (error) {
      console.error("Submit error:", error);
      setState({ ...state, error: 'Failed to submit form' });
    }
  };

  const formDataLoad = async () => {
    if (formdataid !== undefined) {
      try {
        const data = await editProduct(formdataid);
        setEditData(data);
        console.log(data);
      } catch (error) {
        console.error("Error loading form data:", error);
      }
    }
  };

  useEffect(() => {
    if (formdataid) {
      formDataLoad();
      fetchProduct();
    }
    getCategories();
  }, [formdataid]);

  return (
    <div className="p-3">
      <form onSubmit={handleSubmit} id="formdata" className="p-6 rounded-lg">
        <div id="form-main" className="max-w-full mx-auto bg-white p-6 rounded-lg shadow-lg">
      <p className="font-bold text-2xl text-center pb-2">Update Product</p>
          <div id="insertform" className="space-y-6">
            <div id="box" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                value={formdata.proname}
                onChange={handleInputChange}
                type="text"
                required
                name="proname"
                placeholder="Product Name"
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
              <input
                value={formdata.protitle}
                onChange={handleInputChange}
                type="text"
                required
                name="protitle"
                placeholder="Product Title"
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
              <input
                value={formdata.proprice}
                onChange={handleInputChange}
                type="number"
                required
                name="proprice"
                placeholder="Product Price"
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
              <select
                name="type"
                value={formdata.type}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                title="Product Type"
              >
                <option value="">Select Product Type</option>
                <option value="Birthday Gift">Birthday Gift</option>
                <option value="Anniversary Gift">Anniversary Gift</option>
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
                value={formdata.category || ''}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                title="Choose a category"
              >
                <option value="">Select Category</option>
                {cateData.map((item, index) => (
                  <option key={index} value={item.catename}>
                    {item.catename}
                  </option>
                ))}
              </select>

              <select
                name="sameday"
                value={formdata.sameday}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                title="Same Day Delivery"
              >
                <option value="">Select Same Day Delivery</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>

              <textarea
                value={formdata.prodesc}
                name="prodesc"
                onChange={handleInputChange}
                required
                placeholder="Details"
                rows={4}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              ></textarea>

              <textarea
                required
                name="proinfo"
                value={formdata.proinfo}
                onChange={handleInputChange}
                placeholder="Product Info"
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              ></textarea>

              {/* File Upload */}
              <input
                type="file"
                name="imgurl"
                multiple
                ref={fileInputRef}
                placeholder="Choose file"
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                onChange={handleFileChange}
              />

            </div>
              {image && (
                <div className="flex items-center gap-2 mt-4">
                  <span
                    onClick={handleRemoveImage}
                    className="cursor-pointer text-red-500 text-lg font-bold hover:text-red-700"
                  >
                    ✕
                  </span>
                  <Image src={image} alt="Selected Image" width={60} height={60} />
                </div>
              )}
            
            {/* Error Display */}
            {state.error && (
              <div className="text-red-500 text-sm mt-2">
                {state.error}
              </div>
            )}
            
            {/* Submit Button */}
            <div id="btn" className="text-center mt-6">
              <button
                type="submit"
                className="w-full p-2 bg-red-500 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                {formdataid ? 'Update Product' : 'Create Product'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}