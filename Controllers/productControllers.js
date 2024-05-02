const product = require("../Models/productModels");
const user = require("../Models/userModel");

exports.addProducts = async (req, res) => {

    let allproducts = await product.find({});
    let id;
    if (allproducts.length > 0) {
        let last_product_array = allproducts.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1
    } else {
        id = 1;
    }
    const products = new product({
        id: id, 
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price
    }) 
    console.log(product);
    await products.save();
    console.log('Saved');
    res.json({
        success: true,
        name: req.body.name 
    })
}

exports.removeProducts = async (req,res)=>{
    await product.findOneAndDelete({id:req.body.id});
    console.log('Removed');
    res.json({
        success:true,
        name:req.body.name
    })
}

exports.getAllProducts = async (req,res)=>{
    let allProducts=await product.find()
    console.log("All product fetched");
    res.send(allProducts)
}

exports.newCollections = async (req,res)=>{
    let products = await product.find({});
    let newCollections=products.slice(1).slice(-8);
    console.log("new collection fetched");
    res.send(newCollections);
}

exports.popularProducts=async(req,res)=>{
    let products = await product.find({category:"men"});
    let popularproducts = products.slice(0,4);
    console.log("Popular products Fetched");
    res.send(popularproducts);
} 

exports.addTocart=async(req,res)=>{
   console.log("Added",req.body.itemId);
    let userData=await user.findOne({_id:req.user.id})
    userData.cartData[req.body.itemId]+=1;
    await user.findByIdAndUpdate({_id:req.user.id},{cartData:userData.cartData})
    res.send("Added");
} 

exports.removeFromcart=async(req,res)=>{
    console.log("Removed",req.body.itemId);
    let userData=await user.findOne({_id:req.user.id})
    if( userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId]-=1;
    await user.findByIdAndUpdate({_id:req.user.id},{cartData:userData.cartData})
    res.send("Removed");
} 

exports.getcart=async(req,res)=>{
    console.log("Get Cart");
    let userData = await user.findOne({_id:req.user.id});
    res.json(userData.cartData) 
}