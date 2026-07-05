import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Primary Brand Colors - Garden Restaurant & Café Theme
        forest: "#1E3A1F",          // Deep green - sophistication, garden
        "forest-light": "#2D5A47",  // Lighter forest green
        "forest-dark": "#0B241E",   // Darkest forest - headers
        
        sage: "#8BA888",            // Soft green - accents, nature
        "sage-light": "#B4D4B1",    // Light sage
        
        // Warm Neutrals - Restaurant warmth
        cream: "#F5F1E8",           // Main background - warm, inviting
        "cream-dark": "#E8DFC8",    // Darker cream sections
        "cream-light": "#FEFDFB",   // Almost white
        
        // Accent Colors - Food & sophistication
        brass: "#C5A572",           // Gold accent - premium, CTAs
        "brass-light": "#D4B89E",   // Light brass
        "brass-dark": "#B8935A",    // Deep brass
        
        terracotta: "#C8785C",      // Ethiopian clay pots, warmth
        "terracotta-light": "#D9947F", // Light terracotta
        
        coffee: "#4A3428",          // Coffee brown - headers, text
        "coffee-light": "#6B5547",  // Lighter coffee
        
        // Text Colors
        charcoal: "#2B2826",        // Body text
        "charcoal-light": "#4A4643", // Secondary text
        
        // Semantic Colors
        success: "#10B981",         // Green for success states
        warning: "#F59E0B",         // Amber for warnings
        error: "#EF4444",           // Red for errors
        info: "#3B82F6",            // Blue for info
        
        // Legacy aliases for gradual migration
        bean: "#C5A572",
        "bean-light": "#D4B89E",
        ember: "#C8785C",
        ink: "#1E3A1F",
        wheat: "#F5F1E8",
        "wheat-dim": "#E8DFC8",
        leaf: "#8BA888",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],     // Elegant headings (using existing Fraunces)
        heading: ["var(--font-inter)", "sans-serif"],   // Subheadings (using existing Inter)
        body: ["var(--font-inter)", "sans-serif"],      // Body text
        accent: ["var(--font-fraunces)", "cursive"],    // Special accents
        mono: ["var(--font-jetbrains)", "monospace"],   // Prices, labels
      },
      fontSize: {
        'hero': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      backgroundImage: {
        grain: "url('/grain.svg')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-garden': 'linear-gradient(135deg, #1E3A1F 0%, #2D5A47 100%)',
        'gradient-warm': 'linear-gradient(135deg, #F5F1E8 0%, #E8DFC8 100%)',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.08)',
        'elevated': '0 10px 40px -10px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
