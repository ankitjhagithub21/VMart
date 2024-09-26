const express = require('express')
const isAuthenticated = require('../middlewares/isAuthenticated')
const upload = require('../config/multer');
const { addProduct, deleteProduct, getAllProducts, getProductById } = require('../controllers/productController')
const productRouter = express.Router()

productRouter.post("/",isAuthenticated,upload.single('image'),addProduct)
productRouter.delete("/:productId",isAuthenticated,deleteProduct)
productRouter.get("/",getAllProducts)
productRouter.get("/:productId",getProductById)

module.exports = productRouter
