const express = require("express");
const router = express.Router();
const client = require("./../connection.js");
const query = require("./../models/clients.js");
const query1 = require("./../models/vendors.js");

router.use(express.json());

router.post("/", async (req, res) => {
  //   console.log(query1);
  client.query(query1, (err, result) => {});

  //   let x = `select vendors.email from vendors where email = '${req.body.email}'`;
  //   // console.log(x);
  //   if (x) x = true;
  //   else x = false;

  //   res.send(x);
  // const queryInsert = `insert into clients(name,password,email)
  //                        values('${user.name}','${user.password}','${user.email}')`;

  //   client.query(queryInsert, (err, result) => {
  //     if (!err) {
  //       res.send("Updated");
  //     }
  //   });

  //   select vendors.room1 from vendors where room1 = ${req.body.room1}

  client.query(
    `select vendors.email from vendors where email = '${req.body.email}'`,
    (err, result) => {
      if (!err) {
        if (result.rows.length) {
          client.query(
            `select vendors.room1 from vendors where room1 = ${req.body.room1} OR room1 = ${req.body.room2}`,
            (err, result) => {
              if (!err) {
                if (!result.rows.length) {
                  client.query(
                    `select vendors.room2 from vendors where room2 = ${req.body.room1} OR room2 = ${req.body.room2}`,
                    (err, result) => {
                      if (!err) {
                        if (!result.rows.length) {
                          let updateQuery = `update vendors
                         set name = '${req.body.name}',
                         password = '${req.body.password}',
                         room1 = ${req.body.room1} ,
                         room2 = ${req.body.room2}
                         where email = '${req.body.email}'`;

                          client.query(updateQuery, (err, result) => {
                            if (!err) {
                              res.send("ok");
                            } else {
                              console.log(err.message);
                            }
                          });
                        } else {
                          res.send("Room 2 already exists");
                        }
                      } else {
                        console.log(err.message);
                      }
                    }
                  );
                } else {
                  res.send("Room 1 already exists");
                }
              } else {
                console.log(err.message);
              }
            }
          );
        } else {
          res.send("No such vendor exists");
        }
      } else {
        console.log(err.message);
      }
    }
  );

  client.end;
});

router.get("/", async (req, res) => {
  res.send("kuttay");
  client.query("select * from vendors", (err, result) => {
    if (!err) {
      res.send(result.rows);
    } else {
      err.message;
    }
  });
});

module.exports = router;
