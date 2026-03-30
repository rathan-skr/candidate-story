"use client";

import {
  Calendar,
  Camera,
  Check,
  ChevronDown,
  Clock,
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
  PartyPopper,
  QrCode,
  Send,
  Smartphone,
  Star,
  ThumbsUp,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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

/* ───────── Component ───────── */

export default function WeddingInvitationPage() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set()
  );
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
            <span className="hover:text-charcoal-dark cursor-pointer">
              Home
            </span>
            <span className="hover:text-charcoal-dark cursor-pointer">
              Use Cases <span className="text-[10px]">&#9662;</span>
            </span>
            <span className="hover:text-charcoal-dark cursor-pointer">
              Occasions
            </span>
            <span className="hover:text-charcoal-dark cursor-pointer">
              Solutions
            </span>
            <span className="hover:text-charcoal-dark cursor-pointer">
              Resources <span className="text-[10px]">&#9662;</span>
            </span>
            <span className="hover:text-charcoal-dark cursor-pointer">
              Demo
            </span>
            <span className="hover:text-charcoal-dark cursor-pointer">
              Contact
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-sm text-charcoal-light hover:text-charcoal-dark hidden sm:block">
              Log in
            </button>
            <button className="text-sm bg-rose-500 text-white px-5 py-2 rounded-full hover:bg-rose-600 transition-colors font-bold shadow-sm">
              Create
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* ───────── HERO ───────── */}
        <section className="relative bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50 pt-16 pb-20 md:pt-24 md:pb-28 px-4 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-10 left-10 w-64 h-64 bg-rose-200/30 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-pink-200/20 rounded-full blur-3xl" />
            <div className="absolute top-20 right-20 w-40 h-40 bg-fuchsia-200/10 rounded-full blur-2xl" />
          </div>

          <div className="relative max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm text-rose-600 text-xs md:text-sm font-medium px-5 py-2 rounded-full border border-rose-200 mb-6">
              <Heart className="w-4 h-4 fill-rose-400 text-rose-400" />
              The Wedding
            </span>

            <h1 className="text-4xl md:text-6xl font-bold text-charcoal-dark mb-5 leading-tight">
              The Wedding Invite That
              <br />
              <span className="text-rose-500">Tells Your Love Story</span>
            </h1>
            <p className="text-base md:text-lg text-charcoal-light mb-8 max-w-2xl mx-auto leading-relaxed">
              More than save the date — create a beautiful, interactive wedding
              invitation where guests RSVP, share memories, leave voice notes,
              and celebrate your journey together.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-rose-500 text-white font-semibold rounded-full py-3.5 px-8 hover:bg-rose-600 transition-colors shadow-lg text-sm">
                <Heart className="w-4 h-4" />
                Create Your Story
              </button>
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-rose-600 font-semibold rounded-full py-3.5 px-8 border border-rose-200 hover:bg-rose-50 transition-colors text-sm">
                <Eye className="w-4 h-4" />
                See Examples
              </button>
            </div>
          </div>
        </section>

        {/* ───────── VALUE PROPOSITION ───────── */}
        <section
          id="value"
          ref={r("value")}
          className={`py-14 md:py-20 px-4 bg-rose-50/50 transition-all duration-700 ${
            v("value")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-3xl mx-auto">
            <div className="border-l-4 border-rose-400 pl-6 md:pl-8">
              <h2 className="text-2xl md:text-3xl font-bold text-charcoal-dark mb-4">
                More Than Just &ldquo;Save the Date&rdquo;
              </h2>
              <p className="text-charcoal-light leading-relaxed mb-4">
                Your wedding invitation should be as special as your love story.
                With Ownstory, guests don&apos;t just see a date — they
                experience your journey. From how you met to the proposal,
                every chapter comes alive with photos, videos, and heartfelt
                messages.
              </p>
              <p className="text-charcoal-light leading-relaxed">
                Invite guests to be part of the story — share their blessings,
                upload photos, record voice notes, and RSVP with a personal
                touch. It&apos;s the wedding invitation that becomes a
                treasured keepsake.
              </p>
            </div>
          </div>
        </section>

        {/* ───────── FEATURE GRID ───────── */}
        <section
          id="features"
          ref={r("features")}
          className={`py-14 md:py-20 px-4 transition-all duration-700 ${
            v("features")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-charcoal-dark mb-2">
                Everything Your Wedding Invitation Needs
              </h2>
              <p className="text-sm text-charcoal-light">
                Beautiful features that make your invitation unforgettable
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  icon: Link2,
                  title: "Share via Link & WhatsApp",
                  desc: "Send your invitation instantly — no app downloads needed. One tap to open, one tap to RSVP.",
                  gradient: "from-rose-500 to-pink-500",
                },
                {
                  icon: MessageCircle,
                  title: "Interactive RSVP & Messages",
                  desc: "Collect RSVPs with personal notes, dietary preferences, and heartfelt wishes — all in one place.",
                  gradient: "from-pink-500 to-fuchsia-500",
                },
                {
                  icon: Heart,
                  title: "Love Story Timeline",
                  desc: "Tell your journey — from first date to proposal. Add photos, videos, and milestones your guests will love.",
                  gradient: "from-red-400 to-rose-500",
                },
                {
                  icon: MapPin,
                  title: "Venue & Map Integration",
                  desc: "One-tap directions to ceremony and reception. Include parking info and hotel recommendations.",
                  gradient: "from-fuchsia-500 to-purple-500",
                },
                {
                  icon: Gift,
                  title: "Gift Registry & Group Gifting",
                  desc: "Link registries or set up a honeymoon fund. Guests can pool together for meaningful gifts.",
                  gradient: "from-amber-400 to-orange-500",
                },
                {
                  icon: Calendar,
                  title: "Save to Calendar",
                  desc: "Guests add your wedding to their calendar with one click — never miss the big day.",
                  gradient: "from-emerald-400 to-teal-500",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow-soft p-6 border border-rose-100/60 hover:shadow-floating hover:-translate-y-1 transition-all duration-300"
                >
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-charcoal-dark mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-charcoal-light leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── JOURNEY STEPS ───────── */}
        <section
          id="journey"
          ref={r("journey")}
          className={`py-14 md:py-20 px-4 bg-rose-50/50 transition-all duration-700 ${
            v("journey")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-charcoal-dark mb-2">
                Five Simple Steps to Your Perfect Invitation
              </h2>
              <p className="text-sm text-charcoal-light">
                From creation to celebration — we&apos;ve made it effortless
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                {
                  emoji: "💌",
                  step: "1",
                  title: "Create Invitation",
                  desc: "Choose a template and personalize with your details",
                },
                {
                  emoji: "💍",
                  step: "2",
                  title: "Add Your Story",
                  desc: "Share your love journey with photos and milestones",
                },
                {
                  emoji: "👰",
                  step: "3",
                  title: "Invite Guests",
                  desc: "Share via WhatsApp, link, or QR code",
                },
                {
                  emoji: "💕",
                  step: "4",
                  title: "Collect Messages",
                  desc: "Guests leave wishes, photos, and voice notes",
                },
                {
                  emoji: "🎉",
                  step: "5",
                  title: "Celebrate Together",
                  desc: "Your invitation becomes a lasting memory",
                },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-white border border-rose-200 flex items-center justify-center mx-auto mb-3 text-3xl shadow-soft">
                    {item.emoji}
                  </div>
                  <div className="text-[10px] font-bold text-rose-400 mb-1">
                    STEP {item.step}
                  </div>
                  <h3 className="font-bold text-charcoal-dark text-sm mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-charcoal-light">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── WHATSAPP INTEGRATION ───────── */}
        <section
          id="whatsapp"
          ref={r("whatsapp")}
          className={`py-14 md:py-20 px-4 transition-all duration-700 ${
            v("whatsapp")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-medium px-3 py-1 rounded-full border border-green-100 mb-4">
                  <Smartphone className="w-3.5 h-3.5" />
                  WhatsApp Integration
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-charcoal-dark mb-4">
                  Guests Contribute via WhatsApp
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
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3.5 h-3.5 text-green-600" />
                      </div>
                      <span className="text-sm text-charcoal">
                        {item}
                      </span>
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
                    <p className="text-white font-semibold text-sm">
                      Ownstory Wedding
                    </p>
                    <p className="text-green-100 text-[10px]">online</p>
                  </div>
                </div>
                <div className="bg-[#ECE5DD] rounded-b-2xl p-4 space-y-3 min-h-[280px]">
                  <div className="bg-white rounded-xl rounded-tl-sm px-3 py-2 max-w-[80%] shadow-sm">
                    <p className="text-xs text-charcoal">
                      Welcome to James & Priya&apos;s wedding! 💒 Send your
                      wishes, photos, or voice notes.
                    </p>
                    <p className="text-[9px] text-charcoal-light/50 text-right mt-1">
                      10:30 AM
                    </p>
                  </div>
                  <div className="bg-[#DCF8C6] rounded-xl rounded-tr-sm px-3 py-2 max-w-[80%] ml-auto shadow-sm">
                    <p className="text-xs text-charcoal">
                      Congratulations to you both! Wishing you a lifetime of
                      happiness 🎉❤️
                    </p>
                    <p className="text-[9px] text-charcoal-light/50 text-right mt-1">
                      10:31 AM
                    </p>
                  </div>
                  <div className="bg-white rounded-xl rounded-tl-sm px-3 py-2 max-w-[80%] shadow-sm">
                    <p className="text-xs text-charcoal">
                      Thank you! Your message has been added to the wedding
                      story ✨
                    </p>
                    <p className="text-[9px] text-charcoal-light/50 text-right mt-1">
                      10:31 AM
                    </p>
                  </div>
                  <div className="bg-[#DCF8C6] rounded-xl rounded-tr-sm px-3 py-2 max-w-[80%] ml-auto shadow-sm flex items-center gap-2">
                    <Mic className="w-3.5 h-3.5 text-green-600" />
                    <div className="flex-1 h-1 bg-green-300 rounded-full" />
                    <span className="text-[10px] text-charcoal-light">
                      0:24
                    </span>
                  </div>
                  <div className="bg-white rounded-xl rounded-tl-sm px-3 py-2 max-w-[80%] shadow-sm">
                    <p className="text-xs text-charcoal">
                      Voice note added! Want to share a photo too? 📸
                    </p>
                    <p className="text-[9px] text-charcoal-light/50 text-right mt-1">
                      10:32 AM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── LIVE PREVIEW ───────── */}
        <section
          id="preview"
          ref={r("preview")}
          className={`py-14 md:py-20 px-4 bg-rose-50/50 transition-all duration-700 ${
            v("preview")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal-dark mb-2">
              Your Wedding Invitation Comes Alive
            </h2>
            <p className="text-sm text-charcoal-light mb-10">
              See how a real Ownstory wedding page looks with guest
              contributions
            </p>

            {/* Mock Wedding Story */}
            <div className="max-w-sm mx-auto bg-white rounded-3xl shadow-floating border border-rose-100 overflow-hidden">
              {/* Story Header */}
              <div className="bg-gradient-to-br from-rose-400 via-pink-400 to-fuchsia-400 p-6 text-white text-center relative">
                <div className="absolute top-3 left-3 text-2xl animate-bounce">
                  💍
                </div>
                <div className="absolute top-3 right-3 text-2xl animate-bounce delay-300">
                  💒
                </div>
                <p className="text-xs text-white/70 mb-1">
                  ownstory.co/story/james-priya
                </p>
                <h3 className="text-2xl font-bold mb-1">James & Priya</h3>
                <p className="text-sm text-white/80">December 15, 2026</p>
                <p className="text-xs text-white/60 mt-1">
                  St. Mary&apos;s Church, Mumbai
                </p>
              </div>

              {/* Guest Messages */}
              <div className="p-4 space-y-3">
                <p className="text-xs text-charcoal-light font-medium mb-2">
                  Guest Messages
                </p>

                {[
                  {
                    initials: "AM",
                    name: "Aunt Mary",
                    relation: "Family",
                    msg: "So proud of you both! Your grandma would have been overjoyed. Can't wait for the big day! 💐",
                    type: "text",
                    color: "bg-rose-100 text-rose-700",
                    likes: 12,
                  },
                  {
                    initials: "RK",
                    name: "Raj & Kavya",
                    relation: "Friends",
                    msg: "",
                    type: "voice",
                    color: "bg-purple-100 text-purple-700",
                    likes: 8,
                  },
                  {
                    initials: "SP",
                    name: "Sarah P.",
                    relation: "College friend",
                    msg: "",
                    type: "photo",
                    color: "bg-blue-100 text-blue-700",
                    likes: 15,
                  },
                ].map((guest, i) => (
                  <div
                    key={i}
                    className="bg-warm-50 rounded-xl p-3 border border-warm-200/40"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className={`w-8 h-8 rounded-full ${guest.color} flex items-center justify-center text-[10px] font-bold`}
                      >
                        {guest.initials}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-charcoal-dark">
                          {guest.name}
                        </p>
                        <p className="text-[10px] text-charcoal-light">
                          {guest.relation}
                        </p>
                      </div>
                    </div>
                    {guest.type === "text" && (
                      <p className="text-xs text-charcoal leading-relaxed">
                        {guest.msg}
                      </p>
                    )}
                    {guest.type === "voice" && (
                      <div className="flex items-center gap-2 bg-white rounded-lg p-2">
                        <Mic className="w-3.5 h-3.5 text-purple-500" />
                        <div className="flex-1 h-1 bg-purple-200 rounded-full">
                          <div className="w-2/3 h-full bg-purple-400 rounded-full" />
                        </div>
                        <span className="text-[10px] text-charcoal-light">
                          1:24
                        </span>
                      </div>
                    )}
                    {guest.type === "photo" && (
                      <div className="bg-white rounded-lg p-2 flex items-center gap-2">
                        <Camera className="w-3.5 h-3.5 text-blue-500" />
                        <span className="text-[10px] text-charcoal-light">
                          Shared 3 photos from college days
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-1 mt-2">
                      <ThumbsUp className="w-3 h-3 text-rose-400" />
                      <span className="text-[10px] text-charcoal-light">
                        {guest.likes}
                      </span>
                    </div>
                  </div>
                ))}

                <button className="w-full text-xs text-rose-500 font-medium py-2 hover:text-rose-600">
                  See a Real Wedding Story →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── STATS ───────── */}
        <section
          id="stats"
          ref={r("stats")}
          className={`py-14 md:py-16 px-4 transition-all duration-700 ${
            v("stats")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  value: "200+",
                  label: "Message Prompts",
                  desc: "Curated prompts to inspire meaningful guest contributions",
                  icon: MessageCircle,
                  gradient: "from-rose-500 to-pink-500",
                },
                {
                  value: "6",
                  label: "Contribution Types",
                  desc: "Text, photos, videos, voice notes, GIFs, and music",
                  icon: Camera,
                  gradient: "from-purple-500 to-fuchsia-500",
                },
                {
                  value: "0",
                  label: "Apps to Download",
                  desc: "Works instantly in any browser — no installs needed",
                  icon: Smartphone,
                  gradient: "from-emerald-500 to-teal-500",
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow-soft p-6 border border-rose-100/60 text-center"
                >
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mx-auto mb-3`}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-3xl font-bold text-charcoal-dark mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm font-semibold text-charcoal mb-1">
                    {stat.label}
                  </p>
                  <p className="text-xs text-charcoal-light">{stat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── FEATURE CHECKLIST ───────── */}
        <section
          id="checklist"
          ref={r("checklist")}
          className={`py-14 md:py-20 px-4 bg-rose-50/50 transition-all duration-700 ${
            v("checklist")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-charcoal-dark mb-2">
                Everything You Need for the Perfect
                <br />
                Wedding Invitation Experience
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                {
                  title: "Countdown Timer",
                  desc: "Build anticipation with a live countdown to your big day",
                },
                {
                  title: "Photo Galleries",
                  desc: "Showcase engagement photos and memorable moments",
                },
                {
                  title: "Dietary Restrictions",
                  desc: "Collect food preferences and allergies seamlessly",
                },
                {
                  title: "Private Guest Book",
                  desc: "A secure space for heartfelt wishes and blessings",
                },
                {
                  title: "Mobile-Friendly Design",
                  desc: "Looks beautiful on every device — phone, tablet, or desktop",
                },
                {
                  title: "Custom Themes & Colors",
                  desc: "Match your wedding colors and style perfectly",
                },
                {
                  title: "Wedding Party Introductions",
                  desc: "Introduce bridesmaids, groomsmen, and family",
                },
                {
                  title: "Honeymoon Fund & Group Gifting",
                  desc: "Guests contribute to your dream honeymoon together",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-4 border border-rose-100/60 flex items-start gap-3 shadow-soft"
                >
                  <div className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-rose-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-charcoal-dark text-sm">
                      {item.title}
                    </p>
                    <p className="text-xs text-charcoal-light">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── WHY CHOOSE ───────── */}
        <section
          id="why"
          ref={r("why")}
          className={`py-14 md:py-20 px-4 transition-all duration-700 ${
            v("why")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-charcoal-dark mb-2">
                Why Couples Choose Ownstory
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Private & Permanent */}
              <div className="bg-white rounded-3xl shadow-soft p-6 md:p-8 border border-rose-100/60">
                <h3 className="text-lg font-bold text-charcoal-dark mb-5">
                  Private & Permanent
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      icon: Lock,
                      title: "Private Link Access",
                      desc: "Only people with your link can view the invitation",
                    },
                    {
                      icon: EyeOff,
                      title: "Hidden Until You Share",
                      desc: "Not indexed by search engines — completely private",
                    },
                    {
                      icon: Heart,
                      title: "Kept Forever",
                      desc: "Your invitation becomes a permanent digital memory",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-rose-500" />
                      </div>
                      <div>
                        <p className="font-semibold text-charcoal-dark text-sm">
                          {item.title}
                        </p>
                        <p className="text-xs text-charcoal-light">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Group Gifting */}
              <div className="bg-white rounded-3xl shadow-soft p-6 md:p-8 border border-rose-100/60">
                <h3 className="text-lg font-bold text-charcoal-dark mb-5">
                  Group Gifting Built In
                </h3>
                <div className="space-y-4 mb-6">
                  {[
                    {
                      step: "1",
                      text: "Set up a honeymoon fund or wish list",
                    },
                    {
                      step: "2",
                      text: "Guests contribute any amount they choose",
                    },
                    {
                      step: "3",
                      text: "Receive digital gift cards to your wallet",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 text-sm font-bold text-amber-700">
                        {item.step}
                      </div>
                      <p className="text-sm text-charcoal">{item.text}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-warm-50 rounded-xl p-4 border border-warm-200/40">
                  <p className="text-[10px] text-charcoal-light mb-2 font-medium">
                    Popular Gift Card Options
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Amazon",
                      "Uber Eats",
                      "Apple",
                      "Spotify",
                      "Airbnb",
                      "Netflix",
                    ].map((brand, i) => (
                      <span
                        key={i}
                        className="text-[10px] bg-white text-charcoal px-2.5 py-1 rounded-lg border border-warm-200/60 font-medium"
                      >
                        {brand}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── TESTIMONIAL ───────── */}
        <section
          id="testimonial"
          ref={r("testimonial")}
          className={`py-14 md:py-20 px-4 bg-rose-50/50 transition-all duration-700 ${
            v("testimonial")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-5xl text-rose-200 mb-4">&ldquo;</div>
            <blockquote className="text-lg md:text-xl text-charcoal-dark leading-relaxed mb-6 font-medium">
              We had an 89% RSVP rate — way higher than traditional cards.
              But the best part was the voice notes. My grandmother recorded
              a blessing that we&apos;ll treasure forever. It turned our
              invitation into a living memory.
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-700 font-bold text-sm">
                SM
              </div>
              <div className="text-left">
                <p className="font-semibold text-charcoal-dark text-sm">
                  Sarah & Michael
                </p>
                <p className="text-xs text-charcoal-light">
                  Married June 2024
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-1 mt-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 text-amber-400 fill-amber-400"
                />
              ))}
            </div>
          </div>
        </section>

        {/* ───────── QR CODE ───────── */}
        <section
          id="qr"
          ref={r("qr")}
          className={`py-14 md:py-20 px-4 transition-all duration-700 ${
            v("qr")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              {/* QR Mock */}
              <div className="flex justify-center">
                <div className="bg-white rounded-3xl shadow-floating p-8 border border-rose-100 text-center max-w-xs">
                  <div className="w-40 h-40 mx-auto bg-warm-50 rounded-2xl border-2 border-dashed border-rose-200 flex items-center justify-center mb-4">
                    <QrCode className="w-20 h-20 text-rose-300" />
                  </div>
                  <p className="text-sm font-semibold text-charcoal-dark mb-1">
                    James & Priya
                  </p>
                  <p className="text-[10px] text-charcoal-light">
                    ownstory.co/story/james-priya
                  </p>
                </div>
              </div>

              {/* Use Cases */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-charcoal-dark mb-2">
                  One QR Code, Endless Possibilities
                </h2>
                <p className="text-sm text-charcoal-light mb-6">
                  Print your QR code anywhere — guests scan to view your
                  invitation instantly
                </p>
                <div className="space-y-3">
                  {[
                    {
                      emoji: "💌",
                      title: "Save the Date Card",
                      desc: "Include on printed save-the-dates",
                    },
                    {
                      emoji: "🏷️",
                      title: "Wedding Favor Tag",
                      desc: "Add to thank-you gifts and favors",
                    },
                    {
                      emoji: "🪧",
                      title: "Welcome Sign",
                      desc: "Display at venue entrance for guests to scan",
                    },
                    {
                      emoji: "🍽️",
                      title: "Table Place Card",
                      desc: "Guests scan to leave a message during dinner",
                    },
                    {
                      emoji: "📧",
                      title: "Email Signature",
                      desc: "Add to digital communications",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 bg-white rounded-xl p-3 border border-rose-100/60 shadow-soft"
                    >
                      <span className="text-xl">{item.emoji}</span>
                      <div>
                        <p className="text-sm font-semibold text-charcoal-dark">
                          {item.title}
                        </p>
                        <p className="text-xs text-charcoal-light">
                          {item.desc}
                        </p>
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
          className={`py-14 md:py-20 px-4 bg-rose-50/50 transition-all duration-700 ${
            v("faq")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-charcoal-dark mb-2">
                Wedding Invitation Questions, Answered
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-rose-100/60 shadow-soft overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                  >
                    <span className="font-semibold text-charcoal-dark text-sm pr-4">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-charcoal-light flex-shrink-0 transition-transform duration-200 ${
                        openFaq === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4">
                      <p className="text-sm text-charcoal-light leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── FINAL CTA ───────── */}
        <section className="relative bg-gradient-to-br from-rose-400 via-pink-400 to-fuchsia-400 py-16 md:py-24 px-4 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-10 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              Create Your Dream
              <br />
              Wedding Invitation
            </h2>
            <p className="text-white/80 text-base md:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
              Tell your love story, collect heartfelt wishes, and create a
              lasting memory — all in one beautiful invitation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-rose-600 font-semibold rounded-full py-3.5 px-8 hover:bg-white/90 transition-colors shadow-lg text-sm">
                <Heart className="w-4 h-4" />
                Start Our Wedding Story
              </button>
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full py-3.5 px-8 border border-white/20 hover:bg-white/20 transition-colors text-sm">
                <Eye className="w-4 h-4" />
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
            <span className="font-extrabold text-charcoal-dark text-base tracking-tight">
              ownstory
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 ml-0.5 mb-0.5 inline-block" />
          </div>
          <div className="flex items-center justify-center gap-4 text-[11px] text-charcoal-light/70 mb-3">
            <span className="hover:text-charcoal-light cursor-pointer">
              About
            </span>
            <span className="hover:text-charcoal-light cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-charcoal-light cursor-pointer">
              Terms
            </span>
            <span className="hover:text-charcoal-light cursor-pointer">
              Contact
            </span>
            <span className="hover:text-charcoal-light cursor-pointer">
              FAQ
            </span>
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
