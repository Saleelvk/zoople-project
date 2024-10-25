import React, { createContext, useState } from 'react';

export const ShopContext = createContext();

const ShopProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const currency = '$'; // Set your desired currency

    // Helper function to update cart in the backend
    const updateCartInBackend = async (productId, quantity) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3001/api/v1/cart/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    productId: productId,
                    quantity: quantity, // Pass quantity for add/increase/decrease
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update cart');
            }

            const updatedCart = await response.json();
            return updatedCart.cart;
        } catch (error) {
            console.error('Error updating cart:', error);
        }
    };

    // Add item to the cart or update its quantity
    const addToCart = async (item) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((i) => i._id === item._id);
            if (existingItem) {
                // Increase quantity if item already exists
                return prevItems.map((i) =>
                    i._id === item._id
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                );
            } else {
                // Add new item to the cart
                return [...prevItems, { ...item, quantity: 1 }];
            }
        });

        // Update cart in backend (add or increase)
        await updateCartInBackend(item._id, 1); // Increase quantity by 1
    };

    // Increase item quantity
    const increaseItem = async (itemId) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item._id === itemId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );

        // Update backend
        await updateCartInBackend(itemId, 1); // Increase quantity by 1
    };

    // Decrease item quantity
    const decreaseItem = async (itemId) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item._id === itemId && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );

        // Update backend
        await updateCartInBackend(itemId, -1); // Decrease quantity by 1
    };

    return (
        <ShopContext.Provider
            value={{
                cartItems,
                currency,
                addToCart,
                setCartItems,
                increaseItem,
                decreaseItem,
            }}
        >
            {children}
        </ShopContext.Provider>
    );
};

export default ShopProvider;
