const express = require("express");

const {
  fetchCartItems,
  addToCart,
  updateCartQuantity,
  deleteCartItem,
} = require("../../controllers/shop/cart-controller");

const router = express.Router();

router.post("/add", addToCart);
router.get("/get/:userId", fetchCartItems);
router.put("/update-cart", updateCartQuantity);
router.delete("/:userId/:productId", deleteCartItem);

module.exports = router;
