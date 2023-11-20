const router = require("express").Router();
const controllers = require("../controllers");
const checkAuth = require("../middleware/auth");
const { User } = require("../models");

router.get("/", ({ session: { isLoggedIn, username } }, res) => {
  console.log("isLoggedIn:", isLoggedIn);
  console.log("username:", username);
  res.render("index", { isLoggedIn, username });
});

router.get("/login", async (req, res) => {
  if (req.session.isLoggedIn) return res.redirect("/");
  res.render("login", { error: req.query.error });
});

router.get("/signup", async (req, res) => {
  if (req.session.isLoggedIn) return res.redirect("/");
  res.render("signup", { error: req.query.error });
});

router.get("/", (req, res) => {
  const query = req.query.query;
  res.render("index", { query });
});

router.post("/search", async (req, res) => {
  const isLoggedIn = req.session.isLoggedIn || false;
  if (!isLoggedIn) return;

  const { search } = req.body;
  let userDoc = await User.findOne({ username: req.session.username });
  let parks = await controllers.parks.fetchParks(search, isLoggedIn);

  userDoc.favoriteParks.forEach((favorite) => {
    let match = parks.find((park) => park.id === favorite.id);
    if (!match) return;

    match.favorited = true;
  });

  res.render("index", { parks, query: search, isLoggedIn });
});

router.get("/favorites", checkAuth, async (req, res) => {
  let userDoc = await User.findOne({ username: req.session.username }).lean();

  res.render("favorites", {
    isLoggedIn: req.session.isLoggedIn,
    favoriteParks: userDoc.favoriteParks,
  });
  console.log(userDoc);
});

router.post("/addFavorite", checkAuth, async (req, res) => {
  const isLoggedIn = req.session.isLoggedIn || false;
  if (!isLoggedIn) return;

  const { url, states, images, name, id } = req.body;

  let userDoc = await User.findOne({ username: req.session.username });
  let match = userDoc.favoriteParks.find((favorite) => favorite.id === id);

  if (match)
    userDoc.favoriteParks = userDoc.favoriteParks.filter(
      (favorite) => favorite.id !== id
    );
  else userDoc.favoriteParks.push({ url, states, images, name, id });

  const filter = { username: req.session.username };
  const updateDoc = {
    $set: {
      ...userDoc,
    },
  };

  await User.updateOne(filter, updateDoc);
  res.status(204).send();
});

router.post("/getFavorites", checkAuth, async (req, res) => {
  const isLoggedIn = req.session.isLoggedIn || false;
  if (!isLoggedIn) return;

  const { url, states, images, name, id, search } = req.body;

  let userDoc = await User.findOne({ username: req.session.username });
  let match = userDoc.favoriteParks.find((favorite) => favorite.id === id);

  if (match)
    userDoc.favoriteParks = userDoc.favoriteParks.filter(
      (favorite) => favorite.id !== id
    );
  else userDoc.favoriteParks.push({ url, states, images, name, id });
});

router.post("/removeFavorite", controllers.favorites.removeFavorite);
router.post("/addNote", checkAuth, controllers.notes.addNote);

module.exports = router;
