const mongoose = require('mongoose');
const express = require('express');
const app = express();
const mongoURI='mongodb+srv://sanavadwalamustafa:Mustafas53@cluster0.i3ry8bp.mongodb.net/Meetuthere?retryWrites=true&w=majority'

const mongoDb = mongoose.connect(mongoURI,)
  .then(async () => {
    console.log('Connected to MongoDB');
    const foodCollection = mongoose.connection.db.collection('food_items');
    console.log('agya');

    try {
      const data = await foodCollection.find({}).toArray();
     
      // console.log(global.food_items);
      const foodCategory=await mongoose.connection.db.collection('Categories');
      const data2=await foodCategory.find({}).toArray()
      global.food_items=data
      global.Categories=data2
      //console.log(global.Categories);
    } catch (err) {
      console.error(err);
    }
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
 

module.exports=mongoDb;