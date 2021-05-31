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
        "Data":data,
     "Message": "Saved success for "+data.TrainName,
     "Status":true,
     "Code":200
     
    
    });  
    
  });


route.post('/book', async (req, res) => {
    const { from, to,date,type } = req.body;
    let data = {};
    
    data.from=req.body.from;
    data.to=req.body.to;
    data.date=req.body.date;
    data.type=req.body.type;

    let out=await findtrains.find(data);
console.log(out);
    if(out[0]==undefined){
      res.status("404").json(
      
        {
          "data":data,
        "messsage":"Not Found",
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
    res.json("Updated Seats !");
  }

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


route.get('/allbookings', async (req, res) => {
  
  let data = req.params;
  
console.log(req.params);

  let out=await findtrains.find();



 // console.log(data);
  res.json(out[0].Bookingdetails);  
  
});

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
