const vendor=require("../controller/vendor-controller")
const express=require("express")
const vendorAuthCheck = require("../middleware/vendor-auth-check")
const upload = require("../helper/cloudinary-storage")
const propertyUpload = require("../controller/property-controller")


const router=express.Router()


router.post("/vendor-register",vendor.vendorRegister)
router.post("/vendor-login",vendor.vendorLogin)
router.get("/vendor-information",vendorAuthCheck,vendor.vendorInformationGet)





module.exports=router
