import { Booking } from "../models/booking.model";
import { TableCapacity } from "../models/tableCapacity.model";
import { ApiError } from "../middleware/errorHandler";

const DEFAULT_CAPACITY = 24; // seats per timeslot if no TableCapacity override exists

interface CreateBookingInput {
  userId?: string;
  name: string;
  email: string;
  phone: string;
  partySize: number;
  date: string;   // "YYYY-MM-DD"
  time: string;   // "HH:mm"
  notes?: string;
}

export async function createBooking(input: CreateBookingInput) {
  const date = new Date(input.date);
  if (isNaN(date.getTime())) {
    throw new ApiError(400, "Invalid date — expected YYYY-MM-DD");
  }

  // Prevent past bookings
  const slotDateTime = new Date(`${input.date}T${input.time}:00`);
  if (slotDateTime < new Date()) {
    throw new ApiError(400, "Cannot book a table in the past");
  }

  await assertCapacityAvailable(date, input.time, input.partySize);

  return Booking.create({
    userId:    input.userId,
    name:      input.name,
    email:     input.email,
    phone:     input.phone,
    partySize: input.partySize,
    date,
    time:      input.time,
    notes:     input.notes,
  });
}

/** Throws 409 if adding incomingPartySize would exceed the slot's capacity. */
async function assertCapacityAvailable(
  date: Date,
  time: string,
  incomingPartySize: number
): Promise<void> {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const [capacityRow, result] = await Promise.all([
    TableCapacity.findOne({ date: { $gte: startOfDay, $lte: endOfDay }, time }),
    Booking.aggregate([
      {
        $match: {
          date:   { $gte: startOfDay, $lte: endOfDay },
          time,
          status: { $in: ["PENDING", "CONFIRMED"] },
        },
      },
      { $group: { _id: null, total: { $sum: "$partySize" } } },
    ]),
  ]);

  const capacity    = capacityRow?.capacity ?? DEFAULT_CAPACITY;
  const bookedSeats = (result[0]?.total as number | undefined) ?? 0;

  if (bookedSeats + incomingPartySize > capacity) {
    const remaining = Math.max(capacity - bookedSeats, 0);
    throw new ApiError(
      409,
      `That time slot is fully booked — ${remaining} seat${remaining !== 1 ? "s" : ""} remaining.`
    );
  }
}

export async function getBooking(id: string) {
  const booking = await Booking.findById(id);
  if (!booking) throw new ApiError(404, "Booking not found");
  return booking;
}

export async function listBookings(filter: {
  userId?: string;
  status?: string;
  date?: Date;
}) {
  const query: Record<string, unknown> = {};
  if (filter.userId) query.userId = filter.userId;
  if (filter.status) query.status = filter.status;
  if (filter.date) {
    const start = new Date(filter.date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(filter.date);
    end.setHours(23, 59, 59, 999);
    query.date = { $gte: start, $lte: end };
  }
  return Booking.find(query).sort({ date: 1, time: 1 });
}

export async function cancelBooking(id: string, requesterUserId?: string) {
  const booking = await Booking.findById(id);
  if (!booking) throw new ApiError(404, "Booking not found");

  if (requesterUserId && booking.userId !== requesterUserId) {
    throw new ApiError(403, "You can only cancel your own bookings");
  }
  if (booking.status === "CANCELLED") {
    throw new ApiError(400, "Booking is already cancelled");
  }

  booking.status = "CANCELLED";
  await booking.save();
  return booking;
}

export async function updateBookingStatus(id: string, status: string) {
  const booking = await Booking.findById(id);
  if (!booking) throw new ApiError(404, "Booking not found");

  if (booking.status === "CANCELLED" || booking.status === "COMPLETED") {
    throw new ApiError(400, `Booking is already ${booking.status.toLowerCase()}`);
  }

  booking.status = status as typeof booking.status;
  await booking.save();
  return booking;
}
