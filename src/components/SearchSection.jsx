import React, { useState, useRef, useEffect } from 'react';
import filterIcon from '../photo/filter.png';

const SearchSection = ({ searchTerm, setSearchTerm, onFilterToggle, isFilterOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const searchTimeoutRef = useRef(null);
  const searchInputRef = useRef(null);

  // Default suggestions when search is empty
  const defaultSuggestions = [
    "iPhone 15 Pro cases",
    "Samsung Galaxy S24",
    "Wireless charging cases"
  ];

  // Product-based suggestions (these would come from your product database)
  const productSuggestions = [
    "Black Panther Armor",
    "Crystal Clear Case", 
    "Rugged Shield",
    "Designer Floral",
    "Carbon Fiber Elite",
    "Minimalist Matte",
    "iPhone 15 Pro Max",
    "Samsung Galaxy S24 Ultra",
    "OnePlus 12 Pro",
    "Google Pixel 8 Pro"
  ];

  // Get suggestions based on search term
  const getSuggestions = () => {
    if (!searchTerm.trim()) {
      return defaultSuggestions;
    }
    
    const searchLower = searchTerm.toLowerCase();
    const filteredSuggestions = productSuggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(searchLower)
    );
    
    // If no product matches, return default suggestions that match
    if (filteredSuggestions.length === 0) {
      return defaultSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(searchLower)
      );
    }
    
    return filteredSuggestions;
  };

  const suggestions = getSuggestions();

  const menuItems = [
    { name: "Home", href: "#" },
    { name: "All Cases", href: "#" },
    { name: "Trending", href: "#" },
    { name: "Offers", href: "#" },
    { name: "Orders", href: "#" }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setShowSearchDropdown(false);
    // Focus remains on input for better UX
  };

  const handleSearchFocus = () => {
    setShowSearchDropdown(true);
  };

  const handleSearchBlur = () => {
    searchTimeoutRef.current = setTimeout(() => {
      setShowSearchDropdown(false);
    }, 200);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setShowSearchDropdown(false);
    // Focus back to input for better UX
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSearchDropdown(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setShowSearchDropdown(false);
      searchInputRef.current?.blur();
    }
  };

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close menu if clicked outside
      if (isMenuOpen && !event.target.closest('.menu-container')) {
        setIsMenuOpen(false);
      }
      
      // Close search dropdown if clicked outside
      if (showSearchDropdown && !event.target.closest('.search-container')) {
        setShowSearchDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen, showSearchDropdown]);

  return (
    <section className="bg-white border-b border-gray-200 py-6 px-4 relative">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4 relative">
          {/* Filter Icon for mobile (next to/below search) */}
          <div className="flex items-center mb-2 lg:hidden">
            <button
              onClick={onFilterToggle}
              className={`p-2 rounded-lg border ${isFilterOpen ? 'bg-cyan-100 border-cyan-300' : 'bg-gray-100 border-gray-200'} mr-2`}
              aria-label="Show filters"
            >
              <img src={filterIcon} alt="Filter" className="w-6 h-6" />
            </button>
            <span className="text-sm text-gray-500">Filters</span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 relative search-container">
            <form onSubmit={handleSearch}>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search for iPhone, Samsung cases..."
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                onKeyDown={handleKeyDown}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
            
            {/* Enhanced Search Dropdown */}
            {showSearchDropdown && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-64 overflow-y-auto">
                {/* Search Results Header */}
                <div className="px-4 py-2 bg-gray-50 border-b border-gray-100 rounded-t-lg">
                  <span className="text-sm font-medium text-gray-700">
                    {!searchTerm.trim() ? 'Popular Searches' : 'Search Results'}
                  </span>
                </div>
                
                {/* Suggestions List */}
                <div className="py-1">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full px-4 py-3 text-left hover:bg-yellow-50 hover:text-gray-900 transition-all duration-150 border-b border-gray-100 last:border-b-0 group"
                    >
                      <div className="flex items-center">
                        {/* Search Icon */}
                        <svg 
                          className="w-4 h-4 text-gray-400 mr-3 group-hover:text-yellow-500 transition-colors" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        
                        {/* Suggestion Text */}
                        <span className="text-gray-700 group-hover:text-gray-900">
                          {suggestion}
                        </span>
                        
                        {/* Highlight matching text if searching */}
                        {searchTerm.trim() && (
                          <span className="ml-auto text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                            Match
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
                
                {/* Footer */}
                <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 rounded-b-lg">
                  <span className="text-xs text-gray-500">
                    Press Enter to search or click a suggestion
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Filter Icon for desktop (fixed top-left) */}
          <div className="hidden lg:block absolute left-0 top-0 -translate-x-16">
            <button
              onClick={onFilterToggle}
              className={`p-2 rounded-lg border ${isFilterOpen ? 'bg-cyan-100 border-cyan-300' : 'bg-gray-100 border-gray-200'}`}
              aria-label="Show filters"
            >
              <img src={filterIcon} alt="Filter" className="w-7 h-7" />
            </button>
          </div>

          <div className="lg:hidden mb-4 relative menu-container">
            <button
              onClick={toggleMenu}
              className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            {isMenuOpen && (
              <div className="absolute left-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <nav className="py-2">
                  {menuItems.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="block px-4 py-2 text-gray-700 hover:bg-yellow-50 hover:text-gray-900 transition-colors first:rounded-t-lg last:rounded-b-lg"
                    >
                      {item.name}
                    </a>
                  ))}
                </nav>
              </div>
            )}
          </div>

          <div className="hidden lg:block relative menu-container">
            <button
              onClick={toggleMenu}
              className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <nav className="py-2">
                  {menuItems.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="block px-4 py-2 text-gray-700 hover:bg-yellow-50 hover:text-gray-900 transition-colors first:rounded-t-lg last:rounded-b-lg"
                    >
                      {item.name}
                    </a>
                  ))}
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection; 