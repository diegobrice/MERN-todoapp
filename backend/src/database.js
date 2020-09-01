const mongoose = require("mongoose");

const URI = "mongodb://localhost/todoapp";
// ? process.env.MONGODB_URI
// : "mongodb://localhost/databasetest";

mongoose.connect(URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("DB is connected");
});
