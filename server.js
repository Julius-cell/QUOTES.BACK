const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

// ----------  UNCAUGHT EXCEPTIONS (NEW)  ----------
process.on('uncaughtException', err => {
  console.log(`${err.name}: ${err.message}`);
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  process.exit(1);
});
// ------------------------------------------

// ----------  LISTENING DB  ----------
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(con => {
  console.log('DB connection succesfully');
});
// --------------------------------


// ----------  LISTENING PORT  ----------
const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
  console.log(`App running in port: ${port}...`);
});
// --------------------------------


// ----------  UNHANDLED REJECTIONS (NEW) ----------
process.on('unhandledRejection', (err) => {
  console.log(`${err.name}: ${err.message}`);
  console.log('UNHANDLER REJECTION! Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});
// --------------------------------------------