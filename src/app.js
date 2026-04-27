const { URL } = require('node:url');
const { listProducts, getProductById, compareProducts } = require('./modules/products/service');
const { getUserProfile } = require('./modules/users/service');
const { createOrder } = require('./modules/orders/service');

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(payload));
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';

    req.on('data', (chunk) => {
      data += chunk;
    });

    req.on('end', () => {
      if (!data) return resolve({});
      try {
        resolve(JSON.parse(data));
      } catch (error) {
        reject(new Error('Invalid JSON body'));
      }
    });

    req.on('error', reject);
  });
}

function createApp() {
  return async function handler(req, res) {
    const url = new URL(req.url, 'http://localhost');

    if (req.method === 'GET' && url.pathname === '/health') {
      return sendJson(res, 200, { status: 'ok' });
    }

    if (req.method === 'GET' && url.pathname === '/api/products') {
      const query = Object.fromEntries(url.searchParams.entries());
      const data = listProducts(query);
      return sendJson(res, 200, { data, count: data.length });
    }

    if (req.method === 'GET' && url.pathname.startsWith('/api/products/')) {
      const id = url.pathname.split('/').pop();
      const product = getProductById(id);

      if (!product) {
        return sendJson(res, 404, { message: 'Product not found' });
      }

      return sendJson(res, 200, { data: product });
    }

    if (req.method === 'POST' && url.pathname === '/api/products/compare') {
      try {
        const body = await parseBody(req);
        const productIds = Array.isArray(body.productIds) ? body.productIds.map(Number) : [];

        if (productIds.length < 2 || productIds.length > 3) {
          return sendJson(res, 400, {
            message: 'productIds must contain 2 to 3 items'
          });
        }

        const result = compareProducts(productIds);
        return sendJson(res, 200, { data: result });
      } catch (error) {
        return sendJson(res, 400, { message: error.message });
      }
    }


    if (req.method === 'POST' && url.pathname === '/api/orders') {
      try {
        const body = await parseBody(req);
        const result = createOrder(body);
        if (result.error) {
          return sendJson(res, result.status, { message: result.error });
        }

        return sendJson(res, result.status, { data: result.data });
      } catch (error) {
        return sendJson(res, 400, { message: error.message });
      }
    }

    if (req.method === 'GET' && url.pathname.startsWith('/api/users/')) {
      const [, , , id, section] = url.pathname.split('/');
      const user = getUserProfile(id);

      if (!user) {
        return sendJson(res, 404, { message: 'User not found' });
      }

      if (!section) {
        return sendJson(res, 200, { data: user });
      }

      if (section === 'history') {
        return sendJson(res, 200, { data: user.orderHistory });
      }

      return sendJson(res, 404, { message: 'Section not found' });
    }

    return sendJson(res, 404, { message: 'Route not found' });
  };
}

module.exports = { createApp };
