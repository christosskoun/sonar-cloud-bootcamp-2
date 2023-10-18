import { Sequelize, Model, DataTypes } from '@sequelize/core';

//imports dontenv module and allows us to access stored environment variables stored in .env file - See https://www.npmjs.com/package/dotenv
import 'dotenv/config';

//Import file system - Examples of how to use the file system module - fs - https://www.scaler.com/topics/nodejs/fs-module-in-node-js/
import * as fs from 'fs';

//imports the Listing Model we created in ListingModels.js
import { Listing } from './ListingModel.js';

//Connecting to database 
const sequelize = new Sequelize(process.env.API_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

//Testing that the .env file is working - This should print out the port number
console.log(process.env.PORT); //Should print out 8080 
console.log(process.env.API_Key); //Should print out "Key Not set - starter code only"

try {
  // Setup table in the DB
  await Listing.sync({ force: true });
  console.log("The table for the Listing model was just (re)created!");

  // Read the listings.json file into memory (data) and handle errors
  fs.readFile('listings.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return;
    }

    try {
      const jsonData = JSON.parse(data);

      // Iterate through each entry in the JSON data and save it to the dataset
      jsonData.entries.forEach(async (entry) => {
        try {
          await Listing.create({
            code: entry.code,
            name: entry.name || null,
            coordinates: JSON.stringify(entry.coordinates) || null,
            address: entry.address || null,
          });
        } catch (error) {
          console.error('Error saving data to the database:', error);
        }
      });
    } catch (error) {
      console.error('Error parsing JSON data:', error);
    }
  });
} catch (error) {
  console.error('Unable to connect to the database:', error);
}