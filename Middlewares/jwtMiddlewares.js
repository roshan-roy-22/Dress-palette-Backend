const jwt = require('jsonwebtoken')

const jwtMiddleware = async(req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({errors:"Please authenticate using valid login"})
    }else{
        try {
            const data = jwt.verify(token,'secret_ecom')
            req.user=data.users;
            next();
        } catch (error) {
            res.status(401).send({errors:"Please authenticate using a valid token"});
        }
    }
}

module.exports=jwtMiddleware;