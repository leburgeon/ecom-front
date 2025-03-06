import axios from "axios"
import { PAYPALCLIENTID } from "./utils"

// This callback is called by the SDK when the user presses a payment option
// It is requesting an order id from the merchant server so that it can instantiate a popup to confirm payment
// Takes a cart object containing an array of product ids and quantities
const createOrder = async (cart, notify) => {
  try {
    // Attempts to create an order on the backend
    const { data } = await axios.post('/api/orders', {cart})
    if (data.id){
      return data.id
    } else {
      const errorDetail = data?.details?.[0]
      const errorMessage = errorDetail 
        ? `${errorDetail.issue} ${errorDetail.description} (${data.debug_id})`
        : JSON.stringify(data)
      throw new Error(errorMessage)
    }

  } catch (error){
    console.error(error)
    notify({
      message: error.message,
      severity: 'error'
    })
  }
}

// After the user has approved the payment, this callback makes a call to the merchant server to capture the payment
const onApprove = async (data, actions, notify) => {
  try {
    const { orderData } = await axios.post(`/api/orders/capture/${data.orderID}`)

    // Attempts handle error cases, recoverable and non-recoverable
    const errorDetail = orderData?.details?.[0]

    // Recoverable instrument declined- retry capture
    if (errorDetail?.issue === 'INTRUMENT_DECLINED'){
      return actions.restart()
    // Non-recoverable
    } else if (errorDetail){
      throw new Error(`${errorDetail.description} (${orderData.debug_id})`)
      // Handles SUCCESS
    } else {
      const transaction = orderData.purchase_units[0].payments.captures[0]
      console.log(transaction)
      notify({
        message: `Purchase successfull!!:`,
        severity: 'success'
      })
    }

  } catch (error){
    console.error(error)
    notify({
      message: `Sorry, your transaction could not be processed: ${error.message}`,
      severity: 'error'
    })
  }
}

const paypalInitialOptions = {
  'clientId': PAYPALCLIENTID

}

export default {createOrder, onApprove, paypalInitialOptions}