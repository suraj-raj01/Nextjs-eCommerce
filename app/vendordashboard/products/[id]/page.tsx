'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import getProducts from '../../../../app/actions/vendors/getProducts';
const page = () => {
  const params = useParams();
  const id = params.id ? Number(params.id) : undefined;
  const [product, setProduct] = useState<any>([])

  const loadProduct = async () => {
    const data = await getProducts(id);
    if (Array.isArray(data)) {
      setProduct(data);
      console.log(data);
    } else {
      setProduct(data?.data || []);
    }
  }

  useEffect(() => {
    loadProduct();
  }, [])

  let username="";
  return (
    <div>
      <div className='overflow-y-scroll p-2' style={{ height: '88vh' }}>
      <h1>{username}</h1>
          {
            product.map((item: any, index: number) => (
              <div key={index}>
                <h3 className='text-xl font-bold text-center'>CUSTOMER NAME  "{item.username.toString()}"</h3>
                {item.products.map((pro: any,index:number) => (
                  <div
                    key={index}
                    className="mt-4 flex gap-4 p-4 border rounded-sm  shadow-sm hover:shadow-md transition-shadow bg-white"
                  >
                    <img
                      src={pro.proimgurl}
                      alt={pro.proname}
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                    <div className="flex flex-col justify-between">
                      <h4 className="font-semibold text-gray-800">{pro.proname}</h4>
                      <p className="text-sm text-gray-600">{pro.prodesc}</p>
                      <p className="text-md font-medium text-green-600">₹{pro.proprice}</p>
                    </div>
                  </div>
                ))}
              </div>

            ))
          }
      </div>
    </div>
  )
}

export default page