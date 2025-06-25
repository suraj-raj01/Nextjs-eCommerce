// components/TopNav.js
'use client';

import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaRegHeart, FaBars } from 'react-icons/fa6';
import { FaHeart } from "react-icons/fa";
import { AiOutlineClose } from 'react-icons/ai';
import { IoMdCart } from "react-icons/io";
import logo from '../../public/logo/logo.png';
import bag from '../../public/bag.svg';
import { useUser } from "@clerk/nextjs";
import { useSelector } from 'react-redux';
import { UserButton, SignedIn } from "@clerk/nextjs"

export default function TopNav() {
  const router = useRouter();
  const [count, setCount] = useState(0);
  const [likes, setLikes] = useState(0);

  const cartItems = useSelector(state => state.cart.cartItems);
  const likeItems = useSelector(state => state.cart.likeItems);

  const { user } = useUser();

  useEffect(() => {
    setCount(cartItems.length);
    setLikes(likeItems.length);
  }, [cartItems, likeItems]);

  const sidebar = () => {
    const icon = document.getElementById('icon');
    const slidebar = document.getElementById('slidebar');
    const closebtn = document.getElementById('closebtn');
    if (icon && slidebar && closebtn) {
      icon.style.display = 'none';
      slidebar.style.display = 'block';
      closebtn.style.display = 'block';
    }
  };

  const closeBtn = () => {
    const icon = document.getElementById('icon');
    const slidebar = document.getElementById('slidebar');
    const closebtn = document.getElementById('closebtn');
    if (icon && slidebar && closebtn) {
      icon.style.display = 'block';
      slidebar.style.display = 'none';
      closebtn.style.display = 'none';
    }
  };

  const home = () => {
    router.push('/');
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" id="navbar">
        <Container>
          <Navbar.Brand>
            <FaBars id="icon" onClick={sidebar}/>
            <AiOutlineClose
              id="closebtn"
              onClick={closeBtn}
              style={{
                display: 'none',
                borderRadius: '50%',
                cursor: 'pointer',
              }}
            />
          </Navbar.Brand>
          <Navbar.Brand>
            <Image
              src={logo}
              alt="logo"
              height={40}
              className="p-0"
              onClick={home}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>

            <Nav id="icons" className="flex items-center justify-center gap-2">
              <Nav.Link href="/pages/wishlist">
                {likes < 1 ? (
                  <div className='flex item-center content-between text-center font-bold'>
                    <span className=' flex flex-col item-center content-between text-2xl'>
                      <span className='text-xs rounded-lg bg-gray-100'>{likes}</span>
                      <FaHeart />
                    </span>
                  </div>
                ) : (
                  <div className='flex item-center content-between text-center font-bold'>
                    <span className=' flex flex-col item-center content-between text-2xl'>
                      <span className='text-xs rounded-lg bg-gray-100'>{likes}</span>
                      <FaHeart className='text-red-400' />
                    </span>
                  </div>
                )}
              </Nav.Link>
              <Nav.Link href="/pages/cartitems">
                <div className='flex item-center content-between text-center font-bold mr-2'>
                  <span className=' flex flex-col item-center content-between text-2xl'>
                    <span className='text-xs rounded-lg bg-gray-100'>{count}</span>
                    <IoMdCart />
                  </span>
                </div>
              </Nav.Link>

              {!user ? (
                <button
                  className="font-semibold px-6 py-2 w-fit bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-2xl shadow-md transition duration-200 ml-3"
                  onClick={() => router.push("/Auth/login")}
                >
                  Login
                </button>

              ) : (
                <SignedIn>
                  <UserButton appearance={{
                    elements: {
                      userButtonAvatarBox: 'bg-red-400 rounded-lg ml-3',
                      // other keys depending on what part you want to style
                    }
                  }} />
                </SignedIn>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>

        {/* Sidebar */}
        <div id="slidebar">
          <div id="link">
            <div
              className="shadow-blue-300 p-2"
              style={{ borderRadius: '5px', border: '1px solid #d7d4d4' }}
            >
              <span className="text-black flex item-center gap-4">
                <p className="text-2xl font-bold">Top Collections</p>
                <Image src={bag} alt="bag" />
              </span>
              <p
                className="font-bold ml-2 hover:text-red-600 cursor-pointer"
                onClick={() => { router.push("/pages/samedaydelivery") }}
              >
                Same Day Delivery Gifts
              </p>
              <p
                className="font-bold ml-2 hover:text-red-600 cursor-pointer"
                onClick={() => { router.push("/pages/cakes") }}
              >
                Birthday Gifts
              </p>
              <p
                className="font-bold ml-2 hover:text-red-600 cursor-pointer"
                onClick={() => { router.push("/pages/personalized") }}
              >
                Personalized Gifts
              </p>
            </div>

            <p className="font-bold text-gray-400 text-xs mt-2">Shop By </p>

            <Form.Select aria-label="Default select example">
              <option>Personal Occasions</option>
              <option value="1">Birthday Gifts</option>
              <option value="2">Anniversary Gifts</option>
              <option value="3">Wedding & Engagement</option>
              <option value="4">Best Wishes</option>
            </Form.Select>

            <Form.Select aria-label="Default select example">
              <option>Categories</option>
              <option value="1">Cakes</option>
              <option value="2">Flowers</option>
              <option value="3">Plants</option>
              <option value="4">Home & Living</option>
              <option value="5">Fashion & Lifestyle</option>
              <option value="6">Toys & Games & Lifestyle</option>
            </Form.Select>

            <Form.Select aria-label="Default select example">
              <option>Festivals</option>
              <option value="1">Easter</option>
              <option value="2">Akshaya Tritiya</option>
              <option value="3">Rakhi</option>
              <option value="4">Janmashtami</option>
              <option value="5">Ganesh Chaturthi</option>
              <option value="6">Dussehra</option>
              <option value="7">Karwa Chauth</option>
              <option value="8">Dhanteras</option>
              <option value="9">Diwali</option>
            </Form.Select>

            <Form.Select aria-label="Default select example">
              <option>Special Days</option>
              <option value="1">Mothers Day</option>
              <option value="2">Fathers Day</option>
              <option value="3">Friendship Day</option>
              <option value="4">Independence Day</option>
              <option value="5">Teachers Day</option>
              <option value="6">Boss Day</option>
              <option value="7">Childrens Day</option>
              <option value="8">Valentines Day</option>
              <option value="9">Womens Day</option>
            </Form.Select>

            <Form.Select aria-label="Default select example">
              <option>Recipient</option>
              <option value="1">Him</option>
              <option value="2">Her</option>
              <option value="3">Teen</option>
              <option value="4">Kids</option>
            </Form.Select>
          </div>
        </div>
      </Navbar>
    </>
  );
}
