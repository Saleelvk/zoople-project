import React, { useContext, useEffect, useState } from "react";
import EmailSend from "./emailSend";
import { useParams } from "react-router-dom";
import { ShopContext } from "./ShopContext";
import RelatedProduct from "./RelatedProduct";

function Product() {
  const { productId } = useParams();
  const { currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null); 
  const [image, setImage] = useState("");

  console.log(productData)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/v1/product/products/${productId}`);
        console.log("Response received:", response);
    
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error response:", errorText);
          throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
        }
    
        const data = await response.json();
 
        setProductData(data);
    
        if (data && data.images && data.images.length > 0) {
          setImage(data.images[0]);
        }
      } catch (error) {
        console.log("Fetch error:", error);
      }
    };
    
    fetchProducts();
  }, [productId]); 

  return productData ? (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] pt-10 transition-opacity ease-in duration-500 opacity-100 mt-24">
      <div className="flex gap-12 h-[60%] sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col justify-between sm:justify-normal h-full sm:w-[18.7%] ml-6 w-full">
            {productData.images && productData.images.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[150px] h-[100px] object-cover sm:w-full sm:md-3 flex-shrink-0 cursor-pointer mb-3"
                alt={`product-${index}`}
              />
            ))}
          </div>

          <div className="w-full sm:w-[80%]">
            <img className="w-full h-[500px] object-cover" src={image} alt="Selected Product" />
          </div>
        </div>

        <div className="flex-1 ml-3">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src="/src/assets/image/Rating Group.png" alt="Rating" className="w-20" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}{productData.price}
          </p>
          <p className="mt-5 mb-2 text-gray-500 md:w-4/5">{productData.description}</p>  

          <button
            onClick={() => addToCart(productData)}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 font-poppins"
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      <div>
        <p className="text-3xl p-2 font-semibold font-poppins py-5">You might also like</p>
        <RelatedProduct category={productData.category} />
      </div>

      <EmailSend />
    </div>
  ) : (
    <div className="opacity-0"> </div>
  );
}

export default Product;
