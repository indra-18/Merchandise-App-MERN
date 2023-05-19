import React, { useEffect, useState } from 'react'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckOutForm from "./CheckOutForm";
import { useSelector } from 'react-redux';

const Payments = () => {
    const total = useSelector(state => state.payment.total);

    const [clientSecret, setClientSecret] = useState("")

    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
  
    useEffect(() => {
      fetch(`${import.meta.env.VITE_NODE_API}/create-payment-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ totalPrice: total }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }, [total]);

    const appearance = {
      theme: 'stripe',
    };
    const options = {
      clientSecret,
      appearance,
    };

  return (
    <div>
        {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckOutForm />
        </Elements>
        )}
    </div>
  )
}

export default Payments
