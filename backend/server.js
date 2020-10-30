import express from "express";
import path from "path";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import config from "./config";
import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";
import orderRoute from "./routes/orderRoute";
import uploadRoute from "./routes/uploadRoute";
var http = require('http');

const mongodbUrl = config.MONGODB_URL;
const url = 'mongodb://localhost/project';
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(()=> console.log("mongodb connected"))
  .catch((error) => console.log(error.reason));

const app = express();
http.createServer(app);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,  './public')))
// console.log(path.join(__dirname,'./public'))
// app.use("/api/uploads", uploadRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
app.use((req,res)=>{

  res.json("404 not found")
})
// app.get("/api/config/paypal", (req, res) => {
//   res.send(config.PAYPAL_CLIENT_ID);
// });
// app.use("/uploads", express.static(path.join(__dirname, "/../uploads")));
// app.use(express.static(path.join(__dirname, "/../frontend/public")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(`${__dirname}/../frontend/public/index.html`));
// });

app.listen(5000, () => {
  console.log("Server started at http://localhost:5000");
});
