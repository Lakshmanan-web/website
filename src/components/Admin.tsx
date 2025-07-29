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

function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'cases' | 'orders'>('dashboard');
  const [phoneCases, setPhoneCases] = useState<PhoneCase[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Form state for adding new phone case
  const [newCase, setNewCase] = useState({
    name: '',
    color: '',
    price: '',
    image: '',
    description: ''
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        if (!userData.isAdmin) {
          navigate('/profile');
        }
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user');
        navigate('/');
      }
    } else {
      navigate('/');
    }
  }, [navigate]);

  // Fetch phone cases
  useEffect(() => {
    if (activeTab === 'cases') {
      fetchPhoneCases();
    }
  }, [activeTab]);

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

  const handleLogout = () => {
    localStorage.removeItem('user');
    console.log('Admin user logged out');
    navigate('/');
  };

  const handleAddCase = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/cases', {
        ...newCase,
        price: parseFloat(newCase.price)
      });
      
      if (response.data.success) {
        setNewCase({
          name: '',
          color: '',
          price: '',
          image: '',
          description: ''
        });
        fetchPhoneCases(); // Refresh the list
        alert('Phone case added successfully!');
      }
    } catch (error) {
      console.error('Error adding phone case:', error);
      alert('Failed to add phone case');
    }
  };

  const handleDeleteCase = async (caseId: string) => {
    if (window.confirm('Are you sure you want to delete this phone case?')) {
      try {
        const response = await axios.delete(`/cases/${caseId}`);
        if (response.data.success) {
          fetchPhoneCases(); // Refresh the list
          alert('Phone case deleted successfully!');
        }
      } catch (error) {
        console.error('Error deleting phone case:', error);
        alert('Failed to delete phone case');
      }
    }
  };

  const handleUpdateCase = async (caseId: string, updates: Partial<PhoneCase>) => {
    try {
      const response = await axios.put(`/cases/${caseId}`, updates);
      if (response.data.success) {
        fetchPhoneCases(); // Refresh the list
        alert('Phone case updated successfully!');
      }
    } catch (error) {
      console.error('Error updating phone case:', error);
      alert('Failed to update phone case');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Loading...</h2>
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
            <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
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
              { id: 'dashboard', label: 'Dashboard', icon: '📊' },
              { id: 'users', label: 'Users', icon: '👥' },
              { id: 'cases', label: 'Phone Cases', icon: '📱' },
              { id: 'orders', label: 'Orders', icon: '📋' }
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
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <span className="text-2xl">👥</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-semibold text-gray-800">1,234</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 text-green-600">
                  <span className="text-2xl">📱</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Phone Cases</p>
                  <p className="text-2xl font-semibold text-gray-800">{phoneCases.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                  <span className="text-2xl">📋</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-2xl font-semibold text-gray-800">567</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                  <span className="text-2xl">💰</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Revenue</p>
                  <p className="text-2xl font-semibold text-gray-800">₹45,678</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">User Management</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img className="h-10 w-10 rounded-full" src={user.picture} alt="" />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Admin
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                      <button className="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'cases' && (
          <div className="space-y-6">
            {/* Add New Phone Case Form */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Add New Phone Case</h2>
              <form onSubmit={handleAddCase} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={newCase.name}
                    onChange={(e) => setNewCase({...newCase, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                  <input
                    type="text"
                    value={newCase.color}
                    onChange={(e) => setNewCase({...newCase, color: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newCase.price}
                    onChange={(e) => setNewCase({...newCase, price: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                  <input
                    type="url"
                    value={newCase.image}
                    onChange={(e) => setNewCase({...newCase, image: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={newCase.description}
                    onChange={(e) => setNewCase({...newCase, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="md:col-span-3">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                  >
                    Add Phone Case
                  </button>
                </div>
              </form>
            </div>

            {/* Phone Cases List */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Manage Phone Cases</h2>
              {loading ? (
                <div className="text-center py-8">
                  <p className="text-gray-600">Loading phone cases...</p>
                </div>
              ) : error ? (
                <div className="text-center py-8">
                  <p className="text-red-600">{error}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {phoneCases.map((phoneCase) => (
                    <div key={phoneCase._id} className="border rounded-lg p-4">
                      <img 
                        src={phoneCase.image} 
                        alt={phoneCase.name} 
                        className="w-full h-32 object-cover rounded mb-3"
                      />
                      <h3 className="font-semibold text-gray-800 mb-2">{phoneCase.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">Color: {phoneCase.color}</p>
                      <p className="text-lg font-bold text-yellow-700 mb-2">₹{phoneCase.price}</p>
                      <p className="text-sm text-gray-600 mb-3">{phoneCase.description}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleUpdateCase(phoneCase._id, { inStock: !phoneCase.inStock })}
                          className={`px-3 py-1 rounded text-sm ${
                            phoneCase.inStock 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {phoneCase.inStock ? 'In Stock' : 'Out of Stock'}
                        </button>
                        <button
                          onClick={() => handleDeleteCase(phoneCase._id)}
                          className="px-3 py-1 bg-red-100 text-red-800 rounded text-sm hover:bg-red-200"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Management</h2>
            <div className="text-center py-8">
              <p className="text-gray-600">Order management functionality coming soon...</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Admin; 