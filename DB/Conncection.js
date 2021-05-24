const mongoose = require('mongoose');

const URI ="mongodb+srv://kumaresh:kikida@cluster0.4fnnx.mongodb.net/Railways?retryWrites=true&w=majority";

const connectDB = async () => {
  await mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  console.log('db connected..!');
};

module.exports = connectDB;
