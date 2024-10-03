import mongoose from "mongoose";
import { Schema,model } from "mongoose";


const EventsSchema = new Schema({
    topic: { type: String, required: true },
    eventfield: { type: String },
    email: { type: String },
    user: { type: String }, 
    Date: { type: Date },
    Time: { type: String },
    TicketPrice: { type: String },
    speaker: { type: String, required: true },
    address: { type: String },
    Eventpic: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    done: { type: Boolean, default: false }
  });
  
  export default mongoose.models.Events || model("Events", EventsSchema);
  
