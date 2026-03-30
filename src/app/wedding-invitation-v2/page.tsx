"use client";

import {
  Calendar,
  Camera,
  Check,
  ChevronDown,
  Eye,
  EyeOff,
  Gift,
  Heart,
  Link2,
  Lock,
  MapPin,
  MessageCircle,
  Mic,
  Music,
  Play,
  QrCode,
  Send,
  Smartphone,
  Sparkles,
  Star,
  ThumbsUp,
  Users,
  Volume2,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

/* ───────── Animated Counter Hook ───────── */

function useCounter(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number;
    let frame: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, start]);
  return count;
}

/* ───────── Typewriter Hook ───────── */

function useTypewriter(text: string, speed = 50, start = false) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    if (!start) {
      setDisplayed("");
      return;
    }
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, start]);
  return displayed;
}

/* ───────── Parallax Image Component ───────── */

function ParallaxImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const visible = (windowH - rect.top) / (windowH + rect.height);
      setOffset(visible * 40 - 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-100"
        style={{ transform: `translateY(${offset}px) scale(1.1)` }}
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );
}

/* ───────── FAQ Data ───────── */

const faqs = [
  {
    q: "Do I need to create an account?",
    a: "Yes, a free account lets you create, manage, and share your wedding invitation. Your guests don't need an account — they can view and interact using the shared link.",
  },
  {
    q: "Can older relatives who aren't tech-savvy participate?",
    a: "Absolutely! Guests simply click a link — no app downloads needed. They can leave voice notes, upload photos, or type messages. Family members can also help submit on their behalf.",
  },
  {
    q: "What kind of content can guests add?",
    a: "Guests can share text messages, photos, videos, voice notes, GIFs, and even song recommendations. There are 200+ curated prompts to inspire meaningful contributions.",
  },
  {
    q: "Is our wedding invitation private and secure?",
    a: "Yes. Your invitation is only accessible via the private link you share. It's not indexed by search engines, and you have full control over who can view and contribute.",
  },
  {
    q: "Can I collect RSVPs and dietary requirements?",
    a: "Yes! The built-in RSVP system collects attendance confirmations, plus-ones, dietary restrictions, and personal notes — all in one place, no spreadsheets needed.",
  },
  {
    q: "What happens to our invitation after the wedding?",
    a: "Your invitation becomes a permanent digital keepsake. All guest messages, photos, and voice notes are preserved forever — a living memory of your special day.",
  },
  {
    q: "Can I integrate a gift registry or group gifting?",
    a: "Yes! Link your existing registry or use the built-in group gifting feature. Guests can contribute to a honeymoon fund or pool together for larger gifts with digital gift cards.",
  },
];

/* ───────── Unsplash Images ───────── */

const img = {
  hero: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80",
  couple: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80",
  rings: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&q=80",
  venue: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80",
  flowers: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=800&q=80",
  cake: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=800&q=80",
  dancing: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80",
  hands: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&q=80",
  decor: "https://images.unsplash.com/photo-1478146059778-26028b07395a?w=800&q=80",
  toast: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
};

/* ───────── Main Component ───────── */

