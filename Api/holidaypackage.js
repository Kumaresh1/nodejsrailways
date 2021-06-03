const express = require('express');
const mongoose = require('mongoose');
const travelsdata = require('../DB/holidaydb');
const route = express.Router();




route.post('/newholiday', async (req, res) => {
    let info = req.body;
    
  console.log(info);

  let store={};
  store.location=info.location;
  store.starting_price=info.starting_price;
  store.image=info.image;
  store.packages=info.packages;


  let ft = new travelsdata(info);
  await ft.save()
  .then(result=>{

    res.json(
      {
        message:"Holiday Save success  "+info.name, 
  data:info,
  "status":true,
  "code":200
  
      });
  
  });

  
    
  });

route.post('/search', async (req, res) => {
    let data = req.body;
    
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


  route.post('/book', async (req, res) => {
   
    let datareq = req.body;
  let bookdata={};
 
  bookdata.id=datareq.id;  
  bookdata.package_no=datareq.package_no;

  bookdata.title=datareq.title;
bookdata.location=datareq.location;
bookdata.price=datareq.price;

bookdata.details=datareq.details;

let bookingreq =datareq.Bookingdetails;

let out=await travelsdata.find({"packages.id":bookdata.id});

console.log(out[0].packages);

await travelsdata.updateOne(

  {package_no:bookdata.package_no},
  { $inc: { "packages.$[element].bookcount" : 1 },
  $addToSet:{ bookingdetails :[ {
    id:bookdata.id,
    title:bookdata.title,
    price:bookdata.price,
    location:bookdata.location,
    details:bookdata.details
  }] }
},
  { 
    arrayFilters: [ { "element.id": { $eq: bookdata.id } } ]
  }

).then(result=>{
  console.log(result);
      res.json(
     {
       "data":bookdata, 
     message:"Booked successfully",
     "status":true,
     "code":200
    
     }
     );
})
.catch(err=>{
  res.json(
    {
      "data":bookdata, 
    message:"Error Booking ! "+err,
    "status":false,
    "code":500
   
    }
    );  

})



  });


  route.get('/allpackages', async (req, res) => {
  
  
    
  
    let out=await travelsdata.find();
    res.json({
      "message" :"Fetched all data successfully",
      "data":out,
      "status":true,
      "code":200
     });  
 
  });
 
  
  route.post('/bookingforuser', async (req, res) => {
  
  
    let id=req.body.id;
    let k=0;
    console.log(req.query.id);
  
    let out=await travelsdata.find();
   
  let bd=[];
  let len=0;
  for (let j=0;j<out.length;j++){
     len=out[j].bookingdetails.length;
  
        for(let i=0;i<len;i++){
 // console.log("yes",out[j].bookingdetails[i].id);
  
  
        if(out[j].bookingdetails[i].id==id )
          { 
            console.log("iffff")
            bd[k]=out[j].bookingdetails[i];
            k+=1;
          }
        }
  
  }
  console.log(out[0].bookingdetails.length);
  
  if(bd.length==0){
    let response={};
    response.Data=bd;
    response.status=true,
    response.message="Not Found";
    response.code=404;
   
      res.json(response);  
    
  }
  else{
  let response={};
  response.Data=bd;
  
  response.status=true,
  response.message="Found data";
  response.code=200;

  console.log(response);
    res.json(response);  
  }  
  });
  

module.exports = route;
