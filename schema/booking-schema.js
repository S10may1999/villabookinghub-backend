const { default: mongoose } = require("mongoose")

const bookingSchema=mongoose.Schema({
    userId:{
        type:String,
        require:true
    },
    propertyId:{
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
    paymentReferenceNumber:{
        type:String,
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
    },
    isCanceled:{
        type:Boolean,
        require:true
    },
    transactionTime:{
        type:Date,
        default:Date.now()

    }
    
})
const bookingModel=mongoose.model("UserBookings",bookingSchema)


module.exports=bookingModel





