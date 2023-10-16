"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// import fs from 'fs';
// import csvParser from 'csv-parser';
// import sqlite3 from 'sqlite3';
var fs = require("fs");
var csvParser = require('csv-parser');
var sqlite3 = require('sqlite3').verbose();
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
function insertData() {
    return __awaiter(this, void 0, void 0, function () {
        var db, results, insertQuery, _loop_1, _i, results_1, row;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    db = new sqlite3.Database('dev.sqlite3');
                    return [4 /*yield*/, new Promise(function (resolve) {
                            var data = [];
                            //fs.createReadStream('organizations.csv')
                            fs.createReadStream('customers.csv')
                                .pipe(csvParser())
                                .on('data', function (row) { return data.push(row); })
                                .on('end', function () { return resolve(data); });
                        })];
                case 1:
                    
                    results = _a.sent();
                    //insertQuery = "INSERT INTO organizations (`Index`,`Organization Id`,`Name`,`Website`,`Country`,`Description`,`Founded`,`Industry`,`Number of employees`) VALUES (?, ?,?,?,?,?,?,?,?)";
                    insertQuery="INSERT INTO customers (`Index`,`Customer Id`,`First Name`,`Last Name`,`Company`,`City`,`Country`,`Phone 1`,`Phone 2`,`Email`,`Subscription Date`,`Website`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
                    _loop_1 = function (row) {
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    console.log(row['Index'], row['Customer Id']);
                                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                                            db.run(insertQuery, row['Index'], row["Customer Id"], row['First Name'], row['Last Name'], row['Company'], row['City'], row['Country'], row['Phone 1'], row['Phone 2'],row['Email'],row['Subscription Date'],row['Website'], function (error) {
                                                //db.run(insertQuery, row['Index'], row["Organization Id"], row['Name'], row['Website'], row['Country'], row['Description'], row['Founded'], row['Industry'], row['Number of employees'], function (error) {
                                                if (error) {
                                                    reject(error);
                                                }
                                                else {
                                                    resolve();
                                                }
                                            });
                                        })];
                                case 1:
                                    _b.sent();
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, results_1 = results;
                    _a.label = 2;
                case 2:
                    if (!(_i < results_1.length)) return [3 /*break*/, 5];
                    row = results_1[_i];
                    return [5 /*yield**/, _loop_1(row)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5:
                    db.close();
                    return [2 /*return*/];
            }
        });
    });
}
insertData()
    .then(function () {
    console.log('Data inserted successfully.');
})
    .catch(function (error) {
    console.error('Error:', error);
});
