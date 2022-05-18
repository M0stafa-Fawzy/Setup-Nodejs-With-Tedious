const {
  fetchProcedureTediousDB,
  fetchNormalSQLTediousDB,
} = require("./handler");

const procedureRouteHabdler = async (req, res) => {
  try {
    // may be there are arguments and may be not
    const result = await fetchProcedureTediousDB();
    if (!result || result.length === 0) {
      return res.status(404).json({ message: "No Data Found !" });
    }
    return res.status(200).send({ result });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const sqlStatementRouteHabdler = async (req, res) => {
  try {
    const result = await fetchNormalSQLTediousDB();
    if (!result || result.length === 0) {
      return res.status(404).json({ message: "No Data Found !" });
    }
    return res.status(200).send({ result });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

module.exports = {
  procedureRouteHabdler,
  sqlStatementRouteHabdler,
};
