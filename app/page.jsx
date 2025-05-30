import Image from "next/image";
import 'bootstrap/dist/css/bootstrap.min.css';
import TopNav from "./_components/TopNav";
import Category from "./_components/Category";
import Crousels from "./_components/Crousels";
import Occasion from "./_components/Occasion";
import FavouritePic from "./_components/FavouritePic";
import SameDayDelivery from "./_components/SameDayDelivery";
import Banner from "./_components/Banner";
import SurpriseforLittleOne from "./_components/SurpriseforLittleOne";
import CategoriesOption from "./_components/CategoriesOption";
import CustomerStories from "./_components/CustomerStories";
import Contact from "./_components/Contact";
import Footer from "./_components/Footer";
import Stats from "./_components/Stats";
export default function Home() {
  return (
   <>
   <TopNav/>
   <Category/>
   <Occasion/>
   <Crousels/>
   <FavouritePic/>
   <SameDayDelivery/>
   <Banner/>
   <SurpriseforLittleOne/>
   <CategoriesOption/>
   {/* <CustomerStories/> */}
   <Contact/>
   <Stats/>
   <Footer/>
   </>
  );
}
