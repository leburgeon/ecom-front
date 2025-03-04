import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Typography, Card, CardContent, CircularProgress, List, ListItem, ListItemText, LinearProgress } from "@mui/material";
import { logout } from './reducers/userReducer'
import { notify } from './reducers/notificationReducer'
import orderService from './services/orderService'

const AccountPage = () => {
  
  const { name, email } = useSelector((store) => store.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await orderService.getOrdersForUser()
        setOrders(data);
      } catch (error) {
        let errorMessage = 'Error fetching orders:'
        if (error.response.status === 401){
          dispatch(logout())
          errorMessage += 'Authentication token expired, please re-login'
        }
        dispatch(notify({
          message: `${errorMessage}`,
          severity: 'info'
        }))
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading){
    return (<LinearProgress></LinearProgress>)
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Account
          </Typography>
          <Typography variant="body1"><strong>Name:</strong> {name}</Typography>
          <Typography variant="body1"><strong>Email:</strong> {email}</Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => dispatch(logout())} 
            sx={{ mt: 2 }}
          >
            Logout
          </Button>
          <Typography variant="h6" sx={{ mt: 2 }}>Previous Orders</Typography>
          {loading ? (
            <CircularProgress sx={{ mt: 2 }} />
          ) : orders.length > 0 ? (
            <List>
              {orders.map((order, index) => (
                <ListItem key={index}>
                  <ListItemText primary={`Order #${order.id}`} secondary={order.date} />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography>No previous orders.</Typography>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}

export default AccountPage