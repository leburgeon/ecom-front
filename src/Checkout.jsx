import { PayPalButtons } from "@paypal/react-paypal-js"
import paypalService from './services/paypalService'
import { useDispatch } from "react-redux"
import { notify } from './reducers/notificationReducer'
const Checkout = ({ cart }) => {
  const dispatch = useDispatch()

  const dispatchNotify = (obj) => {
    dispatch(notify(obj))
  }
  return (<PayPalButtons 
    createOrder={() => {paypalService.createOrder(cart, dispatchNotify)}} 
    onApprove={(data, actions) => {paypalService.onApprove(data, actions, dispatchNotify)}}
    style={{
      shape: "pill",
      layout: "vertical",
      color: "blue",
      label: "pay",
  }}/>)
}

export default Checkout