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
      Message:"Travel Save success  "+info.PackageName, 
Data:info,
"Status":true,
"Code":200

    });
    
  });

  route.post('/search', async (req, res) => {
    let data = req.body;
    
  console.log(req.body);
  
    let out=await travelsdata.find(data);

    if(out.length==0){

  res.json(
    
    {"Data":out,
    "Message":"Not found",
    "Status":true,
    "Code":404
    }
    );  
  

 }else{
  res.json(
    
    {"Data":out,
    "Message":"Search datas",
    "Status":true,
    "Code":200
    }
    );  
  

  }
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
     "Message" :"Booked successfully",
     "Data":bookdata,
     "Status":true,
     "Code":200
    }
  ); 

  });


  route.get('/alltravel', async (req, res) => {
  
  
    
  
    let out=await travelsdata.find();
    res.json({
      "Message" :"Fetched all data successfully",
      "Data":out,
      "Status":true,
      "Code":200
     });  
 
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
    response.Data={
      "id":id,
      "details":bd
      
    };
    response.Message={
      "Status":true,
      "Code":404,
      "Message":"Not Found"
    }
      res.json(response);  
    
  }
  else{
  let response={};
  response.Data={
    "id":id,
    "details":bd
  };
  response.message={
    "Status":true,
    "Code":200,
    "Message":"Fetch Successfull"
  }
    res.json(response);  
  }  
  });
  

module.exports = route;
