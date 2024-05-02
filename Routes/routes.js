const express=require('express');
const router=express.Router() 
const multerConfig = require('../Middlewares/multerMiddleware');
const productControllers = require('../Controllers/productControllers')
const userControllers = require('../Controllers/userController')
const jwtMiddleware = require('../Middlewares/jwtMiddlewares')

router.post("/upload",multerConfig.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:3000/images/${req.file.filename}`
    })
})

router.post("/addproduct",productControllers.addProducts);

router.post("/removeproduct",productControllers.removeProducts)

router.get('/allproducts',productControllers.getAllProducts)

router.post('/signup',userControllers.signup)

router.post('/login',userControllers.login)

router.get('/new-collections',productControllers.newCollections)

router.get('/popularproducts',productControllers.popularProducts)

router.post('/addtocart',jwtMiddleware,productControllers.addTocart)

router.post('/removefromcart',jwtMiddleware,productControllers.removeFromcart)

router.post('/getcart',jwtMiddleware,productControllers.getcart)

module.exports = router
