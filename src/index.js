const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { authRoute, userRoute } = require("./routes");

const server = require("../config").$server;
const models = require("./models");

const app = express();
const alter = false;
const force = false;

models.sequelize.sync({ alter, force });

var corsOption = {
  origin: "http://localhost:8080/"
}

app.use(cors(corsOption));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/", [authRoute, userRoute]);

app.get("/", (req, res) => {
  res.status(200).json({ data: "Hello world" });
});

app.listen({ port: server.port }, () => {
  console.log(`Server ready at http://localhost:${server.port}/`);
});
