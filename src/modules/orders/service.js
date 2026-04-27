const { orders } = require('./data');
const { getProductById } = require('../products/service');

function createOrder({ userId, productIds = [] }) {
  if (!userId) {
    return { error: 'userId is required', status: 400 };
  }

  if (!Array.isArray(productIds) || productIds.length === 0) {
    return { error: 'productIds must be a non-empty array', status: 400 };
  }

  const products = productIds.map((id) => getProductById(id)).filter(Boolean);

  if (products.length !== productIds.length) {
    return { error: 'one or more products were not found', status: 404 };
  }

  const totalPrice = products.reduce((sum, product) => sum + product.price, 0);
  const id = `ORD-${String(1000 + orders.length + 1)}`;
  const order = {
    id,
    userId: Number(userId),
    productIds: products.map((p) => p.id),
    totalPrice,
    status: 'PENDING_PAYMENT',
    paymentLink: `https://pay.ram-commerce.local/${id}`
  };

  orders.push(order);
  return { data: order, status: 201 };
}

module.exports = { createOrder };
