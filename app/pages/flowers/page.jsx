'use client';
import React, { useEffect, useState } from 'react';
import getFlower from '@/app/actions/getcategorydata/getFlowers';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'next/image';
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { addToCart, addToLike } from '../../store/cartSlice';
import Category from '@/app/_components/Category';
import { useRouter } from 'next/navigation';

const Flowers = () => {
  const dispatch = useDispatch();
  const [mydata, setData] = useState([]);

  const fetchData = async () => {
    const data = await getFlower();
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addDataToCart = (id, proname, protitle, proprice, prodesc, proCategory, proinfo, proimgurl) => {
    dispatch(
      addToCart({
        id: id,
        proname: proname,
        protitle: protitle,
        proprice: proprice,
        prodesc: prodesc,
        proCategory: proCategory,
        proinfo: proinfo,
        proimgurl: proimgurl,
        quantity: 1,
      })
    );
  };

  const addDataToLike = (id, proname, protitle, proprice, prodesc, proCategory, proinfo, proimgurl) => {
    dispatch(
      addToLike({
        id: id,
        proname: proname,
        protitle: protitle,
        proprice: proprice,
        prodesc: prodesc,
        proCategory: proCategory,
        proinfo: proinfo,
        proimgurl: proimgurl,
        quantity: 1,
      })
    );
  };

  const router = useRouter();
  const details = (id) => {
    router.push(`/pages/details/${id}`);
  };

  return (
    <div>
      <Category />
      <p className='text-center text-2xl font-bold p-2'>Flowers</p>
      <div id='products' className='flex items-center flex-wrap justify-center gap-3'>
        {mydata?.map((item, index) => (
          <Card style={{ width: '300px' }} key={index}>
            <Image
              src={item.proimgurl}
              alt='proimage'
              height={200}
              width={300}
              onClick={() => { details(item.id); }}
            />
            <Card.Body>
              <Card.Title className='h-12 overflow-hidden'>{item.proname}</Card.Title>
              <p>{item.protitle}</p>
              <p className='text-red-500 font-bold'>Price {item.proprice} ₹</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Button
                  size='sm'
                  variant="primary"
                  onClick={() => {
                    addDataToCart(
                      item.id,
                      item.proname,
                      item.protitle,
                      item.proprice,
                      item.prodesc,
                      item.proCategory,
                      item.proinfo,
                      item.proimgurl
                    );
                  }}
                >
                  Add To Cart
                </Button>
                <FaRegHeart
                  id='like'
                  className='text-2xl'
                  onClick={() => {
                    addDataToLike(
                      item.id,
                      item.proname,
                      item.protitle,
                      item.proprice,
                      item.prodesc,
                      item.proCategory,
                      item.proinfo,
                      item.proimgurl
                    );
                  }}
                />
                <FaHeart id='dislike' className='text-2xl' style={{ display: 'none' }} />
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
      <br />
      <br />
    </div>
  );
};

export default Flowers;
