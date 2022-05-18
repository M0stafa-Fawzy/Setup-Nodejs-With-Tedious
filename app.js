const express = require("express");
require("dotenv").config();
const { tedious, ConnectWithDB } = require("./tediousConn");
ConnectWithDB(tedious);

const uesrs = require("./route");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", uesrs);

app.get("/", (req, res) => {
  res.status(200).send("<h1>Hi. If You See This, Be Happy It Works </h1>");
});

app.get("*", (req, res) => {
  res.status(404).send("<h1>Page Not Found ! </h1>");
});

const PORT = process.env.PORT || 9090;

app.listen(PORT, () => {
  console.log(`Server is runinng on port: ${PORT}`);
});
