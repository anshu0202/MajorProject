import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
    brainTreePaymentController,
    braintreeTokenController,
    createProductController,
    deleteProductController,
    getProductController,
    getSingleProductController,
    productCategoryController,
    productCountController,
    productFiltersController,
    productListController,
    productPhotoController,
    realtedProductController,
    searchProductController,
    updateProductController
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
//Create Products || POST
router.post("/create-product", requireSignIn, isAdmin, formidable(), createProductController)
// 1/product/create-product
//Update Product || POST
router.put("/update-product/:pid", requireSignIn, isAdmin, formidable(), updateProductController)

//Get All Products || GET
router.get("/get-product", getProductController);

//Get Single Product || GET
router.get("/get-product/:slug", getSingleProductController);

//Get Photo || GET
router.get("/product-photo/:pid", productPhotoController)

// Delete Product || delete
router.delete("/delete-product/:pid", requireSignIn, isAdmin, deleteProductController);

//Filter Product || get
router.post("/product-filters", productFiltersController);

//Product Count || get
router.get("/product-count", productCountController);

//Product per Page || get 
router.get('/product-list/:page', productListController);

//Search Product || get
router.get("/search/:keyword" , searchProductController);

//Related Products || get
router.get("/related-product/:pid/:cid", realtedProductController);

// category wise Product || get
router.get("/product-category/:slug" , productCategoryController);

//payment routes
//token

router.get("/braintree/token" , braintreeTokenController);

//payments braintree
router.post("/braintree/payment" , requireSignIn , brainTreePaymentController)



export default router;