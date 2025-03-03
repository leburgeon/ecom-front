import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Collapse,
  Card,
  CardMedia,
  Grid,
  Box,
  Rating,
  Tooltip,
} from "@mui/material";
import productService from "../services/productsService";
import { useDispatch, useSelector } from "react-redux";
import {notify} from '../reducers/notificationReducer'
import productsService from "../services/productsService";
import { setBasketCount } from '../reducers/basketReducer'
import { logout } from "../reducers/userReducer";

const SingleProductPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const params = useParams();
  const id = params.id;
  const [product, setProduct] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [descExpanded, setDescExpanded] = useState(false);
  const user = useSelector(store => store.user)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await productService.getProduct(id);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching single product", error);
        setNotFound(true);
      }
    };
    fetchProduct();
  }, [id]);

  if (notFound) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          404... We couldn't find that product, please try again.
        </Typography>
        <Button variant="contained" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  // Compute the average rating (if count is 0, average is 0)
  const averageRating =
    product.rating.count > 0 ? product.rating.total / product.rating.count : 0;

  const handleAddToBasket = async () => {
    // Logic to add the product to the basket
    if (!user){
      navigate('/login')
      dispatch(notify({
        message: 'Please login to add items to your basket',
        severity: 'info'
      }))
    } else {
      try {
        const data = await productsService.addProductToBasket(product.id, 1)
        console.log('Product added to basket! Now in basket:' + data.basketCount + ' unique items')
        dispatch(setBasketCount(data.basketCount))
      } catch (error){
        let notificationMessage = 'Error adding that to the basket! '
        if (error.response?.data?.error === "TokenExpiredError:jwt expired"){
          dispatch(logout())
          navigate('/login')
          notificationMessage += 'Session expired, please re-login!'
        }
        dispatch(notify({
          message: notificationMessage,
          severity: 'info'
        }))
        console.error(error)
      }
    }
    
  };

  return (
    <Container sx={{ my: 4 }}>
      {/* Product Name */}
      <Typography variant="h4" component="h1" gutterBottom>
        {product.name}
      </Typography>

      {/* First Image */}
      <Card sx={{ mb: 3 }}>
        <CardMedia
          component="img"
          height="400"
          image={product.firstImage}
          alt={product.name}
        />
      </Card>

      {/* Additional Images */}
      {product.images && product.images.length > 0 && (
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {product.images.map((imgUrl, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={imgUrl}
                  alt={`${product.name} ${index + 1}`}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Seller */}
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Seller: {product.seller}
      </Typography>

      {/* Price */}
      <Typography variant="h6" sx={{ mb: 1 }}>
        Price: ${product.price}
      </Typography>

      {/* Rating */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Rating value={averageRating} precision={0.1} readOnly />
        <Typography variant="body2" sx={{ ml: 1 }}>
          {averageRating.toFixed(1)} ({product.rating.count} reviews)
        </Typography>
      </Box>

      {/* Add to Basket Button */}
      <Box sx={{ mt: 3 }}>
        <Tooltip title={product.stock <= 0 ? "Out of stock" : ""}>
          <span>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddToBasket}
              disabled={product.stock <= 0}
            >
              Add to Basket
            </Button>
            <Button onClick={async()=>{
              const response = await productService.reduceItemFromBasket(id, 1)
              console.log(response)
            }}>
              Test remove
            </Button>
            <Button onClick={async() => {
              const response = await productService.deleteItemFromBasket(id)
              console.log(response)
            }}>
              Test Delete
            </Button>
          </span>
        </Tooltip>
      </Box>

      {/* Collapsible Description */}
      <Box>
        <Typography variant="h6" gutterBottom>
          Description
        </Typography>
        <Collapse in={descExpanded} collapsedSize={100}>
          <Typography variant="body1" paragraph>
            {product.description.content}
          </Typography>
        </Collapse>
        {product.description.content.length > 100 && (
          <Button onClick={() => setDescExpanded((prev) => !prev)}>
            {descExpanded ? "Show Less" : "Read More"}
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default SingleProductPage;
