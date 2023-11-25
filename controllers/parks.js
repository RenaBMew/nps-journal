const { User } = require("../models");
const axios = require("axios");

const fetchParks = async (query) => {
  const apiKey = process.env.NPS_KEY;
  const apiUrl = `https://developer.nps.gov/api/v1/parks?q=${query}&api_key=${apiKey}`;
  try {
    const response = await axios.get(apiUrl);
    const parkData = response.data;
    return parkData.data.slice(0, 10);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const searchParks = async (req, res) => {
  const { search } = req.body;
  console.log(req.body);
  const isLoggedIn = req.session.isLoggedIn || false;

  try {
    const parks = await fetchParks(search, isLoggedIn);
    const favoriteParks = isLoggedIn
      ? await getfavoriteParks(req.session.username)
      : [];
    const filteredParks = parks.filter(
      (park) =>
        !favoriteParks.some((favoritePark) => favoritePark.id === park.id)
    );
    res.render("index", { parks: filteredParks, query: search, isLoggedIn });
  } catch (error) {
    res.render("index", { error, query: search, isLoggedIn });
  }
};
const getfavoriteParks = async (username) => {
  const user = await User.findOne({ username }).lean();
  return user ? user.favoriteParks : [];
};

module.exports = { fetchParks, searchParks };
