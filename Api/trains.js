const express = require('express');
const mongoose = require('mongoose');
const findtrains = require('../DB/findtrain');
const route = express.Router();


route.post('/search', async (req, res) => {

  let data = req.query;
  

  
  var searchdata={};

  for (var i in data){
    if(data[i]==""){
      delete data[i]
    }
  }

console.log(data);

  let out=await findtrains.find(data);

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


    let data = {};
    let d_con=req.body;

    data.from=d_con.from;
    data.train_id=d_con.train_id;
    data.to=d_con.to;
    data.stops=d_con.stops;

    data.departure_station=d_con.departure_station;
    data.destination_station=d_con.destination_station;
    
    data.trainname=d_con.trainname;
   
    data.arrivaltime=d_con.arrivaltime;
    data.destinationtime=d_con.destinationtime;
    data.totaltimehr=d_con.totaltimehr;
    data.fare=d_con.fare;
    data.seats=d_con.seats;
    data.date=d_con.date;
    data.type=d_con.type;
  
  console.log(data);
    let ft = new findtrains(data);
    await ft.save()
    .then(result=>{

      res.json(
        {
          "data":data,
       "message": "Saved success for "+data.trainname,
       "status":true,
       "code":200
       
      
      });

    })
    .catch(err=>{

      res.status("500").json(
        {
          "data":data,
       "message": "Saved Failed with err  "+err,
       "status":false,
       "code":500
       
      
      });
    })
    
      
    
  });


route.post('/book', async (req, res) => {
   
  let data = {};
    
    let datacon=req.body;

    data.from=datacon.from;
    data.to=datacon.to;
    data.date=datacon.date;
    data.type=datacon.type;
    data.fare=datacon.fare;
    data.trainname=datacon.trainname;
    
    var quan_t=datacon.quantity;
    var type_t=datacon.type;

    let out=await findtrains.find(data);
console.log(out);
    if(out[0]==undefined || datacon.user_id==null){
      res.status("404").json(
      
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

    full.user_id=datacon.user_id;
     full.from=datacon.from;
    full.to=datacon.to;
    full.date=datacon.date;
    full.fare=datacon.fare
    full.trainname=datacon.trainname;
   
full.details=[{
  type:datacon.type,
  quantity:datacon.quantity,
  tier:datacon.details[0].tier,
  source_station:datacon.details[0].source_station,
  destination_station:datacon.details[0].destination_station

}];

full.userinfo=datacon.userinfo;

 //   full.data=data;
    
  
    var newvalues = { $set: {seats:available-quan_t },$addToSet: {bookingdetails:full } };
  
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
  
  
  let id=req.query.user_id;
  let k=0;
  console.log(req.body.id);

  let out=await findtrains.find();
 
//console.log(out[1].bookingdetails.length)

let bd=[];
let len=0;
for (let j=0;j<out.length;j++){
  len=out[j].bookingdetails.length;

     for(let i=0;i<len;i++){
// console.log("yes",out[j].bookingdetails[i].id);


     if(out[j].bookingdetails[i].user_id==id )
       { 
         console.log("iffff")
         bd[k]=out[j].bookingdetails[i];
         k+=1;
       }
     }

}
console.log(out[0].bookingdetails.length);

if(bd.length==0){
  let response={};
  response.data=bd;
  response.status=true,
  response.message="Not Found";
  response.code=404;
 
    res.json(response);  
  
}
else{
let response={};
response.data=bd;
response.status=true,
response.message="Found data";
response.code=200;
  res.json(response);  
}  

});


module.exports = route;
