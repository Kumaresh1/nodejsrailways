const express = require('express');
const mongoose = require('mongoose');
const hotelsdata = require('../DB/hoteldb');
const route = express.Router();

route.post('/new', async (req, res) => {
    let info = req.body;
    
  console.log(info);
  


  let ft = new hotelsdata(info);
  await ft.save();
  
  res.json("Hotel Saved success  "+info.Name);  



    
  });

  route.post('/search', async (req, res) => {
    let data = req.body;
    
  console.log(req.body);
  
    let out=await hotelsdata.find(data);
    res.json(out);  
    
  });


  route.post('/book', async (req, res) => {
   
    let datareq = req.body;
  let bookdata={};
  bookdata.Hno=datareq.Hno;  
bookdata.Name=datareq.Name;
bookdata.Location=datareq.Location;
bookdata.Cost=datareq.Cost;

let insdata={};
insdata.Hno=datareq.Hno;  
insdata.Name=datareq.Name;
insdata.Location=datareq.Location;
insdata.Cost=datareq.Cost;

insdata.Bookingdetails=datareq.details;
let bookingreq =datareq.Details;

  console.log(bookdata);
var rtype,rc;  
  for (var i in bookingreq)
  {
        rtype=i;
        rc=bookingreq[i];
        break;
  }


    let out=await hotelsdata.find(bookdata);
    
console.log("outtt : >>>>");
   console.log(out);

   if(out.length==0){
    res.json("not found");   
   }

   else{
   let checkroom =out[0].Availablerooms;
console.log(checkroom);
    var atype,ac;  
   for (var j in checkroom)
   {
        if(j==rtype){
            console.log("Found it : "+j);
            if(checkroom[j]==0)
            {
                res.send("Room full");
            
            }
            else{
                //book update booking details and minus room
                console.log("else part");
                console.log(out[0].Availablerooms[j]);
                checkroom[j]=checkroom[j]-1;
                console.log("checkroom");
                console.log(checkroom);
                

                var myquery = bookdata;
                // Availablerooms:checkroom,Bookingdetails:{j:checkroom[j]}}
                var newvalues = { $set: {Availablerooms:checkroom,Bookingdetails:{type:j,count:checkroom[j]+1}}};
                await hotelsdata.updateOne(myquery, newvalues, function(err, res) {
                  if (err) throw err;
                  console.log("\n\tRoom updated");
                  //res.json(out);  
                });
            }

        }

   }
 

  //  console.log(out);
    
   res.json("Booked successfully"); 
}
  });


  route.get('/allhotels', async (req, res) => {
  
  
    
  
    let out=await hotelsdata.find();
    res.json(out);  
 
  });
  

module.exports = route;
