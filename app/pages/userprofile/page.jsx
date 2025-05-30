'use client'
import React, { useEffect } from 'react'
import Table from "react-bootstrap/Table"
import Image from 'next/image'
import { useUser } from '@clerk/nextjs'
import getUserProducts from '../../actions/getUsersProduct';

const UserProfile = () => {
  const { user } = useUser();
  const imageurl = user?.imageUrl;
  const [products, setProducts] = React.useState([]);
  const email = user?.emailAddresses[0].emailAddress;

  const getUserProductsData = async () => {
    const userProducts = await getUserProducts(email || '');
    return userProducts;
  }

  useEffect(() => {
    const fetchUserProducts = async () => {
      const userProducts = await getUserProductsData();
      console.log(userProducts[0]?.products);
      setProducts(userProducts);
    }
    fetchUserProducts();
  }, [email]);

  return (
    <div>
      <div id="profile-main">
        <div id="profile" className='w-1/4 p-2 mt-4'>
          {imageurl && <Image src={imageurl} alt='profile' height={50} width={50} className='rounded-4xl' />}
          <p className='font-bold '>{user?.fullName}</p>
          <div id='about'>
            <p>{user?.emailAddresses[0].emailAddress}</p>
          </div>
        </div>
        <hr />
        <div id="purchased">
          <Table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Title</th>
                <th>Price</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {
                products[0]?.products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.proname}</td>
                    <td>{product.protitle}</td>
                    <td>{product.proprice}</td>
                    <td><Image src={product.proimgurl} alt='product' height={50} width={50} /></td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default UserProfile;
