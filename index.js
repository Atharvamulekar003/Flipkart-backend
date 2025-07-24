const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser=require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const {router:authRoutes,authenticateJWT}=require("./auth");
const cartRouter=require("./cart");
app.use(authRoutes);
app.use(cartRoutes);


mongoose.connect(
  "mongodb+srv://atharvamulekar03:<Atharva603>@cluster0.ip8kbep.mongodb.net/ecommerce",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
 app.get("/product",async(req,res)=>{
  try{
  const product=await Product.find();
  res.json(product);
 }catch(error){
  res.status(500).json({error:"There is internal server error"});
 }
 });

app.get('/product/:id',async(req,res)=>{
  try{
    const product=await Product.findById(req.params.id);
    if(!product){
      return res.status(404).json({message:"The items that you were searching for does not exists"});
    }else{
      res.json(product);
    }
  }catch(error){
    res.status(500).json({error:"Server error"});
  }
});

app.listen(8080, () => {
  console.log("server is running on part 8080");
});
