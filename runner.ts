import * as fs from 'fs';
import csvParser from 'csv-parser';
import sqlite3 from 'sqlite3';

//const db = new sqlite3.Database('your-database-file.db');

import verbose from 'sqlite3';
//const sqlite3 = require('sqlite3').verbose();


// const results: any[] = [];
// fs.createReadStream('challenge-1\tmp\dump\customers.csv')
//   .pipe(csvParser())
//   .on('data', (data) => results.push(data))
//   .on('end', () => {
//     // Data from the CSV file is now stored in the "results" array
//     // You can proceed to insert this data into the SQLite database.
//   });
// Assuming you have a "customers" table with columns "name" and "email"
// const insertQuery = `INSERT INTO customers (id,name, email,organization) VALUES (?, ?)`;

// results.forEach((row) => {
//   db.run(insertQuery, [row.name, row.email], (error) => {
//     if (error) {
//       console.error('Error inserting data:', error.message);
//     }
//   });
// });
// db.close((error) => {
//   if (error) {
//     console.error('Error closing the database:', error.message);
//   }
// });
async function insertData() {
  const db = new sqlite3.Database('out\database.sqlite3');
  const results: any[] = await new Promise((resolve) => {
    const data = [];
    fs.createReadStream('tmp\dump\customers.csv')
      .pipe(csvParser())
      .on('data', (row) => data.push(row))
      .on('end', () => resolve(data));
  });
  //-- Attach the destination database
// ATTACH DATABASE 'challenge-1\out\dev.sqlite3' AS destination;

// -- Copy data from source_table to destination_table
// INSERT INTO destination.destination_table
// SELECT * FROM source_table;

// -- Detach the destination database (optional)
// DETACH DATABASE destination;

// -- Commit changes in the source database
// COMMIT;

  const a="ATTACH DATABASE 'dev.sqlite3' AS destination";
  const b="INSERT INTO destination.customers SELECT * FROM customers";
  const c="DETACH DATABASE destination;"
  //const insertQuery = `INSERT INTO customers1 ('Index',Customer Id,First Name,Last Name,Company,City,Country,Phone 1,Phone 2,Email,Subscription Date,Website) VALUES (?, ?,?,?,?,?,?,?,?,?,?,?)`;
  const insertQuery = "INSERT INTO organizations (`Index,`Organization Id`,`Name`,`Website`,`Country`,`Description`,`Founded`,`Industry`,`Number of employees`) VALUES (?, ?,?,?,?,?,?,?,?)";
  for (const row of results) {
    console.log(row['Index'],row['Customer Id']);
    await new Promise<void>((resolve, reject) => {
      //db.run(insertQuery, row['Index'], row["Organization Id"], row['Name'], row['Website'], row['Country'], row['Description'], row['Founded'], row['Industry'], row['Number of employees'], (error) => {
        db.run(a, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
        db.run(b, (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
      });
      db.run(c, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
    });
    });
  }

  db.close();
}

insertData()
  .then(() => {
    console.log('Data inserted successfully.');
  })
  .catch((error) => {
    console.error('Error:', error);
  });

console.log("✅ Done!");
