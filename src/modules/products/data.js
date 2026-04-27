const products = [
  {
    id: 1,
    sku: 'CRU-DDR4-16-3200',
    name: 'Crucial DDR4 16GB 3200MHz',
    brand: 'Crucial',
    type: 'DDR4',
    formFactor: 'SODIMM',
    capacityGb: 16,
    speedMhz: 3200,
    latency: 'CL22',
    voltage: 1.2,
    stock: 42,
    price: 895000
  },
  {
    id: 2,
    sku: 'KNG-DDR5-32-5600',
    name: 'Kingston Fury DDR5 32GB 5600MHz',
    brand: 'Kingston',
    type: 'DDR5',
    formFactor: 'DIMM',
    capacityGb: 32,
    speedMhz: 5600,
    latency: 'CL40',
    voltage: 1.25,
    stock: 18,
    price: 2499000
  },
  {
    id: 3,
    sku: 'CRS-ECC-32-3200',
    name: 'Corsair ECC DDR4 32GB 3200MHz',
    brand: 'Corsair',
    type: 'DDR4',
    formFactor: 'ECC',
    capacityGb: 32,
    speedMhz: 3200,
    latency: 'CL22',
    voltage: 1.2,
    stock: 9,
    price: 2199000
  },
  {
    id: 4,
    sku: 'SMS-DDR4-8-2666',
    name: 'Samsung DDR4 8GB 2666MHz',
    brand: 'Samsung',
    type: 'DDR4',
    formFactor: 'SODIMM',
    capacityGb: 8,
    speedMhz: 2666,
    latency: 'CL19',
    voltage: 1.2,
    stock: 64,
    price: 499000
  }
];

const compatibility = [
  { productId: 1, laptopModel: 'ASUS TUF A15', motherboardModel: null },
  { productId: 1, laptopModel: 'Lenovo IdeaPad 3', motherboardModel: null },
  { productId: 2, laptopModel: null, motherboardModel: 'MSI Z790 Tomahawk' },
  { productId: 2, laptopModel: null, motherboardModel: 'ASUS ROG Strix B760-F' },
  { productId: 3, laptopModel: null, motherboardModel: 'Supermicro X12STH' },
  { productId: 4, laptopModel: 'HP Pavilion 14', motherboardModel: null }
];

module.exports = { products, compatibility };
