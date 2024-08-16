const jsonwebtoken = require("jsonwebtoken")
const userModel=require("../schema/user-schema")
const bcrypt=require("bcrypt")


const getFunction=(req,res)=>{
    try {

        res.status(200).json({
            message:"this is working"
        })
    } catch (error) {
        console.log(error)
    }
}

const profileUpload=async(req,res)=>{
    if(!req.files || req.files.length==0) return res.status(404).json({
        message:"No Files uploaded !!"
    })
    
    const filePath=req.files.map((file)=>file.path)

    const token=req.cookies.jwt

    const decode=jsonwebtoken.verify(token,process.env.JWT_SECREAT_KEY)

    const userId=decode.id

    await userModel.findByIdAndUpdate(userId,{profileImg:filePath.toString()},{new:true}).then((result) => {
        res.status(200).json({
            message:"File Uploaded Successfully !!",
            data:result.profileImg
        })
    }).catch((err) => {
        res.status(500).json({
            message:"Something went wrong !!",
            error:err.message
        })        
    });
    
    
}

const userSignIn=async(req,res)=>{
    const {email,password}=req.body
    try {
        const user= await userModel.findOne({email})
        if(!user) return res.status(404).json({
            message:"Incorrect email"
        })

        const isPasswrodMatch=await bcrypt.compare(password,user.password)

        if(!isPasswrodMatch) return res.status(400).json({
            message:"Incorrect password !!"
        })
        const token=jsonwebtoken.sign({"id":user._id},process.env.JWT_SECREAT_KEY,{"expiresIn":"1hr"})

        res.cookie("jwt",token,{
            httpOnly:true,
            secure:false,
            sameSite:"none"
        })

        res.status(200).json({
            message:"Logged In Successfully !!"
        })
    } catch (error) {
            console.log(error)        
    }
}

const userRegister=async(req,res)=>{
    const {firstName,lastName,mobileNumber,email,address,password}=req.body
    console.log(req.body)
    if(!mobileNumber || !email || !password) return res.status(400).json({
        message:"mobile , email and password required !!"
    })
    const enPassword=await bcrypt.hash(password,10)
    await userModel.create({"firstName":firstName,"lastName":lastName,"mobileNumber":mobileNumber,"email":email,"address":address,"password":enPassword}).then((result) => {
        res.status(201).send({
            message:"Registered successfully !!",
            data:result
        })
    }).catch((err) => {
        res.status(500).send({
            message:"Something went wrong !!",
            error:err
        })
    });
}


const userCart=(req,res)=>{
    
}




module.exports={getFunction,userRegister,userSignIn,profileUpload}


