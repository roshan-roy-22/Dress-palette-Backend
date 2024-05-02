require('dotenv').config()
const express = require('express')
const cors=require('cors')
require('./DB/connection')
const router=require('./Routes/routes')


const app=express();

app.use(cors());
app.use(express.json())
app.use(router)
app.use('/images',express.static('./upload/images'))

const PORT =3000
 
app.listen(PORT,()=>{    
    console.log(`Project server started at Port: ${PORT}`);// this is for hosting
});



app.get('/',(req,res)=>{
    res.status(200).send(`<h1 style=color:red;>Project fair Server Started !!! Waiting for Client Request...</h1>`)
})  