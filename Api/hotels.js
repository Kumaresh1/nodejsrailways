const express = require('express');
const mongoose = require('mongoose');
const hotelsdata = require('../DB/hoteldb');
const imgdata = require('../DB/imgdb');

const route = express.Router();



route.post('/new', async (req, res) => {
    let info = req.body;
    
 // console.log(info);
  let ft = new hotelsdata(info);
  await ft.save();
  
  res.json(
    {
    "data":info,
   "message": "Hotel "+info.hno+ " Saved success  "+info.name,
   "status":true,
   "code":200
  
  });  
  
  });



route.post('/search', async (req, res) => {
    let data = req.query;
    
 // console.log(req.body);

  let name=data.name;
  var regex = new RegExp(name, "i");

  data.name={ '$regex' : regex}

console.log("data : ",regex,data);

  for (var i in data){
    if(data[i]==""){
      delete data[i]
    }
  }
  
    let out=await hotelsdata.find(data);
    
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

// route.post('/book', async (req, res) => {
   
//     let datareq = req.body;
//   let bookdata={};
//   bookdata.hno=datareq.hno;  
// bookdata.name=datareq.name;
// bookdata.location=datareq.location;
// bookdata.cost=datareq.cost;

// let insdata={};
// insdata.id=datareq.id;
// insdata.hno=datareq.hno;  
// insdata.name=datareq.name;
// insdata.location=datareq.location;
// insdata.cost=datareq.cost;

// insdata.details=[datareq.details];
// let bookingreq =datareq.details;


//   console.log("Booking req\n",bookingreq);

//   var rtype,rc;  
//   for (var i in bookingreq)
//   {
//         rtype=i;
//         rc=bookingreq[i];
//         break;
//   }


//     let out=await hotelsdata.find(bookdata);
    

//    if(out.length==0){
//     res.json(
        
//       {"data":out,
//       "message":"Not found ! Booking failed",
//       "status":true,
//       "code":404
//       }
//       );  
//    }

//    else{

// let tot_room=out[0].totalrooms;

// let new_tot=tot_room;

// console.log("total room ",tot_room);

// let checkroom={};
// for(let t=0;t<tot_room.length;tot_room++){

//   console.log("tttt : ",tot_room[t]);

// if(tot_room[t].type==rc){
  
//  checkroom=tot_room[t];
 
//  savetotal=tot_room[t];
 
//  console.log("savee : -------> ",savetotal);
 
//  break;
// }
// }

  
//     var atype,ac;  
//    for (var j in checkroom)
//    {
    
//         if(j==rtype && checkroom[j]==rc){
            
//             if(checkroom["available"]==0)
//             {
//                 res.json(
        
//                   {"data":out[0],
//                   "message":"Room full",
//                   "status":true,
//                   "code":200
//                   }
//                   );
            
//             }
//             else{

              
//                 //book update booking details and minus room
                

//                 var myquery = bookdata;


//                 let full=insdata;

               

//                 console.log("savetotal.avai ",out[0].totalrooms)
//              //   savetotal.available=12;
//                 console.log("thiss erooeee  :  ",savetotal)
//               savetotal.available-=datareq.details.quantity;
//                 // Availablerooms:checkroom,Bookingdetails:{j:checkroom[j]}}
//                 var newvalues = { $set: {totalrooms:savetotal},$addToSet: {bookingdetails:full } };
//                 await hotelsdata.updateOne(myquery, newvalues, function(err, res) {
//                   if (err) throw err;

//                   console.log("\n\tRoom updated");
                 
//                   //res.json(out);  
//                 });
//             }

//         }

//    }
//    res.json(
//     {
//       "data":insdata, 
//     message:"Booked successfully",
//     "status":true,
//     "code":200
    
//     }
//     );

//   //  console.log(out);
    
 
// }
//   });


  route.post('/book',async(req,res)=>{


    let datareq = req.body;
console.log(datareq);
if(datareq=={}){
  res.json("USE DATA IN BODY");
}

  
  let insdata={};
 insdata.user_id=datareq.user_id;
  insdata.hno=datareq.hno;  
  insdata.name=datareq.name;
  insdata.location=datareq.location;
  insdata.cost=datareq.cost;
  
  insdata.details=datareq.details;
  insdata.userinfo=datareq.userinfo;



let room_type=datareq.details[0].type;
let room_quan=datareq.details[0].quantity;



let bookingreq =datareq.details;

await hotelsdata.updateOne(

  {hno:insdata.hno},
  { $inc: { "totalrooms.$[element].available" : -room_quan },
  $addToSet:{ bookingdetails : insdata }
},
  { 
    arrayFilters: [ { "element.type": { $eq: room_type } } ]
  }

).then(result=>{
      res.json(
     {
       "data":insdata, 
     message:"Booked successfully",
     "status":true,
     "code":200
    
     }
     );
})
.catch(err=>{
  res.json(
    {
      "data":insdata, 
    message:"Error Booking ! "+err,
    "status":false,
    "code":500
   
    }
    );  

})

  });


  route.get('/allhotels', async (req, res) => {
  
  
    
  
    let out=await hotelsdata.find();
    res.json({
      "data":out,
      "message":"Fetched all Hotels",
      "status":true,
      "code":200
      
    });  
 
  });
  

  
  
  route.post('/bookingforuser', async (req, res) => {
  
  
    let id=req.query.user_id;
    let k=0;
    console.log(req.query.id);
  
    let out=await hotelsdata.find();
   
  console.log(out[1].bookingdetails.length)
  
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
