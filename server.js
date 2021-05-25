const express = require('express');
const connectDB = require('./DB/Conncection');
const app = express();

connectDB();
app.use(express.json({ extended: false }));
app.set('view engine','ejs')


app.use('/api/userModel', require('./Api/User'));

app.use('/api/find', require('./Api/trains'));
app.get('/',(req,res)=>
{
    res.render('index')
})

const Port = process.env.PORT || 3000;

app.listen(Port, () => console.log('Server started at '+Port));
