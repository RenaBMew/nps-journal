const axios = require("axios");

const fetchParks = async (query) => {
  const apiKey = process.env.NPS_KEY;
  const apiUrl = `https://developer.nps.gov/api/v1/parks?q=${query}&api_key=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);
    const parkData = response.data;

    if (parkData.Error) {
      throw new Error(parkData.Error);
    }

    return parkData.data.slice(0, 10);
  } catch (error) {
    console.error("Error fetching parks:", error);
    throw error;
  }
};

module.exports = { fetchParks };
