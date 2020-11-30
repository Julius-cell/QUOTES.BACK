const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

// ----------  LISTENING DB  ----------
// const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
// mongoose.connect(DB, {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useFindAndModify: false
// }).then(con => {
//   // console.log(con.connections);
//   console.log('DB connection succesfully');
// });

// --------------------------------


// ----------  LISTENING PORT  ----------
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`App running in port: ${port}...`);
});
// --------------------------------
