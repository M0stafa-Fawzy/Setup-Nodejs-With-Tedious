const Connection = require("tedious").Connection;

const config = {
  server: process.env.DB_HOST,
  authentication: {
    type: "default",
    options: {
      userName: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
  },
  options: {
    // If you are on Microsoft Azure, you need encryption:
    //rowCollectionOnRequestCompletion:true,
    encrypt: true,
    database: process.env.DB_NAME,
  },
};

const tedious = new Connection(config);

const ConnectWithDB = (tedious) => {
  tedious.connect();
  tedious.on("connect", function (err) {
    console.log("Connected to tediousDB");
  });
};

module.exports = {
  tedious,
  ConnectWithDB,
};
