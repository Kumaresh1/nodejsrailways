const express = require('express');
const mongoose = require('mongoose');
const findtrains = require('../DB/logindb');
const route = express.Router();


route.post('/login', async (req, res) => {
  let data = {};
  let ph=req.query;
let uname=ph.Username;
let password=ph.Password;

data.Username=uname;

let out=await findtrains.find(data);
 // console.log(data);
 data.Password=password;


 let response={};

 

  if(out.length==0){
    response.Data=data;
    response.Code=404;
    response.Status=true;
    response.Message="Login Failed ! User not found";
    res.status("404").json(response);
    

 }
else{

    if(data.Username =="" || data.Password =="" ){

        res.json({
            "Data":data,
    
        "Status": true,
    
        "Code": 400,
            "Message":"Invalid Credentials"
        })
    }
    else if(data.Username ==undefined || data.Password ==undefined ){
    res.json({"Data":data,
    "Message":"Some Fields are Missing",
  "Status":true,
"Code":400})
   
}
    

else    if(out[0].Password==password){

        response.Data=out[0];
        response.Code=200;
        response.Status=true;
        response.Message="Login Successful";
        
          res.json(response);
    }  
    else{
        response.Data=out;
        response.Code=400;
        response.Status=true;
        response.Message="Wrong Password";
        
          res.json(response);
        
    }
}
});

route.post('/signup', async (req, res) => {


    let data = {};
    let ph=req.query;
    console.log(ph);
    data.Username=ph.Username;
    data.Email=ph.Email;
    data.Password=ph.Password;

    let out=await findtrains.find({Username:data.Username});
    let out1=await findtrains.find({Email:data.Email});
    
    let response={};
   
    if(out.length!=0){
       response.Data=data;
       response.Code=400;
       response.Status=false;
       response.Message="Signup Failed ! Username already taken";
       res.status("400").json(response);
       
   
    }
    else if(out1.length!=0){
        response.Data=data;
        response.Code=400;
        response.Status=false;
        response.Message="Signup Failed ! Email already taken";
        res.status("400").json(response);
        
    
     }
   else{
    
    if(data.Username =="" || data.Password =="" || data.Email ==""){

            res.json({
                "Data":data,

            "Status": true,
        
            "Code": 400,
                "Message":"Invalid Credentials"
            })
    }
    else if(data.Username ==undefined || data.Password ==undefined || data.Email ==undefined){
        res.json({
          "Data":data,
        "Message":"Some Fields are Missing",

        "Status": true,
        
        "Code": 400
      })
    }
    else{
  console.log(data);
    let ft = new findtrains(data);
    await ft.save();
    
    res.json({

        

            "Data":data ,
        
            "Status": true,
        
            "Code": 200,
        
            "Message": "User registration Successful"
        
        
    });  
    }
}
  });

  route.get('/allusers', async (req, res) => {
  
  
    
  
    let out=await findtrains.find();
    res.json(
        {
        "Data":out,
        
        "Status": true,
        
        "Code": 200,
    
        "Message":"Successfully fetched all users"
        }
        );  
 
  });

  route.get('/searchuser', async (req, res) => {
  
  
    
  let ph=req.query;
    let out=await findtrains.find(ph);
    res.json(
        {
        "Data":out,
        
        "Status": true,
        
        "Code": 200,
    
        "Message":"Successfully fetched all users"
        }
        );  
 
  });

module.exports = route;
