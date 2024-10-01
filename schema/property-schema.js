const mongoose=require("mongoose")


const propertySchema=mongoose.Schema({
    vendorId:{
        type:String,
        require:true
    },
    propertyName:{
        type:String,
        require:true
    },
    isSwimmingPool:{
        type:Boolean,
        require:true
    },
    swimmingPoolSize:{
        type:String,
        require:function(){return this.isSwimmingPool}
    },
    numberOfRooms:{
        type:Number,
        require:true,
    },
    isGame:{
        type:Boolean,
        require:true
    },
    gameName:{
        type:[String],
        require:function(){return this.isGame}
        },
    propertyPhotos:{
        type:[String],
        require:false
    },
    BookingDeatils:{
        type:[String],
        require:false
    }

})


const propertyModel=mongoose.model("PropertyDetails",propertySchema)


module.exports=propertyModel