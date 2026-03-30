"use client";

import {
  Award,
  Building2,
  ChevronRight,
  ExternalLink,
  Heart,
  HeartHandshake,
  MapPin,
  MessageCircle,
  Mic,
  PenLine,
  Phone,
  Play,
  QrCode,
  Quote,
  Road,
  ScanLine,
  School,
  Share2,
  Star,
  Stethoscope,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/* ───────── Data ───────── */

const achievements = [
  {
    icon: Building2,
    stat: "500+",
    title: "வீடுகள் கட்டப்பட்டன",
    desc: "PMAY திட்டத்தின் கீழ் வெள்ளத்தால் பாதிக்கப்பட்ட குடும்பங்களுக்கு புதிய வீடுகள் கட்டித் தரப்பட்டன",
    gradient: "from-amber-400 to-orange-500",
  },
  {
    icon: School,
    stat: "3",
    title: "புதிய பள்ளிகள் நிறுவப்பட்டன",
    desc: "தமிழ் வழிப் பள்ளிகளில் கணினி ஆய்வகங்கள் அமைக்கப்பட்டன. மாணவர்கள் டிஜிட்டல் கல்வி பெற வழி ஏற்படுத்தப்பட்டது",
    gradient: "from-blue-400 to-indigo-500",
  },
  {
    icon: Stethoscope,
    stat: "50+",
    title: "இலவச மருத்துவ முகாம்கள்",
    desc: "25,000+ குடியிருப்பாளர்களுக்கு இலவச சுகாதார சேவைகள் வழங்கப்பட்டன. நீரிழிவு, ரத்த அழுத்தம் பரிசோதனைகள் நடத்தப்பட்டன",
    gradient: "from-emerald-400 to-teal-500",
  },
  {
    icon: Road,
    stat: "120 km",
    title: "சாலை மேம்பாடு",
    desc: "கிராமப்புற சாலைகள் புதுப்பிக்கப்பட்டன — பயண நேரம் 40% குறைக்கப்பட்டது. பள்ளி செல்லும் குழந்தைகளுக்கு பாதுகாப்பான பாதை",
    gradient: "from-purple-400 to-pink-500",
  },
  {
    icon: Users,
    stat: "200+",
    title: "பெண்கள் சுய உதவிக் குழுக்கள்",
    desc: "நுண்கடன் மற்றும் திறன் பயிற்சி திட்டங்கள் மூலம் பெண்கள் பொருளாதார சுதந்திரம் பெற்றனர்",
    gradient: "from-rose-400 to-red-500",
  },
];

const testimonials = [
  {
    name: "லட்சுமி தேவி",
    ward: "வார்டு 42",
    quote:
      "கடந்த 2 ஆண்டுகளாக எங்கள் பகுதியில் வடிகால் பிரச்சனை இருந்தது. கவியரசு அவர்களிடம் புகார் அளித்த 10 நாட்களில் பிரச்சனை தீர்க்கப்பட்டது. இப்போது மழைக்காலத்தில் கூட தண்ணீர் தேங்குவதில்லை.",
    avatar: "ல",
    color: "bg-red-100 text-red-700",
  },
  {
    name: "முருகன் க.",
    ward: "வார்டு 38",
    quote:
      "என் குழந்தைகளை அரசு பள்ளியில் சேர்க்க முடியாமல் திணறினேன். கவியரசு உதவியால் சேர்க்கை கிடைத்தது. இப்போது இரண்டு குழந்தைகளும் நன்றாக படிக்கிறார்கள்.",
    avatar: "மு",
    color: "bg-blue-100 text-blue-700",
  },
  {
    name: "பாத்திமா பேகம்",
    ward: "வார்டு 45",
    quote:
      "இலவச மருத்துவ முகாமில் என் சர்க்கரை நோய் கண்டறியப்பட்டது. சரியான நேரத்தில் சிகிச்சை தொடங்கினேன். இந்த முகாம் எனக்கு வரப்பிரசாதம்.",
    avatar: "பா",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    name: "ரவி சங்கர்",
    ward: "வார்டு 41",
    quote:
      "எங்கள் கிராமத்திற்கு புதிய சாலை போடப்பட்டது. முன்பு 1 மணி நேரம் ஆன பயணம் இப்போது 30 நிமிடத்தில் முடிகிறது. பள்ளிக்குச் செல்லும் குழந்தைகள் மிகவும் மகிழ்ச்சி.",
    avatar: "ர",
    color: "bg-purple-100 text-purple-700",
  },
];

/* ───────── Component ───────── */

export default function CandidateStoryTamil() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set()
  );
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

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

  return (
    <div className="min-h-screen bg-warm-50 flex flex-col">
      {/* ───────── HEADER ───────── */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <div className="flex items-baseline">
            <span className="font-extrabold text-charcoal-dark text-xl tracking-tight">
              ownstory
            </span>
            <span className="w-2 h-2 rounded-full bg-yellow-400 ml-0.5 mb-0.5 inline-block" />
          </div>
          {/* Nav */}
          <div className="hidden md:flex items-center gap-5 text-sm text-charcoal-light">
            <span className="hover:text-charcoal-dark cursor-pointer">Products <span className="text-[10px]">&#9662;</span></span>
            <span className="hover:text-charcoal-dark cursor-pointer">Shop</span>
            <span className="hover:text-charcoal-dark cursor-pointer">Use cases</span>
            <span className="hover:text-charcoal-dark cursor-pointer">Resources <span className="text-[10px]">&#9662;</span></span>
            <span className="hover:text-charcoal-dark cursor-pointer">Demo</span>
            <span className="hover:text-charcoal-dark cursor-pointer">Contact</span>
          </div>
          {/* Auth */}
          <div className="flex items-center gap-3">
            <button className="text-sm text-charcoal-light hover:text-charcoal-dark hidden sm:block">
              Log in
            </button>
            <button className="text-sm bg-yellow-400 text-charcoal-dark px-5 py-2 rounded-full hover:bg-yellow-500 transition-colors font-bold shadow-sm">
              Create
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* ───────── HERO — DARK RED GRADIENT ───────── */}
        <section className="relative bg-gradient-to-b from-red-900 via-red-800 to-red-900 pt-8 pb-14 md:pt-12 md:pb-20 px-4 overflow-hidden">
          {/* Decorative bg elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-10 left-10 w-64 h-64 bg-red-700/30 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-orange-700/20 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-4xl mx-auto text-center">
            {/* Election Badge */}
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 text-xs md:text-sm font-medium px-5 py-2 rounded-full border border-white/20">
                <Award className="w-3.5 h-3.5" />
                2026 தமிழ்நாடு சட்டமன்றத் தேர்தல்
              </span>
            </div>

            {/* Candidate Photo */}
            <div className="relative inline-block mb-6">
              <div className="w-32 h-32 md:w-44 md:h-44 rounded-full bg-gradient-to-br from-amber-400 to-orange-400 p-1 mx-auto shadow-2xl">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face"
                    alt="திரு. மு. கவியரசு"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Name & Party */}
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 leading-tight">
              திரு. மு. கவியரசு
            </h1>
            <p className="text-base md:text-lg text-white/70 font-medium mb-2">
              தமிழ் மக்கள் முன்னேற்ற கழகம்
            </p>
            <div className="flex items-center justify-center gap-1.5 text-white/60 mb-5">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">
                திருவண்ணாமலை | வார்டு 42 — அருணாசலேஸ்வரர் கிழக்கு
              </span>
            </div>

            {/* Tagline */}
            <p className="text-lg md:text-2xl font-semibold text-amber-300 mb-8 max-w-lg mx-auto leading-relaxed">
              &ldquo;உங்கள் தொகுதிக்கு ஒரு புதிய குரல்&rdquo;
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-8">
              {[
                { icon: ScanLine, value: "1,247", label: "ஸ்கேன்கள்" },
                { icon: MapPin, value: "42", label: "வார்டுகள்" },
                { icon: MessageCircle, value: "328", label: "புகார்கள் பதிவு" },
              ].map((s, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center mb-1.5">
                    <s.icon className="w-5 h-5 text-amber-300" />
                  </div>
                  <span className="text-xl md:text-2xl font-bold text-white">
                    {s.value}
                  </span>
                  <span className="text-[11px] text-white/50">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-amber-500 text-white font-semibold rounded-full py-3 px-7 hover:bg-amber-600 transition-colors shadow-lg text-sm">
                <Play className="w-4 h-4" />
                என் செய்தியைப் பாருங்கள்
              </button>
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full py-3 px-7 border border-white/20 hover:bg-white/20 transition-colors text-sm">
                <PenLine className="w-4 h-4" />
                புகார் தெரிவிக்க
              </button>
            </div>
          </div>
        </section>

        {/* ───────── VIDEO / MESSAGE SECTION ───────── */}
        <section
          id="video"
          ref={r("video")}
          className={`relative py-10 md:py-16 px-4 transition-all duration-700 ${
            v("video")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-3xl mx-auto text-center">
            {/* Red play icon */}
            <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center mx-auto mb-5 shadow-lg">
              <Play className="w-5 h-5 text-white ml-0.5" />
            </div>

            <h2 className="text-xl md:text-2xl font-bold text-charcoal-dark mb-2">
              வார்டு 42 — அருணாசலேஸ்வரர் கிழக்கு
              <br />
              மக்களுக்கு ஒரு செய்தி
            </h2>
            <p className="text-sm text-charcoal-light mb-6">
              உங்கள் தொகுதிக்கு ஒரு புதிய குரல் — கவியரசு பேசுகிறார்
            </p>

            {/* Video Thumbnail */}
            <div className="relative rounded-2xl overflow-hidden bg-charcoal-dark aspect-video mb-8 shadow-floating">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=720&h=400&fit=crop&crop=face"
                alt="Video message"
                width={720}
                height={400}
                className="w-full h-full object-cover opacity-70"
              />
              {/* Play button overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-2xl cursor-pointer hover:bg-white hover:scale-105 transition-all">
                  <Play className="w-7 h-7 text-red-600 ml-1" />
                </div>
                <p className="text-white text-sm font-medium mt-3">
                  திரு. மு. கவியரசு
                </p>
              </div>
              {/* Duration */}
              <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2.5 py-1 rounded-lg">
                1:00
              </div>
            </div>

            {/* Complaint Card — Pink/Coral Gradient */}
            <div className="bg-gradient-to-br from-red-400 via-rose-400 to-pink-400 rounded-3xl p-6 md:p-8 text-white text-left shadow-lg mb-6">
              <h3 className="text-lg md:text-xl font-bold mb-2">
                வேட்பாளரிடம் உங்கள்
                <br />
                பிரச்சினையைச் சொல்லுங்கள்
              </h3>
              <p className="text-white/80 text-sm mb-5 leading-relaxed">
                உங்கள் பகுதியில் உள்ள பிரச்சினைகளை நேரடியாக வேட்பாளரிடம்
                தெரிவிக்கவும். 328 புகார்கள் பதிவு — 89% 7 நாட்களுக்குள்
                தீர்க்கப்பட்டது.
              </p>
              <div className="flex flex-col sm:flex-row gap-2.5 mb-4">
                <input
                  type="text"
                  placeholder="உங்கள் பிரச்சினையை எழுதுங்கள்..."
                  className="flex-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
                />
                <div className="flex gap-2">
                  <button className="flex items-center justify-center gap-2 bg-white text-red-500 font-semibold rounded-xl py-3 px-5 hover:bg-white/90 transition-colors text-sm whitespace-nowrap">
                    <PenLine className="w-4 h-4" />
                    புகார் எழுத
                  </button>
                  <button className="flex items-center justify-center bg-white/20 text-white rounded-xl py-3 px-3 hover:bg-white/30 transition-colors border border-white/20">
                    <Mic className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/70">
                <HeartHandshake className="w-4 h-4 flex-shrink-0" />
                <span>
                  328 புகார்கள் பதிவு · 89% 7 நாட்களுக்குள் தீர்க்கப்பட்டது
                </span>
              </div>
            </div>

            {/* Stat pills */}
            <div className="flex flex-wrap justify-center gap-3">
              <span className="inline-flex items-center gap-1.5 bg-red-50 text-red-700 text-xs font-medium px-4 py-2 rounded-full border border-red-100">
                <MessageCircle className="w-3.5 h-3.5" />
                328 புகார்கள்
              </span>
              <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-xs font-medium px-4 py-2 rounded-full border border-amber-100">
                <Share2 className="w-3.5 h-3.5" />
                842 பகிர்வுகள்
              </span>
              <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-medium px-4 py-2 rounded-full border border-emerald-100">
                <HeartHandshake className="w-3.5 h-3.5" />
                89% தீர்வு
              </span>
            </div>
          </div>
        </section>

        {/* ───────── ACHIEVEMENTS ───────── */}
        <section
          id="achievements"
          ref={r("achievements")}
          className={`relative py-10 md:py-20 px-4 transition-all duration-700 ${
            v("achievements")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-charcoal-dark mb-2">
                நாம் ஒன்றாகச் செய்தவை
              </h2>
              <p className="text-sm text-charcoal-light">
                சமூக மேம்பாட்டிற்கான நமது முக்கிய முயற்சிகள்
              </p>
            </div>

            <div className="space-y-4">
              {achievements.map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow-soft p-5 md:p-6 border border-warm-200/60 flex items-start gap-4 hover:shadow-floating transition-shadow duration-300"
                >
                  <div
                    className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center flex-shrink-0`}
                  >
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 mb-1 flex-wrap">
                      <span className="text-xl md:text-2xl font-bold text-charcoal-dark">
                        {item.stat}
                      </span>
                      <span className="text-sm font-semibold text-charcoal">
                        {item.title}
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-charcoal-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-warm-300 flex-shrink-0 mt-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── TESTIMONIALS ───────── */}
        <section
          id="testimonials"
          ref={r("testimonials")}
          className={`relative py-10 md:py-20 px-4 transition-all duration-700 ${
            v("testimonials")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-charcoal-dark mb-2">
                தொகுதி மக்களின் குரல்
              </h2>
              <p className="text-sm text-charcoal-light">
                மக்கள் என்ன சொல்கிறார்கள்
              </p>
            </div>

            <div className="space-y-4">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow-soft p-5 md:p-6 border border-warm-200/60 hover:shadow-floating transition-shadow duration-300"
                >
                  <p className="text-charcoal text-sm leading-relaxed mb-4">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-full ${t.color} flex items-center justify-center font-bold text-xs`}
                      >
                        {t.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-charcoal-dark text-sm">
                          {t.name}
                        </p>
                        <p className="text-[11px] text-charcoal-light">
                          {t.ward}
                        </p>
                      </div>
                    </div>
                    <span className="text-[11px] bg-emerald-50 text-emerald-600 font-semibold px-3 py-1 rounded-full border border-emerald-100">
                      நன்றி
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── DIGITAL CONTACT CARD ───────── */}
        <section
          id="contact"
          ref={r("contact")}
          className={`relative py-10 md:py-20 px-4 transition-all duration-700 ${
            v("contact")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-md mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-charcoal-dark mb-1">
                டிஜிட்டல் வருகைப் பத்திரம்
              </h2>
              <p className="text-xs text-charcoal-light">
                QR குறியீட்டை ஸ்கேன் செய்து தொடர்புகொள்ளுங்கள்
              </p>
            </div>

            {/* Card with shadow */}
            <div className="bg-white rounded-3xl shadow-floating border border-warm-200/60 overflow-hidden">
              {/* Red header bar */}
              <div className="bg-gradient-to-r from-red-800 to-red-900 p-5 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-400 p-0.5 mx-auto mb-3">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=256&h=256&fit=crop&crop=face"
                      alt="திரு. மு. கவியரசு"
                      width={256}
                      height={256}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <h3 className="text-base font-bold text-white mb-0.5">
                  திரு. மு. கவியரசு
                </h3>
                <p className="text-xs text-white/60">
                  தமிழ் மக்கள் முன்னேற்ற கழகம்
                </p>
              </div>

              {/* Card body */}
              <div className="p-5 text-center">
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-charcoal-light mb-4">
                  <MapPin className="w-3 h-3" />
                  வார்டு 42 — அருணாசலேஸ்வரர் கிழக்கு
                </div>

                {/* Phone */}
                <a
                  href="tel:+919876543210"
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-xl py-2.5 px-6 mb-4 hover:from-red-700 hover:to-red-800 transition-all shadow-md text-sm"
                >
                  <Phone className="w-4 h-4" />
                  +91 98765 43210
                </a>

                {/* QR Code */}
                <div className="bg-warm-50 rounded-xl p-4 mb-4 border border-warm-200/40">
                  <div className="w-24 h-24 mx-auto bg-white rounded-lg border-2 border-dashed border-warm-300 flex items-center justify-center mb-2">
                    <QrCode className="w-12 h-12 text-warm-300" />
                  </div>
                  <p className="text-[10px] text-charcoal-light">
                    QR குறியீட்டை ஸ்கேன் செய்யவும்
                  </p>
                </div>

                {/* Party Office */}
                <div className="flex items-center gap-3 bg-warm-50 rounded-xl p-3 border border-warm-200/40 text-left">
                  <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-red-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-semibold text-charcoal-dark">
                      அருகிலுள்ள கட்சி அலுவலகம்
                    </p>
                    <p className="text-[10px] text-charcoal-light">
                      12, அண்ணா சாலை, திருவண்ணாமலை — 606601
                    </p>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-charcoal-light/40 flex-shrink-0" />
                </div>

                <a
                  href="#"
                  className="inline-flex items-center gap-1 text-[11px] text-red-600 font-medium hover:text-red-700 mt-3"
                >
                  <MapPin className="w-3 h-3" />
                  வரைபடத்தில் திறக்க
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── CLOSING MESSAGE ───────── */}
        <section
          id="closing"
          ref={r("closing")}
          className={`relative py-10 md:py-20 px-4 transition-all duration-700 ${
            v("closing")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 rounded-3xl p-7 md:p-12 border border-amber-200/40">
              <h2 className="text-xl md:text-2xl font-bold text-charcoal-dark mb-4 leading-relaxed">
                உங்கள் வாக்கே உங்கள் குரல்
              </h2>
              <p className="text-charcoal-light text-sm leading-relaxed mb-5 max-w-xl mx-auto">
                இந்தத் தொகுதி வெறும் ஒரு எண் அல்ல — இது நம் வீடு, நம் பள்ளி,
                நம் சாலை, நம் எதிர்காலம். உங்கள் குரலை உலகிற்கு கேட்க வையுங்கள்.
                ஒவ்வொரு வாக்கும் ஒரு மாற்றத்தின் தொடக்கம். உங்கள் ஆதரவும்
                நம்பிக்கையும் எனக்கு மிகுந்த பலம்.
              </p>
              <p className="text-charcoal-light text-sm mb-1">
                அன்புடனும் அர்ப்பணிப்புடனும்,
              </p>
              <p className="text-red-700 font-bold text-base">
                திரு. மு. கவியரசு
              </p>

              {/* Stars */}
              <div className="flex items-center justify-center gap-1 mt-5">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ───────── FOOTER ───────── */}
      <footer className="py-10 px-4 border-t border-warm-200/60 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-baseline justify-center mb-3">
            <span className="font-extrabold text-charcoal-dark text-base tracking-tight">
              ownstory
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 ml-0.5 mb-0.5 inline-block" />
          </div>
          <div className="flex items-center justify-center gap-4 text-[11px] text-charcoal-light/70 mb-3">
            <span className="hover:text-charcoal-light cursor-pointer">About</span>
            <span className="hover:text-charcoal-light cursor-pointer">Privacy Policy</span>
            <span className="hover:text-charcoal-light cursor-pointer">Terms</span>
            <span className="hover:text-charcoal-light cursor-pointer">Contact</span>
            <span className="hover:text-charcoal-light cursor-pointer">FAQ</span>
          </div>
          <p className="text-[11px] text-charcoal-light mb-1">
            Stories worth keeping. Gifts worth giving.
          </p>
          <p className="text-[10px] text-charcoal-light/40">
            &copy; 2026 ownstory. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
