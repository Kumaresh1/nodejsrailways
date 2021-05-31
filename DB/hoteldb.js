const mongoose = require('mongoose');


const hdata = new mongoose.Schema({
    
  hno: {
    type: Number
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
        type:Object
      },
      availablerooms: {
        type: Object
      },
      
      tags: {
        type: Array
      },
 
      
      bookingdetails: {
        type: Array
      }


  });
  
  module.exports = hoteldb = mongoose.model('bookhotel', hdata);
  
