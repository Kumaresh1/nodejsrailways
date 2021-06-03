const express = require('express');
const mongoose = require('mongoose');
const travelsdata = require('../DB/offerdb');
const route = express.Router();




route.post('/newoffer', async (req, res) => {
    let info = req.body;
    
  console.log(info);

  let store={};
  store.image=info.image;
  store.title=info.title;
  store.sub_title=info.sub_title;
store.code=info.code;
store.tnc=info.tnc;
  

  let ft = new travelsdata(info);
  await ft.save()
  .then(result=>{

    res.json(
      {
        message:"Offer Save success  "+info.title, 
  data:info,
  "status":true,
  "code":200
  
      });
  
  });

  
    
  });

route.post('/search', async (req, res) => {
    let data = req.body;
    

    for (var i in data){
        if(data[i]==""){
          delete data[i]
        }
      }
  console.log(req.body);
  
    let out=await travelsdata.find(data);

    if(out.length==0){

  res.json(
    
    {
      "data":out,
    "message":"Not found",
    "status":false,
    "code":404
    
  }
    );  
  

 }else{
  res.json(
    
    {"data":out,
    "message":"Found data",
    "status":true,
    "code":200
    }
    );  
  

  }
  });



  route.get('/alloffers', async (req, res) => {
  
  
    
  
    let out=await travelsdata.find();
    res.json({
      "message" :"Fetched all data successfully",
      "data":out,
      "status":true,
      "code":200
     });  
 
  });
 
  
  

module.exports = route;
