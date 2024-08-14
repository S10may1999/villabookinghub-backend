const express=require("express");
const cors=require("cors")
const userRouter=require("./routes/user-route")
const vendorRouter=require("./routes/vendor-route")
const connectDB=require("./db/db-config");
const cookieParser = require("cookie-parser");
const propertyRouter = require("./routes/property-route");
const bookingRouter=require("./routes/booking-route")


connectDB()

const app=express();


app.use(cookieParser())
app.use(cors(
    {
        origin:"http://localhost:3001/",
        credentials:true
    }
));
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use("/api/user",userRouter)
app.use("/api/vendor",vendorRouter)
app.use("/api/property",propertyRouter)
app.use("/api/booking",bookingRouter)

app.listen(process.env.DEFAULT_PORT || 8000,() => {
    console.log(`Server is running on ${process.env.DEFAULT_PORT}`)   
   })


