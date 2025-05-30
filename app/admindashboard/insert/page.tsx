"use client"
import { productData } from '../../actions/products'
import { useState, useRef, ChangeEvent } from 'react';
import React from "react";
import Image from "next/image";

const initialstate = {
  success: undefined,
  error: "",
  data: undefined
};

export default function Form() {
  const [state, formAction] = React.useActionState(productData, initialstate);
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
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

  return (
    <>
      <form action={formAction} id="formdata">
        <div id="main">
          <div id="insertform">
            <div id="box">
              <input type="text" required name="products" placeholder='Product Name' className='p-2 border-1 mt-2 w-70' />
              <input type="text" required name="title" placeholder='Product Title' className='p-2 border-1 mt-2 w-70' />
              <input type="number" required name="price" placeholder='Product Price' className='p-2 border-1 mt-2 w-70' />
              <textarea name="details" required placeholder="details" rows={4}>

              </textarea>
            </div>

            <div id="box">
              <select name="category" id="" title="Choose a category">
                <option>Select Category</option>
                <option value="Flowers">Flowers</option>
                <option value="Cakes">Cakes</option>
                <option value="Plants">Plants</option>
                <option value="Personalized">Personalized</option>
                <option value="New Arrivals">New Arrivals</option>
                <option value="Internationals">Internationals</option>
                <option value="Bulk / Corp Gift">Bulk / Corp Gift</option>
                <option value="Same Day Delivery">Same Day Delivery</option>
              </select>
              <select name="sameday" id="" title="Same Day Delivery">
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              <input type="text" required name="proinfo" placeholder='Product Info' className='p-2 border-1 mt-2 w-70' />
              <input type="file" name="imgurl" multiple required placeholder="choose file" className='p-2 border-1 mt-2 w-70' onChange={handleFileChange} />
              {image && (
                <div>
                  <span onClick={handleRemoveImage} className="cursor-pointer text-red-500">X</span>
                  {/* Image component from Next.js requires the src to be a static path or properly handled with next.config.js */}
                  <Image src={image} alt="Selected Image" width={100} height={100} />
                </div>
              )}
            </div>

          </div>
        </div>
        <div id="btn">
          <button type="submit" className='p-2 border-1 mt-2 w-70'>Submit</button>
        </div>
      </form>
    </>
  )
}