const mongoose = require('mongoose');

const data = new mongoose.Schema({
  from: {
    type: String
  },
  to: {
    type: String
  },
  trainname: {
    type: String
  },
  arrivaltime: {
    type: String
  },
  destinationTime: {
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
      default:"general"
  },
  bookingdetails:{
    type:Array
   }
});

module.exports = User = mongoose.model('Train', data);
