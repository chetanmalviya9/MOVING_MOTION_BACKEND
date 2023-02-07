import { response } from 'express';
import { vehicleBooking } from '../model/bookingDetail.model.js';
import { CompletOrders } from '../model/completeOrder.model.js';

export const bookVehicle = async (req, res, next) => {
    let date = req.body.pickUpDate.split("-");

    try {
        let result = await vehicleBooking.create({
            userId: req.body.userId,
            pickUpLocation: req.body.pickUpLocation,
            pickUpContact: req.body.pickUpContact,
            deliveryLocation: req.body.deliveryLocation,
            destinationContact: req.body.destinationContact,
            pickUpDate: date[2] + "/" + date[1] + "/" + date[0]
        });
        res.status(201).json({ result, status: true })
    }
    catch (error) {
        console.log(error)
        res.status(400).json({ message: "something went wrong", status: false });
    }
}
export const getBookings = async (req, res, next) => {
    try {
        let result = await vehicleBooking.find().populate({ path: "userId" });
        res.status(201).json({ bookings: result, status: true })
    }
    catch (err) {
        res.status(500).json({ message: "Something went wrong", status: false })
    }
}
export const addBid = async (req, res, next) => {
    try {
        let id = req.body.orderId;
        delete req.body.orderId;
        let bookedOrder = await vehicleBooking.findOne({ _id: id });
        if (bookedOrder) {
            bookedOrder.biding.push(req.body);
            await vehicleBooking.create(bookedOrder);
            return res.status(200).json({ message: 'Successfully Bid to order', status: true });
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Oops! something went wrong', status: false });
    }
}
export const orderStatus = async (req, res, next) => {
    try {
        let result = await vehicleBooking.findOne({ userId: req.body.id });
        res.status(201).json({ bookings: result, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "Something went wrong", status: false })
    }
}
export const completedOrders = async(req, res, next) => {
    try {
        delete req.body.__v;
        let result = await CompletOrders.create(req.body)
        
        await vehicleBooking.deleteOne({_id:req.body._id});
        res.status(200).json({status:true,message:"Order Detail send to the Driver"});
    } 
    catch (error) {
        console.log(error)
        res.status(500).json({status:false,message:"Internal Server Error"});
    }
}
export const getCompletedOrders = async(req,res,next)=>{
    console.log(req.params.id);
    try {
        // if()
        let result = await CompletOrders.find({userId:req.params.id});

        result = result.map((data)=>{
            // data=JSON.parse(JSON.stringify(data));
            data=data.toJSON();
            data.driverDetail = data.biding.filter(newData=>data.driverId==newData.driverId) 
          delete data.biding;
          return data;
        })
       
        res.status(200).json({status:true,result});
    } catch (error) {
        console.log(error)
    }
}
