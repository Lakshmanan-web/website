
```javascript
const [selectedFilters, setSelectedFilters] = useState({
  price: [],
  brand: [],
  type: [],
  model: [],
});
```

### Filter Logic
```javascript
const filteredProducts = products.filter((product) => {
  // Search filtering
  let matchesSearch = true;
  if (searchTerm.trim()) {
    // Enhanced search logic
  }

  // Filter validation
  const matchesBrand = selectedFilters.brand.length === 0 || selectedFilters.brand.includes(product.brand);
  const matchesType = selectedFilters.type.length === 0 || selectedFilters.type.includes(product.type);
  const matchesModel = selectedFilters.model.length === 0 || selectedFilters.model.includes(product.model);
  const matchesPrice = selectedFilters.price.length === 0 || 
    Object.values(product.price).some(price => isPriceInRange(price, selectedFilters.price));

  return matchesSearch && matchesBrand && matchesType && matchesModel && matchesPrice;
});
```


Each product includes filter metadata:
```javascript
{
  name: 'Product Name',
  images: { /* color variants */ },
  colors: ['black', 'red', 'blue'],
  price: { black: 599, red: 649, blue: 699 },
  brand: 'apple',
  type: 'rugged',
  model: 'iphone-15',
}
