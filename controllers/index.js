const auth = require("./auth");
const user = require("./user");
const favorites = require("./favorites");
const parks = require("./parks");
// const entry = require("./entry"); need to add entry.js controller

module.exports = {
  auth,
  user,
  parks,
  favorites,
  //entry,
};
