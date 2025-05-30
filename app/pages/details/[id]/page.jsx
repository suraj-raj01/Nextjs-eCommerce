'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import getProductDetails from '@/app/actions/getProductDetails';
import Image from 'next/image';
import Button from 'react-bootstrap/esm/Button';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../store/cartSlice';

export default function ProductDetails() {
  const dispatch = useDispatch();
  const [details, setDetails] = useState({});
  const params = useParams();
  const id = params.id ? Number(params.id) : undefined;

  const router = useRouter();

  const loadData = async () => {
    if (id !== undefined) {
      const data = await getProductDetails(id);
      console.log(data);
      setDetails(data || {});
    } else {
      console.error('Invalid ID: ID is undefined or not a number');
    }
  }

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
  }

  useEffect(() => {
    loadData();
  }, [id]);

  return (
    <div>
      <div className="w-full flex flex-col md:flex-row items-start gap-5 p-5">
        {/* Image Container */}
        <div className="w-full md:w-1/3 flex justify-center items-center">
          {details?.users?.proimgurl ? (
            <Image
              src={details?.users?.proimgurl}
              alt="proimage"
              height={300}
              width={300}
              className="object-cover rounded"
            />
          ) : (
            <p>Image not found</p>
          )}
        </div>

        {/* Text Content */}
        <div className="flex flex-col w-full md:w-2/3 space-y-4">
          <p className="font-bold text-2xl md:text-4xl">{details?.users?.proname}</p>
          <div>
            <p className="font-bold">Description</p>
            <p>{details?.users?.prodesc}</p>
          </div>
          <div>
            <p className="font-bold">Details</p>
            <p>{details?.users?.proinfo}</p>
          </div>
          <p className="pt-2 font-bold text-red-700 text-xl md:text-2xl">
            Price: {details?.users?.proprice} ₹
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              size="sm"
              variant="success"
              onClick={() => {
                addDataToCart(
                  details.id,
                  details.proname,
                  details.protitle,
                  details.proprice,
                  details.prodesc,
                  details.proCategory,
                  details.proinfo,
                  details.proimgurl
                );
              }}
            >
              Add To Cart
            </Button>
            <Button
              size="sm"
              variant="success"
              onClick={() => {
                router.push("/pages/checkout");
              }}
            >
              Add to Wishlist
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
