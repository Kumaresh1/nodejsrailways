const mongoose = require('mongoose');

const bdata = new mongoose.Schema({
  from: {
    type: String
  },
  to: {
    type: String
  },
  busname: {
    type: String
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
  
  totaltimeinhr: {
    type: Number
  },
  intermediatestops:{
    type:Array
  },
  traveler_name:{
    type:String
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

module.exports = User = mongoose.model('Bus', bdata);
