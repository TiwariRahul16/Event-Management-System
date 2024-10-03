import connectDB from "@/db/connectDB";
import User from "@/app/models/user";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
    await connectDB();
  const { user } = params;  
  const updateData = await req.json();  
  try {
    const existingUser = await User.findOneAndUpdate(
      { username: user },  
      updateData, 
      { new: true }  
    );

    if (!existingUser) {
      return NextResponse.json({ status: 'Error', message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ status: 'OK', message: 'User updated successfully', data: existingUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: 'Error', message: 'Failed to update user' }, { status: 500 });
  }
}
