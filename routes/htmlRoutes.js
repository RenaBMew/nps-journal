const router = require("express").Router();
const controllers = require("../controllers");
const checkAuth = require("../middleware/auth");

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

// show query in body
router.get("/", (req, res) => {
  const query = req.query.query;
  res.render("index", { query });
});

//fetch Park with parks.js API request
router.post("/search", controllers.parks.searchParks);

//add a favorite park
router.post("/addFavorite", checkAuth, controllers.favorites.addFavorite);

// get favorite parks
router.get("/favorites", checkAuth, controllers.favorites.getFavorites);

// remove a favorite park
router.post("/removeFavorite", controllers.favorites.removeFavorite);

//add/update notes
router.post("/addNote", checkAuth, controllers.notes.addNote);

module.exports = router;
