const mongoose = require('mongoose');

const ldata = new mongoose.Schema({
  Username: {
    type: String
  },
  Password: {
    type: String
  },
  Email:{
      type:String
  },
  
 date:{
      type:String,
      default: Date.now
  }
  
});

module.exports = User = mongoose.model('Login', ldata);
