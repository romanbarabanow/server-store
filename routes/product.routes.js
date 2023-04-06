const { Router } = require("express");
const ProductContoller = require("../controllers/ProductController");
const middleware = require("../middleware/auth.moddleware");

const router = Router();

router.get("/product", ProductContoller.allProduct);
router.get("/product/sort", ProductContoller.sortProduct);
router.delete("/product", middleware, ProductContoller.removeProduct);
router.get("/product/category", ProductContoller.productByCategory);
router.post("/product/cart", middleware, ProductContoller.addToCart);
router.get("/product/cart", middleware, ProductContoller.getAllInCart);
router.delete("/product/cart", middleware, ProductContoller.removeItemFromCart);
router.get("/product/favourites", middleware, ProductContoller.getFavourites);
router.post("/product/favourites", middleware, ProductContoller.addToFavoutite);
router.delete(
  "/product/favourites",
  middleware,
  ProductContoller.removeFromFavourites
);

module.exports = router;
