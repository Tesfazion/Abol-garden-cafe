"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SITE, VIDEOS } from "@/lib/site";

export default function Hero() {
  const [videoError, setVideoError] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<typeof VIDEOS[number]>(VIDEOS[0]);
  const [randomStart, setRandomStart] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // pick a random video on mount
    const idx = Math.floor(Math.random() * VIDEOS.length);
    setSelectedVideo(VIDEOS[idx]);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const tryPlay = async () => {
      try {
        if (playing) {
          // If we requested a random start, wait for metadata then set currentTime
          if (randomStart && v.readyState >= 1 && v.duration > 0) {
            v.currentTime = Math.random() * Math.max(0, v.duration - 1);
            setRandomStart(false);
          }
          await v.play();
        } else {
          v.pause();
        }
      } catch (err) {
        // autoplay may be blocked — ignore
      }
    };

    tryPlay();
  }, [playing, selectedVideo, randomStart]);

  const onLoadedMetadata = () => {
    const v = videoRef.current;
    if (v && randomStart && v.duration > 0) {
      v.currentTime = Math.random() * Math.max(0, v.duration - 1);
      setRandomStart(false);
    }
  };
  return (
    <section className="relative min-h-[92vh] overflow-hidden bg-gradient-garden">

      {/* Video Background */}
      {!videoError && (
        <video
          ref={videoRef}
          autoPlay
          muted={isMuted}
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-40"
          poster="/images/logo.jpeg"
          onError={() => setVideoError(true)}
          onLoadedMetadata={onLoadedMetadata}
        >
          <source src={selectedVideo.src} type="video/mp4" />
        </video>
      )}

      {/* Fallback Background Image */}
      {videoError && (
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070"
            alt="Restaurant ambiance"
            fill
            sizes="100vw"
            className="object-cover opacity-40"
            priority
          />
        </div>
      )}

      {/* Overlay Gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/90 to-forest/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-forest/95 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative container-custom flex min-h-[92vh] flex-col justify-center py-20">
        
        {/* Logo */}
        <div className="mb-8 animate-fade-in">
          <Image
            src="/images/logo.jpeg"
            alt="Abole Garden Café logo"
            width={240}
            height={100}
            priority
            className="h-auto w-48 md:w-60 rounded-xl bg-white/95 p-4 shadow-elevated"
          />
        </div>

        {/* Location Badge */}
        <div className="mb-6 animate-slide-up">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brass/20 border border-brass/30 backdrop-blur-sm">
            <svg className="w-4 h-4 text-brass" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="font-heading text-sm font-medium text-cream">
              Wolaita Soddo, Ethiopia · ውላይታ ሶዶ
            </span>
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="max-w-4xl font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-cream mb-6 animate-slide-up">
          Experience Authentic
          <span className="block text-brass mt-2">Ethiopian Dining</span>
          <span className="block text-cream/90 text-3xl md:text-4xl lg:text-5xl mt-4 font-medium">
            In Our Beautiful Garden
          </span>
        </h1>

        {/* Subheading */}
        <p className="max-w-2xl font-body text-lg md:text-xl text-cream/85 leading-relaxed mb-8 animate-slide-up">
          From traditional Ethiopian coffee ceremonies to international favorites, 
          enjoy delicious food in a relaxed garden atmosphere. Perfect for families, 
          friends, and anyone who loves great food and Soddo's beautiful weather.
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-4 mb-10 animate-slide-up">
          <div className="flex items-center gap-2 text-cream/80">
            <svg className="w-5 h-5 text-brass" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
            </svg>
            <span className="font-heading text-sm font-medium">Ethiopian & International Cuisine</span>
          </div>
          <div className="flex items-center gap-2 text-cream/80">
            <svg className="w-5 h-5 text-brass" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
            <span className="font-heading text-sm font-medium">Garden Seating</span>
          </div>
          <div className="flex items-center gap-2 text-cream/80">
            <svg className="w-5 h-5 text-brass" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-heading text-sm font-medium">⭐ 4.2 Rating (22 Reviews)</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 items-center animate-slide-up">
          <Link
            href="/menu"
            className="btn btn-primary btn-lg group"
          >
            <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Explore Our Menu
          </Link>

          <Link
            href="/booking"
            className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-forest"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Reserve a Table
          </Link>

          <a
            href={`tel:${SITE.phone.replace(/\s/g, '')}`}
            className="btn btn-ghost btn-lg text-white hover:bg-white/10"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call Us
          </a>

          {/* Small quick-info card */}
          <div className="ml-2 hidden md:flex flex-col gap-2 rounded-lg border border-white/10 bg-white/5 p-3 px-4">
            <div className="text-sm text-cream/90">Open: <span className="font-semibold">7:00 AM</span></div>
            <div className="text-sm text-cream/90">Today's special: <span className="font-semibold">Abole Special</span></div>
          </div>
        </div>

        {/* Sound & Playback Controls */}
        {!videoError && (
          <div className="absolute bottom-8 right-8 flex gap-3">
            <button
              onClick={() => setPlaying((p) => !p)}
              className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all"
              aria-label={playing ? "Pause video" : "Play video"}
            >
              {playing ? (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M6 19h4V5H6v14zM14 5v14h4V5h-4z" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M5 3v18l15-9L5 3z" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>

            <button
              onClick={() => setIsMuted((m) => !m)}
              className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              )}
            </button>
          </div>
        )}

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-brass" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
