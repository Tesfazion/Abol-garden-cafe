import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: "CUSTOMER" | "STAFF" | "ADMIN";
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name:         { type: String, required: true, trim: true, maxlength: 120 },
    email:        { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role:         { type: String, enum: ["CUSTOMER", "STAFF", "ADMIN"], default: "CUSTOMER" },
    phone:        { type: String },
  },
  { timestamps: true }
);

userSchema.index({ email: 1 });

// Expose id as a plain string; strip sensitive & internal fields on serialisation.
userSchema.set("toJSON", {
  virtuals: true,
  transform: (_doc, ret: any) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.passwordHash; // never send this to the client
    return ret;
  },
});

export const User = mongoose.model<IUser>("User", userSchema);
