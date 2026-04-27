const test = require('node:test');
const assert = require('node:assert/strict');

const { createOrder } = require('../src/modules/orders/service');

test('createOrder generates payment link and total price', () => {
  const result = createOrder({ userId: 1, productIds: [1, 4] });

  assert.equal(result.status, 201);
  assert.equal(result.data.totalPrice, 1394000);
  assert.match(result.data.paymentLink, /^https:\/\/pay\.ram-commerce\.local\/ORD-/);
});

test('createOrder rejects invalid payload', () => {
  const result = createOrder({ userId: 1, productIds: [] });

  assert.equal(result.status, 400);
  assert.equal(result.error, 'productIds must be a non-empty array');
});
