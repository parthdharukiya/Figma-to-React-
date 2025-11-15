"use client";

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useServiceCart, ServiceItem } from './ServiceCartContext';

export const FloatingCart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, placeOrder } = useServiceCart();

  // Create a ref for the drag area
  const dragAreaRef = useRef(null);

  return (
    <>
      {/* This div will act as the boundary for our draggable element */}
      <div ref={dragAreaRef} className="fixed inset-0 pointer-events-none z-40" />

      <motion.div
        drag
        dragConstraints={dragAreaRef}
        dragMomentum={false}
        className="fixed bottom-10 right-10 z-50 cursor-grab" // Initial position
        whileTap={{ cursor: "grabbing" }}
      >
        <button
          onClick={() => setIsOpen(true)}
          className="bg-orange-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2"
        >
          <span className="font-semibold">Your Order</span>
          {cart.length > 0 && (
            <span className="bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </button>
      </motion.div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-[100]">
          <div className="bg-gray-800 text-white p-8 rounded-lg relative w-full max-w-md mx-4">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-4 text-3xl font-bold text-gray-400 hover:text-white"
            >
              &times;
            </button>
            <h2 className="text-3xl font-bold mb-6 text-center text-orange-500">Your Service Cart</h2>
            {cart.length > 0 ? (
              <ul className="space-y-3 max-h-80 overflow-y-auto">
                {cart.map((item: ServiceItem, index) => (
                  <li key={index} className="text-lg border-b border-gray-700 pb-2">{item.name}</li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-400">Your cart is empty.</p>
            )}
            {cart.length > 0 && (
              <button
                onClick={() => { placeOrder(); alert('Your order has been placed and is now in progress!'); setIsOpen(false); }}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition mt-6"
              >
                Place Order
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};