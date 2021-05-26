const mongoose = require('mongoose');

const bdata = new mongoose.Schema({
  from: {
    type: String
  },
  to: {
    type: String
  },
  BusName: {
    type: String
  },
  ArrivalTime: {
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
  
  TotalTimeinhr: {
    type: Number
  },
  IntermediateStops:{
    type:Array
  },
  
 date:{
      type:String,
      default: Date.now
  },
  type:{
      type:String,
      default:"general"
  }
});

module.exports = User = mongoose.model('Bus', bdata);
