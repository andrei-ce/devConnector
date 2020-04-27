const mongoose = require('mongoose');
const config = require('config');
const DB = config.get('mongoURI');

const connectDB = async () => {
  try {
    mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('MongDB connected...');
  } catch (err) {
    console.error(err.message);
    //Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
