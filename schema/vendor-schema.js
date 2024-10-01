const mongoose = require("mongoose");


const vendorDetailSchema=mongoose.Schema({
    vendorName:{
        type:String,
        require:true
    },
    vendorAddress:{
        type:String,
        require:true
    }
    ,
    vendorcontact:{
        type:String,
        require:true
    },
    isCareTaker:{
        type:Boolean,
        require:true
    },
    CareTakerName:{
        type:String,
        require: function (){return this.isCareTaker}
    },
    CareTakerContact:{
        type:String,
        require:function (){return this.isCareTaker}
    },
    properties:{
        type:[String],
        require:false
    }
  
})



const vendorModel=mongoose.model("VendorDetails",vendorDetailSchema)


module.exports=vendorModel