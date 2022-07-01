// const client = require("./../connection.js");

// const execute = async (query) => {
//   try {
//     await client.connect();
//     await client.query(query);
//     return true;
//   } catch (error) {
//     console.error(error.stack);
//     return false;
//   } finally {
//     await client.end(); // closes connection
//   }
// };

const query = `
    CREATE TABLE IF NOT EXISTS "clients" (
	    "id" SERIAL,
	    "name" VARCHAR(100) NOT NULL,
        "email" VARCHAR(100) NOT NULL,    
	    PRIMARY KEY ("id")
    )`;

module.exports = query;
// // execute(text).then((result) => {
// //   if (result) {
// //     console.log("Table created");
// //   }
// });
