import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (item) => {
        setCart((prev) => [...prev, item]);
    };

    const removeFromCart = (id, quantity) => {
        setCart((prev) => {
            const itemToRemove = prev.find(item => item.id === id);
            if (itemToRemove) {
                
                if (itemToRemove.quantity === quantity) {
                    return prev.filter(item => item.id !== id);
                } else {
                    
                    return prev.map(item => 
                        item.id === id ? { ...item, quantity: item.quantity - quantity } : item
                    );
                }
            }
            return prev;
        });
    };

    const clearCart = () => {
        setCart([]);
    };

    const getCartCount = () => {
        return cart.reduce((total, item) => total + item.quantity, 0); 
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getCartCount }}>
            {children}
        </CartContext.Provider>
    );
};