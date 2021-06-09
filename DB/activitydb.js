const mongoose = require('mongoose');


const villadata = new mongoose.Schema({
    
  activity_number:{
    type:Number,
    unique:true
  },
  location: {
    type: String
  },
  name:{
    type:String,
    unique:true
  },
  sub_name:{
    type:String
  },
  
  price:{
    type:Number
  },
 
  rating:{
    type:Number
  },
  city:{
    type:String
  },
  image:{
    type:String
  } ,
  tags:{
    type:Array,
    default:[{"tag":"Breakfast Complimentary"},{"tag":"Swimming Pool"},{"tag":"Free wifi"}]
  },

  bookingdetails:{
    type:Array
  },
  bookcount:{
    type:Number,
    default:0
  },
  schedule:{
    type:String
  },
  category:{
    type:String
  }
  



  });
  
  module.exports = villadb = mongoose.model('Activity', villadata);
  
