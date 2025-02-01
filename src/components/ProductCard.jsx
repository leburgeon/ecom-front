import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  CardActionArea,
  IconButton,
  Typography,
  Rating,
  Box
} from "@mui/material";

import { Favorite as FavoriteIcon, Share as ShareIcon } from "@mui/icons-material";

import { useNavigate } from "react-router-dom";



const ProductCard = ({ id, name, price, firstImage, description, seller, rating, ratingCount = 178393 }) => {

  const navigate = useNavigate()

  return (
    <Card sx={{display: 'flex', flexDirection: 'column', width: 250}}>
      <CardActionArea onClick={() => {
        navigate(`/product/${id}`)
      }}>
      <CardMedia
        component="img"
        sx={{ height: 150, width: 'auto', margin: '0 auto'}}
        image="https://cdn.speedsize.com/4190f681-07cb-43aa-92d2-6096b01e7b62/https://cms.ribblecycles.co.uk.cfstack.com/assets/images/heros/homepage-banner-sram-mobile-2.jpg"
      />
      <CardHeader
        title={name|| 'Demo Bike Super Mudder'}
        subheader={`Sold By: ${seller || 'ABikerLot'}`}
      />
      </CardActionArea>
      <CardContent>
        <Typography variant="h5" sx={{ color: 'text.secondary' }}>
          {`£${price||'199'}`}
        </Typography>
        <Box display='flex' alignItems='center'>
          <Rating value={rating || 4.6} readOnly precision={0.1} size='small'/>
          <Typography variant="body2" sx={{ marginLeft: 0.5 }}>
          {`(${ratingCount
            ? ratingCount >= 1000 
              ? `${Math.floor(ratingCount/100) / 10}K`
              : ratingCount
            : 0

          })`}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ProductCard