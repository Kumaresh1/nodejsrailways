const express = require('express');
const connectDB = require('./DB/Conncection');
const app = express();
var fs = require('fs');
var path = require('path');
connectDB();
app.use(express.json({ extended: false }));
//app.use(express.urlencoded({extended:false}));
app.set('view engine','ejs')





app.use('/api/userModel', require('./Api/User'));

app.use('/api/find', require('./Api/trains'));
app.use('/flights', require('./Api/flights'));
app.use('/hotel', require('./Api/hotels'));
app.use('/bus', require('./Api/bus'));
app.use('/travel', require('./Api/travel'));

app.use('/user', require('./Api/login'));
app.use('/holiday', require('./Api/holidaypackage'));

app.use('/offer', require('./Api/offerapi'));
app.use('/cab', require('./Api/cab'));

app.get('/',(req,res)=>
{
    res.render('index')
})

const Port = process.env.PORT || 3000;

app.listen(Port, () => console.log('Server started at '+Port));
