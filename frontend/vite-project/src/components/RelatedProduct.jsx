import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from './ShopContext';
import ProductsItems from './productsItems';

function RelatedProduct({ category }) {
    const { productsCardItems = [] } = useContext(ShopContext); // Default to an empty array
    const [related, setRelated] = useState([]); // State to store related products

    useEffect(() => {
        console.log('productsCardItems:', productsCardItems); // Debugging log
        if (productsCardItems.length > 0) {
            const productCopy = productsCardItems.filter((item) => category === item.category);
            setRelated(productCopy.slice(0, 5)); // Set the first 5 related products
        }
    }, [productsCardItems, category]); // Dependencies: products and category

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 my-6">
            {related.length > 0 ? (
                related.map((item) => (
                    <ProductsItems
                        key={item._id} // Use unique ID for key
                        id={item._id}
                        image={item.images[0]}
                        name={item.name}
                        price={item.price}
                        star={item.star}
                    />
                ))
            ) : (
                <p>No related products found.</p> // Conditional rendering
            )}
        </div>
    );
}

export default RelatedProduct;
