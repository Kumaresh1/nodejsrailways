const mongoose = require('mongoose');

const fdata = new mongoose.Schema({
  
  flight_num:{
    type:Number,
    unique:true
  },
  
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
  departure_airport:{
type:String
  },

  destination_airport:{
    type:String
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
      type:String
  },
 
  type:{
      type:String,
  },
  bookingdetails:{
    type:Array
   }
});

module.exports = User = mongoose.model('flight', fdata);
