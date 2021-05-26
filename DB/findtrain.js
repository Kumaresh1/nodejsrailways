const mongoose = require('mongoose');

const data = new mongoose.Schema({
  from: {
    type: String
  },
  to: {
    type: String
  },
  TrainName: {
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
  
  TotalTimehr: {
    type: Number
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

module.exports = User = mongoose.model('Train', data);
