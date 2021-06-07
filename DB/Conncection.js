const mongoose = require('mongoose');


mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

//const URI ="mongodb+srv://kumaresh:kikida@cluster0.4fnnx.mongodb.net/Railways?retryWrites=true&w=majority";
const URI ="mongodb+srv://kumaresh:kikida@cluster0.4fnnx.mongodb.net/Hotel?retryWrites=true&w=majority";

const connectDB = async () => {
  await mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  console.log('db connected..!');
};

module.exports = connectDB;
