import React, { useState } from 'react';
import cartImg from '../photo/cart.png';

const CartIcon = ({ cart, removeFromCart, animation = false }) => {
  const [open, setOpen] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      <div className="relative">
        <button
          className={`bg-yellow-400 hover:bg-yellow-500 rounded-full shadow-lg p-4 focus:outline-none w-16 h-16 flex items-center justify-center transition-all duration-300 ${
            animation ? 'scale-110 animate-pulse' : ''
          }`}
          onClick={() => setOpen((o) => !o)}
          aria-label="Open cart"
        >
          <img src={cartImg} alt="Cart" className="w-8 h-8 object-contain" />
        </button>
        
        {/* Cart badge */}
        {totalItems > 0 && (
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-bounce">
            {totalItems}
          </div>
        )}
      </div>
      
      {open && (
        <div className="mb-2 w-72 max-h-64 overflow-y-auto bg-white rounded-lg shadow-xl border border-gray-200 p-4 animate-slideIn">
          {cart.length === 0 ? (
            <div className="text-gray-500 text-sm">Your cart is empty.</div>
          ) : (
            <>
              <ul className="divide-y divide-gray-100">
                {cart.map((item, idx) => (
                  <li key={idx} className="py-2 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-800 text-sm">{item.name}</div>
                      <div className="text-xs text-gray-500">Color: <span className="inline-block w-3 h-3 rounded-full align-middle border border-gray-300 mr-1" style={{background: item.color.toLowerCase()}}></span> {item.color}</div>
                      <div className="text-xs text-yellow-700 font-bold">₹{item.price} x {item.quantity}</div>
                    </div>
                    <button
                      className="ml-2 text-red-500 hover:text-red-700 text-lg font-bold px-2 transition-colors"
                      onClick={() => removeFromCart(item)}
                      aria-label="Remove from cart"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-800">Total:</span>
                  <span className="font-bold text-lg text-yellow-700">
                    ₹{cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)}
                  </span>
                </div>
                <button className="w-full mt-3 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors">
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CartIcon; 