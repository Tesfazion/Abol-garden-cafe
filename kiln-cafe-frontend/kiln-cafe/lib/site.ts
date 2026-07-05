export const SITE = {
  name: "Abol Garden Cafe",
  tagline: "Coffee, food & garden vibes in Wolaita Soddo",
  location: {
    plusCode: "VQ35+R4",
    city: "Wolaita Sodo",
    country: "Ethiopia",
    mapsUrl: "https://maps.app.goo.gl/ba97dYQLdQQ4L6sa6",
    description: "In front of Omo Bank main district",
  },
  hours: "Open Daily · 7:00 AM – 10:00 PM",
  phone: "+251 97 019 3549",
  email: "info@abolgardencafe.et",
  tiktok: {
    handle: "@abol.garden.cafe",
    url: "https://www.tiktok.com/@abol.garden.cafe",
  },
  rating: { score: 4.2, count: 22 },
} as const;

export const VIDEOS = [
  {
    src: "/videos/garden-1.mp4",
    title: "Garden seating",
    caption: "Relax under the trees with fresh coffee and good weather.",
  },
  {
    src: "/videos/garden-2.mp4",
    title: "Café atmosphere",
    caption: "The real Abol Garden — food, friends, and Ethiopian hospitality.",
  },
] as const;
