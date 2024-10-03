import Events from "@/app/models/Events";
import connectDB from "@/db/connectDB";

export async function GET(request, { params }) {
    try {
        await connectDB();
        const event = await Events.find({user:params.user}); 
        if (!event) {
            return new Response(JSON.stringify({ status: 'Error', message: 'Event not found' }), { status: 404 });
        }
        return new Response(JSON.stringify({ status: 'OK', data: event }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ status: 'Error', message: error.message }), { status: 500 });
    }
}
