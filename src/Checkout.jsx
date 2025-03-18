import { Container, Typography, Card, CardContent, List, ListItem, ListItemText, Divider, Paper, Box } from "@mui/material";
import { PayPalButtons } from "@paypal/react-paypal-js";
import paypalService from "./services/paypalService";
import { useDispatch, useSelector } from "react-redux";
import { notify } from "./reducers/notificationReducer";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { resetBasket } from "./reducers/basketReducer";



const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const checkout = useSelector((store) => store.checkout);
  const [tempOrderId, setTempOrderId] = useState(null)

  if (!checkout || checkout.basket.length === 0) {
    return <Navigate to='/basket'/>
  }

  const dispatchNotify = (obj) => {
    dispatch(notify(obj));
  };

  const handleSuccess = (orderNumber) => {
    setTempOrderId(null)
    dispatch(resetBasket())
    dispatch(notify({
      message:'Order complete! Thank you for your order!',
      severity: 'success'
    }))
    navigate(`/success/${orderNumber}`)
  }


  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom align="center">
          Checkout
        </Typography>
        <Card>
          <CardContent>
            <List>
              {checkout.basket.map(({ product, quantity }) => (
                <ListItem key={product.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <ListItemText
                    primary={product.name}
                    secondary={`Quantity: ${quantity} - £${product.price.toFixed(2)}`}
                  />
                  <Typography variant="body1">
                    £{(product.price * quantity).toFixed(2)}
                  </Typography>
                </ListItem>
              ))}
              <Divider />
              <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <ListItemText
                  primary="Total:"
                  primaryTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}
                />
                <Typography variant="h5">
                  £{checkout.totalPrice.toFixed(2)}
                </Typography>
              </ListItem>
            </List>
          </CardContent>
        </Card>
        <Box sx={{ mt: 3 }}>
          <PayPalButtons
            debug={true}
            createOrder={async () => {
              const id = await paypalService.createOrder(checkout.basket, dispatchNotify)
              setTempOrderId(id)
              return id
            }}
            onApprove={async (data, actions) => {
              await paypalService.onApprove(data, actions, dispatchNotify, handleSuccess)
            }}
            onError={(err) => {
              console.error("PayPal SDK Error:", err)
              if (tempOrderId){
                paypalService.handleRelease(tempOrderId)
              }
            }}
            onCancel={(data) => {
              console.warn("Payment cancelled:", data)
              paypalService.handleRelease(data.orderId)
            }}
            onClick={() => console.log("PayPal button clicked")}
            style={{ shape: "pill", layout: "vertical", color: "blue", label: "pay" }}
          />
        </Box>
      </Paper>
    </Container>
  );
};

export default Checkout;
