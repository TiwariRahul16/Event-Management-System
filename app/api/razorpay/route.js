import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import connectDB from "@/db/connectDB";
import razorpay from "razorpay";
import User from "@/app/models/user";
import payment from "@/app/models/Payment";

export const POST = async (req) => {
    await connectDB()
    let body = await req.formData()
    body = Object.fromEntries(body)

    let p = await payment.findOne({order_id: body.razorpay_order_id })
    if (!p) {
        return NextResponse.json({ success: false, message: "OrderId Not found" })
    }

     let user = await User.findOne({username: p.to_user})
     if(!user){
         return NextResponse.json({success: false, message: "User not found"})
     }
     const secret = user.razorpaySecret


    let paymentVerify = validatePaymentVerification({ "order_id": body.razorpay_order_id, "payment_id": body.razorpay_payment_id }, body.razorpay_signature,secret)

    if (paymentVerify) {
        
        const updatedPayment = await payment.findOneAndUpdate({ order_id: body.razorpay_order_id }, { done: true }, { new: true })
        const redirectUrl = new URL(`/${updatedPayment.to_user}?paymentdone=true`, process.env.NEXT_PUBLIC_URL).toString();
        return NextResponse.redirect(redirectUrl);
    }
    else {
        return NextResponse.json({ success: false, message: "Payment verification failed" })
    }
}
