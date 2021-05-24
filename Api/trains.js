const express = require('express');
const mongoose = require('mongoose');
const findtrains = require('../DB/findtrain');
const route = express.Router();

route.post('/search', async (req, res) => {
  const { from, to,date,type } = req.body;
  let data = {};
  data.from=from;
  data.to=to;
  data.date=date;
  data.type=type;
console.log(data);

  let out=await findtrains.find(data);
  console.log(data);
  res.json(out);  
  
});

route.post('/save', async (req, res) => {
    const { from, to,name,start,end,date,seats,type } = req.body;
    let data = {};
    data.from=from;
    data.to=to;
    data.TrainName=name;
    data.StartTime=start;
    data.EndTime=end;
    data.seats=seats;
    data.date=date;
    data.type=type;
  
  console.log("req : \t"+req.body);
    let ft = new findtrains(data);
    await ft.save();
    
    res.json("Saved sucess");  
    
  });


route.post('/book', async (req, res) => {
    const { from, to,date,type } = req.body;
    let data = {};
    data.from=from;
    data.to=to;
    data.date=date;
    data.type=type;
    let out=await findtrains.find(data);

  console.log("Available"+out[0].seats);
  let available=out[0].seats;
      var myquery = data;
    var newvalues = { $set: {seats:available-1 } };
    await findtrains.updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("1 seat updated");
      
    });
    res.json("Updated");
});

module.exports = route;
