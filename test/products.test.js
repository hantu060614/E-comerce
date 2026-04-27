const test = require('node:test');
const assert = require('node:assert/strict');

const { listProducts, compareProducts } = require('../src/modules/products/service');

test('listProducts supports smart search', () => {
  const result = listProducts({ search: 'DDR4 16GB 3200MHz' });
  assert.equal(result.length, 1);
  assert.equal(result[0].sku, 'CRU-DDR4-16-3200');
});

test('listProducts supports compatibility filtering', () => {
  const result = listProducts({ model: 'MSI Z790 Tomahawk' });
  assert.equal(result.length, 1);
  assert.equal(result[0].type, 'DDR5');
});

test('compareProducts returns selected fields', () => {
  const result = compareProducts([1, 2]);
  assert.equal(result.length, 2);
  assert.deepEqual(Object.keys(result[0]), [
    'id',
    'name',
    'price',
    'speedMhz',
    'capacityGb',
    'latency'
  ]);
});