export default function WeddingInvitationV2() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeFeature, setActiveFeature] = useState(0);
  const [likedMessages, setLikedMessages] = useState<Set<number>>(new Set());
  const [rsvpStatus, setRsvpStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1 }
    );
    sectionRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const r = (id: string) => (el: HTMLElement | null) => {
    if (el) sectionRefs.current.set(id, el);
  };
  const v = (id: string) => visibleSections.has(id);

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 6);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Animated counters
  const statsVisible = v("stats");
  const counter1 = useCounter(200, 2000, statsVisible);
  const counter2 = useCounter(89, 1500, statsVisible);
  const counter3 = useCounter(6, 800, statsVisible);

  // Typewriter
  const heroTyped = useTypewriter(
    "Tells Your Love Story",
    60,
    true
  );

  // RSVP animation
  const handleRsvp = useCallback(() => {
    setRsvpStatus("sending");
    setTimeout(() => setRsvpStatus("sent"), 1500);
    setTimeout(() => setRsvpStatus("idle"), 4000);
  }, []);

  // Like toggle
  const toggleLike = useCallback((idx: number) => {
    setLikedMessages((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  }, []);

  const features = [
    {
      icon: Link2,
      title: "Share via Link & WhatsApp",
      desc: "Send your invitation instantly — no app downloads needed. One tap to open, one tap to RSVP.",
      gradient: "from-rose-500 to-pink-500",
      image: img.couple,
    },
    {
      icon: MessageCircle,
      title: "Interactive RSVP & Messages",
      desc: "Collect RSVPs with personal notes, dietary preferences, and heartfelt wishes — all in one place.",
      gradient: "from-pink-500 to-fuchsia-500",
      image: img.flowers,
    },
    {
      icon: Heart,
      title: "Love Story Timeline",
      desc: "Tell your journey — from first date to proposal. Add photos, videos, and milestones your guests will love.",
      gradient: "from-red-400 to-rose-500",
      image: img.rings,
    },
    {
      icon: MapPin,
      title: "Venue & Map Integration",
      desc: "One-tap directions to ceremony and reception. Include parking info and hotel recommendations.",
      gradient: "from-fuchsia-500 to-purple-500",
      image: img.venue,
    },
    {
      icon: Gift,
      title: "Gift Registry & Group Gifting",
      desc: "Link registries or set up a honeymoon fund. Guests can pool together for meaningful gifts.",
      gradient: "from-amber-400 to-orange-500",
      image: img.cake,
    },
    {
      icon: Calendar,
      title: "Save to Calendar",
      desc: "Guests add your wedding to their calendar with one click — never miss the big day.",
      gradient: "from-emerald-400 to-teal-500",
      image: img.decor,
    },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* ───────── HEADER ───────── */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-rose-100">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-baseline">
            <span className="font-extrabold text-charcoal-dark text-xl tracking-tight">
              ownstory
            </span>
            <span className="w-2 h-2 rounded-full bg-rose-400 ml-0.5 mb-0.5 inline-block" />
          </div>
          <div className="hidden md:flex items-center gap-5 text-sm text-charcoal-light">
            <span className="hover:text-charcoal-dark cursor-pointer">Home</span>
            <span className="hover:text-charcoal-dark cursor-pointer">Use Cases <span className="text-[10px]">&#9662;</span></span>
            <span className="hover:text-charcoal-dark cursor-pointer">Occasions</span>
            <span className="hover:text-charcoal-dark cursor-pointer">Solutions</span>
            <span className="hover:text-charcoal-dark cursor-pointer">Resources <span className="text-[10px]">&#9662;</span></span>
            <span className="hover:text-charcoal-dark cursor-pointer">Demo</span>
            <span className="hover:text-charcoal-dark cursor-pointer">Contact</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-sm text-charcoal-light hover:text-charcoal-dark hidden sm:block">Log in</button>
            <button className="text-sm bg-rose-500 text-white px-5 py-2 rounded-full hover:bg-rose-600 transition-colors font-bold shadow-sm">
              Create
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* ───────── HERO with Full-Bleed Image ───────── */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <Image
              src={img.hero}
              alt="Wedding celebration"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
          </div>

          {/* Floating Particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="absolute animate-float text-white/20"
                style={{
                  left: `${8 + i * 8}%`,
                  top: `${10 + (i % 4) * 20}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${4 + (i % 3) * 2}s`,
                }}
              >
                <Heart className="w-4 h-4" />
              </div>
            ))}
          </div>

          <div className="relative max-w-4xl mx-auto text-center px-4 py-20">
            <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md text-white text-xs md:text-sm font-medium px-5 py-2 rounded-full border border-white/20 mb-8">
              <Sparkles className="w-4 h-4 text-rose-300" />
              The Wedding
            </span>

            <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight">
              The Wedding Invite That
              <br />
              <span className="text-rose-300 inline-block min-h-[1.2em]">
                {heroTyped}
                <span className="animate-pulse">|</span>
              </span>
            </h1>
            <p className="text-base md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              More than save the date — create a beautiful, interactive wedding
              invitation where guests RSVP, share memories, leave voice notes,
              and celebrate your journey together.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="group w-full sm:w-auto flex items-center justify-center gap-2 bg-rose-500 text-white font-semibold rounded-full py-4 px-10 hover:bg-rose-600 hover:scale-105 transition-all duration-300 shadow-xl text-base">
                <Heart className="w-5 h-5 group-hover:animate-pulse" />
                Create Your Story
              </button>
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/15 backdrop-blur-sm text-white font-semibold rounded-full py-4 px-10 border border-white/30 hover:bg-white/25 transition-all duration-300 text-base">
                <Play className="w-5 h-5" />
                Watch Demo
              </button>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
              <ChevronDown className="w-6 h-6 text-white/60" />
            </div>
          </div>
        </section>

        {/* ───────── IMAGE GALLERY STRIP ───────── */}
        <section className="py-4 bg-white overflow-hidden">
          <div className="flex gap-3 animate-scroll">
            {[img.couple, img.rings, img.venue, img.flowers, img.cake, img.dancing, img.hands, img.decor].map(
              (src, i) => (
                <div
                  key={i}
                  className="relative w-48 h-32 md:w-64 md:h-40 rounded-2xl overflow-hidden flex-shrink-0 group"
                >
                  <Image
                    src={src}
                    alt={`Wedding photo ${i + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="256px"
                  />
                  <div className="absolute inset-0 bg-rose-500/0 group-hover:bg-rose-500/20 transition-colors duration-300" />
                </div>
              )
            )}
          </div>
        </section>

        {/* ───────── VALUE PROPOSITION with Side Image ───────── */}
        <section
          id="value"
          ref={r("value")}
          className={`py-16 md:py-24 px-4 bg-rose-50/50 transition-all duration-700 ${
            v("value") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <span className="inline-flex items-center gap-1.5 bg-rose-100 text-rose-600 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  Why Ownstory
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-charcoal-dark mb-5 leading-tight">
                  More Than Just
                  <br />
                  &ldquo;Save the Date&rdquo;
                </h2>
                <p className="text-charcoal-light leading-relaxed mb-4">
                  Your wedding invitation should be as special as your love story.
                  With Ownstory, guests don&apos;t just see a date — they
                  experience your journey. From how you met to the proposal,
                  every chapter comes alive.
                </p>
                <p className="text-charcoal-light leading-relaxed mb-6">
                  Invite guests to share blessings, upload photos,
                  record voice notes, and RSVP with a personal touch. It&apos;s
                  the wedding invitation that becomes a treasured keepsake.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {["bg-rose-400", "bg-pink-400", "bg-fuchsia-400", "bg-purple-400"].map((c, i) => (
                      <div key={i} className={`w-8 h-8 rounded-full ${c} border-2 border-white flex items-center justify-center text-white text-[10px] font-bold`}>
                        {["J", "P", "S", "R"][i]}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-charcoal-light">
                    <span className="font-bold text-charcoal-dark">2,500+</span> couples have shared their story
                  </p>
                </div>
              </div>
              <div className="relative h-80 md:h-[450px] rounded-3xl overflow-hidden shadow-floating">
                <Image
                  src={img.couple}
                  alt="Happy couple"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                {/* Floating card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
                      <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-charcoal-dark">Your love story, beautifully told</p>
                      <p className="text-xs text-charcoal-light">Photos, videos, voice notes & more</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── INTERACTIVE FEATURE SHOWCASE ───────── */}
        <section
          id="features"
          ref={r("features")}
          className={`py-16 md:py-24 px-4 transition-all duration-700 ${
            v("features") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal-dark mb-3">
                Everything Your Wedding Invitation Needs
              </h2>
              <p className="text-charcoal-light">
                Click any feature to see it in action
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Feature List */}
              <div className="space-y-3">
                {features.map((feature, i) => {
                  const Icon = feature.icon;
                  const isActive = activeFeature === i;
                  return (
                    <button
                      key={i}
                      onClick={() => setActiveFeature(i)}
                      className={`w-full text-left rounded-2xl p-4 border transition-all duration-300 flex items-start gap-4 ${
                        isActive
                          ? "bg-white shadow-floating border-rose-200 scale-[1.02]"
                          : "bg-white/50 border-transparent hover:bg-white hover:border-rose-100 hover:shadow-soft"
                      }`}
                    >
                      <div
                        className={`w-11 h-11 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                          isActive ? "scale-110" : ""
                        }`}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-charcoal-dark text-sm mb-0.5">
                          {feature.title}
                        </h3>
                        <p className={`text-xs text-charcoal-light leading-relaxed transition-all duration-300 ${
                          isActive ? "max-h-20 opacity-100" : "max-h-0 opacity-0 overflow-hidden md:max-h-20 md:opacity-100"
                        }`}>
                          {feature.desc}
                        </p>
                      </div>
                      {isActive && (
                        <div className="w-2 h-2 rounded-full bg-rose-500 flex-shrink-0 mt-2 animate-pulse" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feature Image Preview */}
              <div className="relative h-80 md:h-[480px] rounded-3xl overflow-hidden shadow-floating group">
                {features.map((feature, i) => (
                  <div
                    key={i}
                    className={`absolute inset-0 transition-opacity duration-700 ${
                      activeFeature === i ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                ))}
                <div className="absolute bottom-5 left-5 right-5 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${features[activeFeature].gradient} flex items-center justify-center`}>
                      {(() => {
                        const ActiveIcon = features[activeFeature].icon;
                        return <ActiveIcon className="w-5 h-5 text-white" />;
                      })()}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-charcoal-dark">{features[activeFeature].title}</p>
                      <p className="text-xs text-charcoal-light">{features[activeFeature].desc}</p>
                    </div>
                  </div>
                </div>
                {/* Progress dots */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {features.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveFeature(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        activeFeature === i ? "w-6 bg-white" : "w-1.5 bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── JOURNEY STEPS with Hover Effects ───────── */}
        <section
          id="journey"
          ref={r("journey")}
          className={`py-16 md:py-24 px-4 bg-rose-50/50 transition-all duration-700 ${
            v("journey") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal-dark mb-3">
                Five Simple Steps to Your Perfect Invitation
              </h2>
              <p className="text-charcoal-light">
                From creation to celebration — we&apos;ve made it effortless
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {[
                { emoji: "💌", step: "1", title: "Create Invitation", desc: "Choose a template and personalize with your details", color: "from-rose-400 to-rose-500" },
                { emoji: "💍", step: "2", title: "Add Your Story", desc: "Share your love journey with photos and milestones", color: "from-pink-400 to-pink-500" },
                { emoji: "👰", step: "3", title: "Invite Guests", desc: "Share via WhatsApp, link, or QR code", color: "from-fuchsia-400 to-fuchsia-500" },
                { emoji: "💕", step: "4", title: "Collect Messages", desc: "Guests leave wishes, photos, and voice notes", color: "from-purple-400 to-purple-500" },
                { emoji: "🎉", step: "5", title: "Celebrate Together", desc: "Your invitation becomes a lasting memory", color: "from-amber-400 to-orange-500" },
              ].map((item, i) => (
                <div
                  key={i}
                  onMouseEnter={() => setHoveredStep(i)}
                  onMouseLeave={() => setHoveredStep(null)}
                  className={`text-center cursor-default transition-all duration-500 ${
                    hoveredStep === i ? "scale-110 -translate-y-2" : hoveredStep !== null ? "scale-95 opacity-60" : ""
                  }`}
                >
                  <div className={`relative w-20 h-20 rounded-2xl mx-auto mb-4 flex items-center justify-center text-4xl shadow-soft transition-all duration-500 ${
                    hoveredStep === i
                      ? `bg-gradient-to-br ${item.color} shadow-floating`
                      : "bg-white border border-rose-200"
                  }`}>
                    {item.emoji}
                    {/* Connector line */}
                    {i < 4 && (
                      <div className="hidden md:block absolute top-1/2 -right-3 w-3 h-0.5 bg-rose-200" />
                    )}
                  </div>
                  <div className="text-[10px] font-bold text-rose-400 mb-1">STEP {item.step}</div>
                  <h3 className="font-bold text-charcoal-dark text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-charcoal-light">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── WHATSAPP INTEGRATION with Image ───────── */}
        <section
          id="whatsapp"
          ref={r("whatsapp")}
          className={`py-16 md:py-24 px-4 transition-all duration-700 ${
            v("whatsapp") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-medium px-3 py-1 rounded-full border border-green-100 mb-4">
                  <Smartphone className="w-3.5 h-3.5" />
                  WhatsApp Integration
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-charcoal-dark mb-4">
                  Guests Contribute
                  <br />via WhatsApp
                </h2>
                <p className="text-charcoal-light leading-relaxed mb-6">
                  No apps, no accounts. Guests simply chat with our WhatsApp
                  bot to send photos, voice notes, and wishes — everything
                  appears on your wedding page instantly.
                </p>
                <div className="space-y-3">
                  {[
                    "Send photos directly from the gallery",
                    "Record voice blessings in seconds",
                    "Type heartfelt messages with ease",
                    "Works for all ages — no tech skills needed",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 group">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 group-hover:bg-green-200 group-hover:scale-110 transition-all">
                        <Check className="w-3.5 h-3.5 text-green-600" />
                      </div>
                      <span className="text-sm text-charcoal group-hover:text-charcoal-dark transition-colors">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* WhatsApp Chat Mock */}
              <div className="bg-gradient-to-b from-emerald-50 to-green-50 rounded-3xl p-5 border border-green-100 shadow-soft">
                <div className="bg-green-600 rounded-t-2xl px-4 py-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">Ownstory Wedding</p>
                    <p className="text-green-100 text-[10px]">online</p>
                  </div>
                </div>
                <div className="bg-[#ECE5DD] rounded-b-2xl p-4 space-y-3 min-h-[280px]">
                  <div className="bg-white rounded-xl rounded-tl-sm px-3 py-2 max-w-[80%] shadow-sm">
                    <p className="text-xs text-charcoal">Welcome to James & Priya&apos;s wedding! Send your wishes, photos, or voice notes.</p>
                    <p className="text-[9px] text-charcoal-light/50 text-right mt-1">10:30 AM</p>
                  </div>
                  <div className="bg-[#DCF8C6] rounded-xl rounded-tr-sm px-3 py-2 max-w-[80%] ml-auto shadow-sm">
                    <p className="text-xs text-charcoal">Congratulations to you both! Wishing you a lifetime of happiness</p>
                    <p className="text-[9px] text-charcoal-light/50 text-right mt-1">10:31 AM</p>
                  </div>
                  <div className="bg-white rounded-xl rounded-tl-sm px-3 py-2 max-w-[80%] shadow-sm">
                    <p className="text-xs text-charcoal">Thank you! Your message has been added to the wedding story</p>
                    <p className="text-[9px] text-charcoal-light/50 text-right mt-1">10:31 AM</p>
                  </div>
                  <div className="bg-[#DCF8C6] rounded-xl rounded-tr-sm px-3 py-2 max-w-[80%] ml-auto shadow-sm flex items-center gap-2">
                    <Mic className="w-3.5 h-3.5 text-green-600" />
                    <div className="flex-1 h-1 bg-green-300 rounded-full"><div className="w-2/3 h-full bg-green-500 rounded-full animate-pulse" /></div>
                    <span className="text-[10px] text-charcoal-light">0:24</span>
                  </div>
                  <div className="bg-white rounded-xl rounded-tl-sm px-3 py-2 max-w-[80%] shadow-sm">
                    <p className="text-xs text-charcoal">Voice note added! Want to share a photo too? 📸</p>
                    <p className="text-[9px] text-charcoal-light/50 text-right mt-1">10:32 AM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── INTERACTIVE LIVE PREVIEW ───────── */}
        <section
          id="preview"
          ref={r("preview")}
          className={`py-16 md:py-24 px-4 bg-rose-50/50 transition-all duration-700 ${
            v("preview") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-charcoal-dark mb-4">
                  Your Wedding Invitation
                  <br />Comes <span className="text-rose-500">Alive</span>
                </h2>
                <p className="text-charcoal-light leading-relaxed mb-6">
                  See how a real Ownstory wedding page looks with guest
                  contributions. Try clicking the hearts — this is exactly how your guests interact!
                </p>

                {/* Interactive RSVP Demo */}
                <div className="bg-white rounded-2xl p-5 border border-rose-100 shadow-soft mb-4">
                  <p className="text-sm font-bold text-charcoal-dark mb-3">Try the RSVP Experience</p>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      placeholder="Your name..."
                      className="flex-1 bg-rose-50 border border-rose-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 placeholder:text-charcoal-light/50"
                    />
                    <button
                      onClick={handleRsvp}
                      disabled={rsvpStatus !== "idle"}
                      className={`flex items-center gap-2 font-semibold rounded-xl py-2 px-4 text-sm transition-all duration-300 ${
                        rsvpStatus === "sent"
                          ? "bg-green-500 text-white"
                          : rsvpStatus === "sending"
                          ? "bg-rose-300 text-white"
                          : "bg-rose-500 text-white hover:bg-rose-600"
                      }`}
                    >
                      {rsvpStatus === "idle" && <><Send className="w-4 h-4" /> RSVP</>}
                      {rsvpStatus === "sending" && <><span className="animate-spin">&#9696;</span> Sending...</>}
                      {rsvpStatus === "sent" && <><Check className="w-4 h-4" /> Confirmed!</>}
                    </button>
                  </div>
                  <p className="text-[10px] text-charcoal-light">This is a demo — no data is sent</p>
                </div>
              </div>

              {/* Mock Wedding Story Card */}
              <div className="max-w-sm mx-auto bg-white rounded-3xl shadow-floating border border-rose-100 overflow-hidden">
                {/* Story Header with Image */}
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={img.flowers}
                    alt="Wedding flowers"
                    fill
                    className="object-cover"
                    sizes="400px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-[10px] text-white/60 mb-0.5">ownstory.co/story/james-priya</p>
                    <h3 className="text-2xl font-bold">James & Priya</h3>
                    <p className="text-xs text-white/80">December 15, 2026 &middot; St. Mary&apos;s Church, Mumbai</p>
                  </div>
                </div>

                {/* Interactive Guest Messages */}
                <div className="p-4 space-y-3">
                  <p className="text-xs text-charcoal-light font-medium">Guest Messages</p>
                  {[
                    { initials: "AM", name: "Aunt Mary", relation: "Family", msg: "So proud of you both! Your grandma would have been overjoyed. Can't wait for the big day!", type: "text", color: "bg-rose-100 text-rose-700", likes: 12 },
                    { initials: "RK", name: "Raj & Kavya", relation: "Friends", msg: "", type: "voice", color: "bg-purple-100 text-purple-700", likes: 8 },
                    { initials: "SP", name: "Sarah P.", relation: "College friend", msg: "", type: "photo", color: "bg-blue-100 text-blue-700", likes: 15 },
                  ].map((guest, i) => (
                    <div key={i} className="bg-warm-50 rounded-xl p-3 border border-warm-200/40 hover:shadow-soft transition-shadow">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-8 h-8 rounded-full ${guest.color} flex items-center justify-center text-[10px] font-bold`}>
                          {guest.initials}
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-charcoal-dark">{guest.name}</p>
                          <p className="text-[10px] text-charcoal-light">{guest.relation}</p>
                        </div>
                      </div>
                      {guest.type === "text" && <p className="text-xs text-charcoal leading-relaxed">{guest.msg}</p>}
                      {guest.type === "voice" && (
                        <div className="flex items-center gap-2 bg-white rounded-lg p-2">
                          <Volume2 className="w-3.5 h-3.5 text-purple-500" />
                          <div className="flex-1 h-1 bg-purple-200 rounded-full"><div className="w-2/3 h-full bg-purple-400 rounded-full" /></div>
                          <span className="text-[10px] text-charcoal-light">1:24</span>
                        </div>
                      )}
                      {guest.type === "photo" && (
                        <div className="grid grid-cols-3 gap-1 rounded-lg overflow-hidden">
                          {[img.dancing, img.toast, img.hands].map((src, j) => (
                            <div key={j} className="relative h-16"><Image src={src} alt="" fill className="object-cover" sizes="100px" /></div>
                          ))}
                        </div>
                      )}
                      <button
                        onClick={() => toggleLike(i)}
                        className="flex items-center gap-1 mt-2 group/like"
                      >
                        <Heart className={`w-3.5 h-3.5 transition-all duration-300 ${
                          likedMessages.has(i) ? "text-rose-500 fill-rose-500 scale-125" : "text-rose-300 group-hover/like:text-rose-400"
                        }`} />
                        <span className="text-[10px] text-charcoal-light">
                          {guest.likes + (likedMessages.has(i) ? 1 : 0)}
                        </span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── ANIMATED STATS ───────── */}
        <section
          id="stats"
          ref={r("stats")}
          className={`py-16 md:py-20 px-4 transition-all duration-700 ${
            v("stats") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { value: counter1, suffix: "+", label: "Message Prompts", desc: "Curated prompts to inspire meaningful guest contributions", icon: MessageCircle, gradient: "from-rose-500 to-pink-500" },
                { value: counter2, suffix: "%", label: "Avg. RSVP Rate", desc: "Couples report significantly higher response rates", icon: Users, gradient: "from-purple-500 to-fuchsia-500" },
                { value: counter3, suffix: "", label: "Contribution Types", desc: "Text, photos, videos, voice notes, GIFs, and music", icon: Camera, gradient: "from-emerald-500 to-teal-500" },
              ].map((stat, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-soft p-6 border border-rose-100/60 text-center hover:shadow-floating hover:-translate-y-1 transition-all duration-300 group">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <stat.icon className="w-7 h-7 text-white" />
                  </div>
                  <p className="text-4xl font-bold text-charcoal-dark mb-1">
                    {stat.value}{stat.suffix}
                  </p>
                  <p className="text-sm font-semibold text-charcoal mb-1">{stat.label}</p>
                  <p className="text-xs text-charcoal-light">{stat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── FEATURE CHECKLIST with Image ───────── */}
        <section
          id="checklist"
          ref={r("checklist")}
          className={`py-16 md:py-24 px-4 bg-rose-50/50 transition-all duration-700 ${
            v("checklist") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              {/* Image */}
              <div className="relative h-80 md:h-[500px] rounded-3xl overflow-hidden shadow-floating order-2 md:order-1">
                <Image src={img.decor} alt="Wedding decoration" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-rose-600/30 to-transparent" />
              </div>

              {/* Checklist */}
              <div className="order-1 md:order-2">
                <h2 className="text-3xl md:text-4xl font-bold text-charcoal-dark mb-8 leading-tight">
                  Everything You Need
                  <br />for the <span className="text-rose-500">Perfect</span> Experience
                </h2>
                <div className="space-y-3">
                  {[
                    { title: "Countdown Timer", desc: "Build anticipation with a live countdown to your big day" },
                    { title: "Photo Galleries", desc: "Showcase engagement photos and memorable moments" },
                    { title: "Dietary Restrictions", desc: "Collect food preferences and allergies seamlessly" },
                    { title: "Private Guest Book", desc: "A secure space for heartfelt wishes and blessings" },
                    { title: "Mobile-Friendly Design", desc: "Looks beautiful on every device" },
                    { title: "Custom Themes & Colors", desc: "Match your wedding colors and style perfectly" },
                    { title: "Wedding Party Intros", desc: "Introduce bridesmaids, groomsmen, and family" },
                    { title: "Honeymoon Fund", desc: "Guests contribute to your dream honeymoon together" },
                  ].map((item, i) => (
                    <div key={i} className="group flex items-start gap-3 bg-white rounded-xl p-3 border border-rose-100/60 shadow-soft hover:shadow-floating hover:-translate-x-1 transition-all duration-300 cursor-default">
                      <div className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-rose-500 transition-colors">
                        <Check className="w-3.5 h-3.5 text-rose-600 group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <p className="font-semibold text-charcoal-dark text-sm">{item.title}</p>
                        <p className="text-xs text-charcoal-light">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── WHY CHOOSE with Image Background ───────── */}
        <section
          id="why"
          ref={r("why")}
          className={`py-16 md:py-24 px-4 transition-all duration-700 ${
            v("why") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal-dark mb-3">
                Why Couples Choose Ownstory
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Private & Permanent */}
              <div className="relative bg-white rounded-3xl shadow-soft overflow-hidden border border-rose-100/60 group">
                <div className="relative h-40 overflow-hidden">
                  <Image src={img.hands} alt="Couple holding hands" fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 50vw" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white" />
                </div>
                <div className="p-6 -mt-8 relative">
                  <h3 className="text-lg font-bold text-charcoal-dark mb-4">Private & Permanent</h3>
                  <div className="space-y-3">
                    {[
                      { icon: Lock, title: "Private Link Access", desc: "Only people with your link can view" },
                      { icon: EyeOff, title: "Hidden Until You Share", desc: "Not indexed by search engines" },
                      { icon: Heart, title: "Kept Forever", desc: "A permanent digital memory" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-4 h-4 text-rose-500" />
                        </div>
                        <div>
                          <p className="font-semibold text-charcoal-dark text-sm">{item.title}</p>
                          <p className="text-xs text-charcoal-light">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Group Gifting */}
              <div className="relative bg-white rounded-3xl shadow-soft overflow-hidden border border-rose-100/60 group">
                <div className="relative h-40 overflow-hidden">
                  <Image src={img.cake} alt="Wedding gifts" fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 50vw" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white" />
                </div>
                <div className="p-6 -mt-8 relative">
                  <h3 className="text-lg font-bold text-charcoal-dark mb-4">Group Gifting Built In</h3>
                  <div className="space-y-3 mb-5">
                    {[
                      { step: "1", text: "Set up a honeymoon fund or wish list" },
                      { step: "2", text: "Guests contribute any amount they choose" },
                      { step: "3", text: "Receive digital gift cards to your wallet" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 text-xs font-bold text-amber-700">{item.step}</div>
                        <p className="text-sm text-charcoal">{item.text}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["Amazon", "Uber Eats", "Apple", "Spotify", "Airbnb", "Netflix"].map((brand, i) => (
                      <span key={i} className="text-[10px] bg-warm-50 text-charcoal px-2.5 py-1 rounded-lg border border-warm-200/60 font-medium hover:bg-amber-50 hover:border-amber-200 transition-colors cursor-default">
                        {brand}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── TESTIMONIAL with Background Image ───────── */}
        <section
          id="testimonial"
          ref={r("testimonial")}
          className={`relative py-20 md:py-28 px-4 overflow-hidden transition-all duration-700 ${
            v("testimonial") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="absolute inset-0">
            <Image src={img.venue} alt="Wedding venue" fill className="object-cover" sizes="100vw" />
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          </div>
          <div className="relative max-w-3xl mx-auto text-center">
            <div className="text-5xl text-rose-300/50 mb-4">&ldquo;</div>
            <blockquote className="text-lg md:text-2xl text-white leading-relaxed mb-8 font-medium">
              We had an 89% RSVP rate — way higher than traditional cards.
              But the best part was the voice notes. My grandmother recorded
              a blessing that we&apos;ll treasure forever. It turned our
              invitation into a living memory.
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-rose-500/30 border border-rose-400/30 flex items-center justify-center text-white font-bold text-sm">SM</div>
              <div className="text-left">
                <p className="font-semibold text-white">Sarah & Michael</p>
                <p className="text-xs text-white/60">Married June 2024</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-1 mt-5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
              ))}
            </div>
          </div>
        </section>

        {/* ───────── QR CODE with Image ───────── */}
        <section
          id="qr"
          ref={r("qr")}
          className={`py-16 md:py-24 px-4 transition-all duration-700 ${
            v("qr") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              {/* QR Mock with real image background */}
              <div className="flex justify-center">
                <div className="relative bg-white rounded-3xl shadow-floating p-6 border border-rose-100 text-center max-w-xs overflow-hidden">
                  <div className="relative h-32 -mx-6 -mt-6 mb-4 overflow-hidden">
                    <Image src={img.flowers} alt="Wedding flowers" fill className="object-cover" sizes="300px" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white" />
                  </div>
                  <div className="w-36 h-36 mx-auto bg-warm-50 rounded-2xl border-2 border-dashed border-rose-200 flex items-center justify-center mb-4 hover:border-rose-400 hover:bg-rose-50 transition-colors">
                    <QrCode className="w-16 h-16 text-rose-300" />
                  </div>
                  <p className="text-sm font-semibold text-charcoal-dark mb-0.5">James & Priya</p>
                  <p className="text-[10px] text-charcoal-light">ownstory.co/story/james-priya</p>
                </div>
              </div>

              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-charcoal-dark mb-3">
                  One QR Code,
                  <br />Endless <span className="text-rose-500">Possibilities</span>
                </h2>
                <p className="text-charcoal-light mb-6">
                  Print your QR code anywhere — guests scan to view your invitation instantly
                </p>
                <div className="space-y-3">
                  {[
                    { emoji: "💌", title: "Save the Date Card", desc: "Include on printed save-the-dates" },
                    { emoji: "🏷️", title: "Wedding Favor Tag", desc: "Add to thank-you gifts and favors" },
                    { emoji: "🪧", title: "Welcome Sign", desc: "Display at venue entrance for guests to scan" },
                    { emoji: "🍽️", title: "Table Place Card", desc: "Guests scan to leave a message during dinner" },
                    { emoji: "📧", title: "Email Signature", desc: "Add to digital communications" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white rounded-xl p-3 border border-rose-100/60 shadow-soft hover:shadow-floating hover:translate-x-1 transition-all duration-300 cursor-default">
                      <span className="text-xl">{item.emoji}</span>
                      <div>
                        <p className="text-sm font-semibold text-charcoal-dark">{item.title}</p>
                        <p className="text-xs text-charcoal-light">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── FAQ ───────── */}
        <section
          id="faq"
          ref={r("faq")}
          className={`py-16 md:py-24 px-4 bg-rose-50/50 transition-all duration-700 ${
            v("faq") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal-dark mb-3">
                Wedding Invitation Questions, Answered
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className={`bg-white rounded-2xl border shadow-soft overflow-hidden transition-all duration-300 ${
                    openFaq === i ? "border-rose-300 shadow-floating" : "border-rose-100/60"
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left group"
                  >
                    <span className="font-semibold text-charcoal-dark text-sm pr-4 group-hover:text-rose-600 transition-colors">
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-charcoal-light flex-shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180 text-rose-500" : ""}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-40" : "max-h-0"}`}>
                    <div className="px-5 pb-4">
                      <p className="text-sm text-charcoal-light leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── FINAL CTA with Full Image ───────── */}
        <section className="relative py-24 md:py-32 px-4 overflow-hidden">
          <div className="absolute inset-0">
            <Image src={img.dancing} alt="Wedding celebration" fill className="object-cover" sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-br from-rose-600/80 via-pink-500/80 to-fuchsia-600/80" />
          </div>

          {/* Floating hearts */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute animate-float text-white/15"
                style={{
                  left: `${10 + i * 12}%`,
                  top: `${20 + (i % 3) * 25}%`,
                  animationDelay: `${i * 0.7}s`,
                  animationDuration: `${5 + (i % 3) * 2}s`,
                }}
              >
                <Heart className="w-6 h-6" />
              </div>
            ))}
          </div>

          <div className="relative max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-5 leading-tight">
              Create Your Dream
              <br />Wedding Invitation
            </h2>
            <p className="text-white/80 text-base md:text-xl mb-10 max-w-xl mx-auto leading-relaxed">
              Tell your love story, collect heartfelt wishes, and create a
              lasting memory — all in one beautiful invitation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="group w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-rose-600 font-semibold rounded-full py-4 px-10 hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-xl text-base">
                <Heart className="w-5 h-5 group-hover:animate-pulse" />
                Start Our Wedding Story
              </button>
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/15 backdrop-blur-sm text-white font-semibold rounded-full py-4 px-10 border border-white/30 hover:bg-white/25 transition-all duration-300 text-base">
                <Eye className="w-5 h-5" />
                See Wedding Examples
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* ───────── FOOTER ───────── */}
      <footer className="py-10 px-4 border-t border-rose-100 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-baseline justify-center mb-3">
            <span className="font-extrabold text-charcoal-dark text-base tracking-tight">ownstory</span>
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 ml-0.5 mb-0.5 inline-block" />
          </div>
          <div className="flex items-center justify-center gap-4 text-[11px] text-charcoal-light/70 mb-3">
            <span className="hover:text-charcoal-light cursor-pointer">About</span>
            <span className="hover:text-charcoal-light cursor-pointer">Privacy Policy</span>
            <span className="hover:text-charcoal-light cursor-pointer">Terms</span>
            <span className="hover:text-charcoal-light cursor-pointer">Contact</span>
            <span className="hover:text-charcoal-light cursor-pointer">FAQ</span>
          </div>
          <p className="text-[11px] text-charcoal-light mb-1">Stories worth keeping. Gifts worth giving.</p>
          <p className="text-[10px] text-charcoal-light/40">&copy; 2026 ownstory. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
