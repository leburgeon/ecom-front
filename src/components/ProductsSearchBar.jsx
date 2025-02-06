import { useState } from 'react';
import {
  Box,
  TextField,
  Slider,
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
  const [priceRange, setPriceRange] = useState([0, 1000]);
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

        {/* Price Range Slider */}
        <Grid2 xs={12} md={4}>
          <Box>
            <Slider
              value={priceRange}
              onChange={(e, newValue) => setPriceRange(newValue)}
              valueLabelDisplay="auto"
              min={0}
              max={1000}
            />
            <Box display="flex" justifyContent="space-between" mt={1}>
              <Typography sx={{marginRight: 1}} variant="body2">Min: {priceRange[0]}</Typography>
              <Typography variant="body2">Max: {priceRange[1]}</Typography>
            </Box>
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
