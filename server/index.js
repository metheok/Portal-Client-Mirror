const { ExpressLoader } = require("./loaders/express.loader");
const { DatabaseLoader } = require("./loaders/database.loader");
const { RoutesLoader } = require("./loaders/routes.loader");

const { Config } = require("../configs/config");

const app = ExpressLoader.init();

// load database
DatabaseLoader.init();

RoutesLoader.initRoutes(app);

// Start the server
const port = Number(Config.BE_PORT);
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
