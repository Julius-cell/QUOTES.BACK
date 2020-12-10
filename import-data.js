const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Quote = require('./models/quoteModel');


dotenv.config({ path: './config.env' });



// ------------- LISTENING DB  ------------
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB, {
// mongoose.connect(process.env.DATABASE_LOCAL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(con => {
  // console.log(con.connections);
  console.log('DB connection succesfully');
});
// -------------------------------------

// READ JSON FILE  
const quotes = JSON.parse(fs.readFileSync(`${__dirname}/data.json`, 'utf-8'));

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Quote.create(quotes);
    console.log('Data succesfully loaded!');
  } catch(err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Quote.deleteMany();
    console.log('Data succesfully deleted!');
  } catch(err) {
    console.log(err);
  }
  process.exit();
};

// Depens what do we want to do, we use one of the next commands
// 1. node dev-data/data/import-dev-data.js --import
// 2. node dev-data/data/import-dev-data.js --delete
if(process.argv[2] === '--import') {
  importData();
} else if(process.argv[2] === '--delete') {
  deleteData();
}

console.log(process.argv);
// -------------------------------------------