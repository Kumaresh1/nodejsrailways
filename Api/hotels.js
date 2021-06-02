const express = require('express');
const mongoose = require('mongoose');
const hotelsdata = require('../DB/hoteldb');
const imgdata = require('../DB/imgdb');

const route = express.Router();

var fs = require('fs');
var path = require('path');

var multer = require('multer');


// var storage = multer.diskStorage({


// 	destination: (req, file, cb) => {

//     cb(null, 'Api/uploads')
// 	},
// 	filename: (req, file, cb) => {
// 		cb(null, file.fieldname + '-' + 1);
//     console.log("SAVEDD");
// 	}
// });

// var upload = multer({ storage: storage });



// route.get('/', (req, res) => {

//   imgdata.find({}, (err, items) => {
//       if (err) {
//           console.log(err);
//           res.status(500).send('An error occurred', err);
//       }
//       else {
//           res.render('ok', { items: items });
//       }
//   });
// // });

// route.get('/getimg', (req, res) => {
  
// let response={};

// let searchobj={
//   name:req.query.name+""
// };

// let count=0;
// console.log(searchobj)
//   imgdata.find(searchobj, (err, items) => {
//       if (err) {
//           console.log(err);
//           res.status(500).send('An error occurred', err);
//       }


//       else {



//         items.forEach(function(image) {
// response.data={
//   data:image.img.data.toString('base64'),
// Name:image.name,
// Decription:image.desc
// }

// response.Status=true;
// response.Code=200;

//         });

// if(Object.keys(response).length==0){
//   res.json({
//     message:"Not Found",
//     data:searchobj,
//     "status":true,
//     "code":200
//   });
// }
// else{
//   console.log(response.length)
// res.json(response);
//        } }
//   });

// });



// route.post('/postimg', upload.single('image'), (req, res, next) => {
 
//   var obj = {
//       name: req.body.name,
//       desc: req.body.desc,
//        img: {
//            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
//            contentType: 'image/png'
//        }
//   }
//   imgdata.create(obj, (err, item) => {
//       if (err) {
//           console.log(err);
//       }
//       else {
//            item.save();
         
//       }
//   });

//   res.json({
//     "data":obj,
//     "message": "Image Saved success  "+req.body.name,
//     "status":true,
//     "code":200
   

//   });
// });

// route.post('/postdata', async (req, res) => {

// console.log(req);
// res.json("ppp");

// });

route.post('/new', async (req, res) => {
    let info = req.query;
    
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
    let data = req.body;
    
  console.log(req.body);
  
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


    let datareq = req.query;

  
  let insdata={};
  insdata.id=datareq.id;
  insdata.hno=datareq.hno;  
  insdata.name=datareq.name;
  insdata.location=datareq.location;
  insdata.cost=datareq.cost;
  
  insdata.details=[datareq.details];



let room_type=datareq.details.type;
let room_quan=datareq.details.quantity;



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
  
  
    let id=req.query.id;
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
  
  
        if(out[j].bookingdetails[i].id==id )
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
