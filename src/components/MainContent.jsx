import React, { useState } from 'react';

// Import local images for Black Panther Armor
import blackImg from '../photo/black.jpeg';
import redImg from '../photo/red.jpeg';
import blueImg from '../photo/blue.jpeg';

const filters = {
  price: [
    { label: 'Under ₹500', value: 'under-500' },
    { label: '₹500 - ₹999', value: '500-999' },
    { label: '₹1000 & Above', value: '1000-above' },
  ],
  brand: [
    { label: 'Apple', value: 'apple' },
    { label: 'Samsung', value: 'samsung' },
    { label: 'OnePlus', value: 'oneplus' },
    { label: 'Google', value: 'google' },
  ],
  type: [
    { label: 'Transparent', value: 'transparent' },
    { label: 'Rugged', value: 'rugged' },
    { label: 'Designer', value: 'designer' },
  ],
  model: [
    { label: 'iPhone 15', value: 'iphone-15' },
    { label: 'Galaxy S24', value: 'galaxy-s24' },
    { label: 'OnePlus 12', value: 'oneplus-12' },
    { label: 'Pixel 8', value: 'pixel-8' },
  ],
};

const products = [
  {
    name: 'Black Panther Armor',
    images: {
      black: blackImg,
      red: redImg,
      blue: blueImg,
    },
    colors: ['black', 'red', 'blue'],
    price: { black: 599, red: 649, blue: 699 },
    brand: 'apple',
    type: 'rugged',
    model: 'iphone-15',
  },
  {
    name: 'Crystal Clear Case',
    images: {
      transparent: 'https://via.placeholder.com/160x200/eee/222?text=Clear',
      blue: 'https://via.placeholder.com/160x200/09f/fff?text=Blue',
    },
    colors: ['transparent', 'blue'],
    price: { transparent: 499, blue: 549 },
    brand: 'apple',
    type: 'transparent',
    model: 'iphone-15',
  },
  {
    name: 'Rugged Shield',
    images: {
      green: 'https://via.placeholder.com/160x200/393/fff?text=Green',
      black: 'https://via.placeholder.com/160x200/222/fff?text=Black',
    },
    colors: ['green', 'black'],
    price: { green: 799, black: 749 },
    brand: 'samsung',
    type: 'rugged',
    model: 'galaxy-s24',
  },
  {
    name: 'Designer Floral',
    images: {
      pink: 'https://via.placeholder.com/160x200/f9c/fff?text=Pink',
      yellow: 'https://via.placeholder.com/160x200/ff9/222?text=Yellow',
    },
    colors: ['pink', 'yellow'],
    price: { pink: 699, yellow: 699 },
    brand: 'apple',
    type: 'designer',
    model: 'iphone-15',
  },
  {
    name: 'Carbon Fiber Elite',
    images: {
      black: 'https://via.placeholder.com/160x200/222/fff?text=Black',
      gray: 'https://via.placeholder.com/160x200/888/fff?text=Gray',
    },
    colors: ['black', 'gray'],
    price: { black: 999, gray: 999 },
    brand: 'oneplus',
    type: 'rugged',
    model: 'oneplus-12',
  },
  {
    name: 'Minimalist Matte',
    images: {
      white: 'https://via.placeholder.com/160x200/fff/222?text=White',
      blue: 'https://via.placeholder.com/160x200/09f/fff?text=Blue',
    },
    colors: ['white', 'blue'],
    price: { white: 599, blue: 649 },
    brand: 'google',
    type: 'transparent',
    model: 'pixel-8',
  },
  {
    name: 'iPhone 15 Pro Max Case',
    images: {
      black: 'https://via.placeholder.com/160x200/222/fff?text=iPhone+15',
      blue: 'https://via.placeholder.com/160x200/09f/fff?text=iPhone+15',
    },
    colors: ['black', 'blue'],
    price: { black: 899, blue: 949 },
    brand: 'apple',
    type: 'rugged',
    model: 'iphone-15',
  },
  {
    name: 'Samsung Galaxy S24 Ultra Shield',
    images: {
      green: 'https://via.placeholder.com/160x200/393/fff?text=Galaxy+S24',
      black: 'https://via.placeholder.com/160x200/222/fff?text=Galaxy+S24',
    },
    colors: ['green', 'black'],
    price: { green: 849, black: 799 },
    brand: 'samsung',
    type: 'rugged',
    model: 'galaxy-s24',
  },
  {
    name: 'Wireless Charging Case',
    images: {
      transparent: 'https://via.placeholder.com/160x200/eee/222?text=Wireless',
      black: 'https://via.placeholder.com/160x200/222/fff?text=Wireless',
    },
    colors: ['transparent', 'black'],
    price: { transparent: 699, black: 749 },
    brand: 'apple',
    type: 'transparent',
    model: 'iphone-15',
  },
  {
    name: 'OnePlus 12 Pro Shield',
    images: {
      black: 'https://via.placeholder.com/160x200/222/fff?text=OnePlus+12',
      red: 'https://via.placeholder.com/160x200/ff0000/fff?text=OnePlus+12',
    },
    colors: ['black', 'red'],
    price: { black: 899, red: 949 },
    brand: 'oneplus',
    type: 'rugged',
    model: 'oneplus-12',
  },
  {
    name: 'Google Pixel 8 Pro Clear',
    images: {
      transparent: 'https://via.placeholder.com/160x200/eee/222?text=Pixel+8',
      white: 'https://via.placeholder.com/160x200/fff/222?text=Pixel+8',
    },
    colors: ['transparent', 'white'],
    price: { transparent: 599, white: 649 },
    brand: 'google',
    type: 'transparent',
    model: 'pixel-8',
  },
  {
    name: 'Samsung Galaxy S24 Designer',
    images: {
      pink: 'https://via.placeholder.com/160x200/f9c/fff?text=Galaxy+S24',
      purple: 'https://via.placeholder.com/160x200/93f/fff?text=Galaxy+S24',
    },
    colors: ['pink', 'purple'],
    price: { pink: 799, purple: 849 },
    brand: 'samsung',
    type: 'designer',
    model: 'galaxy-s24',
  },
  {
    name: 'iPhone 15 Ultra Premium',
    images: {
      gold: 'https://via.placeholder.com/160x200/ffd700/222?text=iPhone+15',
      silver: 'https://via.placeholder.com/160x200/c0c0c0/222?text=iPhone+15',
    },
    colors: ['gold', 'silver'],
    price: { gold: 1299, silver: 1199 },
    brand: 'apple',
    type: 'designer',
    model: 'iphone-15',
  },
];

