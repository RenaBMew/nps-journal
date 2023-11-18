const { User } = require("../models");

async function addFavorite(req, res, next) {
  try {
    const { url, states, images, name } = req.body;
    const _id = req.session._id;
    const newFavorite = await User.create({
      id,
      name,
      states,
      url,
      notes,
      //images: [{ url: "" }],
    });
    res.status(200).json(newFavorite);
    const favorites = await controllers.favorites.getFavorites(_id);
    res.render("favorites", { favorites });
  } catch (error) {
    console.error("Error adding favorite:", error);
    res.redirect("/?error=Error adding favorite");
  }
}

async function getFavorites(_id) {
  try {
    const favorites = await User.find({ user: _id });
    return favorites;
  } catch (error) {
    console.error("Error fetching favorites:", error);
    throw error;
  }
}

module.exports = { addFavorite, getFavorites };
