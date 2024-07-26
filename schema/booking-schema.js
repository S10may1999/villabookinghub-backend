const { default: mongoose } = require("mongoose")

const bookingSchema=mongoose.Schema({
    userId:{
        type:String,
        require:true
    },
    productId:{
        type:String,
        require:true
    },
    bookingDate:{
        type:String,
        require:true
    },
    numberOfGuest:{
        type:Number,
        require:true
    },
    foodOptionAvailed:{
        type:Boolean,
        require:true,
        default:false
    },
    bookingAmount:{
        type:Number,
        require:true
    },
    TotalAmount:{
        type:Number,
        reuired:true
    },
    checkInTime:{
        type:String,
        require:true
    },
    checkoutTime:{
        type:String,
        require:true
    }
    
})
const bookingModel=mongoose.model("UserBookings",bookingSchema)


module.exports=bookingModel





