import express from 'express';
import Order from '../models/orderModel';
import Product from '../models/productModel';
import mongoose from 'mongoose';
import { isAuth, isAdmin } from '../util';
import {admin} from './adminOrder';

const router = express.Router();

router.get("/customer", isAuth,isAdmin, async (req, res) => {
  // to view each user only  when  they pass the order
  console.log(req.user._id)
  var adminid = req.user._id;
  var id = adminid.toString();
  console.log(mongoose.Types.ObjectId.isValid(id))
  var pro = '5f2e921a8bec2326d49efa09'
  var orderitems = '5f2e94b8b0c8f924b078f164'
const newOrder = await Order.find({}).populate({
  path:'orderItems',
  populate:{
    path: 'product',
    model: 'Product',
    
  }
})

// const newOrder = await Order.find({'user':req.user._id}).populate('user')

res.send(newOrder);
  // const orders = await Order.find({}).populate('user')
  // res.send(orders);
});

router.get("/mine", isAuth, async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.send(orders);
});

router.get("/:id", isAuth, async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id });
  if (order) {
    res.send(order);
  } else {
    res.status(404).send("Order Not Found.")
  }
});

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id });
  if (order) {
    const deletedOrder = await order.remove();
    res.send(deletedOrder);
  } else {
    res.status(404).send("Order Not Found.")
  }
});

// ---------------- check speicfic user in nested document ye abi sahi ni working ni kr rha ab hum order sy check kry gy
// router.post("/admin/user/add",isAuth,async (req,res)=>{
//   var productid = '5f40d4b5a7f7b01e00e2f5a7';
//   console.log(req.user._id)
// var product = await Product.findById({_id:productid})

// product.order.push({orderid:'5f40d702a7f7b01e00e2f5b0',userid:req.user._id})
// var update = await product.save();
// res.send(product)
// product.order.forEach(element => {
//   if(element.userid == req.user._id){
//     newData(product);
//     console.log(data)
//   }
// });
// console.log("zain")
  
// });

// router.get("/admin/zain",isAuth,isAdmin,async (req,res)=>{
//   var orderid = req.params.id;
//   var adminid = req.user._id;
//   var porductId = '5f2d5e1c498fe915603bf8e4';
//   const product = await Product.find({}).populate({
//     path:'order',
//     populate:{
//       path:'orderid',
//       model:'Order'
//     }
//   }).find({'shopid':adminid, 'order': { $elemMatch: { 'orderStatus': true  } }});
//   res.send(product)

// });

// router.post("/admin/:id",isAuth,async (req,res)=>{
//   var orderid = req.params.id; 
//   var porductId = '5f2e921a8bec2326d49efa09';
//   const product = await Product.findById(porductId);
//   if(product){
//     product.order.push({orderid:orderid});
//     var updateProduct = await product.save();
//     res.send(updateProduct)
//   }
  
