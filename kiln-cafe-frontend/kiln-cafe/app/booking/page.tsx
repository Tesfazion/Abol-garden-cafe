import BookingForm from "@/components/BookingForm";

export default function BookingPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <span className="font-mono text-xs uppercase tracking-[0.3em] text-brass">
        Reserve ahead
      </span>
      <h1 className="mt-2 font-display text-4xl text-ink">Book a table</h1>
      <p className="mt-3 max-w-lg font-body text-charcoal/70">
        Tables are held for 15 minutes past booking time. For parties over
        12, call us directly.
      </p>

      <div className="mt-10 rounded-2xl border border-charcoal/10 bg-wheat p-8">
        <BookingForm />
      </div>
    </div>
  );
}
