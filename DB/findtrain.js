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
  StartTime: {
    type: String
  },
  EndTime: {
    type: String
  },
  seats: {
    type: Number
  },
 date:{
      type:String,
      default: "24/05/2021"
  },
  type:{
      type:String,
      default:"general"
  }
});

module.exports = User = mongoose.model('Train', data);
