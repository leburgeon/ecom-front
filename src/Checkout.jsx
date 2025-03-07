import { Container, Typography, Card, CardContent, List, ListItem, ListItemText, Divider, Button, Paper, Box } from "@mui/material";
import { PayPalButtons } from "@paypal/react-paypal-js";
import paypalService from "./services/paypalService";
import { useDispatch, useSelector } from "react-redux";
import { notify } from "./reducers/notificationReducer";
import { Navigate } from "react-router-dom";

const Checkout = () => {
  const dispatch = useDispatch();
  const checkout = useSelector((store) => store.checkout);

  if (!checkout || checkout.basket.length === 0) {
    return <Navigate to='/basket'/>
  }

  const dispatchNotify = (obj) => {
    dispatch(notify(obj));
  };

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
            createOrder={() => paypalService.createOrder(checkout.basket, dispatchNotify)}
            onApprove={(data, actions) => paypalService.onApprove(data, actions, dispatchNotify)}
            style={{ shape: "pill", layout: "vertical", color: "blue", label: "pay" }}
          />
        </Box>
      </Paper>
    </Container>
  );
};

export default Checkout;
