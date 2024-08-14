const bookingRoute=require("../controller/booking-controller")

const express=require("express")
const userAuthCheck = require("../middleware/user-auth-check")



const route=express.Router()

route.post("/booking-register",userAuthCheck,bookingRoute.bookProperty)

module.exports=route


