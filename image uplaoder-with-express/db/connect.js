const mongoose = require('mongoose');

// mongodb uri
const dbUrl = process.env.MONGODB_URI;

const connection = async () => {
  console.log("Connecting To Mongodb Database...")
  try {
    const mongo = await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    if (mongo.connection.readyState === 1) {
      console.log('Mongoose is connected to the database.');
      return true;
    } else {
      console.log('Mongoose is not connected to the database.');
      return false;
    }
  }
  catch (error) {
    console.error('Mongoose connection error:', error);
  }
};

module.exports = connection;