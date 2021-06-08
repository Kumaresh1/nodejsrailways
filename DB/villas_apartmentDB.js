const mongoose = require('mongoose');


const villadata = new mongoose.Schema({
    
  v_no:{
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
  price:{
    type:Number
  },
  nb_of_persons:{
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
    default:[{"tag1":"Breakfast Complimentary"},{"tag2":"Swimming Pool"},{"tag3":"Free wifi"}]
  },

  bookingdetails:{
    type:Array
  },

  bookcount:{
    type:Number,
    default:0
  }
  



  });
  
  module.exports = villadb = mongoose.model('Villa', villadata);
  
