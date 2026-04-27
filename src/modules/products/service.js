const { products, compatibility } = require('./data');

function normalize(value) {
  return String(value || '').trim().toLowerCase();
}

function applySearch(items, search) {
  if (!search) return items;
  const keyword = normalize(search);
  return items.filter((item) => {
    return [item.name, item.sku, item.type, `${item.type} ${item.capacityGb}GB ${item.speedMhz}MHz`]
      .map(normalize)
      .some((field) => field.includes(keyword));
  });
}

function applySpecFilters(items, query) {
  return items.filter((item) => {
    if (query.type && normalize(item.type) !== normalize(query.type)) return false;
    if (query.brand && normalize(item.brand) !== normalize(query.brand)) return false;
    if (query.capacity && item.capacityGb !== Number(query.capacity)) return false;
    if (query.speed && item.speedMhz !== Number(query.speed)) return false;
    if (query.minPrice && item.price < Number(query.minPrice)) return false;
    if (query.maxPrice && item.price > Number(query.maxPrice)) return false;
    return true;
  });
}

function applyCompatibility(items, model) {
  if (!model) return items;
  const normalizedModel = normalize(model);
  const compatibleProductIds = compatibility
    .filter(
      (row) =>
        normalize(row.laptopModel) === normalizedModel ||
        normalize(row.motherboardModel) === normalizedModel
    )
    .map((row) => row.productId);

  return items.filter((item) => compatibleProductIds.includes(item.id));
}

function listProducts(query = {}) {
  let result = [...products];
  result = applySearch(result, query.search);
  result = applySpecFilters(result, query);
  result = applyCompatibility(result, query.model);

  return result;
}

function getProductById(id) {
  return products.find((product) => product.id === Number(id)) || null;
}

function compareProducts(productIds) {
  const picked = products.filter((product) => productIds.includes(product.id));
  return picked.map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    speedMhz: p.speedMhz,
    capacityGb: p.capacityGb,
    latency: p.latency
  }));
}

module.exports = {
  listProducts,
  getProductById,
  compareProducts
};
