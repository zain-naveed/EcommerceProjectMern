import express from "express";
import Product from "../models/productModel";
import { isAuth, isAdmin } from "../util";
var multer = require('multer');
var storage = multer.diskStorage({
  destination: (req,file,cb)=>{
    cb(null,'./public/uploads')
  },
  filename: (req,file,cb)=>{
    cb(null, Date.now() +  file.originalname)
  }
})
var upload = multer({storage:storage})
var file = upload.single('image')
const router = express.Router();

router.get("/", async (req, res) => {
  const brand = req.query.category ? { category: req.query.category } : {};
  const searchKeyword = req.query.searchKeyword
    ? {
        name: {
          $regex: req.query.searchKeyword,
          $options: "i",
        },
      }
    : {};
  const sortOrder = req.query.sortOrder
    ? req.query.sortOrder === "lowest"
      ? { price: 1 }
      : { price: -1 }
    : { _id: -1 };
  const products = await Product.find({ ...brand, ...searchKeyword }).sort(
    sortOrder
  ).populate('shopid')
  // const products = await Product.find({ }).populate('shopid');
  res.send(products);
});
router.get("/shop",isAuth,isAdmin, async (req, res) => {
  var id = req.user._id
  console.log(id)
  
  const products = await Product.find({shopid:id}).populate('shopid','name')
  // console.log(products)
  res.send(products);
});

router.get("/:id", async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found." });
  }
});
router.post("/:id/reviews", isAuth, async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    const review = {
      name: req.body.name,
      rating: Number(req.body.rating),
      comment: req.body.comment,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((a, c) => c.rating + a, 0) /
      product.reviews.length;
    const updatedProduct = await product.save();
    res.status(201).send({
      data: updatedProduct.reviews[updatedProduct.reviews.length - 1],
      message: "Review saved successfully.",
    });
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});
router.put("/:id", isAuth, isAdmin, async (req, res) => {
  const productId = req.params.id;
  console.log(productId)
  const product = await Product.findById(productId);
  console.log(req.body.category)
  if (product) {
    product.name = req.body.name;
    product.price = req.body.price;
    product.image = req.body.image;
    product.brand = req.body.brand;
    product.category = req.body.category;
    product.countInStock = req.body.countInStock;
    product.description = req.body.description;
    const updatedProduct = await product.save();
    if (updatedProduct) {
      return res
        .status(200)
        .send({ message: "Product Updated", data: updatedProduct });
    }
  }
  return res.status(500).send({ message: " Error in Updating Product." });
});

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
  const deletedProduct = await Product.findById(req.params.id);
  if (deletedProduct) {
    await deletedProduct.remove();
    res.send({ message: "Product Deleted" });
  } else {
    res.send("Error in Deletion.");
  }
});
router.post("/zain",file, async(req,res)=>{
  console.log(req.file)
  var path = req.file.path.replace(/\\/g,'/');
var newPath = 'http://localhost:5000' + path.replace('public','');
console.log(newPath);
var product = new Product({
  image: newPath
})
var pro = await product.save();
if (pro) {
  return res
    .status(201)
    .send({ message: "New Product Created", data: pro });
}
return res.status(500).send({ message: " Error in Creating Product." });
})

router.post("/",file,isAuth, isAdmin,  async (req, res) => {
  console.log(req.file)
  // console.log(req.user._id)
  var id = req.user._id;
var path = req.file.path.replace(/\\/g,'/');
var newPath = 'http://localhost:5000' + path.replace('public','');
  var product = new Product({
    shopid: id,
    name: req.body.name, 
    price: req.body.price,
    image: newPath,
    brand: req.body.brand,
    category: req.body.category,
    countInStock: req.body.countInStock,
    description: req.body.description,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
  });
  var newProduct = await product.save();
  if (newProduct) {
    return res
      .status(201)
      .send({ message: "New Product Created", data: newProduct });
  }
  return res.status(500).send({ message: " Error in Creating Product." });
});

export default router;
