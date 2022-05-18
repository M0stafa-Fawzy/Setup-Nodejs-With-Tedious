const {
  procedureRouteHabdler,
  sqlStatementRouteHabdler,
} = require("./controller");

const router = require("express").Router();

router.get("/datawithpro", procedureRouteHabdler);
router.get("/datawithquery", sqlStatementRouteHabdler);

module.exports = router;
