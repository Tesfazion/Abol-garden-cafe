"use client";

import { useState } from "react";
import Image from "next/image";
import { SITE } from "@/lib/site";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitStatus("success");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    
    setTimeout(() => setSubmitStatus("idle"), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-garden text-white overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-white/20 border border-white/30 backdrop-blur-sm text-sm font-heading font-medium mb-6">
              Get In Touch
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
              We'd Love to
              <span className="block text-brass mt-2">Hear From You</span>
            </h1>
            <p className="font-body text-xl text-cream/90 max-w-3xl mx-auto">
              Questions? Feedback? Special requests? Reach out and we'll get back to you as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8 -mt-32 relative z-10">
            
            {/* Phone Card */}
            <div className="card p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brass/10 text-brass mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-semibold text-forest mb-3">
                Call Us
              </h3>
              <a
                href={`tel:${SITE.phone.replace(/\s/g, '')}`}
                className="font-body text-lg text-brass hover:text-brass-dark transition-colors"
              >
                {SITE.phone}
              </a>
              <p className="text-sm text-charcoal-light mt-2">
                Available 7 AM - 10 PM Daily
              </p>
            </div>

            {/* Location Card */}
            <div className="card p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sage/10 text-sage mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-semibold text-forest mb-3">
                Visit Us
              </h3>
              <p className="font-body text-charcoal mb-2">
                {SITE.location.plusCode}
              </p>
              <p className="text-sm text-charcoal-light">
                {SITE.location.city}, {SITE.location.country}
              </p>
              <a
                href={SITE.location.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 text-sm text-brass hover:text-brass-dark transition-colors"
              >
                Get Directions →
              </a>
            </div>

            {/* Hours Card */}
            <div className="card p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-terracotta/10 text-terracotta mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-semibold text-forest mb-3">
                Opening Hours
              </h3>
              <p className="font-body text-lg text-charcoal mb-2">
                {SITE.hours}
              </p>
              <p className="text-sm text-charcoal-light">
                Open Every Day
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-16 bg-gradient-warm">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <div>
              <h2 className="section-header mb-2">
                Send Us a Message
              </h2>
              <p className="font-body text-charcoal-light mb-8">
                Have a question or special request? Fill out the form and we'll respond within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="label">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email & Phone */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="label">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="label">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="input"
                      placeholder="+251 XX XXX XXXX"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="label">Subject *</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="input"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="reservation">Reservation</option>
                    <option value="catering">Catering / Events</option>
                    <option value="feedback">Feedback</option>
                    <option value="complaint">Complaint</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="label">Your Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="input min-h-[150px]"
                    placeholder="Tell us how we can help..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-full"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>

                {/* Success Message */}
                {submitStatus === "success" && (
                  <div className="p-4 rounded-lg bg-success/10 border border-success/20 text-success">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <p className="font-medium">
                        Thank you! We've received your message and will get back to you soon.
                      </p>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Map & Additional Info */}
            <div className="space-y-8">
              {/* Google Maps Embed */}
              <div className="card overflow-hidden">
                <div className="aspect-video relative bg-forest/5">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.234!2d37.7585!3d6.8147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNDgnNTMuMCJOIDM3wrA0NSczMC42IkU!5e0!3m2!1sen!2s!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-semibold text-forest mb-3">
                    Find Us on the Map
                  </h3>
                  <p className="text-sm text-charcoal-light mb-4">
                    Located in the heart of Wolaita Soddo, easy to find and plenty of parking available.
                  </p>
                  <a
                    href={SITE.location.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-sm w-full"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>

              {/* Quick Contact Info */}
              <div className="card p-6">
                <h3 className="font-heading font-semibold text-forest mb-4">
                  Other Ways to Reach Us
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-brass flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <div>
                      <p className="font-heading font-medium text-forest">Email</p>
                      <a href={`mailto:${SITE.email}`} className="text-sm text-charcoal-light hover:text-brass transition-colors">
                        {SITE.email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-brass flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                    <div>
                      <p className="font-heading font-medium text-forest">TikTok</p>
                      <a
                        href={SITE.tiktok.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-charcoal-light hover:text-brass transition-colors"
                      >
                        {SITE.tiktok.handle}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="section-header text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            <details className="card p-6 group">
              <summary className="font-heading font-semibold text-forest cursor-pointer list-none flex items-center justify-between">
                <span>Do you accept reservations?</span>
                <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 text-charcoal-light">
                Yes! We recommend making a reservation, especially for larger groups or during peak hours. 
                You can book online through our website or call us directly.
              </p>
            </details>

            <details className="card p-6 group">
              <summary className="font-heading font-semibold text-forest cursor-pointer list-none flex items-center justify-between">
                <span>Do you offer delivery?</span>
                <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 text-charcoal-light">
                We currently offer takeout and pickup orders. For delivery, please call us to discuss options 
                based on your location in Wolaita Soddo.
              </p>
            </details>

            <details className="card p-6 group">
              <summary className="font-heading font-semibold text-forest cursor-pointer list-none flex items-center justify-between">
                <span>Are you family-friendly?</span>
                <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 text-charcoal-light">
                Absolutely! We have a dedicated kids play area and a menu with options for children. 
                Families are always welcome at Abole Garden Café.
              </p>
            </details>

            <details className="card p-6 group">
              <summary className="font-heading font-semibold text-forest cursor-pointer list-none flex items-center justify-between">
                <span>Do you accommodate dietary restrictions?</span>
                <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 text-charcoal-light">
                Yes! We offer vegetarian options and can accommodate many dietary needs. 
                Please let us know about any allergies or restrictions when ordering.
              </p>
            </details>
          </div>
        </div>
      </section>
    </>
  );
}
