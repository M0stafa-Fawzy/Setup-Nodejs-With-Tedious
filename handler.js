const Request = require("tedious").Request;
var TYPES = require("tedious").TYPES;
const { tedious } = require("./tediousConn");

const fetchProcedureTediousDB = async (vid) => {
  try {
    return new Promise(async (resolve, reject) => {
      let request = new Request("your procedure name", (err, rowCount) => {
        if (err) {
          reject(err);
        }
      });
      // pass a parameter to your procedure if it accepts
      request.addParameter("predefinedparam", TYPES.NVarChar, `${param}`);
      let result = [];
      request.on("row", async (columns) => {
        //looping over every row from procedure result
        //columns represents every column for every row
        const fetchedRows = new Object();
        columns.forEach((column) => {
          let key = column["metadata"]["colName"];
          Object.assign(fetchedRows, { [key]: column.value });
        });
        result.push(fetchedRows);
      });
      // must be doneProc because I am executing a procedure not a normal sql statement
      request.on("doneProc", (rowCount, more, rows) => {
        return resolve(result);
      });
      tedious.callProcedure(request);
    });
  } catch (error) {
    return { message: `here is your error ${error}` };
  }
};

const fetchNormalSQLTediousDB = async () => {
  try {
    return new Promise((resolve, reject) => {
      let request = new Request(
        `here is your sql query`,
        (err, rowCount, rows) => {
          err && reject(err);
        }
      );
      //   request.addParameter("Id", TYPES.VarChar, user_id);
      request.on("row", (columns) => {
        columns.forEach(function (column) {
          let key = column["metadata"]["colName"];
          let value = column.value;
          Object.assign(user, { [key]: value });
        });
        resolve(user);
      });
      // must be execSql because I am executing a normal sql statement
      tedious.execSql(request);
    });
  } catch (error) {
    return { message: `here is your error ${error}` };
  }
};
module.exports = {
  fetchProcedureTediousDB,
  fetchNormalSQLTediousDB,
};
