const mongoose=require("mongoose")


const propertySchema=mongoose.Schema({
    propertyName:{
        type:String,
        require:true
    },
    state:{
        type:String,
        require:true
    },
    city:{
        type:String,
        require:true
    },
    pincode:{
        type:String,
        require:true
    },
    landmark:{
        type:String,
        require:true
    },
    street:{
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
        require:true
    },
    BookingDeatils:{
        type:[String],
        require:true
    }

})


const propertyModel=mongoose.model("PropertyDetails",propertySchema)


module.exports=propertyModel