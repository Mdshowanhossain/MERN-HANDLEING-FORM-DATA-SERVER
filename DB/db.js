const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONOG0_URL, {})

  .then(() => console.log("Database Connection Successfully"))
  .catch((err) => console.log(err));
