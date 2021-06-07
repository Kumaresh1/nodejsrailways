const mongoose = require('mongoose');


const hdata = new mongoose.Schema({
    
  hno: {
    type: Number,
    unique:true
  },
  

    name: {
      type: String
    },
    
    location: {
      type: String
    },
    cost: {
        type: Number
      },
      
      totalrooms: {
        type:Array
      },
  
      
      tags: {
        type: String
      },
 
      
      bookingdetails: {
        type: Array
      },
      images:{
        type:Array
      }


  });
  
  module.exports = hoteldb = mongoose.model('bookhotel', hdata);
  
