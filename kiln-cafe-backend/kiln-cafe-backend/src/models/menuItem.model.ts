import mongoose, { Schema, Document } from "mongoose";

export interface IMenuItem extends Document {
  name: string;
  category: "COFFEE" | "BAKES" | "PLATES" | "DRINKS";
  price: number;
  description: string;
  tastingNotes: string[];
  origin?: string;
  image: string;
  hot: boolean;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const menuItemSchema = new Schema<IMenuItem>(
  {
    name:         { type: String, required: true, trim: true, maxlength: 120 },
    category:     { type: String, enum: ["COFFEE", "BAKES", "PLATES", "DRINKS"], required: true },
    price:        { type: Number, required: true, min: 0 },
    description:  { type: String, required: true, maxlength: 500 },
    tastingNotes: [{ type: String }],
    origin:       { type: String },
    image:        { type: String, required: true },
    hot:          { type: Boolean, default: false },
    available:    { type: Boolean, default: true },
  },
  { timestamps: true }
);

menuItemSchema.index({ category: 1 });
menuItemSchema.index({ available: 1 });

menuItemSchema.set("toJSON", {
  virtuals: true,
  transform: (_doc, ret: any) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const MenuItem = mongoose.model<IMenuItem>("MenuItem", menuItemSchema);
