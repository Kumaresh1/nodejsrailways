const mongoose = require('mongoose');


const tdata = new mongoose.Schema({
    
  Pno: {
    type: Number
  },
  

    PackageName: {
      type: String
    },
    
    Location: {
      type: String
    },
    Cost: {
        type: Number
      },
      
      Description: {
        type:Object
      },
      TotalDays: {
        type: Object
      },
      
      Tags: {
        type: Array
      },
 
      
      Bookingdetails: {
        type: Array
      },
      BookCount:{
          type:Number
      }


  });
  
  module.exports = hoteldb = mongoose.model('Travel', tdata);
  
