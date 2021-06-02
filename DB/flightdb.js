const mongoose = require('mongoose');

const fdata = new mongoose.Schema({
  from: {
    type: String
  },
  to: {
    type: String
  },
  name: {
    type: String,
    unique:true
  },
  airlinesname: {
    type: String
  },
  departuretime: {
    type: String
  },
  destinationtime: {
    type: String
  },
  seats: {
    type: Number
  },
  fare: {
    type: Number
  },
  
  totaltimehr: {
    type: Number
  },
  
 date:{
      type:String,
      default: Date.now
  },
  type:{
      type:String,
      default:"Second class"
  },
  bookingdetails:{
    type:Array
   }
});

module.exports = User = mongoose.model('flight', fdata);
