import { VIDEOS } from "@/lib/site";

export default function VideoShowcase() {
  return (
    <section className="border-t border-forest/10 bg-cream">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 max-w-2xl">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-bean">
            See the garden
          </span>
          <h2 className="mt-2 font-display text-3xl text-forest md:text-4xl">
            A glimpse of Abol Garden
          </h2>
          <p className="mt-4 font-body text-forest/70">
            Shaded outdoor seating, fresh air, and the relaxed pace of Soddo.
            Follow us on TikTok for daily specials, coffee ceremonies, and
            behind-the-scenes from the garden.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {VIDEOS.map((video) => (
            <figure
              key={video.src}
              className="overflow-hidden rounded-2xl border border-forest/10 bg-forest shadow-lg"
            >
              <video
                src={video.src}
                autoPlay
                muted
                loop
                playsInline
                className="aspect-[4/5] w-full object-cover md:aspect-video"
              />
              <figcaption className="px-5 py-4">
                <p className="font-display text-lg text-cream">{video.title}</p>
                <p className="mt-1 font-body text-sm text-cream/65">
                  {video.caption}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
