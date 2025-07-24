const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const Cart = mongoose.model(
  "Cart",
  new mongoose.Schema({
    userId: String,
    items: [
      {
        productId: String,
        quantity: Number,
      },
    ],
  })
);

router.post("/cast/add", async (req, res) => {
  try {
    const { productId, quantity = 1, user } = req.body;
    if (!productId || !user) {
      return res
        .status(400)
        .json({ message: "Productid and user is required" });
    }

    let cart = await Cart.findOne({ userId: user, status: "active" });

    if (!cart) {
      cart = new Cart({ userId: user, items: [], status: "active" });
    }
    const existingitemIndex = cast.oyems.findIndex(
      (item) => items.productId === productId
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += parseInt(quantity);
    } else {
      cart.items.push({
        productId,
        quantity: parseInt(quantity),
      });
    }
    cart.upadateAt = new data();
    await cart.save();
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal server error,items has not been added" });
  }
});

router.get("/cart", async (req, res) => {
  try {
    const carts = await Cart.find({});

    if (carts.length > 0) {
      res.status(200).json({
        success: true,
        count: carts.length,
        data: carts,
      });
    }
  } catch (error) {
    console.log("error fetching cart", error);
    res.status(500).json({
      success: false,
      message: "Failes to fetch data",
      error: error.message,
    });
  }
});

//Delete route=assignment

//router.delete("/cart/:id",async(req,res)=.{
//    //check if items is there in the cart,-do the delete operations.
//    //is item is not there-err to user
// })
module.exports = router;
