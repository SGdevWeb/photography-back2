const http = require("http");
const app = require("./app");
require("dotenv").config();

const port = process.env.PORT || 9000;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
