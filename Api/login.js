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
    response.data=data;
    response.code="404";
    response.status="false";
    response.message="Login Failed ! User not found";
    res.status("404").json(response);
    

 }
else{

    if(data.Username =="" || data.Password =="" ){

        res.json({
            "data":data,
    
        "status": true,
    
        "code": 400,
            "message":"Invalid Credentials"
        })
    }
    else if(data.Username ==undefined || data.Password ==undefined ){
    res.json({"data":data,"message":"Some Fields are Missing"})
    }
    

else    if(out[0].Password==password){

        response.data=out[0];
        response.code="200";
        response.status="true";
        response.message="Login Successful";
        
          res.json(response);
    }  
    else{
        response.data=out;
        response.code="400";
        response.status="true";
        response.message="Wrong Password";
        
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
       response.data=data;
       response.code="400";
       response.status="false";
       response.message="Signup Failed ! Username already taken";
       res.status("400").json(response);
       
   
    }
    else if(out1.length!=0){
        response.data=data;
        response.code="400";
        response.status="false";
        response.message="Signup Failed ! Email already taken";
        res.status("400").json(response);
        
    
     }
   else{
    
    if(data.Username =="" || data.Password =="" || data.Email ==""){

            res.json({
                "data":data,

            "status": true,
        
            "code": 400,
                "message":"Invalid Credentials"
            })
    }
    else if(data.Username ==undefined || data.Password ==undefined || data.Email ==undefined){
        res.json({"data":data,"message":"Some Fields are Missing"})
    }
    else{
  console.log(data);
    let ft = new findtrains(data);
    await ft.save();
    
    res.json({

        

            "data":data ,
        
            "status": true,
        
            "code": 200,
        
            "message": "User registration Successful"
        
        
    });  
    }
}
  });

  route.get('/allusers', async (req, res) => {
  
  
    
  
    let out=await findtrains.find();
    res.json(
        {
        "data":out,
        
        "status": true,
        
        "code": 200,
    
        "message":"Successfully fetched all users"
        }
        );  
 
  });

  route.get('/searchuser', async (req, res) => {
  
  
    
  let ph=req.query;
    let out=await findtrains.find(ph);
    res.json(
        {
        "data":out,
        
        "status": true,
        
        "code": 200,
    
        "message":"Successfully fetched all users"
        }
        );  
 
  });

module.exports = route;
