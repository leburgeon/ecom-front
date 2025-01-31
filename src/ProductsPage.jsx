import {useState} from 'react'
import { Stack,
  Divider
} from '@mui/material'
import { useSelector } from 'react-redux'
import ProductCard from './components/ProductCard'

const ProductsPage = () => {
  const [loading, setLoading] = useState(true)

  const products = useSelector(store => store.products || [])

  return (
    <Stack 
      divider={<Divider orientation='horizontal' flexItem />}
      spacing={3}
    >
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
    </Stack>
  )
}

export default ProductsPage