import { useState } from "react";
import { useDispatch } from "react-redux";
import { incrementQuantityOfItem, removeItem, setBasketCount} from "../reducers/basketReducer";
import productService from "../services/productsService";
import { Card, CardContent, CardMedia, IconButton, Typography, Box, CircularProgress } from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";

const BasketCard = ({ item, handleNotify }) => {
  const { product, quantity } = item;
  const [isProcessing, setIsProcessing] = useState(false);
  const dispatch = useDispatch()

  const handleIncrease = async (id) => {
    if (isProcessing) return;
    setIsProcessing(true);
    try{
      const data = await productService.addProductToBasket(id, 1)
      dispatch(setBasketCount(data.basketCount))
      dispatch(incrementQuantityOfItem({id, quantity: 1}))
    } catch (error){
      handleNotify({
        message: "We are having trouble adding that item to the basket",
        severity: "info"
      })
    } finally{
      setIsProcessing(false);
    }
  };

  const handleDecrease = async (id) => {
    if (isProcessing) return;
    setIsProcessing(true);
    try{
      const data = await productService.reduceItemFromBasket(id, 1)
      dispatch(setBasketCount(data.basketCount))
      dispatch(incrementQuantityOfItem({id, quantity: -1}))
    } catch (error){
      handleNotify({
        message: "We are having trouble removing that from your basket",
        severity: "info"
      })
    } finally{
      setIsProcessing(false);
    }
  };

  const handleDelete = async (id) => {
    if (isProcessing) return;
    setIsProcessing(true);
    try{
      const data = await productService.deleteItemFromBasket(id)
      dispatch(setBasketCount(data.basketCount))
      dispatch(removeItem({id}))
    } catch (error){
      handleNotify({
        message: "We are having trouble deleting that item from the basket",
        severity: "info"
      })
    } finally{
      setIsProcessing(false);
    }
  };
  
  return (
    <Card sx={{ display: "flex", alignItems: "center", p: 1, mb: 1 }}>
      <CardMedia component="img" image={product.firstImage} alt={product.name} sx={{ width: 80, height: 80, mr: 2 }} />
      <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Typography variant="h6">{product.name}</Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton disabled={isProcessing} onClick={() => handleDecrease(product.id)}><Remove /></IconButton>
          <Typography>{isProcessing? <CircularProgress size={15}/> : quantity}</Typography>
          <IconButton disabled={isProcessing} onClick={() => handleIncrease(product.id)}><Add /></IconButton>
          <IconButton disabled={isProcessing} onClick={() => handleDelete(product.id)}><Delete /></IconButton>
        </Box>
      </CardContent>
      <Typography variant="h6" sx={{ ml: "auto", pr: 2 }}>
        £{(product.price * quantity).toFixed(2)}
      </Typography>
    </Card>
  );
};

export default BasketCard