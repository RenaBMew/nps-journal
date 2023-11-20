if (process.env.MONGODB_URI) {
  console.log(
    "\x1b[31m%s\x1b[0m",
    "SEEDING MONGODB PRODUCTION DATABASE!!!\n".repeat(3)
  );
  console.log("\x1b[31m%s\x1b[0m", "Don't forget to clear MONGODB_URI!\n");
  console.log(
    "\x1b[33m%s\x1b[0m",
    "Run 'export MONGODB_URI=' or close this terminal after seeding.",
    "\n"
  );
} else {
  console.log("\x1b[33m%s\x1b[0m", "SEEDING MONGODB LOCAL DB");
}

const { User } = require("../models");
const { connection } = require("../config/connection");

connection.once("open", async function () {
  // insert a sample user/park
  await User.create({
    username: "cat",
    password: "meowmeow",
    favoriteParks: [
      {
        name: "Big Cypress",
        states: "FL",
        url: "https://www.nps.gov/bicy/index.htm",
        images: [
          {
            url: "https://www.nps.gov/common/uploads/structured_data/C224B1D4-CDDA-B563-05F29F0ECFF365A4.jpg",
          },
        ],
        notes: "I want to go to there!",
      },
    ],
  });

  connection.close();
});
