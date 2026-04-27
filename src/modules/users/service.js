const { users } = require('./data');

function getUserProfile(id) {
  return users.find((user) => user.id === Number(id)) || null;
}

module.exports = { getUserProfile };
