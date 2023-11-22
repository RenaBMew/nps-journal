const { User } = require("../models");

async function addNote(req, res) {
  try {
    const { id, note } = req.body;
    const filter = { username: req.session.username, "favoriteParks.id": id };
    const update = { $set: { "favoriteParks.$.notes": note } };
    const options = { upsert: true };

    const result = await User.updateOne(filter, update, options);

    if (result) {
      res.redirect("/favorites");
    }
  } catch (error) {
    console.error("Error adding note:", error);
    res.status(500).json({ error: "Could not save Note." });
  }
}

module.exports = { addNote };
