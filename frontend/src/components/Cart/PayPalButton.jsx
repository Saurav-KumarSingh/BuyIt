import React from 'react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

const PayPalButton = ({ amount, onSuccess, onError }) => {
  const clientId = import.meta.env.VITE_Client_ID;

  if (!clientId) {
    console.error("❌ PayPal Client ID is missing. Check your .env file.");
    return <p>PayPal setup error: Missing Client ID.</p>;
  }

  return (
    <PayPalScriptProvider options={{ "client-id": clientId ,currency:"USD"}}>
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: { value: parseFloat(amount).toFixed(2).toString() },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            // console.log("✅ Payment Approved:", details);
            if (onSuccess) onSuccess(details);
          });
        }}
        onError={(err) => {
          console.error("❌ PayPal Error:", err);
          if (onError) onError(err);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
