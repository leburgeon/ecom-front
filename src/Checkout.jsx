import { PayPalButtons } from "@paypal/react-paypal-js"
import paypalService from './services/paypalService'
const Checkout = () => {
  return (<PayPalButtons createOrder={paypalService.createOrder} onApprove={paypalService.onApprove}/>)
}

export default Checkout