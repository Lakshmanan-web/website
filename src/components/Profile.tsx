import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
  picture: string;
  isAdmin: boolean;
}

interface PhoneCase {
  _id: string;
  name: string;
  color: string;
  price: number;
  image: string;
  description: string;
  inStock: boolean;
  createdAt: string;
}

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    image: string;
  }>;
  total: number;
  trackingNumber?: string;
  estimatedDelivery?: string;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  color: string;
}

function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'cart' | 'tracking'>('profile');
  const [phoneCases, setPhoneCases] = useState<PhoneCase[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Sample orders data (you can later move this to MongoDB as well)
  const [orders, setOrders] = useState<Order[]>([
    {
      id: '1',
      orderNumber: 'ORD-2024-001',
      date: '2024-01-15',
      status: 'delivered',
      items: [
        { name: 'iPhone Case - Black', quantity: 1, price: 29.99, image: '/photo/black.jpeg' },
        { name: 'iPhone Case - Blue', quantity: 2, price: 29.99, image: '/photo/blue.jpeg' }
      ],
      total: 89.97,
      trackingNumber: '1Z999AA1234567890',
      estimatedDelivery: '2024-01-18'
    },
    {
      id: '2',
      orderNumber: 'ORD-2024-002',
      date: '2024-01-20',
      status: 'shipped',
      items: [
        { name: 'iPhone Case - Red', quantity: 1, price: 29.99, image: '/photo/red.jpeg' }
      ],
      total: 29.99,
      trackingNumber: '1Z999AA1234567891',
      estimatedDelivery: '2024-01-25'
    },
    {
      id: '3',
      orderNumber: 'ORD-2024-003',
      date: '2024-01-25',
      status: 'processing',
      items: [
        { name: 'iPhone Case - Black', quantity: 3, price: 29.99, image: '/photo/black.jpeg' }
      ],
      total: 89.97
    }
  ]);

  // Dynamic cart based on phone cases
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Fetch phone cases from MongoDB
  useEffect(() => {
    const fetchPhoneCases = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/cases');
        if (response.data.success) {
          setPhoneCases(response.data.cases);
        } else {
          setError('Failed to fetch phone cases');
        }
      } catch (error) {
        console.error('Error fetching phone cases:', error);
        setError('Failed to load phone cases');
      } finally {
        setLoading(false);
      }
    };

    fetchPhoneCases();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    console.log('Profile user logged out');
    navigate('/');
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'processing': return 'text-blue-600 bg-blue-100';
      case 'shipped': return 'text-purple-600 bg-purple-100';
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending': return '⏳';
      case 'processing': return '⚙️';
      case 'shipped': return '📦';
      case 'delivered': return '✅';
      case 'cancelled': return '❌';
      default: return '📋';
    }
  };

  const addToCart = (phoneCase: PhoneCase) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => 
        item.name === phoneCase.name && item.color === phoneCase.color
      );
      
      if (existingItem) {
        return prevCart.map(item => 
          item.id === existingItem.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, {
          id: phoneCase._id,
          name: phoneCase.name,
          price: phoneCase.price,
          quantity: 1,
          image: phoneCase.image,
          color: phoneCase.color
        }];
      }
    });
  };

  const updateCartQuantity = (itemId: string, newQuantity: number) => {
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === itemId 
          ? { ...item, quantity: Math.max(0, newQuantity) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = (itemId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Please log in to view your profile</h2>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <img 
                  src={user.picture} 
                  alt={user.name} 
                  className="w-8 h-8 rounded-full"
                />
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-800">{user.name}</p>
                  <p className="text-xs text-gray-600">{user.email}</p>
                </div>
              </div>
              <button
                onClick={() => navigate('/')}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                Back to Home
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8">
            {[
              { id: 'profile', label: 'Profile', icon: '👤' },
              { id: 'orders', label: 'Recent Orders', icon: '📋' },
              { id: 'cart', label: 'Shopping Cart', icon: '🛒' },
              { id: 'tracking', label: 'Track Orders', icon: '📦' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="container mx-auto px-4 py-8 flex-1">
        {activeTab === 'profile' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Profile Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-4">
                <img 
                  src={user.picture} 
                  alt={user.name} 
                  className="w-20 h-20 rounded-full"
                />
                <div>
                  <h3 className="text-lg font-medium text-gray-800">{user.name}</h3>
                  <p className="text-gray-600">{user.email}</p>
                  {user.isAdmin && (
                    <span className="inline-block mt-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      Admin
                    </span>
                  )}
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    defaultValue={user.name}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    defaultValue={user.email}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <button className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Recent Orders</h2>
            {orders.map(order => (
              <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">Order #{order.orderNumber}</h3>
                    <p className="text-sm text-gray-600">Placed on {new Date(order.date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)} {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                    <p className="text-lg font-semibold text-gray-800 mt-1">${order.total.toFixed(2)}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">{item.name}</h4>
                        <p className="text-sm text-gray-600">Qty: {item.quantity} × ${item.price}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-800">${(item.quantity * item.price).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {order.trackingNumber && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Tracking:</strong> {order.trackingNumber}
                    </p>
                    {order.estimatedDelivery && (
                      <p className="text-sm text-blue-600">
                        Estimated delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'cart' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Shopping Cart</h2>
            {loading ? (
              <div className="text-center py-8">
                <p className="text-gray-600">Loading phone cases...</p>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-red-600">{error}</p>
              </div>
            ) : (
              <>
                {/* Available Phone Cases */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Available Phone Cases</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {phoneCases.map((phoneCase) => (
                      <div key={phoneCase._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <img 
                          src={phoneCase.image} 
                          alt={phoneCase.name} 
                          className="w-full h-32 object-cover rounded mb-3"
                        />
                        <h4 className="font-semibold text-gray-800 mb-2">{phoneCase.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">Color: {phoneCase.color}</p>
                        <p className="text-lg font-bold text-yellow-700 mb-3">₹{phoneCase.price}</p>
                        <button
                          onClick={() => addToCart(phoneCase)}
                          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors"
                        >
                          Add to Cart
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cart Items */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Cart Items</h3>
                  {cart.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-600 mb-4">Your cart is empty</p>
                      <p className="text-sm text-gray-500">Add some phone cases from above!</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cart.map(item => (
                        <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                          <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-800">{item.name}</h3>
                            <p className="text-sm text-gray-600">Color: {item.color}</p>
                            <p className="text-lg font-semibold text-gray-800">₹{item.price}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center"
                            >
                              -
                            </button>
                            <span className="w-12 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center"
                            >
                              +
                            </button>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-800">₹{(item.price * item.quantity).toFixed(2)}</p>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500 hover:text-red-700 text-sm"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-lg font-semibold text-gray-800">Total:</span>
                          <span className="text-2xl font-bold text-gray-800">₹{cartTotal.toFixed(2)}</span>
                        </div>
                        <button className="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors">
                          Proceed to Checkout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === 'tracking' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Track Your Orders</h2>
            {orders.filter(order => order.trackingNumber).map(order => (
              <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">Order #{order.orderNumber}</h3>
                    <p className="text-sm text-gray-600">Tracking: {order.trackingNumber}</p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)} {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
                
                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>Order Placed</span>
                    <span>Processing</span>
                    <span>Shipped</span>
                    <span>Delivered</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        order.status === 'pending' ? 'w-1/4 bg-yellow-500' :
                        order.status === 'processing' ? 'w-1/2 bg-blue-500' :
                        order.status === 'shipped' ? 'w-3/4 bg-purple-500' :
                        order.status === 'delivered' ? 'w-full bg-green-500' :
                        'w-0'
                      }`}
                    ></div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Order Placed</p>
                      <p className="text-xs text-gray-600">{new Date(order.date).toLocaleString()}</p>
                    </div>
                  </div>
                  
                  {order.status !== 'pending' && (
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">Processing</p>
                        <p className="text-xs text-gray-600">{new Date(order.date).toLocaleString()}</p>
                      </div>
                    </div>
                  )}
                  
                  {['shipped', 'delivered'].includes(order.status) && (
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">Shipped</p>
                        <p className="text-xs text-gray-600">{order.estimatedDelivery && new Date(order.estimatedDelivery).toLocaleString()}</p>
                      </div>
                    </div>
                  )}
                  
                  {order.status === 'delivered' && (
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">Delivered</p>
                        <p className="text-xs text-gray-600">{order.estimatedDelivery && new Date(order.estimatedDelivery).toLocaleString()}</p>
                      </div>
                    </div>
                  )}
                </div>

                {order.estimatedDelivery && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Estimated Delivery:</strong> {new Date(order.estimatedDelivery).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Profile; 