const colorMap = {
  black: 'bg-gray-900',
  red: 'bg-red-600',
  blue: 'bg-blue-500',
  transparent: 'bg-gray-200 border border-gray-400',
  green: 'bg-green-700',
  pink: 'bg-pink-400',
  yellow: 'bg-yellow-300',
  gray: 'bg-gray-400',
  white: 'bg-white border border-gray-300',
  gold: 'bg-yellow-400',
  silver: 'bg-gray-300',
  purple: 'bg-purple-500',
};

const MainContent = ({ addToCart, searchTerm, isFilterOpen, setIsFilterOpen }) => {
  const [selectedColors, setSelectedColors] = useState(
    products.map((p) => p.colors[0])
  );

  // Filter state management
  const [selectedFilters, setSelectedFilters] = useState({
    price: [],
    brand: [],
    type: [],
    model: [],
  });

  const handleColorSelect = (productIdx, color) => {
    setSelectedColors((prev) => {
      const updated = [...prev];
      updated[productIdx] = color;
      return updated;
    });
  };

  // Filter handling functions
  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prev) => {
      const currentFilters = prev[filterType];
      const isSelected = currentFilters.includes(value);
      
      if (isSelected) {
        // Remove filter
        return {
          ...prev,
          [filterType]: currentFilters.filter((filter) => filter !== value),
        };
      } else {
        // Add filter
        return {
          ...prev,
          [filterType]: [...currentFilters, value],
        };
      }
    });
  };

  // Price range validation function
  const isPriceInRange = (price, selectedPriceRanges) => {
    if (selectedPriceRanges.length === 0) return true;
    
    return selectedPriceRanges.some((range) => {
      switch (range) {
        case 'under-500':
          return price < 500;
        case '500-999':
          return price >= 500 && price <= 999;
        case '1000-above':
          return price >= 1000;
        default:
          return false;
      }
    });
  };

  // Enhanced filtering logic that combines search and filters
  const filteredProducts = products.filter((product) => {
    // Search filtering
    let matchesSearch = true;
    if (searchTerm.trim()) {
    const searchLower = searchTerm.toLowerCase();
    const productName = product.name.toLowerCase();
    
    // Direct name match
      const nameMatch = productName.includes(searchLower);
    
    // Check for device model matches
    const deviceModels = ['iphone', 'samsung', 'galaxy', 'oneplus', 'pixel', 'google'];
    const hasDeviceMatch = deviceModels.some(model => 
      searchLower.includes(model) && productName.includes(model)
    );
    
    // Check for case type matches
    const caseTypes = ['clear', 'transparent', 'rugged', 'designer', 'carbon', 'minimalist', 'matte'];
    const hasTypeMatch = caseTypes.some(type => 
      searchLower.includes(type) && productName.includes(type)
    );
    
    // Check for color matches
    const colors = ['black', 'red', 'blue', 'green', 'pink', 'yellow', 'gray', 'white'];
    const hasColorMatch = colors.some(color => 
      searchLower.includes(color) && product.colors.includes(color)
    );
    
    // Check for special features
    const features = ['wireless', 'charging', 'armor', 'shield', 'elite', 'floral'];
    const hasFeatureMatch = features.some(feature => 
      searchLower.includes(feature) && productName.includes(feature)
    );
      
      matchesSearch = nameMatch || hasDeviceMatch || hasTypeMatch || hasColorMatch || hasFeatureMatch;
    }

    // Filter validation
    const matchesBrand = selectedFilters.brand.length === 0 || selectedFilters.brand.includes(product.brand);
    const matchesType = selectedFilters.type.length === 0 || selectedFilters.type.includes(product.type);
    const matchesModel = selectedFilters.model.length === 0 || selectedFilters.model.includes(product.model);
    
    // Price filtering - check if any color variant matches the price range
    const matchesPrice = selectedFilters.price.length === 0 || 
      Object.values(product.price).some(price => isPriceInRange(price, selectedFilters.price));

    return matchesSearch && matchesBrand && matchesType && matchesModel && matchesPrice;
  });

  return (
    <section className="max-w-7xl mx-auto px-2 md:px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filter Sidebar */}
        {isFilterOpen && (
          <>
            {/* Mobile overlay */}
            <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30" onClick={() => setIsFilterOpen(false)} />
            
          <aside className="md:w-64 w-full bg-white rounded-lg shadow-sm p-4 mb-4 md:mb-0 border border-gray-100 z-40 fixed md:static top-20 left-0 md:top-auto md:left-auto md:relative max-h-[80vh] overflow-y-auto transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800">Filters</h2>
                <div className="flex items-center gap-2">
                  {/* Total active filters count */}
                  {Object.values(selectedFilters).reduce((sum, filters) => sum + filters.length, 0) > 0 && (
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
                      {Object.values(selectedFilters).reduce((sum, filters) => sum + filters.length, 0)} active
                    </span>
                  )}
                  {/* Mobile close button */}
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="md:hidden p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Close filters"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
            {/* Price Range */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Price Range</h3>
                  {selectedFilters.price.length > 0 && (
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                      {selectedFilters.price.length}
                    </span>
                  )}
                </div>
              {filters.price.map((item) => (
                  <label key={item.value} className="flex items-center mb-1 cursor-pointer hover:bg-gray-50 p-1 rounded transition-colors">
                    <input 
                      type="checkbox" 
                      className="form-checkbox accent-yellow-500 mr-2" 
                      checked={selectedFilters.price.includes(item.value)}
                      onChange={() => handleFilterChange('price', item.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleFilterChange('price', item.value);
                        }
                      }}
                    />
                  <span className="text-gray-700 text-sm">{item.label}</span>
                </label>
              ))}
            </div>
              
            {/* Brand */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Brand</h3>
                  {selectedFilters.brand.length > 0 && (
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                      {selectedFilters.brand.length}
                    </span>
                  )}
                </div>
              {filters.brand.map((item) => (
                  <label key={item.value} className="flex items-center mb-1 cursor-pointer hover:bg-gray-50 p-1 rounded transition-colors">
                    <input 
                      type="checkbox" 
                      className="form-checkbox accent-yellow-500 mr-2" 
                      checked={selectedFilters.brand.includes(item.value)}
                      onChange={() => handleFilterChange('brand', item.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleFilterChange('brand', item.value);
                        }
                      }}
                    />
                  <span className="text-gray-700 text-sm">{item.label}</span>
                </label>
              ))}
            </div>
              
            {/* Case Type */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Case Type</h3>
                  {selectedFilters.type.length > 0 && (
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                      {selectedFilters.type.length}
                    </span>
                  )}
                </div>
              {filters.type.map((item) => (
                  <label key={item.value} className="flex items-center mb-1 cursor-pointer hover:bg-gray-50 p-1 rounded transition-colors">
                    <input 
                      type="checkbox" 
                      className="form-checkbox accent-yellow-500 mr-2" 
                      checked={selectedFilters.type.includes(item.value)}
                      onChange={() => handleFilterChange('type', item.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleFilterChange('type', item.value);
                        }
                      }}
                    />
                  <span className="text-gray-700 text-sm">{item.label}</span>
                </label>
              ))}
            </div>
              
            {/* Device Model */}
            <div className="mb-2">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Device Model</h3>
                  {selectedFilters.model.length > 0 && (
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                      {selectedFilters.model.length}
                    </span>
                  )}
                </div>
              {filters.model.map((item) => (
                  <label key={item.value} className="flex items-center mb-1 cursor-pointer hover:bg-gray-50 p-1 rounded transition-colors">
                    <input 
                      type="checkbox" 
                      className="form-checkbox accent-yellow-500 mr-2" 
                      checked={selectedFilters.model.includes(item.value)}
                      onChange={() => handleFilterChange('model', item.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleFilterChange('model', item.value);
                        }
                      }}
                    />
                  <span className="text-gray-700 text-sm">{item.label}</span>
                </label>
              ))}
            </div>

              {/* Clear Filters Button */}
              {(selectedFilters.price.length > 0 || selectedFilters.brand.length > 0 || 
                selectedFilters.type.length > 0 || selectedFilters.model.length > 0) && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => setSelectedFilters({ price: [], brand: [], type: [], model: [] })}
                    className="w-full px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
          </aside>
          </>
        )}
        
        {/* Product Grid */}
        <div className="flex-1">
          {/* Active Filter Tags */}
          {Object.values(selectedFilters).some(filters => filters.length > 0) && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {selectedFilters.price.map((priceFilter) => {
                  const filterItem = filters.price.find(item => item.value === priceFilter);
                  return (
                    <span
                      key={`price-${priceFilter}`}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full"
                    >
                      <span>Price: {filterItem?.label}</span>
                      <button
                        onClick={() => handleFilterChange('price', priceFilter)}
                        className="ml-1 text-yellow-600 hover:text-yellow-800"
                      >
                        ×
                      </button>
                    </span>
                  );
                })}
                {selectedFilters.brand.map((brandFilter) => {
                  const filterItem = filters.brand.find(item => item.value === brandFilter);
                  return (
                    <span
                      key={`brand-${brandFilter}`}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      <span>Brand: {filterItem?.label}</span>
                      <button
                        onClick={() => handleFilterChange('brand', brandFilter)}
                        className="ml-1 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  );
                })}
                {selectedFilters.type.map((typeFilter) => {
                  const filterItem = filters.type.find(item => item.value === typeFilter);
                  return (
                    <span
                      key={`type-${typeFilter}`}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                    >
                      <span>Type: {filterItem?.label}</span>
                      <button
                        onClick={() => handleFilterChange('type', typeFilter)}
                        className="ml-1 text-green-600 hover:text-green-800"
                      >
                        ×
                      </button>
                    </span>
                  );
                })}
                {selectedFilters.model.map((modelFilter) => {
                  const filterItem = filters.model.find(item => item.value === modelFilter);
                  return (
                    <span
                      key={`model-${modelFilter}`}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full"
                    >
                      <span>Model: {filterItem?.label}</span>
                      <button
                        onClick={() => handleFilterChange('model', modelFilter)}
                        className="ml-1 text-purple-600 hover:text-purple-800"
                      >
                        ×
                      </button>
                    </span>
                  );
                })}
                <button
                  onClick={() => setSelectedFilters({ price: [], brand: [], type: [], model: [] })}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors"
                >
                  Clear All
                </button>
              </div>
            </div>
          )}
          
          {/* Results Summary */}
          {filteredProducts.length > 0 && (
            <div className="mb-4 text-sm text-gray-600">
              Showing {filteredProducts.length} of {products.length} products
              {(selectedFilters.price.length > 0 || selectedFilters.brand.length > 0 || 
                selectedFilters.type.length > 0 || selectedFilters.model.length > 0) && (
                <span className="ml-2">
                  (filtered)
                </span>
              )}
            </div>
          )}
          
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, idx) => (
                <div key={product.name} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center border border-gray-100">
                  <img
                    src={product.images[selectedColors[idx]]}
                    alt={product.name}
                    className="w-32 h-40 object-cover rounded mb-3 border border-gray-200 bg-gray-50"
                  />
                  <h3 className="font-semibold text-gray-800 text-lg mb-2 text-center">{product.name}</h3>
                  {/* Color Selector */}
                  <div className="flex space-x-2 mb-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => handleColorSelect(idx, color)}
                        className={`w-6 h-6 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-150 ${colorMap[color]} ${selectedColors[idx] === color ? 'ring-2 ring-yellow-500 border-yellow-500' : 'border-gray-300'}`}
                        aria-label={color}
                      />
                    ))}
                  </div>
                  {/* Price */}
                  <div className="text-yellow-700 font-bold text-base mb-1">₹{product.price[selectedColors[idx]]}</div>
                  <button
                    className="mt-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded shadow-sm transition-colors"
                    onClick={() => addToCart({
                      name: product.name,
                      color: selectedColors[idx],
                      price: product.price[selectedColors[idx]],
                    })}
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          ) : searchTerm.trim() || Object.values(selectedFilters).some(filters => filters.length > 0) ? (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm.trim() 
                    ? `We couldn't find any products matching "${searchTerm}" with the selected filters.`
                    : "No products match the selected filters."
                  }
                </p>
                <div className="text-sm text-gray-400">
                  <p className="mb-2">Try adjusting your filters or search terms:</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {['iPhone 15 Pro cases', 'Samsung Galaxy S24', 'Wireless charging cases'].map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => window.location.href = `?search=${encodeURIComponent(suggestion)}`}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default MainContent; 