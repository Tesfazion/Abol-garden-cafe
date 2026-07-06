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
      {/* Hero Section - Modern Design */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070"
            alt="Abole Garden Café"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-forest/95 via-sage/90 to-forest/95"></div>
          
          {/* Decorative Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="container-custom relative z-10 text-center text-white py-20">
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-heading font-medium mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Let's Connect
          </span>
          
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight">
            We'd Love to
            <span className="block bg-gradient-to-r from-brass via-yellow-300 to-brass bg-clip-text text-transparent mt-2">
              Hear From You
            </span>
          </h1>
          
          <p className="font-body text-xl md:text-2xl text-cream/90 max-w-3xl mx-auto leading-relaxed">
            Whether you have questions, special requests, or feedback, we're here to help. 
            Your satisfaction is our priority.
          </p>
        </div>
      </section>

      {/* Quick Contact Cards */}
      <section className="py-16 bg-cream-light">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8 -mt-32 relative z-20">
            
            {/* Phone Card */}
            <div className="group card p-8 text-center hover:scale-105 transition-all duration-300 hover:shadow-2xl">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-brass to-brass-dark text-white mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="font-heading text-2xl font-bold text-forest mb-3">
                Call Us
              </h3>
              <a
                href={`tel:${SITE.phone.replace(/\s/g, '')}`}
                className="font-body text-lg text-brass hover:text-brass-dark transition-colors font-semibold"
              >
                {SITE.phone}
              </a>
              <p className="text-sm text-charcoal-light mt-3 font-medium">
                Available 7 AM - 10 PM Daily
              </p>
              <div className="mt-6">
                <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} className="btn btn-sm btn-outline">
                  Call Now
                </a>
              </div>
            </div>

            {/* Location Card */}
            <div className="group card p-8 text-center hover:scale-105 transition-all duration-300 hover:shadow-2xl">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-sage to-forest text-white mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-heading text-2xl font-bold text-forest mb-3">
                Visit Us
              </h3>
              <p className="font-body text-charcoal mb-2 font-semibold">
                {SITE.location.plusCode}
              </p>
              <p className="text-sm text-charcoal-light font-medium">
                {SITE.location.city}, {SITE.location.country}
              </p>
              <div className="mt-6">
                <a
                  href={SITE.location.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-outline"
                >
                  Get Directions
                </a>
              </div>
            </div>

            {/* Hours Card */}
            <div className="group card p-8 text-center hover:scale-105 transition-all duration-300 hover:shadow-2xl">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-terracotta to-red-600 text-white mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-heading text-2xl font-bold text-forest mb-3">
                Opening Hours
              </h3>
              <p className="font-body text-lg text-charcoal mb-2 font-semibold">
                {SITE.hours}
              </p>
              <p className="text-sm text-charcoal-light font-medium">
                Open Every Day
              </p>
              <div className="mt-6">
                <a href="/booking" className="btn btn-sm btn-outline">
                  Book a Table
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section - Form & Map */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <h2 className="font-display text-4xl font-bold text-forest mb-4">
                  Send Us a Message
                </h2>
                <p className="font-body text-lg text-charcoal-light leading-relaxed">
                  Fill out the form below and our team will get back to you within 24 hours. 
                  We're here to make your experience exceptional.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="label text-base font-semibold">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input text-base"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email & Phone */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="label text-base font-semibold">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input text-base"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="label text-base font-semibold">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="input text-base"
                      placeholder="+251 XX XXX XXXX"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="label text-base font-semibold">Subject *</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="input text-base"
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
                  <label className="label text-base font-semibold">Your Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="input min-h-[180px] text-base"
                    placeholder="Tell us how we can help you today..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-full py-4 text-lg font-bold"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-3">
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Send Message
                    </span>
                  )}
                </button>

                {/* Success Message */}
                {submitStatus === "success" && (
                  <div className="p-5 rounded-xl bg-success/10 border-2 border-success/30 text-success animate-slide-down">
                    <div className="flex items-center gap-3">
                      <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="font-heading font-bold text-base">Message Sent Successfully!</p>
                        <p className="text-sm mt-1">We'll get back to you within 24 hours.</p>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Map & Info Sidebar */}
            <div className="space-y-8">
              
              {/* Google Maps */}
              <div className="card overflow-hidden shadow-elevated">
                <div className="aspect-square relative bg-forest/5">
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
                <div className="p-6 bg-gradient-warm">
                  <h3 className="font-heading text-xl font-bold text-forest mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-brass" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    Find Us on the Map
                  </h3>
                  <p className="text-sm text-charcoal-light mb-4 leading-relaxed">
                    Located in the heart of Wolaita Soddo. Easy to find with plenty of parking available.
                  </p>
                  <a
                    href={SITE.location.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary w-full"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>

              {/* Contact Info Card */}
              <div className="card p-8 bg-gradient-to-br from-forest to-sage text-white">
                <h3 className="font-heading text-2xl font-bold mb-6">
                  Other Ways to Reach Us
                </h3>
                
                <div className="space-y-6">
                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-brass" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-heading font-semibold text-brass mb-1">Email</p>
                      <a href={`mailto:${SITE.email}`} className="text-cream hover:text-white transition-colors text-sm">
                        {SITE.email}
                      </a>
                    </div>
                  </div>
                  
                  {/* TikTok */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-brass" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-heading font-semibold text-brass mb-1">TikTok</p>
                      <a
                        href={SITE.tiktok.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cream hover:text-white transition-colors text-sm"
                      >
                        {SITE.tiktok.handle}
                      </a>
                    </div>
                  </div>

                  {/* Social */}
                  <div className="pt-6 border-t border-white/20">
                    <p className="font-heading font-semibold text-brass mb-4">Follow Us</p>
                    <div className="flex gap-3">
                      <a href="#" className="w-10 h-10 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                        </svg>
                      </a>
                      <a href="#" className="w-10 h-10 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z"/>
                        </svg>
                      </a>
                      <a href="#" className="w-10 h-10 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
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
      <section className="py-20 bg-cream-light">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-forest mb-4">
              Frequently Asked Questions
            </h2>
            <p className="font-body text-lg text-charcoal-light">
              Quick answers to common questions about Abole Garden Café
            </p>
          </div>
          
          <div className="space-y-4">
            <details className="card p-6 group cursor-pointer">
              <summary className="font-heading text-lg font-bold text-forest list-none flex items-center justify-between">
                <span>Do you accept reservations?</span>
                <svg className="w-6 h-6 text-brass transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 text-charcoal-light leading-relaxed pl-2">
                Yes! We highly recommend making a reservation, especially for larger groups or during peak hours. 
                You can book online through our website or call us directly at {SITE.phone}.
              </p>
            </details>

            <details className="card p-6 group cursor-pointer">
              <summary className="font-heading text-lg font-bold text-forest list-none flex items-center justify-between">
                <span>Do you offer delivery?</span>
                <svg className="w-6 h-6 text-brass transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 text-charcoal-light leading-relaxed pl-2">
                We currently offer takeout and pickup orders. For delivery, please call us to discuss options 
                based on your location in Wolaita Soddo.
              </p>
            </details>

            <details className="card p-6 group cursor-pointer">
              <summary className="font-heading text-lg font-bold text-forest list-none flex items-center justify-between">
                <span>Are you family-friendly?</span>
                <svg className="w-6 h-6 text-brass transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 text-charcoal-light leading-relaxed pl-2">
                Absolutely! We have a dedicated kids play area and a menu with options for children. 
                Families are always welcome at Abole Garden Café.
              </p>
            </details>

            <details className="card p-6 group cursor-pointer">
              <summary className="font-heading text-lg font-bold text-forest list-none flex items-center justify-between">
                <span>Do you accommodate dietary restrictions?</span>
                <svg className="w-6 h-6 text-brass transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 text-charcoal-light leading-relaxed pl-2">
                Yes! We offer vegetarian and vegan options. Our fasting platter is completely vegan. 
                Please let us know about any allergies or dietary restrictions when ordering.
              </p>
            </details>

            <details className="card p-6 group cursor-pointer">
              <summary className="font-heading text-lg font-bold text-forest list-none flex items-center justify-between">
                <span>Is parking available?</span>
                <svg className="w-6 h-6 text-brass transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 text-charcoal-light leading-relaxed pl-2">
                Yes, we have ample parking space available for our guests. Street parking is also available nearby.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-brass via-brass-dark to-brass text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 border-4 border-white rounded-full"></div>
          <div className="absolute bottom-10 left-10 w-48 h-48 border-4 border-white rounded-full"></div>
        </div>
        
        <div className="container-custom text-center relative z-10">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Ready to Experience
            <span className="block mt-2">Abole Garden Café?</span>
          </h2>
          <p className="font-body text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Join us for authentic Ethiopian cuisine, warm hospitality, and unforgettable moments.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/booking" className="btn btn-lg px-8 py-4 bg-white text-brass hover:bg-cream font-bold shadow-xl hover:shadow-2xl">
              Reserve a Table
            </a>
            <a href="/menu" className="btn btn-lg px-8 py-4 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border-2 border-white/30 font-bold">
              View Menu
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
