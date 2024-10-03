import Events from '@/app/models/Events';
import connectDB from '@/db/connectDB';
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        await connectDB();
        const event = await Events.findById(params.Id); 
        if (!event) {
            return new Response(JSON.stringify({ status: 'Error', message: 'Event not found' }), { status: 404 });
        }
        return new Response(JSON.stringify({ status: 'OK', data: event }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ status: 'Error', message: error.message }), { status: 500 });
    }
}


export async function DELETE(req, { params }) {
    await connectDB();
    
  try {
    const deletedEvent = await Events.findByIdAndDelete(params.Id);
    
    if (!deletedEvent) {
      return NextResponse.json({ status: 'Error', message: 'Event not found' }, { status: 404 });
    }

    return NextResponse.json({ status: 'OK', message: 'Event deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: 'Error', message: 'Failed to delete event' }, { status: 500 });
  }
}



export async function PATCH(req, { params }) {
    await connectDB();

  try {
    const updatedData = await req.json();
    const updatedEvent = await Events.findByIdAndUpdate(params.Id, updatedData, { new: true });

    if (!updatedEvent) {
      return NextResponse.json({ status: 'Error', message: 'Event not found' }, { status: 404 });
    }

    return NextResponse.json({ status: 'OK', message: 'Event updated successfully', data: updatedEvent }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: 'Error', message: 'Failed to update event' }, { status: 500 });
  }
}
