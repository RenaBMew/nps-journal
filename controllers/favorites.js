const { User } = require("../models");

async function addFavorite(req, res) {
  try {
    const { url, states, images, name, id } = req.body;
    const user = await User.findOne({
      username: req.session.username,
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.favoriteParks.push({ url, states, images, name, id });
    await user.save();
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function getFavorites(req, res) {
  try {
    let user = await User.findOne({ username: req.session.username }).lean();
    res.render("favorites", {
      isLoggedIn: req.session.isLoggedIn,
      favoriteParks: user.favoriteParks,
    });
    console.log(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function removeFavorite(req, res) {
  try {
    const { id } = req.body;
    const username = req.session.username;
    await User.updateOne({ username }, { $pull: { favoriteParks: { id } } });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
}

module.exports = { addFavorite, getFavorites, removeFavorite };
