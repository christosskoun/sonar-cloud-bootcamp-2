import { Sequelize, Model, DataTypes,  QueryTypes, sql } from '@sequelize/core';

  //imports dontenv module and allows us to access stored environment variables stored in .env file
  import 'dotenv/config';

  import { Listing } from './ListingModel.js';
   
    //Function that retrieves all listings from the database and logs them to console
    async function retrieveAllListings() {
      const allListings = await Listing.findAll();
      console.log('Retrieving all listings:');
      console.log(allListings);
      }

    //Function that finds lib west in the relational table
    async function findLibraryWest() {
      const libraryWest = await Listing.findOne({
        where: { name: 'Library West' },
      });
      console.log('Finding Library West:');
      console.log(libraryWest);
      
    }

    //Function that removes document with the code 'CABL'
    async function removeCable() {
      const removedListing = await Listing.destroy({
        where: { code: 'CABL' },
      });
      console.log('Removing Cable BLDG:');
      console.log(removedListing);
    }

  // Creates a listing for the new DSIT building and adds it to the table
  async function addDSIT() {
      const [newListing, created] = await Listing.findOrCreate({
          where: { code: 'DSIT' },
          defaults: {
            name: 'Data Science and IT (DSIT) Building',
            // Wasn't provided address or coordinates so I believe this will do
          }
      });

      if (created) {
          console.log('Added the new DSIT BLDG that will be across from Reitz union. Bye Bye CSE, Hub, and French Fries.');
      } else {
          console.log('DSIT BLDG already exists.'); //this is necessary because will get error is testing code and run multiple times.
      }
  }

  //Function to update Phelps Laboratory Address
  async function updatePhelpsLab() {
    console.log('Updating PhelpsLab.');

    const updatedListing = await Listing.update(
      {
        address: '1953 Museum Rd, Gainesville, FL 32603',
      },
      {
        where: { name: 'Phelps Laboratory' }, returning: true, 
      }
    );
    console.log('Updated PhelpsLab.');  
    }
    
   console.log("Use these calls to test that your functions work. Use console.log statements in each so you can look at the terminal window to see what is executing. Also check the database.")
   //Calling all the functions to test them
   retrieveAllListings() 
   removeCable(); 
   addDSIT();
   updatePhelpsLab();
   findLibraryWest();