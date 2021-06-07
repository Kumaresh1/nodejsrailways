const mongoose = require('mongoose');

const data = new mongoose.Schema({
  from: {
    type: String
  },
  to: {
    type: String
  },
  trainname: {
    type: String,
    unique:true
  },
  train_id:{
    type:String,
    unique:true
  },
  departure_station:{
    type:String
  },
  destination_station:{
    type:String
  },
  arrivaltime: {
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
  stops: {
    type: Array
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
