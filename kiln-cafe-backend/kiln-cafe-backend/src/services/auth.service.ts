import { User } from "../models/user.model";
import { hashPassword, comparePassword } from "../utils/password";
import { signToken } from "../utils/jwt";
import { ApiError } from "../middleware/errorHandler";

export async function registerUser(input: {
  name: string;
  email: string;
  password: string;
  phone?: string;
}) {
  const existing = await User.findOne({ email: input.email.toLowerCase() });
  if (existing) {
    throw new ApiError(409, "An account with this email already exists");
  }

  const passwordHash = await hashPassword(input.password);
  const user = await User.create({
    name: input.name,
    email: input.email,
    phone: input.phone,
    passwordHash,
    role: "CUSTOMER",
  });

  const token = signToken({ sub: user.id as string, role: user.role });
  // user.toJSON() strips passwordHash automatically via the model's toJSON transform
  return { token, user };
}

export async function loginUser(input: { email: string; password: string }) {
  // Find by email — need passwordHash for comparison so we select it explicitly
  const user = await User.findOne({ email: input.email.toLowerCase() }).select("+passwordHash");
  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const valid = await comparePassword(input.password, user.passwordHash);
  if (!valid) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = signToken({ sub: user.id as string, role: user.role });
  return { token, user };
}
