import axios from 'axios';

export const createStripeSession = async (orderItems, totalPrice) => {
  const { data } = await axios.post('/api/stripe/create-checkout-session', { orderItems, totalPrice });
  return data.id;
};

