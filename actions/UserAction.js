"use server"
import connectDB from "@/db/connectDB"
import Events from "@/app/models/Events"
import Razorpay from "razorpay"
import User from "@/app/models/user"
import Payment from "@/app/models/Payment"

export const submitEvent = async (data) => {
    try {
      await connectDB();
      const newEvent = await Events.create(data);
      return { status: "OK", message: "Event Created Successfully" };
    } catch (error) {
      return { status: "Error", message: error.message };
    }
  };
  

export const findTopEvent = async () => {
    try {
        await connectDB();
        const pastEvents = await Events.find({
            Date: { $lt: new Date() }
        }).sort({ Date: -1 }); 
        return { status: 'OK', data: pastEvents }; 
    } catch (error) {
        return { status: 'Error', message: error.message }; 
    }
};

export const findUpcomingEvents = async () => {
    try {
        await connectDB(); 
        const upcomingEvents = await Events.find({
            Date: { $gt: new Date() }  
        }).sort({ Date: 1 }); 
        return { status: 'OK', data: upcomingEvents };  
    } catch (error) {
        return { status: 'Error', message: error.message }; 
    }
};

export const OngoingEvents = async () => {
    try {
        await connectDB();
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);  
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);
        const ongoingEvents = await Events.find({
            Date: { $gte: startOfDay, $lt: endOfDay }  
        });
        return { status: 'OK', data: ongoingEvents };
    } catch (error) {
        return { status: 'Error', message: error.message };
    }
};

export const initiate = async (amount, EventUser,eventname, paymentform) => {
    await connectDB();
    let user = await User.findOne({username:EventUser})
    if(!user){
        return NextResponse.json({success: false, message: "User not found"})
    }
    const secret = user.razorpaySecret

    var instance = new Razorpay({ key_id:user.razorpayId, key_secret: secret })

    let options = {
        amount: Number.parseInt(amount),
        currency: "INR"
    }

    let x = await instance.orders.create(options)

    await Payment.create({ order_id: x.id, amount: amount/100, to_user: EventUser,eventname:eventname, name: paymentform.name, message: paymentform.message })

    return x;
};

export const fetchUser = async (EventUser) => {
    await connectDB();
    let u = await User.findOne({username: EventUser });

    if (u) {
        let user = u.toObject({ flatternObjectIds: true });
        return JSON.stringify(user);
    }
    return JSON.stringify({ error: "User not found" });
};

export const fetchPayments = async (EventUser) => {
    await connectDB();
    let p = await Payment.find({ to_user: EventUser, done: true })
        .sort({ amount: -1 })
        .limit(10)
        .lean(true);
    return JSON.stringify(p);
};

export const fetchUserImages = async (useremail) => {
    await connectDB();
    let u = await User.findOne({email: useremail });
    if (u) {
        let user = u.toObject({ flatternObjectIds: true });
        return JSON.stringify(user);
    }
    return JSON.stringify({ error: "User not found" });
};

export const checkuser = async (params) => {
    let u = await User.findOne({ username: params.username })
    if (u) {
      let user = u.toObject({ flatternObjectIds: true });
      return JSON.stringify(user);
  }
  return JSON.stringify({ error: "User not found" });
  }
export const checkNavuser = async (Username) => {
    let u = await User.findOne({ username: Username })
    if (u) {
      let user = u.toObject({ flatternObjectIds: true });
      return JSON.stringify(user);
  }
  return JSON.stringify({ error: "User not found" });
  }