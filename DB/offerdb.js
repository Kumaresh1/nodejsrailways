const mongoose = require('mongoose');


const offerdata = new mongoose.Schema({
    
  image:{
    type:String
  },
  title: {
    type: String
  },
  sub_title:{
    type:String
  },
  code:{
    type:String
  },
  tnc:{
    type:String
  } ,
  value:{
    type:Number
  },

    id:{
        type:String,
        unique:true
    },
    type:{
        type:String
    }


  



  });
  
  module.exports = hoteldb = mongoose.model('Offer', offerdata);
  

