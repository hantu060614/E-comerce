const users = [
  {
    id: 1,
    name: 'Andi Pratama',
    email: 'andi@example.com',
    shippingAddresses: [
      {
        label: 'Rumah',
        city: 'Bandung',
        detail: 'Jl. Sukajadi No. 10'
      }
    ],
    orderHistory: [
      {
        id: 'ORD-1001',
        totalPrice: 895000,
        status: 'PAID'
      }
    ]
  }
];

module.exports = { users };
