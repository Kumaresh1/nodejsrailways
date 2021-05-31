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
        type: Array
      },
      img:
      {
          data: Buffer,
          contentType: String
      },
      name:{
        type:String
      },
      desc:{
        type:String
      }


  });
  
  module.exports = hoteldb = mongoose.model('bookhotel', hdata);
  
