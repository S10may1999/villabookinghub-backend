const bcrypt = require("bcrypt");
const vendorModel=require("../schema/vendor-schema");
const jsonwebtoken = require("jsonwebtoken");



const vendorRegister=async(req,res)=>{
    const {vendorEmail,password,vendorName,vendorAddress,vendorcontact,vendorDOB,isCareTaker,CareTakerName,CareTakerContact,properties}=req.body

    if(!vendorEmail || !password || !vendorName || !vendorAddress || !vendorcontact || !isCareTaker) return res.status(404).json({
        message:"email, password,name,address  or Contact is missing !!"
    })

    const enPassword=await bcrypt.hash(password,10)
    await vendorModel.create({vendorEmail:vendorEmail,password:enPassword,vendorName:vendorName,vendorAddress:vendorAddress,vendorcontact:vendorcontact,vendorDOB:vendorDOB,isCareTaker:isCareTaker,CareTakerName:CareTakerName,CareTakerContact:CareTakerContact,properties:properties}).then((result) => {
        res.status(200).json({
            message:"Account Created Successfully !!",
            data:result
        })
    }).catch((err) => {
            res.status(500).json({
                message:"Something Went Wrong !!",
                error:err
            })
    });

}

const vendorLogin=async(req,res)=>{
    const {vendorEmail,password}=req.body

    const result=await vendorModel.findOne({vendorEmail})

    if(!result) return res.status(400).json({
        message:"Incorrect email !!"
    })

    const isPasswordCorrect=bcrypt.compare(password,result.password)

    if(!isPasswordCorrect) return res.status(400).json({
        message:"Incorrect Password !!"
    })

    const token=jsonwebtoken.sign({"id":result._id},process.env.JWT_SECREAT_KEY)

    res.cookie("VendorJwt",token,{
        httpOnly:true,
        secure:process.env.Node==="Production"
    })

    res.status(200).json({
        message:"Logged In Successfully !!"
    })
    
}


const vendorInformationGet=async(req,res)=>{
    const jwtToken=jsonwebtoken.decode(req.cookies.VendorJwt)
    console.log(jwtToken)
    await vendorModel.findOne({_id:jwtToken.id}).then((result) => {
        if(!result) return res.status(404).json({
            message:"Opps !! Something Went Wrong !!"
        })
        
        return res.status(200).json({
            message:"Data Fetched Successfully !!",
            data:result
        })
    }).catch((err) => {
        res.status(500).json({
            message:"Something Went Wrong !!",
            error:err
        })
    });
}


module.exports={vendorRegister,vendorLogin,vendorInformationGet}