const mongoose = require('mongoose');


const holidaydata = new mongoose.Schema({
    
  package_no:{
    type:Number,
    unique:true
  },
  location: {
    type: String
  },
  name:{
    type:String
  },
  starting_price:{
    type:Number
  },
  image:{
    type:String
  } ,
  packages:{
    type:Array
  },

  bookingdetails:{
    type:Array
  }


  



  });
  
  module.exports = hoteldb = mongoose.model('Holiday', holidaydata);
  
