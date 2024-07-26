const jsonwebtoken = require("jsonwebtoken")

const vendorAuthCheck=async(req,res,next)=>{
    const jwtToken=await req.cookies.VendorJwt
    
    if(!jwtToken) return res.status(404).json({
        message:"You are not logged In or Session Expired !!"
    })

    try {
        const isTokenVerified=jsonwebtoken.verify(jwtToken,process.env.JWT_SECREAT_KEY)
        if(!isTokenVerified) return res.status(498).json({
            message:"Invalid Token"
        })
        next()
    } catch (error) {
            res.status(500).json({
                message:"Something Went Wrong !!"
            })        
    }
}

module.exports=vendorAuthCheck