// });
router.put("/admin/get/:id",isAuth,isAdmin,async (req,res)=>{
  const order = await Order.findOneAndUpdate({_id:req.params.id},{isDelivered:true})
  const update = await order.save();
  res.send(update);
})
router.get("/admin/get", isAuth,isAdmin, async (req, res) => {
 
  var admin = req.user._id;
  const newordes = await Order.aggregate([
    { $lookup: {
      from: "users",
      localField: "user",
      foreignField: "_id",
      as: "user"
  } },
    { $unwind: "$orderItems" },
      { $match: { 'orderItems.shopid': {$eq : mongoose.Types.ObjectId(admin)} }},
      { $match: { 'isDelivered': {$eq : false} }},
      // { $set:{'orderItems.price':99}},
      { $unwind: {
        path: "$orderItems.shopid",
         preserveNullAndEmptyArrays: true
    } }, 
    { $lookup: {
      from: "products",
      localField: "orderItems.product",
      foreignField: "_id",
      as: "product"
  } },
  { $unwind: "$orderItems" },
  { $group: {
    _id: "$_id",
    user: {$first:"$user"},
    isDelivered:{$first:"$isDelivered"},
    orderItems: { $push: {shop:"$orderItems.shopid",price:"$orderItems.price",orderdeliver:"$orderItems.orderdeliver",image:"$orderItems.image",product:"$product" }}
} },
      
  ])
  
    
 

  res.send(newordes)
  });
  // router.post("/admin/perProduct", isAuth,isAdmin, async (req, res) => {
    
  //   var orderid = req.query.order;
  //   var product = req.query.product;
    
  //   var admin = req.user._id;
    
  //   const newordes = await Order.aggregate([
  //     { $lookup: {
  //       from: "users",
  //       localField: "user",
  //       foreignField: "_id",
  //       as: "user"
  //   } },
  //     { $unwind: "$orderItems" },
  //     { $match:   {'orderItems.shopid':mongoose.Types.ObjectId(admin)}},
  //       { $match:   {'_id':mongoose.Types.ObjectId(orderid)}},
  //       { $match:   {'orderItems.product':mongoose.Types.ObjectId(product)}},
  //       {$set:{'orderItems.orderdeliver':true}},
  //       { $unwind: {
  //         path: "$orderItems.shopid",
  //          preserveNullAndEmptyArrays: true
  //     } }, 
  //     { $lookup: {
  //       from: "products",
  //       localField: "orderItems.product",
  //       foreignField: "_id",
  //       as: "product"
  //   } },
  //   { $unwind: "$orderItems" },
  //   { $group: {
  //     _id: "$_id",
  //     user: {$first:"$user"},
  //     orderItems: { $push: {shop:"$orderItems.shopid",orderdeliver:"$orderItems.orderdeliver",price:"$orderItems.price",image:"$orderItems.image",product:"$product" }}
  // } },
        
  //   ])
      
   
  
  //   res.send(newordes)
  //   });
  //   router.get("/admin/perProduct/z", isAuth,isAdmin, async (req, res) => {
    
  //     var orderid = req.query.order;
  //     var product = req.query.product;
      
  //     var admin = req.user._id;
      
  //     const newordes = await Order.aggregate([
  //       { $lookup: {
  //         from: "users",
  //         localField: "user",
  //         foreignField: "_id",
  //         as: "user"
  //     } },
  //       { $unwind: "$orderItems" },
  //       // { $match:   {'orderItems.shopid':mongoose.Types.ObjectId(admin)}},
        
  //         { $match:{'orderItems.orderdeliver':false}},
  //         { $unwind: {
  //           path: "$orderItems.shopid",
  //            preserveNullAndEmptyArrays: true
  //       } }, 
  //       { $lookup: {
  //         from: "products",
  //         localField: "orderItems.product",
  //         foreignField: "_id",
  //         as: "product"
  //     } },
  //     { $unwind: "$orderItems" },
  //     { $group: {
  //       _id: "$_id",
  //       user: {$first:"$user"},
  //       orderItems: { $push: {shop:"$orderItems.shopid",orderdeliver:"$orderItems.orderdeliver",price:"$orderItems.price",image:"$orderItems.image",product:"$product" }}
  //   } },
          
  //     ])
      
        
     
    
  //     res.send(newordes)
  //     });
router.post("/admin", isAuth, admin);

router.post("/", isAuth, async (req, res) => {
  const newOrder = new Order({
    orderItems: req.body.orderItems,
    user: req.user._id,
    shipping: req.body.shipping,
    payment: req.body.payment,
    itemsPrice: req.body.itemsPrice,
    taxPrice: req.body.taxPrice,
    shippingPrice: req.body.shippingPrice,
    totalPrice: req.body.totalPrice,
  });
  const newOrderCreated = await newOrder.save();
  res.status(201).send({ message: "New Order Created", data: newOrderCreated });
});

router.put("/:id/pay", isAuth, async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.payment = {
      paymentMethod: 'paypal',
      paymentResult: {
        payerID: req.body.payerID,
        orderID: req.body.orderID,
        paymentID: req.body.paymentID
      }
    }
    const updatedOrder = await order.save();
    res.send({ message: 'Order Paid.', order: updatedOrder });
  } else {
    res.status(404).send({ message: 'Order not found.' })
  }
});

export default router;