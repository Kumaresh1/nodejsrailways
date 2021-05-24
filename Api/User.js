const express = require('express');
const mongoose = require('mongoose');
const User = require('../DB/User');
const route = express.Router();

route.post('/', async (req, res) => {
  const { firstName, lastName } = req.body;
  let data = {};
  data.firstName = firstName+"2";
  data.lastName = lastName;
  data.status="done ra Gopal";
  let userModel = new User(data);
  await userModel.save();
  res.json(userModel);
});

route.get('/:id', async (req, res) => {
  
  let a=await User.find({firstName : "aaaaaaaaaaaaaaaaaaaaaaaaaa2"});
  console.log(a);
  res.json("ok ok");
});

module.exports = route;
