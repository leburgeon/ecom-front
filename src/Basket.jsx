import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBasketCount, setBasketItems } from "./reducers/basketReducer";
import productService from "./services/productsService";
import { Typography, Paper, LinearProgress, Button } from "@mui/material";
import BasketCard from "./components/BasketCard";
import { logout } from './reducers/userReducer'
import { notify } from "./reducers/notificationReducer";
import checkoutService from './services/checkoutService'

const Basket = () => {
  const dispatch = useDispatch();
  const basketItems = useSelector((store) => store.basket.items);
  const [loading, setLoading] = useState(true);

  const fetchBasket = async () => {
    try {
      const { basket } = await productService.getBasket();
      if (basket) {
        dispatch(setBasketItems(basket));
        dispatch(setBasketCount(basket.length));
      }
    } catch (error) {
      let errorMessage = 'Error fetching orders:';
      if (error.response.status === 401) {
        dispatch(logout());
        errorMessage += 'Authentication token expired, please re-login';
      }
      dispatch(notify({
        message: `${errorMessage}`,
        severity: 'info'
      }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBasket();
  }, []);

  if (loading) {
    return (<LinearProgress></LinearProgress>);
  }

  const handleCheckout = async () => {
    // try {
    //   const data = await checkoutService.checkout()
    // }
  }

  const totalCost = basketItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0).toFixed(2);

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>Your Basket</Typography>
      {basketItems.length === 0 ? (
        <Typography variant="body1">No items in basket</Typography>
      ) : (
        <>
          {basketItems.map((item) => (
            <BasketCard
              key={item.product.id}
              item={item}
            />
          ))}
          <Typography variant="h5" sx={{ mt: 2 }}>Total: £{totalCost}</Typography>
          <Button variant="contained">Checkout</Button>
        </>
      )}
    </Paper>
  );
};

export default Basket;
