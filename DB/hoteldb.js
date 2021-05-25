const mongoose = require('mongoose');


const hdata = new mongoose.Schema({
    
  Hno: {
    type: Number
  },
  

    Name: {
      type: String
    },
    
    Location: {
      type: String
    },
    Cost: {
        type: Number
      },
      
      Totalrooms: {
        type:Object
      },
      Availablerooms: {
        type: Object
      },
      
      Tags: {
        type: Array
      },
 
      
      Bookingdetails: {
        type: Object
      }


  });
  
  module.exports = hoteldb = mongoose.model('bookhotel', hdata);
  
