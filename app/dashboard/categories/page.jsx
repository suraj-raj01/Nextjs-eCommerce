'use client'
import React, { useEffect, useState } from 'react'
import "../categories/style.css"
import { useRouter } from 'next/navigation'
import getCategory from '../../actions/categories/getCategory'
import updateCategory from '../../actions/categories/updateCategory'
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import Table from "react-bootstrap/Table"
import Image from 'next/image'
import Swal from 'sweetalert2'
const page = () => {

  const [category, setCategory] = useState([])

  const router = useRouter();

  const fetchData = async () => {
    const response = await getCategory();
    if (Array.isArray(response)) {
      setCategory([]);
    } else {
      setCategory(response.data || []);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteItem = (id) => {
    updateCategory(id)
    fetchData()
    Swal.fire({
      title: "data delete success!!",
      icon: "success",
    });
  }

  const editItem = (id) => {
    alert(id)
  }

  return (
    <div>
      <div id='cate-header'>
        <p className='text-2xl font-bold'>Categories</p>
        <button onClick={() => { router.push("/dashboard/categories/addcategory") }}
          className='bg-green-700 p-2 text-white'
        >Add Category</button>
      </div>
      <div className="p-2 w-full">
        <Table striped hover responsive>
        <thead>
          <tr className='border-1 p-2'>
            <th>Category Name</th>
            <th>Image</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {category.map((item, index) => (
            <tr key={index}>
              <td>{item.catename}</td>
              <td>
                <Image src={item.cateurl} alt='cateimage' height={50} width={50} className='rounded-4xl' />
              </td>
              <td >
                <button onClick={() => { deleteItem(item.id) }} className='text-center p-2 bg-green-700 text-white'><AiFillDelete /></button>
              </td>
              <td >
                <button onClick={() => { editItem(item.id) }} className='text-center p-2 bg-green-700 text-white'><FaEdit /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
    </div>
  )
}

export default page