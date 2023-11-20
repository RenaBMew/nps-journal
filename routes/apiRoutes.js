const router = require("express").Router();
const controllers = require("../controllers");
const checkAuth = require("../middleware/auth");

router.post("/login", controllers.auth.login);
router.get("/logout", controllers.auth.logout);
router.post("/signup", controllers.user.create);
router.post("/addFavorite", controllers.favorites.addFavorite);
router.get("/getfavorites", controllers.favorites.getFavorites);
router.post("/removefavorite", controllers.favorites.removeFavorite);

module.exports = router;
