const express = require('express');
const mongoose = require('mongoose');
const travelsdata = require('../DB/villas_apartmentDB');
const route = express.Router();



function checkdate(cin,cout,ctime,otime){




}

route.post('/new', async (req, res) => {
    let info = req.body;
    
  console.log(info);

  let store={};
  store.v_no=info.v_no;
store.name=info.name;
store.price=info.price;
store.nb_of_persons=info.nb_of_persons;
store.rating=info.rating;
store.city=info.city;
  store.location=info.location;
  store.image=info.image;
  store.tags=info.tags;


  let ft = new travelsdata(info);
  await ft.save().then(result=>{

    res.json(
      {
        message:"Save success  "+info.name, 
  data:info,
  "status":true,
  "code":200
  
      });
  
  })
  .catch(err=>{
    res.json(
      {
        message:err, 
  data:info,
  "status":true,
  "code":200
  
      });
  
  }
    )
  });


  route.post('/searchdate', async (req, res) => {
  
    let data = req.query;



  
  
  });  

route.post('/search', async (req, res) => {
    let data = req.query;
    var out;

    var regext = new RegExp(data.name, "i");

    for (var i in data){
      if(data[i]==""){
        delete data[i]
      }
    } 

    if(data.name!=null )
  data.name={ '$regex' : regext};

  var regexl = new RegExp(data.location, "i");

  
  if(data.location!=null)
  data.location={ '$regex' : regexl}
  


  var regexc = new RegExp(data.city, "i");

  
  if(data.city!=null)
  data.city={ '$regex' : regexc}
  



  if(data.price!=null){
  data.price={$gte:data.price};  

}

if(data.nb_of_persons!=null){
  data.nb_of_persons={$gte:data.nb_of_persons};  

} 

console.log("search query ", data );
     out=await travelsdata.find(data);




  
    if(out.length==0){

  res.json(
    
    {
      "data":out,
    "message":"Not found",
    "status":false,
    "code":404
    
  }
    );  
  

 }else{
  res.json(
    
    {"data":out,
    "message":"Found data",
    "status":true,
    "code":200
    }
    );  
  

  }
  });


  route.post('/book', async (req, res) => {
   
    let datareq = req.body;
  let bookdata={};
  bookdata.user_id=datareq.user_id; 
  bookdata.v_no=datareq.v_no;  

  bookdata.name=datareq.name;
bookdata.location=datareq.location;
bookdata.price=datareq.price;

bookdata.details=datareq.details;

let bookingreq =datareq.Bookingdetails;
var outt;
let out=await travelsdata.find({"v_no":bookdata.v_no})
.then(result=>{
  console.log("Out : ",result);
  outt=result;
})
.catch(err=>{
  res.json(
    {
      "data":bookdata, 
    message:"Error Booking ! "+err,
    "status":false,
    "code":500
   
    }
    );  

})
console.log("out",out);

if(outt == undefined){
  res.json(
    {
      "data":bookdata, 
    message:"No data found  ",
    "status":false,
    "code":404
   
    }
    );  

}
else{

let i_data={
  v_no:bookdata.v_no,
  user_id:bookdata.user_id,
  name:bookdata.name,
  price:bookdata.price,
  location:bookdata.location,
  nb_of_person:datareq.nb_of_person,
  userinfo:datareq.userinfo,
  details:datareq.details
}

await travelsdata.updateOne(

  {v_no:bookdata.v_no},
  { $inc: { bookcount : 1 },
  $push:{ bookingdetails : i_data  }
}

).then(result=>{
  console.log(result);
      res.json(
     {
       "data":i_data, 
     message:"Booked successfully",
     "status":true,
     "code":200
    
     }
     );
})
.catch(err=>{
  res.json(
    {
      "data":bookdata, 
    message:"Error Booking ! "+err,
    "status":false,
    "code":500
   
    }
    );  

})


}
  });


  route.get('/all', async (req, res) => {
  
  
    
  
    let out=await travelsdata.find();
    res.json({
      "message" :"Fetched all data successfully",
      "data":out,
      "status":true,
      "code":200
     });  
 
  });
 
  
  route.post('/bookingforuser', async (req, res) => {
  
  
    let id=req.query.user_id;
    let k=0;
    console.log(req.query.user_id);
  
    let out=await travelsdata.find();
   
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
    response.Data=bd;
    response.status=true,
    response.message="Not Found";
    response.code=404;
   
      res.json(response);  
    
  }
  else{
  let response={};
  response.Data=bd;
  
  response.status=true,
  response.message="Found data";
  response.code=200;

  console.log(response);
    res.json(response);  
  }  
  });
  

module.exports = route;
