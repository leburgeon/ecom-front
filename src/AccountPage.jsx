import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Typography, Card, CardContent, List, ListItem, ListItemText, LinearProgress, Collapse, IconButton, Paper } from "@mui/material";
import { ExpandMore, ExpandLess } from '@mui/icons-material'; // New icons for expanding/collapsing
import { logout } from './reducers/userReducer';
import { notify } from './reducers/notificationReducer';
import orderService from './services/orderService';

const AccountPage = () => {
  
  const { name, email } = useSelector((store) => store.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openOrders, setOpenOrders] = useState(false);  // State to control collapse of orders section

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await orderService.getOrdersForUser()
        const ordersSorted = data.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
        setOrders(ordersSorted)
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

  const handleToggle = () => {
    setOpenOrders(prevState => !prevState);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
            Account
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            <strong>Name:</strong> {name}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            <strong>Email:</strong> {email}
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => dispatch(logout())} 
            sx={{ mt: 3, width: '100%' }}
          >
            Logout
          </Button>
          <div>
            {orders.length > 0 ? (
              <Card sx={{ mt: 4, boxShadow: 2, borderRadius: 2 }}>
                <CardContent>
                  <div
                    onClick={handleToggle}
                    style={{
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '8px 0',
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Your Orders</Typography>
                    <IconButton>
                      {openOrders ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                  </div>
                  <Collapse in={openOrders} timeout="auto" unmountOnExit>
                    <List sx={{ mt: 2 }}>
                      {orders.map(({ id, items, orderNumber, status, totalCost, createdAt }) => (
                        <Paper elevation={3} sx={{ mb: 2, p: 2, borderRadius: 2 }} key={id}>
                          <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                            <List sx={{ mt: 1, width: '100%' }}>
                              {items.map(({ name, price, quantity }) => (
                                <ListItem key={`${id}-${name}`} sx={{ pl: 2 }}>
                                  <ListItemText
                                    primary={`${name} (x${quantity})`}
                                    secondary={`$${price}`}
                                  />
                                </ListItem>
                              ))}
                            </List>
                            <Typography variant="body1" sx={{ mt: 2 }}>
                              <strong>Total:</strong> ${totalCost.value}
                            </Typography>
                            <Typography variant="body1" sx={{ mt: 1 }}>
                              <strong>Status:</strong> {status === 'PAID' ? 'Ready to dispatch' : status}
                            </Typography>
                            <Typography variant="body1" sx={{ mt: 1 }}>
                              <strong>Order Number:</strong> {orderNumber}
                            </Typography>
                          </ListItem>
                        </Paper>
                      ))}
                    </List>
                  </Collapse>
                </CardContent>
              </Card>
            ) : (
              <Typography sx={{ mt: 4, textAlign: 'center', color: 'text.secondary' }}>
                No previous orders.
              </Typography>
            )}
          </div>
        </CardContent>
      </Card>
    </Container>
  );
}

export default AccountPage