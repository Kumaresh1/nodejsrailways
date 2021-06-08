const express = require('express');
const mongoose = require('mongoose');
const findtrains = require('../DB/flightdb');
const route = express.Router();

route.post('/search', async (req, res) => {
  let data = req.query;

  
  var regex = new RegExp(data.name, "i");

  data.name={ '$regex' : regex}

  var regexf = new RegExp(data.from, "i");

  data.from={ '$regex' : regexf}

  var regext = new RegExp(data.to, "i");

  data.to={ '$regex' : regext}

  var regex = new RegExp(data.name, "i");

  data.name={ '$regex' : regex}



  var regex1 = new RegExp(data.airlinesname, "i");

  data.airlinesname={ '$regex' : regex1}


for (var i in data){
  if(data[i]==""){
    delete data[i]
  }
}  

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
    "message":"Search data sucessful",
    "status":true,
    "code":200
    }
    );  
  

  }
  
});

route.post('/save', async (req, res) => {

let data={};

let d_con=req.body;

data.flight_num=d_con.flight_num;
    data.from=d_con.from;
    data.to=d_con.to;
    data.name=d_con.name;
    data.airlinesname=d_con.airlinesname;
    data.departure_airport=d_con.departure_airport;
    data.destination_airport=d_con.destination_airport;
    data.departuretime=d_con.departuretime;
    data.destinationtime=d_con.destinationtime;
    data.totaltimehr=d_con.totaltimehr;
    data.fare=d_con.fare;
    data.seats=d_con.seats;
    data.date=d_con.date;
    data.type=d_con.type;

  
  //console.log(data);
    let ft = new findtrains(data);
    await ft.save()
    .then(result=>{

      res.json(
      
        {
        "message":"Saved success for "+data.name,
      "data":data,
      "status":true,
      "code":200  
      }
        );  
        

    })
    .catch(err=>{

      res.json(
      
        {
        "message":err,
      "data":data,
      "status":false,
      "code":500  
      }
        );  
        

    })
    
   
  });


route.post('/book', async (req, res) => {
    
    let datacon=req.body;
let data={};
    data.from=datacon.from;
    data.to=datacon.to;
    data.date=datacon.date;
    data.type=datacon.type;
    data.flight_num=datacon.flight_num;
    
    var quan_t=datacon.details[0].quantity;
    var type_t=datacon.details[0].type;

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
   
full.details=datacon.details;
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
  //console.log(req.body.id);

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




route.delete('/deleteflight',async (req,res)=>{


let data=req.query;
let response={};

console.log(data);

const deldata={};
deldata.name=data.name;
  let out=await findtrains.deleteOne(deldata)
  .then(result=>{

    if(result.n==0){
    
      response.data=data;
response.status=false,
response.message="No match Found ! Delete failed";
response.code=500;


    }
    else{
    response.data=data;
response.status=true,
response.message="Delete Successful";
response.code=200;

    }
  })
  .catch(err=>{
    response.data=err;
response.status=false,
response.message="Delete failed";
response.code=500;

  })
 




  res.json(response);  



});

module.exports = route;
