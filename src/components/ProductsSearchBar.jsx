import { useState } from 'react';
import {
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Autocomplete,
  Typography,
  Grid2
} from '@mui/material';

const ProductSearchBar = ({ onSearch = (filters) => {console.log(filters)} }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([null, null]);
  const [inStockOnly, setInStockOnly] = useState(false);

  // Example category options
  const categoryOptions = [
    { label: 'Electronics', value: 'electronics' },
    { label: 'Clothing', value: 'clothing' },
    { label: 'Books', value: 'books' },
    { label: 'Home', value: 'home' },
  ];

  const handleSearch = () => {
    onSearch({
      query: searchQuery,
      categories: categories.map((cat) => cat.value),
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      inStockOnly,
    });
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 800,
        margin: 'auto',
        padding: 2,
      }}
    >
      <Grid2 container spacing={2} alignItems="center">
        {/* Categories Autocomplete */}
        <Grid2 xs={12} md={6} sx={{ minWidth: 200 }}>
          <Autocomplete
            multiple
            fullWidth
            options={categoryOptions}
            getOptionLabel={(option) => option.label}
            value={categories}
            onChange={(event, newValue) => setCategories(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                variant="outlined"
                label="Categories"
                placeholder="Select"
              />
            )}
          />
        </Grid2>

        {/* Price Range Inputs */}
        <Grid2 xs={12} md={4}>
          <Box display="flex" alignItems="center">
            <TextField
              label="Min Price"
              type="number"
              value={priceRange[0] !== null ? priceRange[0] : ''}
              onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
              variant="outlined"
              sx={{ marginRight: 2 }}
              InputProps={{
                startAdornment: <Typography sx={{ marginRight: 1 }}>£</Typography>,
              }}
            />
            <TextField
              label="Max Price"
              type="number"
              value={priceRange[1] !== null ? priceRange[1] : ''}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              variant="outlined"
              InputProps={{
                startAdornment: <Typography sx={{ marginRight: 1 }}>£</Typography>,
              }}
            />
          </Box>
        </Grid2>

        {/* In-Stock Only Checkbox */}
        <Grid2 xs={12} md={2}>
          <FormControlLabel
            control={
              <Checkbox
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
              />
            }
            label="In Stock"
          />
        </Grid2>

        {/* Search Query - last filter before the Search button */}
        <Grid2 xs={12} md={8}>
          <TextField
            fullWidth
            label="Search"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Grid2>

        {/* Search Button */}
        <Grid2 xs={12} md={4}>
          <Button fullWidth variant="contained" color="primary" onClick={handleSearch}>
            Search
          </Button>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default ProductSearchBar;
