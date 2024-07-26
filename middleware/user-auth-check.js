const jsonwebtoken = require("jsonwebtoken")

const userAuthCheck=async(req,res,next)=>{
    const jwtToken= await req.cookies.jwt
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
        res.status(404).json({
            message:"Please check your internet connection !!"
        })
    }
}


module.exports=userAuthCheck