import mongoose from "mongoose";
import { Schema,model } from "mongoose";


const EventsSchema = new Schema({
    topic: { type: String, required: [true, 'Topic is required']},
    eventfield: { type: String },
    email: { type: String },
    user: { type: String }, 
    Date: { type: Date,required: [true, 'Topic is required']},
    Time: { type: String,required: [true, 'Topic is required'] },
    TicketPrice: { type: String },
    speaker: { type: String, required: [true, 'Topic is required'] },
    address: { type: String,required: [true, 'Topic is required']},
    Eventpic: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    done: { type: Boolean, default: false }
  });
  
  export default mongoose.models.Events || model("Events", EventsSchema);
  
