import { Typography, Paper, TextField, Box, styled, Button, Alert } from "@mui/material"
import { useControlledValue } from "./services/customHooks"
import { useState } from "react"
import productsService from "./services/productsService"

const ProductUploadPage = () => {
  const name = useControlledValue('a', 'Name')
  const price = useControlledValue(0, 'Price')
  const stock = useControlledValue(0, 'Stock')
  const description = useControlledValue('a descirptionasdfasdfd', 'Description')
  const seller = useControlledValue('a', 'Seller')
  const [firstImage, setFirstImage] = useState(null)
  const [error, setError] = useState(null)

  const categories = ['one', 'two']

  const handleFirstImageChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const allowedTypes = ["image/jpeg", "image/png"];
      if (!allowedTypes.includes(selectedFile.type)) {
        setError("Only JPG and PNG files are allowed.");
        setFirstImage(null);
        return;
      }

      setError(""); // Clear any previous errors
      setFirstImage(selectedFile);
    }
  };

  // Hidden input component for the file upload
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  const handleUpload = async (event) => {
    event.preventDefault()
    if (!firstImage){
      setError('Please upload an image')
    } else {
      const newProduct = {
        name: name.value,
        price: price.value,
        stock: stock.value,
        description: description.value,
        seller: seller.value,
        firstImage,
        categories
      }

      try{
        const response = await productsService.uploadProduct(newProduct)
        console.log(response)
      } catch (error){
        console.error(error)
      }
    }
    
  }
  // TODO:
    // Check how to upload image in react 
    // Think of how to get categories

  return (
    <Paper
      component='form'
      onSubmit={handleUpload}
      sx={{backgroundColor: 'bisque', 
        mt: '40px', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        gap: 2,
        maxWidth: '700px',
        justifySelf: 'center'}}>
      {error && <Alert severity="info">{error}</Alert>}
      <Typography sx={{mt: '10px'}} variant="h5">New Product:</Typography>
      <Box  sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }}}>

        <TextField label={name.label} 
          type="text" onChange={name.onChange} 
          value={name.value} 
          required variant="standard"></TextField>

        <TextField label={price.label} 
          type="number" slotProps={{input: {min: 0, step: "0.01"}}}
          onChange={price.onChange} value={price.value} 
          required variant="standard"></TextField>

        <TextField type="number" label={stock.label} 
          onChange={stock.onChange} value={stock.value} 
          required variant="standard"></TextField>

        <TextField label={seller.label} 
          onChange={seller.onChange} value={seller.value} 
          required variant="standard"></TextField>

        <TextField sx={{minWidth: '90%'}} multiline 
          label={description.label} onChange={description.onChange} 
          value={description.value} required variant="standard"></TextField>

        <Button variant='contained' component='label'
          role={undefined}
          tabIndex={-1}>
          {!firstImage? 'Upload First Image' : firstImage.name + ' - Uploaded'}
          <VisuallyHiddenInput
            type="file"
            onChange={handleFirstImageChange}
            multiple/>
        </Button>
        
      </Box>
      <Button sx={{mb: '10px'}} variant='contained' color='secondary' type="submit">Upload New Product</Button>
    </Paper>
    
  )
}

export default ProductUploadPage