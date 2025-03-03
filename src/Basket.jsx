import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBasketCount, setBasketItems } from "./reducers/basketReducer";
import productService from "./services/productsService";
import { Card, CardContent, CardMedia, IconButton, Typography, Box, Paper } from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";

const BasketCard = ({ item, onIncrease, onDecrease, onDelete, isProcessing }) => {
  const { product, quantity } = item;
  
  return (
    <Card sx={{ display: "flex", alignItems: "center", p: 1, mb: 1 }}>
      <CardMedia component="img" image={product.firstImage} alt={product.name} sx={{ width: 80, height: 80, mr: 2 }} />
      <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Typography variant="h6">{product.name}</Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton disabled={isProcessing} onClick={() => onDecrease(product._id)}><Remove /></IconButton>
          <Typography>{quantity}</Typography>
          <IconButton disabled={isProcessing} onClick={() => onIncrease(product._id)}><Add /></IconButton>
          <IconButton disabled={isProcessing} onClick={() => onDelete(product._id)}><Delete /></IconButton>
        </Box>
      </CardContent>
      <Typography variant="h6" sx={{ ml: "auto", pr: 2 }}>
        £{(product.price * quantity).toFixed(2)}
      </Typography>
    </Card>
  );
};

const Basket = () => {
  const dispatch = useDispatch();
  const basketItems = useSelector((store) => store.basket.items);
  const [isProcessing, setIsProcessing] = useState(false);

  const fetchBasket = async () => {
    const { basket } = await productService.getBasket();
    dispatch(setBasketItems(basket));
    dispatch(setBasketCount(basket.length))
  };

  useEffect(() => {
    fetchBasket();
  }, []);

  const handleIncrease = async (id) => {
    if (isProcessing) return;
    setIsProcessing(true);
    // Placeholder function
    setIsProcessing(false);
  };

  const handleDecrease = async (id) => {
    if (isProcessing) return;
    setIsProcessing(true);
    // Placeholder function
    setIsProcessing(false);
  };

  const handleDelete = async (id) => {
    if (isProcessing) return;
    setIsProcessing(true);
    // Placeholder function
    setIsProcessing(false);
  };

  const totalCost = basketItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0).toFixed(2);

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>Basket</Typography>
      {basketItems.map((item) => (
        <BasketCard
          key={item.product.id}
          item={item}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
          onDelete={handleDelete}
          isProcessing={isProcessing}
        />
      ))}
      <Typography variant="h5" sx={{ mt: 2 }}>Total: £{totalCost}</Typography>
    </Paper>
  );
};

export default Basket;
