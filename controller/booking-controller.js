const jsonwebtoken = require("jsonwebtoken")
const bookingModel = require("../schema/booking-schema")
const propertyModel = require("../schema/property-schema")


const bookProperty = async (req, res) => {
    try {
        const { propertyId } = req.query;
        const { 
            numberOfGuest, 
            foodOptionAvailed, 
            bookingAmount, 
            paymentReference, 
            TotalAmount, 
            checkInTime, 
            checkoutTime 
        } = req.body;

        console.log(propertyId, numberOfGuest, foodOptionAvailed, bookingAmount, paymentReference, TotalAmount, checkInTime, checkoutTime);

        const token = jsonwebtoken.verify(req.cookies.jwt, process.env.JWT_SECREAT_KEY);
        const userId = token.id;

        const booking = await bookingModel.create({
            userId,
            propertyId,
            numberOfGuest,
            foodOptionAvailed,
            bookingAmount,
            paymentReference,
            TotalAmount,
            checkInTime,
            checkoutTime
        });
        await propertyModel.findByIdAndUpdate(
            {_id:propertyId}, 
            { $push: { BookingDeatils: booking._id } },
            { new: true, useFindAndModify: false }
        ).then((result) => {
            
            if(!result) return res.status(404).json({
                message:"No Property Found !!"
            })
            
            
            res.status(201).json({
                message: "Booking confirmed!!",
                data: booking,
                propertyBooking:result.BookingDeatils
            });
                
        }).catch((err) => {
            res.status(500).json({
                error:err
            })
        });

    } catch (err) {
        res.status(500).json({
            message: "Booking not confirmed. Please try once again!!",
            error: err.message || err
        });
    }
};



module.exports={bookProperty}