const express = require('express');
const mongoose = require('mongoose');
const travelsdata = require('../DB/traveldb');
const route = express.Router();

route.post('/newtravel', async (req, res) => {
    let info = req.body;
    
  console.log(info);
  


  let ft = new travelsdata(info);
  await ft.save();
  
  res.json(
    {
      message:"Travel Save success  "+info.PackageName, 
data:info
  
    });
    
  });

  route.post('/search', async (req, res) => {
    let data = req.body;
    
  console.log(req.body);
  
    let out=await travelsdata.find(data);
    res.json(
      {
        
      "data":out
      
      });  
    
  });


  route.post('/book', async (req, res) => {
   
    let datareq = req.body;
  let bookdata={};
 
  bookdata.Pno=datareq.Pno;  
bookdata.PackageName=datareq.PackageName;
bookdata.Location=datareq.Location;
bookdata.Cost=datareq.Cost;



let bookingreq =datareq.Bookingdetails;



    let out=await travelsdata.find(bookdata);
    console.log("**************");
    let a=11+"";
   


    console.log("**************");
   let count_booking=Number(out[0].BookCount);
let alreadybooked={};
    console.log("yes");
    for(let i=1;i<count_booking+1;i++)
    alreadybooked[i+""]=out[0].Bookingdetails[i+""];

alreadybooked[count_booking+1+""]=bookingreq;

   console.log("--------------------");
   
 
   var myquery = bookdata;


   let full={};

   full[req.body.id]={"data":bookdata,
   "details":bookingreq
  };


   // Availablerooms:checkroom,Bookingdetails:{j:checkroom[j]}}
   var newvalues = { $set: {
       
       BookCount:count_booking+1
    },
    $addToSet: {Bookingdetails:full }
    
    };
   await travelsdata.updateOne(myquery, newvalues, function(err, res) {
     if (err) throw err;
     console.log("\n\tRoom updated");
     //res.json(out);  
   });

  //  console.log(out);

  res.json(
    {
     "message" :"Booked successfully",
     "data":bookdata
    }
  ); 

  });


  route.get('/alltravel', async (req, res) => {
  
  
    
  
    let out=await travelsdata.find();
    res.json(out);  
 
  });
 
  route.post('/bookingforuser', async (req, res) => {
  
  
    let id=req.body.id;
    let k=0;
    console.log(req.body.id);
  
    let out=await travelsdata.find();
   
  console.log(out[1].Bookingdetails.length)
  
  let bd=[];
  let len=0;
  for (let j=0;j<out.length;j++){
     len=out[j].Bookingdetails.length;
  
        for(let i=0;i<len;i++){
  console.log("yes",out[j].Bookingdetails[i][id]);
  
  
        if(out[j].Bookingdetails[i][id]!=undefined )
          { 
            console.log("iffff")
            bd[k]=out[j].Bookingdetails[i][id];
            k+=1;
          }
        }
  
  }
  console.log(out[0].Bookingdetails.length);
  
  if(bd.length==0){
    let response={};
    response.data={
      "id":id,
      "details":bd
      
    };
    response.message={
      "status":true,
      "code":"404",
      "message":"Not Found"
    }
      res.json(response);  
    
  }
  else{
  let response={};
  response.data={
    "id":id,
    "details":bd
  };
  response.message={
    "status":true,
    "code":"200",
    "message":"Fetch Successfull"
  }
    res.json(response);  
  }  
  });
  

module.exports = route;
