const express = require('express');
const mongoose = require('mongoose');
const hotelsdata = require('../DB/hoteldb');
const imgdata = require('../DB/imgdb');

const route = express.Router();

var fs = require('fs');
var path = require('path');

var multer = require('multer');


var storage = multer.diskStorage({


	destination: (req, file, cb) => {

    cb(null, 'Api/uploads')
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + 1);
    console.log("SAVEDD");
	}
});

var upload = multer({ storage: storage });



route.get('/', (req, res) => {

  imgdata.find({}, (err, items) => {
      if (err) {
          console.log(err);
          res.status(500).send('An error occurred', err);
      }
      else {
          res.render('ok', { items: items });
      }
  });
});

route.get('/getimg', (req, res) => {
  
let response={};

let searchobj={
  name:req.query.name+""
};

let count=0;
console.log(searchobj)
  imgdata.find(searchobj, (err, items) => {
      if (err) {
          console.log(err);
          res.status(500).send('An error occurred', err);
      }


      else {



        items.forEach(function(image) {
response.Data={
  data:image.img.data.toString('base64'),
Name:image.name,
Decription:image.desc
}

response.Status=true;
response.Code=200;

        });

if(Object.keys(response).length==0){
  res.json({
    Message:"Not Found",
    Data:searchobj,
    "Status":true,
    "Code":200
  });
}
else{
  console.log(response.length)
res.json(response);
       } }
  });

});



route.post('/postimg', upload.single('image'), (req, res, next) => {
 
  var obj = {
      name: req.body.name,
      desc: req.body.desc,
       img: {
           data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
           contentType: 'image/png'
       }
  }
  imgdata.create(obj, (err, item) => {
      if (err) {
          console.log(err);
      }
      else {
           item.save();
         
      }
  });

  res.json({
    "Data":obj,
    "Message": "Image Saved success  "+req.body.name,
    "Status":true,
    "Code":200
   

  });
});

route.post('/postdata', async (req, res) => {

console.log(req);
res.json("ppp");

});

route.post('/new', async (req, res) => {
    let info = req.body;
    
 // console.log(info);
  


  let ft = new hotelsdata(info);
  await ft.save();
  
  res.json(
    {
    "Data":info,
   "Message": "Hotel Saved success  "+info.Name,
   "Status":true,
   "Code":200
  
  });  
  
  });

  route.post('/search', async (req, res) => {
    let data = req.body;
    
  console.log(req.body);
  
    let out=await hotelsdata.find(data);
    
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

route.post('/book', async (req, res) => {
   
    let datareq = req.body;
  let bookdata={};
  bookdata.Hno=datareq.Hno;  
bookdata.Name=datareq.Name;
bookdata.Location=datareq.Location;
bookdata.Cost=datareq.Cost;

let insdata={};
insdata.Hno=datareq.Hno;  
insdata.Name=datareq.Name;
insdata.Location=datareq.Location;
insdata.Cost=datareq.Cost;

insdata.details=datareq.Details;
let bookingreq =datareq.Details;

  
var rtype,rc;  
  for (var i in bookingreq)
  {
        rtype=i;
        rc=bookingreq[i];
        break;
  }


    let out=await hotelsdata.find(bookdata);
    

   if(out.length==0){
    res.json(
        
      {"Data":out,
      "Message":"Not found ! Booking failed",
      "Status":true,
      "Code":404
      }
      );  
   }

   else{
   let checkroom =out[0].Availablerooms;

    var atype,ac;  
   for (var j in checkroom)
   {
        if(j==rtype){
            console.log("Found it : "+j);
            if(checkroom[j]==0)
            {
                res.json(
        
                  {"Data":out[0],
                  "Message":"Room full",
                  "Status":true,
                  "Code":200
                  }
                  );
            
            }
            else{
                //book update booking details and minus room
                checkroom[j]=checkroom[j]-1;
                

                var myquery = bookdata;


                let full={};

                full[req.body.id]=insdata;

                // Availablerooms:checkroom,Bookingdetails:{j:checkroom[j]}}
                var newvalues = { $set: {Availablerooms:checkroom},$addToSet: {Bookingdetails:full } };
                await hotelsdata.updateOne(myquery, newvalues, function(err, res) {
                  if (err) throw err;
                  console.log("\n\tRoom updated");
                  //res.json(out);  
                });
            }

        }

   }
 

  //  console.log(out);
    
   res.json(
    {
      "Data":insdata, 
    Message:"Booked successfully",
    "Status":true,
    "Code":200
    
    }
    ); 
}
  });


  route.get('/allhotels', async (req, res) => {
  
  
    
  
    let out=await hotelsdata.find();
    res.json({
      "Data":out,
      "Message":"Fetched all Hotels",
      "Status":true,
      "Code":200
      
    });  
 
  });
  

  // route.get('/allbookings', async (req, res) => {
  
  //   let data = req.params;
    
  // console.log(req.params);
  
  //   let out=await findtrains.find();
  
  
  
  //  // console.log(data);
  //   res.json(out[0].Bookingdetails);  
    
  // });
  
  route.post('/bookingforuser', async (req, res) => {
  
  
    let id=req.body.id;
    let k=0;
    console.log(req.body.id);
  
    let out=await hotelsdata.find();
   
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
    response.Data={
      "id":id,
      "details":bd
      
    };
    response.Status=true,
    response.Message="Not Found";
    response.Code=404;
   
      res.json(response);  
    
  }
  else{
  let response={};
  response.Data={
    "id":id,
    "details":bd
  };
  response.Status=true,
  response.Message="Found data";
  response.Code=200;
    res.json(response);  
  }  
  });
  
module.exports = route;
