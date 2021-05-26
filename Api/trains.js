const express = require('express');
const mongoose = require('mongoose');
const findtrains = require('../DB/findtrain');
const route = express.Router();

route.post('/search', async (req, res) => {
  let data = req.body;
  
console.log(req.body);

  let out=await findtrains.find(data);
 // console.log(data);
  res.json(out);  
  
});

route.post('/save', async (req, res) => {


    const { from, to,name,start,end,totaltime,fare,date,seats,type } = req.body;
    let data = {};
    data.from=req.body.from;
    data.to=req.body.to;
    data.TrainName=req.body.TrainName;
    data.ArrivalTime=req.body.ArrivalTime;
    data.DestinationTime=req.body.DestinationTime;
    data.TotalTime=req.body.TotalTime;
    data.Fare=req.body.Fare;
    data.seats=req.body.seats;
    data.date=req.body.date;
    data.type=req.body.type;
  
  console.log("req : \t"+data);
    let ft = new findtrains(data);
    await ft.save();
    
    res.json("Saved success for "+data.TrainName);  
    
  });


route.post('/book', async (req, res) => {
    const { from, to,date,type } = req.body;
    let data = {};
    data.from=from;
    data.to=to;
    data.date=date;
    data.type=type;
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
    res.json("Updated Seats ! Remaining : "+available-1);
  }
});

route.get('/fetchall', async (req, res) => {
  
  let data = req.params;
  
console.log(req.params);

  let out=await findtrains.find(data);
 // console.log(data);
  res.json(out);  
  
  res.json("ok ok");
});


module.exports = route;
