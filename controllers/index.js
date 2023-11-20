const auth = require("./auth");
const user = require("./user");
const favorites = require("./favorites");
const notes = require("./notes");
const parks = require("./parks");
// const entry = require("./entry"); need to add entry.js controller

module.exports = {
  auth,
  user,
  parks,
  favorites,
  notes,
  //entry,
};
