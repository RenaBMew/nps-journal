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

router.get("/", (req, res) => {
  const query = req.query.query;
  res.render("index", { query });
});

router.get("/favorites", checkAuth, ({ session: { isLoggedIn } }, res) => {
  res.render("favorites", { isLoggedIn });
});

router.post("/search", async (req, res) => {
  const { search } = req.body;
  console.log(req.body);
  const isLoggedIn = req.session.isLoggedIn || false;

  try {
    const parks = await controllers.parks.fetchParks(search, isLoggedIn);
    res.render("index", { parks, query: search, isLoggedIn });
  } catch (error) {
    res.render("index", { error, query: search, isLoggedIn });
  }
});

router.post("/addFavorite", checkAuth, async (req, res) => {
  try {
    const newFavorite = controllers.favorites.addFavorite;
    res.status(200).json(newFavorite);
  } catch (error) {
    console.error("Error adding favorite:", error);
    res.redirect("/?error=Error adding favorite");
  }
});

module.exports = router;
