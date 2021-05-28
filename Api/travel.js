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
    res.json(out);  
    
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
   console.log(alreadybooked)
 
   var myquery = bookdata;
   // Availablerooms:checkroom,Bookingdetails:{j:checkroom[j]}}
   var newvalues = { $set: {
       Bookingdetails:alreadybooked,
       BookCount:count_booking+1
    }
    
    };
   await travelsdata.updateOne(myquery, newvalues, function(err, res) {
     if (err) throw err;
     console.log("\n\tRoom updated");
     //res.json(out);  
   });

  //  console.log(out);

  res.json("Booked successfully"); 

  });


  route.get('/alltravel', async (req, res) => {
  
  
    
  
    let out=await travelsdata.find();
    res.json(out);  
 
  });
  

module.exports = route;
