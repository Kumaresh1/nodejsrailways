const express = require('express');
const mongoose = require('mongoose');
const findtrains = require('../DB/selfdriveDB');
const route = express.Router();

route.post('/search', async (req, res) => {
  let data = req.query;


  var regex = new RegExp(data.name, "i");

  data.name={ '$regex' : regex}

  var regex1 = new RegExp(data.pickup_location, "i");

  data.pickup_location={ '$regex' : regex1}

  var regex2 = new RegExp(data.drop_location, "i");

  data.drop_location={ '$regex' : regex2}


for (var i in data){
  if(data[i]==""){
    delete data[i]
  }
}

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


    let data = {};

    var datacon=req.body;

    data.car_number=datacon.car_number;
    data.pickup_location=datacon.pickup_location;
    data.drop_location=datacon.drop_location;
    data.name=datacon.name;
    data.ac=datacon.ac;
    data.price=datacon.price;
    data.rating=datacon.rating;
    data.tnc=datacon.tnc;
    data.date=datacon.date;
    data.type=datacon.type;
    data.car_details=datacon.car_details;
     console.log("req : \t",data);

    let ft = new findtrains(data);
    await ft.save()
    .then(result=>{

      res.json(
        {
          "data":data,
        "message":"Saved success for "+data.name,
        "status":true,
        "code":200    
  
        }
      ); 

    })
    .catch(err=>{

      res.json(
        {
          "data":err,
        "message":"SAVE ERROR  ",
        "status":false,
        "code":500    
  
        }
      ); 
    })
    
     
    
  });


  route.post('/book', async (req, res) => {
   
    let data = {};
    
    let datacon=req.body;


    data.car_number=datacon.car_number;
    data.pickup_location=datacon.pickup_location;
    data.drop_location=datacon.drop_location;
    data.name=datacon.name;
    data.type=datacon.type;
    
    var quan_t=datacon.quantity;
    var type_t=datacon.type;

    let out=await findtrains.find({"car_number":data.car_number});
console.log("book req : ",data);
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
  var myquery = {"car_number":data.car_number};
    let full={};

     full.user_id=datacon.user_id;
     full.pickup_location=datacon.pickup_location;
    full.drop_location=datacon.drop_location;
    full.date=datacon.date;
   full.price=datacon.price;
full.details=datacon.details;

full.userinfo=datacon.userinfo;


 //   full.data=data;
    
  //$set: {seats:available-quan_t },
    var newvalues = { $addToSet: {bookingdetails:full } };
  
  


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
 
  res.json(
    
    {"data":out,
    "message":"Fetched all datas",
    "status":true,
    "code":200
    }
   );  
  
});

route.post('/bookingforuser', async (req, res) => {
  
  
  let id=req.query.user_id;
  let k=0;
 
  let out=await findtrains.find();
 

let bd=[];
let len=0;
for (let j=0;j<out.length;j++){
  len=out[j].bookingdetails.length;

     for(let i=0;i<len;i++){

     if(out[j].bookingdetails[i].user_id==id )
       { 
         console.log("iffff")
         bd[k]=out[j].bookingdetails[i];
         k+=1;
       }
     }

}

if(bd.length==0){
  let response={};
  response.data={
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
response.data=bd;
response.status=true,
response.message="Found data";
response.code=200;
  res.json(response);  
}  

});

module.exports = route;
