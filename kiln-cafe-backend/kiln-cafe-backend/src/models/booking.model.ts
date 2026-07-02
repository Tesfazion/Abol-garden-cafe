import mongoose, { Schema, Document } from "mongoose";

export interface IBooking extends Document {
  userId?: string;
  name: string;
  email: string;
  phone: string;
  partySize: number;
  date: Date;
  time: string; // stored as "HH:mm", validated at app layer
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED" | "NO_SHOW";
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    userId:    { type: String },
    name:      { type: String, required: true, trim: true, maxlength: 120 },
    email:     { type: String, required: true, lowercase: true, trim: true },
    phone:     { type: String, required: true },
    partySize: { type: Number, required: true, min: 1, max: 20 },
    date:      { type: Date, required: true },
    time:      { type: String, required: true },
    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED", "NO_SHOW"],
      default: "PENDING",
    },
    notes: { type: String, maxlength: 500 },
  },
  { timestamps: true }
);

bookingSchema.index({ userId: 1 });
bookingSchema.index({ date: 1, time: 1 });

bookingSchema.set("toJSON", {
  virtuals: true,
  transform: (_doc, ret: any) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const Booking = mongoose.model<IBooking>("Booking", bookingSchema);
