const mongoose = require('mongoose');

const fdata = new mongoose.Schema({
  from: {
    type: String
  },
  to: {
    type: String
  },
  Name: {
    type: String
  },
  AirlinesName: {
    type: String
  },
  DepartureTime: {
    type: String
  },
  DestinationTime: {
    type: String
  },
  seats: {
    type: Number
  },
  Fare: {
    type: Number
  },
  
  TotalTimehr: {
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
  Bookingdetails:{
    type:Array
   }
});

module.exports = User = mongoose.model('flight', fdata);
