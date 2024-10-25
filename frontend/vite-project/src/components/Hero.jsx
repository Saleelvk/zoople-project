import React, { useState, useEffect } from "react";
import CarouselComponent from "./cardSlider";
import FeatureCard from "./FeatureCard";
import EmailSend from './emailSend';
import { Link } from "react-router-dom";
function   Hero() {
  const images = [
    "/src/assets/image/pikaso_embed (2).jpeg",
    "/src/assets/image/girlwithheadphone.jpeg",
    "/src/assets/image/offer.jpg",
    "/src/assets/image/handsomeman.jpg",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [currentIndex]);

  return (
    <div className="px-4 mt-[61px] sm:px-[5vw] md:px-[7vw] lg:px-[9vw] ">
      <div className="relative w-full  overflow-hidden ">
        {/* Slider images container */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div className="flex-shrink-0 w-full" key={index}>
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Previous button */}
        <button
          className="absolute top-1/2 left-5  transform -translate-y-1/2 bg-white  font-normal  rotate-180 text-black p-3  rounded-full z-10"
          onClick={prevSlide}
        >
         <span className="text-2xl">&#10132;</span> 
        </button>

        {/* Next button */}
        <button
          className="absolute top-1/2 right-5 transform -translate-y-1/2 bg-white  text-black p-3 rounded-full z-10"
          onClick={nextSlide}
        >
          <span className="text-2xl" >&#10132;</span> 
        </button>
      </div>

      <div className="flex items-center  justify-between py-6  sm:flex-row gap-4 flex-col ">
        <p className=" md:text-[45px] md:leading-[50px] text-3xl   font-semibold font-poppins">
          Tech You Can Trust/
          <br />
          Devices You’ll Love.
        </p>

        <p className=" font-poppins ">
          <span className="text-xl font-semibold font-poppins ">GadgetCore</span> is your
          ultimate destination for cutting-edge technology <br />
          serving tech enthusiasts since 2019.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 py-6  ">
        <div className="rounded-xl relative hover:shadow-xl transition-shadow duration-400 ">
          <img
            className="rounded-xl card:hover:shadow-xl "
            src="/src/assets/image/mac.jpg"
            alt=""
          />
          <div className="absolute right-5 bottom-0 font-poppins mb-2">
            <p className="font-poppins">Macbook Air </p>
            <div className="group">
              <Link to='/Shop'>
              <p className="shop cursor-pointer font-bold font-poppins">Shop Now &#x279D;</p>
              </Link>
              <hr className=" bottom-0 left-0 w-0 h-1 bg-black transition-all duration-300  group-hover:w-full" />
            </div>
          </div>
        </div>

        <div className="relative rounded-xl hover:shadow-xl transition-shadow duration-400">
          <img
            className="rounded-xl shadow-xl"
            src="/src/assets/image/elegant-smartphone-composition.jpg"
            alt=""
          />
          <div className="absolute right-5 bottom-0 font-poppins mb-2">
            <p className="font-poppins">iPhone 15 Pro</p>
            <div className="group">
            <Link to='/Shop'>
              <p className="shop cursor-pointer font-bold font-poppins">Shop Now &#x279D;</p>
              </Link>
              <hr className=" bottom-0 left-0 w-0 h-1 bg-black transition-all duration-500 group-hover:w-full" />
            </div>
          </div>
        </div>
        {/*  */}
        <div className=" rounded-xl relative hover:shadow-xl transition-shadow  duration-400 ">
          <img
            className="rounded-xl h-[510px] w-[800px] object-contain"
            src="/src/assets/image/elegant-watch-with-silver-golden-chain-isolated.jpg"
            alt=""
          />
          <div className="absolute right-5 bottom-0 font-poppins mb-2">
            <p className="font-poppins">Golden watch</p>
            <div className="group">
            <Link to='/Shop'>
              <p className="shop cursor-pointer font-bold font-poppins">Shop Now &#x279D;</p>
              </Link>
              <hr className="bottom-0 left-0 w-0 h-1 bg-black transition-all duration-300 group-hover:w-full" />
            </div>
          </div>
        </div>

        {/*  */}
        <div className="rounded-xl relative hover:shadow-xl transition-shadow duration-400">
          <img
            className="rounded-xl shadow-xl h-[510px] w-[800px] object-cover"
            src="/src/assets/image/rendering-smart-home-device.jpg"
            alt=""
          />
          <div className="absolute right-5 bottom-0 font-poppins mb-2">
            <p className="font-poppins">Apple watch</p>
            <div className="group">
            <Link to='/Shop'>
              <p className="shop cursor-pointer font-bold font-poppins">Shop Now &#x279D;</p>
              </Link>
              <hr className=" bottom-0 left-0 w-0 h-[5px]  bg-black transition-all duration-300 group-hover:w-full" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between py-12   items-center">
        <p className="text-3xl font-medium font-poppins">New Releases</p>

        <div className="group">
          
            <Link to='/Products'>
          <p className="text-[20px] font-semibold text-gray-700 font-poppins ">
            More Products <span className="text-[20px]">&#x279D;</span>
          </p>
            </Link>
         
          <hr className="bottom-0 left-0 w-0 h-[5px]  bg-black transition-all duration-300 group-hover:w-full" />
        </div>
      </div>

      <div className="text-2xl font-bold mb-4">
        <CarouselComponent />
      </div>

      <div className="flex justify-between md:flex-row flex-col my-12 flex-wrap px-8  ">
        <FeatureCard
          imgSrc="/src/assets/image/shipping and delivery/outline/Vector.png"
          imgAlt="Free Shipping Icon"
          title="Free Shipping"
          description="Order above $200"
        />

        <FeatureCard
          imgSrc="/src/assets/image/finance and payment/outline/money.png"
          imgAlt="Money-back Icon"
          title="Money-back"
          description="30 days guarantee"
        />

        <FeatureCard
          imgSrc="/src/assets/image/interface/outline/Vector.png  "
          imgAlt="Secure Payments Icon"
          title="Secure Payments"
          description="Secured by Stripe"
        />

        <FeatureCard
          imgSrc="/src/assets/image/communication/outline/Rectangle 77.png"
          imgAlt="24/7 Support Icon"
          title="24/7 Support"
          description="Phone and Email support"
        />
      </div>

      {/* Discounts  */}
      <div className="flex justify-between items-center   my-14 h-[600px] gap-8  bg-slate-200 ">
        <img
          className="w-1/2 h-full object-cover "
          src="/src/assets/image/futuristic-dj-using-virtual-reality-glasses-headline-party-play-music.jpg"
          alt=""
        />

        <div className="w-1/2 px-5 py-5  my-2 font-poppins ">
          <p className="text-md text-blue-600 font-bold  py-1">
            SAVE UP TO 35% OFF
          </p>
          <p className="text-2xl font-bold  font-poppins py-2">
            HUNDREDS of <br />
            New lower prices!
          </p>
          <p className=" text-sm py-2 font-poppins">
            Upgrade Your Setup, Elevate Your Performance – <br />
            The Best Tech at Unbeatable Prices!{" "}
          </p>
          <Link to='/Products'>
          <p className="text-sm flex items-center gap-1 py-2">
            Shop Now <span className="text-[20px]">&#x279D;</span>
          </p>
              </Link>
          <hr className="hidden " />
        </div>
      </div>


      <EmailSend />

    </div>
  );
}

export default Hero;
