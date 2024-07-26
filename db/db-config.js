const mongoose=require("mongoose")
require("dotenv").config()

const mongoConnect=()=>{
    mongoose.connect(process.env.CONNECT_DB_STRING).then((result) => {
        console.log("Database Connected successfully !!")
    }).catch((err) => {
        console.log(err)
    });
}


module.exports=mongoConnect