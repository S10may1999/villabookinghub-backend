const jsonwebtoken = require("jsonwebtoken")
const proepertySchema=require("../schema/property-schema")
const mongoose = require("mongoose")

const propertyDetails=async(req,res)=>{
    const {propertyName,state,city,pincode,landmark,street,isSwimmingPool,swimmingPoolSize,numberOfRooms,isGame,gameName,BookingDeatils}=req.body

    const token=jsonwebtoken.decode(req.cookies.VendorJwt)
    const vendorId=token.id
    await proepertySchema.create({vendorId,propertyName,state,city,pincode,landmark,street,isSwimmingPool,swimmingPoolSize,numberOfRooms,isGame,gameName,BookingDeatils}).then((result) => {
        res.propertyId=result._id
        res.status(201).json({
            messaage:"files uploaded successfully !!",
            data:result
        })        
    }).catch((err) => {
        res.status(500).json({
            messaage:"Upload Failed !! try again",
            error:err
        })
    });
}


const vendorImageAndVideoUpload=async(req,res)=>{
    if(!req.files || req.files.length==0) return res.status(404).json({
        message:"No Files Uploaded"
    })
    
    const filePath=req.files.map((file)=>file.path)
    const photoList=filePath.toString().split(",")
    
    const token=jsonwebtoken.decode(req.cookies.VendorJwt,process.env.JWT_SECREAT_KEY)

    vendorId=token.id
    console.log(req.propertyId)
    await proepertySchema.findOneAndUpdate({vendorId:vendorId},{propertyPhotos:photoList},{new:true}).then((result) => {
        if(!result) return res.status(500).json({
            message:"Update failed !!"
        })

        res.status(201).json({
            message:"Images or videos uploaded Successfully !!"
        })
    }).catch((err) => {
        
        res.status(500).json({
            message:"Something Went wrong !!",
            error:err
        })
    });
}




module.exports={propertyDetails,vendorImageAndVideoUpload}