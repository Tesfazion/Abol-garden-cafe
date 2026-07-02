import mongoose, { Schema, Document } from "mongoose";

export interface ITableCapacity extends Document {
  date: Date;
  time: string;
  capacity: number;
}

// Stores per-timeslot seat overrides.
// If no record exists for a slot, the default (24) is used.
const tableCapacitySchema = new Schema<ITableCapacity>({
  date:     { type: Date, required: true },
  time:     { type: String, required: true },
  capacity: { type: Number, default: 24, min: 1 },
});

tableCapacitySchema.index({ date: 1, time: 1 }, { unique: true });

export const TableCapacity = mongoose.model<ITableCapacity>("TableCapacity", tableCapacitySchema);
