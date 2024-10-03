import connectDB from '@/db/connectDB';
import Events from '@/app/models/Events';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    await connectDB();
    const eventform = await req.json();
    const newEvent = new Events(eventform);
    await newEvent.save();
    return NextResponse.json({ success: true, message: 'Event created successfully' }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ success: false, message: 'Error saving event' }, { status: 500 });
  }
}
