'use client'
import { useRouter } from 'next/navigation'
import { useState, useRef } from 'react';
import Image from 'next/image';
import React from 'react'
import "../categories/style.css"
import { createCategory } from '../../actions/categories/createCategory'

const initialstate = {
  success: undefined,
  error: ""
};

const Page = () => {
  const router = useRouter();
  const [state, formAction] = React.useActionState(createCategory, initialstate);
  const [image, setImage] = useState(null);
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

  return (
    <div>
      <div id='cate-header'>
        <p className='text-2xl font-bold'>Add New Category</p>
        <button className='p-2 bg-green-700 text-white' onClick={() => { router.push("/dashboard/categories") }}>Go to Categories</button>
      </div>
      <div>
        <form action={formAction} id="cate-form">
          <input type="text" name='category' required placeholder='enter category name' />
          {image && (
            <div>
              <span onClick={handleRemoveImage} className='text-red-500 cursor-pointer'>X</span>
              {/* Image component from Next.js requires the src to be a static path or properly handled with next.config.js */}
              <Image src={image} alt="Selected Image" width={100} height={100} />
            </div>
          )}
          <input type="file" name='cateurl' required placeholder='category image' onChange={handleFileChange} />
          <button className='p-2 bg-green-700 text-white'>Add Category</button>
        </form>
      </div>
    </div>
  )
}

export default Page;
