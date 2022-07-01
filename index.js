const client = require("./connection.js");
const express = require("express");
const app = express();
// const bodyParser = require("body-parser");
// app.use(bodyParser.json());

client.connect();

const clients = require("./routes/clients.js");
app.use("/clients", clients);

const vendors = require("./routes/vendors.js");
app.use("/vendors", vendors);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
// app.listen(3000, () => {
//   console.log("Listening to port 3000");
// });
