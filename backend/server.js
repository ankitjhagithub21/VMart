require('dotenv').config()
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const connectDb = require('./conn');
const authRouter = require('./routes/authRoutes');
const productRouter = require('./routes/productRoutes');
const cartRouter = require('./routes/cartRoutes');
const app = express()

const port = process.env.PORT || 3000;

app.use(express.json())
app.use(cors({
    origin:process.env.ORIGIN,
    credentials:true
}))
app.use(cookieParser())


app.get("/",(req,res)=>{
    res.json({
        "message":"Api working."
    })
})


app.use("/api/auth",authRouter)
app.use("/api/products",productRouter)
app.use("/api/cart",cartRouter)

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
    connectDb()
})