const express = require('express');
const mongoose = require('mongoose');
const findtrains = require('../DB/busdb');
const route = express.Router();

route.post('/search', async (req, res) => {
  let data = req.body;
  
console.log(req.body);

  let out=await findtrains.find(data);
 // console.log(data);
  res.json(
    
    {"data":out,
    "message":"Fetched all datas"
    }
    );  
  
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
      "message":"Saved success for "+data.BusName
    

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

  console.log("Available : "+out[0].seats);

  let available=out[0].seats;
  if(available==0){
    res.json("Sorry, Seats are full !");
  }
  else{
  var myquery = data;
    var newvalues = { $set: {seats:available-1 } };
    await findtrains.updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("1 seat updated");
      
    });
    res.json(
      
      {
        "data":data,
      "messsage":"Updated Seats !"
      
      }
      );
  }
});

route.get('/fetchall', async (req, res) => {
  
  let data = req.params;
  
console.log(req.params);

  let out=await findtrains.find(data);
 // console.log(data);
  res.json(out);  
  
});


module.exports = route;
