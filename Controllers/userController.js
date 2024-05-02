const user = require("../Models/userModel");
const jwt = require('jsonwebtoken')

exports.signup = async (req, res) => {
    let check = await user.findOne({ email: req.body.email })
    if (check) {
        return res.status(400).json({ success: false, errors: "Existing user found with same email address " })
    }
    console.log("Hello"); 
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    } 
    const newUser = new user({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart
    })

    await newUser.save();

    const data = {
        user: {
            id: newUser.id
        }
    }
    const token=jwt.sign(data,'secret_ecom')
    res.json({success:true,token})
}

exports.login = async(req,res)=>{
    let existingUser = await user.findOne({email:req.body.email})
    if(existingUser){
        const passMatch=req.body.password===existingUser.password;
        if(passMatch){
            const data ={
                users:{
                    id:existingUser.id
                }
                
            }
            const token = jwt.sign(data,'secret_ecom')
            res.json({success:true,token})
           }else{
            res.json({success:false,errors:"Wrong password"})
        }
    }else{
        res.json({success:false,errors:"wrong Email address"})
    }
}
    

