const { User } = require("../models");

async function addFavorite(req, res) {
  try {
    const { url, states, images, name } = req.body;
    const userId = req.session._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.favorites.push({
      name,
      states,
      url,
      images: [{ url }],
    });
    await user.save();
  } catch (error) {
    console.error("Error adding favorite:", error);
    res.redirect("/?error=Error adding favorite");
  }
}

async function getFavorites(_id) {
  try {
    const favorites = await User.findOne({
      username: req.session.username,
    }).lean();
    return favorites;
  } catch (error) {
    console.error("Error fetching favorites:", error);
    throw error;
  }
}

async function removeFavorite(req, res) {
  try {
    const { id } = req.body;
    const userDoc = await User.findOne({ username: req.session.username });
    userDoc.favoriteParks = userDoc.favoriteParks.filter(
      (favorite) => favorite.id !== id
    );
    const filter = { username: req.session.username };
    const updateDoc = {
      $set: {
        ...userDoc,
      },
    };
    await User.updateOne(filter, updateDoc);
  } catch (error) {
    console.error("Error removing favorite:", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = { addFavorite, getFavorites, removeFavorite };
