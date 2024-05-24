const express = require('express')
const Order = require('../models/orders')
const router = express.Router()

router.post('/orderData', async (req, res) => {
  let data = req.body.order_data
  await data.splice(0,0,{Order_date:req.body.order_date})
  console.log("1231242343242354",req.body.email)

  //if email not exisitng in db then create: else: InsertMany()
  let eId = await Order.findOne({ 'email': req.body.email })    
  console.log(eId)
  console.log("bjbbj")
  if (eId===null) {
      try {
          console.log(data)
          console.log("",req.body.email)
          await Order.create({
              email: req.body.email,
              order_data:[data]
          }).then(() => {
            res.status(201).json({
                success:true,
              })
          })
      } catch (error) {
          console.log(error.message)
          res.send("Server Error", error.message)
            console.log("kuch gabad he")
      }
    }

  else {
      try {
          await Order.findOneAndUpdate({email:req.body.email},
              { $push:{order_data: data} }).then(() => {
                res.status(201).json({
                    success:true,
                  })
              })
      } catch (error) {
          console.log(error.message)
          res.send("Server Error", error.message)
      }
  }
})

router.post('/myOrderData', async (req, res) => {
    try {
        console.log(req.body.email)
        let mydata = await Order.findOne({ 'email': req.body.email })
        //console.log(eId)
        res.json({orderData:mydata})
    } catch (error) {
        res.send("Error",error.message)
    }
});


module.exports=router;