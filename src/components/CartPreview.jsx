import React, { useState } from 'react';

const CartPreview = ({ cart }) => {
  const [open, setOpen] = useState(false);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed bottom-4 right-4 z-50 w-full sm:w-auto flex justify-center sm:justify-end">
      <div className="bg-white rounded-full shadow-lg px-4 py-2 flex items-center gap-4 border border-gray-200 sm:min-w-[280px] max-w-full">
        <button
          className="flex items-center gap-2 font-bold text-gray-800 focus:outline-none"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="material-icons text-yellow-500">shopping_cart</span>
          <span>Cart</span>
          <span className="bg-yellow-400 text-gray-900 rounded-full px-2 py-0.5 text-xs font-bold ml-1">
            {totalItems}
          </span>
        </button>
        <span className="font-semibold text-gray-700">₹{totalPrice}</span>
        <button className="ml-2 px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded shadow-sm transition-colors text-sm">
          View Cart
        </button>
      </div>
      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-200 z-50 p-4">
          <h4 className="font-bold text-gray-800 mb-2">Cart Items</h4>
          {cart.length === 0 ? (
            <div className="text-gray-500 text-sm">Your cart is empty.</div>
          ) : (
            <ul className="divide-y divide-gray-100 max-h-56 overflow-y-auto">
              {cart.map((item, idx) => (
                <li key={idx} className="py-2 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-800 text-sm">{item.name}</div>
                    <div className="text-xs text-gray-500">Color: <span className="inline-block w-3 h-3 rounded-full align-middle border border-gray-300 mr-1" style={{background: item.color}}></span> {item.color}</div>
                  </div>
                  <div className="text-sm font-bold text-yellow-700">₹{item.price} x {item.quantity}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      {/* Mobile sticky bar */}
      <style>{`
        @media (max-width: 640px) {
          .fixed.bottom-4.right-4 { left: 0; right: 0; bottom: 0; border-radius: 0.75rem 0.75rem 0 0; }
        }
      `}</style>
    </div>
  );
};

export default CartPreview; 