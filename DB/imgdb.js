const mongoose = require('mongoose');


const Idata = new mongoose.Schema({
    

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
  
  module.exports = imgdb = mongoose.model('hotelimg', Idata);
  
