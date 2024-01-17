const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://sandunrmst:PeTUjvvndcxKxWeUv63@clusterrmst.rn0zuff.mongodb.net/"
  )
  .then(() => console.log("Mongo DB Connected Success!"))
  .catch((e) => console.log(e));
