import React, { useContext, useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { ShopContext } from './ShopContext';

const CarouselComponent = () => {
  const { addToCart } = useContext(ShopContext);
  const [items, setItems] = useState([]); // Holds the fetched products

  // Define responsive breakpoints
  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 4 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`https://e-commerce-gclo.onrender.com/api/v1/product/products`);
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setItems(data.products); // Assume products are in data.products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="relative z-20">
      <Carousel
        responsive={responsive}
        infinite={true}
        showDots={false}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        customTransition="transform 300ms ease-in-out"
        transitionDuration={500}
      >
        {items.map((item) => (
          <div key={item._id} className="p-4">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden relative">
              <img
                src={item.images?.[0]} // Show first image if available
                alt={item.name}
                className="w-full h-48 object-contain"
              />
              <div className="p-4">
                <h5 className="text-lg font-semibold font-poppins flex justify-center pt-2">{item.name}</h5>
                <p className="text-sm font-poppins font-normal pt-1"></p>
                <button
                  onClick={() => {
                    const quantity = 1; // Default to adding 1 item
                    addToCart({ _id: item._id, name: item.name, price: item.price, image: item.images?.[0], quantity }); // Update local cart state
                  }}
                  className="mt-4 bg-black text-white px-4  w-full py-3 rounded-xl text-sm "
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
        ))}
        
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
