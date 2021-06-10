const mongoose = require('mongoose');

const bdata = new mongoose.Schema({
  pickup_location: {
    type: String
  },
  drop_location: {
    type: String
  },

  car_number:{
    type:Number,
    unique:true
  },
  name: {
    type: String,
  
  },
  ac: {
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
 date:{
      type:String,
      default: Date.now.toString()
  },
bookingdetails:{
 type:Array
},
car_details:{
  type:Array
 }

});

module.exports = User = mongoose.model('Selfdrive', bdata);
