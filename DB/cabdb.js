const mongoose = require('mongoose');

const bdata = new mongoose.Schema({
  pickup_location: {
    type: String
  },
  drop_location: {
    type: String
  },
  name: {
    type: String,
    unique:true
  },
  ac: {
    type: String
  },
  time: {
    type: String
  },
  price: {
    type: Number
  },
  rating: {
    type: Number
  },
  
  tnc: {
    type: String
  },
  type: {
    type: String
  },
  no_of_persons:{
    type: Number
  },
 date:{
      type:String,
      default: Date.now.toString()
  },
bookingdetails:{
 type:Array
}

});

module.exports = User = mongoose.model('Cabs', bdata);
