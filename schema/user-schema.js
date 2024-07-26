const { timeStamp } = require("console")
const mongoose=require("mongoose")


const userSchema=mongoose.Schema({
    firstName:{
        type:String,
        require:false
    },
    lastName:{
        type:String,
        require:false
    },
    mobileNumber:{
        type:Number,
        require:true,
        unique:true
    },

    email:{
        type:String,
        require:true,
        unique:true
    },
    address:{
        type:String,
        require:false,
    },
    password:{
        type:String,
        require:true,
    },
    profileImg:{
        type:String,
        require:false
    },
    productCart:{
        type:[String],
        require:false,
        default:[]
    },
    createDate:{
       type:Date,
       default:Date.now()
    }

})

const userModel=new mongoose.model("userData",userSchema);


module.exports=userModel