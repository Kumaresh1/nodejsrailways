const express = require('express');
const mongoose = require('mongoose');
const findtrains = require('../DB/busdb');
const route = express.Router();

route.post('/search', async (req, res) => {
  let data = req.body;
  
console.log(req.body);

  let out=await findtrains.find(data);
 // console.log(data);
 if(out.length==0){

  res.json(
    
    {"data":out,
    "message":"Not found",
    "status":false,
    "code":404
    }
    );  
  

 }else{
  res.json(
    
    {"data":out,
    "message":"Search datas",
    "status":true,
    "code":200
    }
    );  
  

  }
});

route.post('/save', async (req, res) => {


    const { from, to,name,start,end,totaltime,fare,date,seats,type } = req.body;
    let data = {};
    data.from=req.body.from;
    data.to=req.body.to;
    data.BusName=req.body.BusName;
    data.ArrivalTime=req.body.ArrivalTime;
    data.DestinationTime=req.body.DestinationTime;
    data.TotalTime=req.body.TotalTime;
    data.Fare=req.body.Fare;
    data.seats=req.body.seats;
    data.date=req.body.date;
    data.type=req.body.type;
  data.IntermediateStops=req.body.IntermediateStops;
  console.log("req : \t"+data);
    let ft = new findtrains(data);
    await ft.save();
    
    res.json(
      {
        "data":data,
      "message":"Saved success for "+data.BusName,
      "status":true,
      "code":200    

      }
    );  
    
  });


route.post('/book', async (req, res) => {
   
    let data = {};
    data.from=req.body.from;
    data.to=req.body.to;
    data.date=req.body.date;
    data.type=req.body.type;
    let out=await findtrains.find(data);

    if(out[0]==undefined){
      res.status("404").json(
      
        {
          "data":data,
          "message":"Not Found",
          "status":true,
          "code":404        
        }
        );
    }
    else{

    

  console.log("Available : "+out[0].seats);

  let available=out[0].seats;
  if(available==0){
    res.json("Sorry, Seats are full !");
  }
  else{
  var myquery = data;

  let full={};

  full[req.body.id]=data;
  

  var newvalues = { $set: {seats:available-1 },$addToSet: {Bookingdetails:full } };


  
    await findtrains.updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("1 seat updated");
      
    });
    res.json(
      
      {
        "data":data,
      "messsage":"Updated Seats !",
      "status":true,
      "code":200
      }
      );
  }

}
});

route.get('/fetchall', async (req, res) => {
  
  let data = req.params;
  
console.log(req.params);

  let out=await findtrains.find(data);
 // console.log(data);
  res.json(
    
    {"data":out,
    "message":"Fetched all datas",
    "status":true,
    "code":200
    }
   );  
  
});

// route.get('/allbookings', async (req, res) => {
  
//   let data = req.params;
  
// console.log(req.params);

//   let out=await findtrains.find();



//  // console.log(data);
//   res.json(out[0].Bookingdetails);  
  
// });

route.post('/bookingforuser', async (req, res) => {
  
  
  let id=req.body.id;
  let k=0;
  console.log(req.body.id);

  let out=await findtrains.find();
 
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

  response.status=true;
  response.code=404;
  response.message="Not Found";
 
    res.json(response);  
  
}
else{
let response={};
response.data={
  "Id":id,
  "Details":bd
};

response.status=true;
response.code=200;
response.message="Booking Successfull";

  res.json(response);  
}  
});

module.exports = route;
