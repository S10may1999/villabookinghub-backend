const express=require("express")
const {userRegister,getFunction,userSignIn,profileUpload}=require("../controller/user-controller")
const userAuthCheck =require("../middleware/user-auth-check")
const upload=require("../helper/cloudinary-storage")


const router=express.Router()



router.get("/",userAuthCheck,getFunction)
router.post("/user-register",userRegister)
router.post("/user-login",userSignIn)
router.post("/profile-upload",userAuthCheck,upload.array("media",1),profileUpload)


module.exports=router