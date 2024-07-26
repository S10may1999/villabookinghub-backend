const express=require("express");
const cors=require("cors")
const userRouter=require("./routes/user-route")
const vendorRouter=require("./routes/vendor-route")
const connectDB=require("./db/db-config");
const cookieParser = require("cookie-parser");



connectDB()

const app=express();


app.use(cookieParser())
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use("/api/user",userRouter)
app.use("/api/vendor",vendorRouter)

app.listen(process.env.DEFAULT_PORT || 8000,() => {
    console.log(`Server is running on ${process.env.DEFAULT_PORT}`)   
   })


