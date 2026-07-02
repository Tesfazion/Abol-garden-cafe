import mongoose, { Schema, Document } from "mongoose";

export interface IOrderItem {
  menuItemId: string;
  menuItemName: string; // denormalised — preserves name even if menu item is later deleted
  quantity: number;
  unitPrice: number;    // locked at time of order; server always recalculates
}

export interface IOrder extends Document {
  userId?: string;
  guestEmail?: string;
  guestName?: string;
  status: "PENDING" | "CONFIRMED" | "PREPARING" | "OUT_FOR_DELIVERY" | "DELIVERED" | "CANCELLED";
  deliveryAddress: string;
  subtotal: number;
  deliveryEtaMins?: number;
  items: IOrderItem[];
  createdAt: Date;
  updatedAt: Date;
}

const orderItemSchema = new Schema<IOrderItem>(
  {
    menuItemId:   { type: String, required: true },
    menuItemName: { type: String, required: true },
    quantity:     { type: Number, required: true, min: 1 },
    unitPrice:    { type: Number, required: true, min: 0 },
  },
  { _id: false } // embedded sub-document, no separate _id needed
);

const orderSchema = new Schema<IOrder>(
  {
    userId:          { type: String },
    guestEmail:      { type: String },
    guestName:       { type: String },
    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "PREPARING", "OUT_FOR_DELIVERY", "DELIVERED", "CANCELLED"],
      default: "PENDING",
    },
    deliveryAddress: { type: String, required: true },
    subtotal:        { type: Number, required: true, min: 0 },
    deliveryEtaMins: { type: Number },
    items:           [orderItemSchema],
  },
  { timestamps: true }
);

orderSchema.index({ userId: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ createdAt: -1 });

orderSchema.set("toJSON", {
  virtuals: true,
  transform: (_doc, ret: any) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const Order = mongoose.model<IOrder>("Order", orderSchema);
