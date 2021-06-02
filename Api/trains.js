const express = require('express');
const mongoose = require('mongoose');
const findtrains = require('../DB/findtrain');
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
    "status":true,
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
    data.TrainName=req.body.TrainName;
    data.ArrivalTime=req.body.ArrivalTime;
    data.DestinationTime=req.body.DestinationTime;
    data.TotalTimehr=req.body.TotalTimehr;
    data.Fare=req.body.Fare;
    data.seats=req.body.seats;
    data.date=req.body.date;
    data.type=req.body.type;
  
  console.log(data);
    let ft = new findtrains(data);
    await ft.save();
    
    res.json(
      {
        "data":data,
     "message": "Saved success for "+data.TrainName,
     "status":true,
     "code":200
     
    
    });  
    
  });


route.post('/book', async (req, res) => {
    const { from, to,date,type } = req.body;
    let data = {};
    
    let datacon=req.body;
    data.from=datacon.from;
    data.to=datacon.to;
    data.date=datacon.date;
    data.type=datacon.type;
    
    var quan_t=datacon.details.quantity;
    var type_t=datacon.details.type;

    let out=await findtrains.find(data);
console.log(out);
    if(out[0]==undefined){
      res.code("404").json(
      
        {
          "data":data,
        "messsage":"Not Found",
        "code":404,
        "status":true
        
        }
        );
    }
    else{


  console.log("Available : "+out[0].seats);

  let available=out[0].seats;
  if(available==0){
    res.json({
      "data":data,
     "message": "Seats are full",
     "status":true,
     "code":500
     
    });
  }
  else{
  var myquery = data;
    let full={};

    full.id=datacon.id;
    full.from=datacon.from;
    full.to=datacon.to;
    full.date=datacon.date;
    full.type=datacon.type;
full.details=datacon.details;


    full.data=data;
    
  
    var newvalues = { $set: {seats:available-quan_t },$addToSet: {Bookingdetails:full } };
  
  


    await findtrains.updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("1 seat updated");
      
    });
    res.json({
      "data":full,
     "message": "Seats Updated",
     "status":true,
     "code":200
     
    });
  }

    }
});

route.get('/fetchall', async (req, res) => {
  
  let data = req.params;
  
console.log(req.params);

  let out=await findtrains.find(data);
 // console.log(data);
 
  res.json({
    "data":out,
     "message": "Fetched all data",
     "status":true,
     "code":200
     
  });  
  
 
});



route.post('/bookingforuser', async (req, res) => {
  
  
  let id=req.query.id;
  let k=0;
  console.log(req.body.id);

  let out=await findtrains.find();
 
console.log(out[1].Bookingdetails.length)

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
console.log(out[0].Bookingdetails.length);

if(bd.length==0){
  let response={};
  response.Data={
    "id":id,
    "details":bd
    
  };
  response.status=true,
  response.message="Not Found";
  response.code=404;
 
    res.json(response);  
  
}
else{
let response={};
response.Data={
  "id":id,
  "details":bd
};
response.status=true,
response.message="Found data";
response.code=200;
  res.json(response);  
}  

});


module.exports = route;
