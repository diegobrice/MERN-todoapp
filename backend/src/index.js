require("dotenv").config();
const app = require("./app");
require("./database");

const port = app.get("port");

async function main() {
  await app.listen(port);
  console.log("Server on port: ", port);
}

main();
