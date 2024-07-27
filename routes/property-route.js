const express = require("express");
const vendorAuthCheck = require("../middleware/vendor-auth-check");
const {propertyDetails,vendorImageAndVideoUpload}=require("../controller/property-controller");
const upload = require("../helper/cloudinary-storage");


const router=express.Router()


router.post("/property-details",vendorAuthCheck,propertyDetails)

router.post("/property-upload",vendorAuthCheck,upload.array("media",100),vendorImageAndVideoUpload)



module.exports=router
