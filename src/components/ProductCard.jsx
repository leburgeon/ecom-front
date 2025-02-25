import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActionArea,
  Typography,
  Rating,
  Box
} from "@mui/material";

import { useNavigate } from "react-router-dom";

const ProductCard = ({ id, name, price, firstImage, seller, rating, stock }) => {
  const navigate = useNavigate();

  const ratingCount = rating.count;
  const ratingAverage = rating.total / ratingCount;

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', width: 250 }}>
      <CardActionArea onClick={() => {
        navigate(`/product/${id}`);
      }}>
        <CardMedia
          component="img"
          sx={{ height: 150, width: 'auto', margin: '0 auto' }}
          image={firstImage}
        />
        <CardHeader
          title={name || 'Demo Bike Super Mudder'}
          subheader={`Sold By: ${seller || 'ABikerLot'}`}
        />
      </CardActionArea>
      <CardContent>
        <Typography variant="h5" sx={{ color: 'text.secondary' }}>
          {`£${price || '199'}`}
        </Typography>
        {stock === 0 && (
          <Typography variant="body2" sx={{ color: 'red' }}>
            Out of stock
          </Typography>
        )}
        {stock > 0 && stock <= 5 && (
          <Typography variant="body2" sx={{ color: '#FFA500' }}>
            Low stock
          </Typography>
        )}
        <Box display='flex' alignItems='center'>
          <Rating value={ratingAverage} readOnly precision={0.1} size='small' />
          <Typography variant="body2" sx={{ marginLeft: 0.5 }}>
            {`(${ratingCount
              ? ratingCount >= 1000
                ? `${Math.floor(ratingCount / 100) / 10}K`
                : ratingCount
              : 0
            })`}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ProductCard;