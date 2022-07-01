const express = require("express");
const router = express.Router();
const client = require("./../connection.js");

const query = require("./../models/clients.js");

router.use(express.json());

// client.connect();

router.get("/", async (req, res) => {
  client.query(`Select * from clients`, (err, result) => {
    if (!err) {
      res.send(result.rows);
    }
  });
  client.end;
});

router.post("/", async (req, res) => {
  client.query(query, (err, message) => {});

  client.query(
    `select clients.email from clients where email = '${req.body.email}'`,
    (err, result) => {
      if (!err) {
        if (!result.rows.length) {
          let insertQuery = `insert into clients (name , email)
                            values ('${req.body.name}' , '${req.body.email}')`;

          client.query(insertQuery, (err, message) => {
            if (!err) {
              res.send("ok");
            } else {
              console.log(err.message);
            }
          });
        } else {
          res.send("Email already exists");
        }
      } else {
        console.log(err.message);
      }
    }
  );
  client.end;
});

router.put("/:id", (req, res) => {
  //   let user = req.body;
  let updateQuery = `update clients
                         set name = '${req.body.name}',
                         password = '${req.body.password}',
                         email = '${req.body.email}'
                         where id = ${req.params.id}`;

  client.query(updateQuery, (err, result) => {
    if (!err) {
      res.send("Update was successful");
    } else {
      console.log(err.message);
    }
  });
  client.end;
});

router.get("/vacant", async (req, res) => {
  client.query(
    `SELECT vendors.name FROM vendors where vendors.room1 is null AND vendors.room2 is null`,
    (err, result) => {
      if (!err) {
        res.send(result.rows);
      } else {
        console.log(err.message);
      }
    }
  );
  client.end;
});

router.get("/notvacant", async (req, res) => {
  client.query(
    `SELECT vendors.name FROM vendors where vendors.room1 is not null OR vendors.room2 is not null`,
    (err, result) => {
      if (!err) {
        res.send(result.rows);
      } else {
        console.log(err.message);
      }
    }
  );
  client.end;
});

module.exports = router;
