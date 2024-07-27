const jsonwebtoken = require("jsonwebtoken")

const vendorAuthCheck=async(req,res,next)=>{
    const jwtToken= await req.cookies.VendorJwt
    console.log(jwtToken)
    if(!jwtToken) return res.status(404).json(
        {
            message:"You'r not logged In or Session expired !!"
        }
    )

    try {
        const verifyToken=jsonwebtoken.verify(jwtToken,process.env.JWT_SECREAT_KEY)
        if(! verifyToken) return res.status(498).json({
            message:"Invalid Token"
        })
        next()
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                message: "Token expired"
            });
        }
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                message: "Invalid token"
            });
        }
        if (error.name === "CastError" && error.path === "_id") {
            return res.status(400).json({
                message: "Invalid token format",
                error: error.message
            });
        }
        res.status(500).json({
            message: "Something went wrong!!",
            error: error.message
        }); 
    }
}


module.exports=vendorAuthCheck