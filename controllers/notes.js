const { User } = require("../models");

async function addNote(req, res) {
  try {
    const { id, note } = req.body;
    const filter = { username: req.session.username, "favoriteParks.id": id };
    const update = { $set: { "favoriteParks.$.notes": note } };
    const options = { upsert: true };
    const result = await User.updateOne(filter, update, options);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

module.exports = { addNote };
