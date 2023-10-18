/* Import Sequalize and other libraires */
import { Sequelize, Model, DataTypes } from '@sequelize/core';

  //imports dontenv module and allows us to access stored environment variables stored in .env file
  import 'dotenv/config';

//Connects to the database
const sequelize = new Sequelize(process.env.API_URL, {
  //Need to specify that this is a postgres database
  dialect : 'postgres',
  define: {
    //Disables the timestamp fields (createdAt, updatedAt)
    timestamps: false,
  },
});

const Listing = sequelize.define('Listing', {  
  // Model attributes are defined here
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true, 
  },
  //name attribute
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  coordinates: {
    // JSONB for storing JSON data
    type: DataTypes.JSONB, 
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
}, {
  // Other model options go here
  tableName: 'Listings'
});

// `sequelize.define` also returns the model
console.log(Listing === sequelize.models.Listing); // true
console.log(Listing);
export { Listing };