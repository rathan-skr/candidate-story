import type { LucideIcon } from "lucide-react";
import {
  Building2,
  MessageCircle,
  Road,
  ScanLine,
  School,
  Stethoscope,
  Sun,
  Users,
} from "lucide-react";

/* ───────── Types ───────── */

export interface Achievement {
  icon: LucideIcon;
  stat: string;
  title: string;
  desc: string;
  gradient: string;
}

export interface Testimonial {
  name: string;
  ward: string;
  quote: string;
  avatar: string;
  color: string;
}

export interface HeroStat {
  icon: LucideIcon;
  value: string;
  label: string;
}

export interface PartyLeader {
  initials: string;
  role: string;
  name: string;
}

export interface CandidateData {
  slug: string;
  name: string;
  qualifications: string;
  party: string;
  partyShort: string;
  partySymbolLabel: string;
  partySymbolIcon: LucideIcon;
  constituency: string;
  district: string;
  constituencyNumber: string;
  nationalConstituency: string;
  electionBadge: string;
  tagline: string;
  photo: string;
  video:
    | { type: "youtube"; id: string; startSeconds: number }
    | { type: "facebook"; href: string };
  heroStats: HeroStat[];
  partyLeaders: PartyLeader[];
  achievements: Achievement[];
  testimonials: Testimonial[];
  contact: {
    phone: string;
    phoneDisplay: string;
    address: string;
    pincode: string;
  };
  complaintStats: {
    total: number;
    shares: number;
    resolutionPercent: number;
    resolutionDays: number;
  };
  closingMessage: string;
  footerNote: string;
}

/* ───────── Candidates ───────── */

export const candidates: CandidateData[] = [
  {
    slug: "ne-chitrarasu",
    name: "நே.சிற்றரசு",
    qualifications: "M.A.,M.Phil.,",
    party: "திராவிட முன்னேற்ற கழகம் (DMK)",
    partyShort: "திமுக",
    partySymbolLabel: "உதயசூரியன்",
    partySymbolIcon: Sun,
    constituency: "அண்ணா நகர் சட்டமன்றத் தொகுதி",
    district: "சென்னை மேற்கு மாவட்டம்",
    constituencyNumber: "21",
    nationalConstituency: "சென்னை மத்திய நாடாளுமன்றத் தொகுதி",
    electionBadge: "2026 தமிழ்நாடு சட்டமன்றத் தேர்தல் — 23.04.2026",
    tagline:
      "அண்ணா நகர் தொகுதியை கழகத்தின் கோட்டையாக நிலைநிறுத்துவேன்",
    photo: "/candidates/ne-chitrarasu.jpg",
    video: { type: "youtube", id: "IKEqP11S-1U", startSeconds: 2 },
    heroStats: [
      { icon: ScanLine, value: "1,247", label: "ஸ்கேன்கள்" },
      { icon: Users, value: "3,14,294", label: "மக்கள் தொகை" },
      { icon: MessageCircle, value: "328", label: "புகார்கள் பதிவு" },
    ],
    partyLeaders: [
      { initials: "S", role: "கழகத் தலைவர்", name: "மு.க. ஸ்டாலின்" },
      {
        initials: "U",
        role: "இளைஞரணிச் செயலாளர்",
        name: "உதயநிதி ஸ்டாலின்",
      },
    ],
    achievements: [
      {
        icon: Building2,
        stat: "500+",
        title: "குடியிருப்புகள் மேம்படுத்தப்பட்டன",
        desc: "அண்ணா நகர் பகுதியில் PMAY திட்டத்தின் கீழ் குடியிருப்புகள் புனரமைக்கப்பட்டன. நகர்ப்புற ஏழைகளுக்கு கட்டுப்படியான வீடுகள் வழங்கப்பட்டன",
        gradient: "from-red-500 to-red-700",
      },
      {
        icon: School,
        stat: "3",
        title: "புதிய பள்ளிகள் நிறுவப்பட்டன",
        desc: "அரசு தமிழ் வழிப் பள்ளிகளில் ஸ்மார்ட் வகுப்பறைகள் மற்றும் கணினி ஆய்வகங்கள் அமைக்கப்பட்டன. மாணவர்களுக்கு டிஜிட்டல் கல்வி வாய்ப்பு",
        gradient: "from-blue-500 to-indigo-600",
      },
      {
        icon: Stethoscope,
        stat: "50+",
        title: "இலவச மருத்துவ முகாம்கள்",
        desc: "25,000+ குடியிருப்பாளர்களுக்கு இலவச சுகாதார சேவைகள். நீரிழிவு, ரத்த அழுத்தம், கண் பரிசோதனைகள் நடத்தப்பட்டன",
        gradient: "from-emerald-500 to-teal-600",
      },
      {
        icon: Road,
        stat: "120 km",
        title: "சாலை மேம்பாடு",
        desc: "அண்ணா நகர், கீழ்ப்பாக்கம், அமிஞ்சிக்கரை பகுதிகளில் சாலைகள் புதுப்பிக்கப்பட்டன — பயண நேரம் 40% குறைக்கப்பட்டது",
        gradient: "from-amber-500 to-orange-600",
      },
      {
        icon: Users,
        stat: "200+",
        title: "பெண்கள் சுய உதவிக் குழுக்கள்",
        desc: "நுண்கடன் மற்றும் திறன் பயிற்சி திட்டங்கள் மூலம் பெண்கள் பொருளாதார சுதந்திரம் பெற்றனர்",
        gradient: "from-purple-500 to-pink-600",
      },
    ],
    testimonials: [
      {
        name: "லட்சுமி தேவி",
        ward: "அண்ணா நகர் மேற்கு",
        quote:
          "கடந்த 2 ஆண்டுகளாக எங்கள் பகுதியில் வடிகால் பிரச்சனை இருந்தது. சித்ரராசு அவர்களிடம் புகார் அளித்த 10 நாட்களில் பிரச்சனை தீர்க்கப்பட்டது. இப்போது மழைக்காலத்தில் கூட தண்ணீர் தேங்குவதில்லை.",
        avatar: "ல",
        color: "bg-red-100 text-red-700",
      },
      {
        name: "முருகன் க.",
        ward: "கீழ்ப்பாக்கம்",
        quote:
          "என் குழந்தைகளை அரசு பள்ளியில் சேர்க்க முடியாமல் திணறினேன். சித்ரராசு உதவியால் சேர்க்கை கிடைத்தது. இப்போது இரண்டு குழந்தைகளும் ஸ்மார்ட் வகுப்பறையில் படிக்கிறார்கள்.",
        avatar: "மு",
        color: "bg-blue-100 text-blue-700",
      },
      {
        name: "பாத்திமா பேகம்",
        ward: "அமிஞ்சிக்கரை",
        quote:
          "இலவச மருத்துவ முகாமில் என் சர்க்கரை நோய் கண்டறியப்பட்டது. சரியான நேரத்தில் சிகிச்சை தொடங்கினேன். இந்த முகாம் எனக்கு வரப்பிரசாதம்.",
        avatar: "பா",
        color: "bg-emerald-100 text-emerald-700",
      },
      {
        name: "ரவி சங்கர்",
        ward: "ஷீனாய் நகர்",
        quote:
          "எங்கள் பகுதிக்கு புதிய சாலை போடப்பட்டது. முன்பு 1 மணி நேரம் ஆன பயணம் இப்போது 30 நிமிடத்தில் முடிகிறது. மிகவும் நன்றி.",
        avatar: "ர",
        color: "bg-amber-100 text-amber-700",
      },
    ],
    contact: {
      phone: "+919876543210",
      phoneDisplay: "+91 98765 43210",
      address: "அண்ணா நகர், சென்னை",
      pincode: "600040",
    },
    complaintStats: {
      total: 328,
      shares: 842,
      resolutionPercent: 89,
      resolutionDays: 7,
    },
    closingMessage:
      "இந்தத் தொகுதி வெறும் ஒரு எண் அல்ல — இது நம் வீடு, நம் பள்ளி, நம் சாலை, நம் எதிர்காலம். அண்ணா நகர் தொகுதியை கழகத்தின் கோட்டையாக நிலைநிறுத்த அயராது உழைப்பேன் என உறுதியளிக்கிறேன். உங்கள் ஆதரவும் நம்பிக்கையும் எனக்கு மிகுந்த பலம்.",
    footerNote: "திமுக · அண்ணா நகர் · உருவாக்கம் Ownstory",
  },
  {
    slug: "kalai-kathiravan",
    name: "டாக்டர் கலை கதிரவன்",
    qualifications: "எம்.பி.பி.எஸ்.,",
    party: "திராவிட முன்னேற்ற கழகம் (DMK)",
    partyShort: "திமுக",
    partySymbolLabel: "உதயசூரியன்",
    partySymbolIcon: Sun,
    constituency: "தென்காசி சட்டமன்றத் தொகுதி",
    district: "தென்காசி மாவட்டம்",
    constituencyNumber: "7",
    nationalConstituency: "தென்காசி நாடாளுமன்றத் தொகுதி",
    electionBadge: "2026 தமிழ்நாடு சட்டமன்றத் தேர்தல் — 23.04.2026",
    tagline:
      "தென்காசி தொகுதியை கழகத்தின் கோட்டையாக நிலைநிறுத்துவேன்",
    photo: "/candidates/kalai-kathiravan.jpeg",
    video: { type: "facebook", href: "https://web.facebook.com/reel/1313571880650800/" },
    heroStats: [
      { icon: ScanLine, value: "864", label: "ஸ்கேன்கள்" },
      { icon: Users, value: "2,18,456", label: "மக்கள் தொகை" },
      { icon: MessageCircle, value: "215", label: "புகார்கள் பதிவு" },
    ],
    partyLeaders: [
      { initials: "S", role: "கழகத் தலைவர்", name: "மு.க. ஸ்டாலின்" },
      {
        initials: "U",
        role: "இளைஞரணிச் செயலாளர்",
        name: "உதயநிதி ஸ்டாலின்",
      },
    ],
    achievements: [
      {
        icon: Stethoscope,
        stat: "75+",
        title: "இலவச மருத்துவ முகாம்கள்",
        desc: "தென்காசி மாவட்டம் முழுவதும் இலவச மருத்துவ முகாம்கள் நடத்தப்பட்டன. 30,000+ மக்களுக்கு நீரிழிவு, ரத்த அழுத்தம், கண் மற்றும் பல் பரிசோதனைகள் வழங்கப்பட்டன",
        gradient: "from-emerald-500 to-teal-600",
      },
      {
        icon: School,
        stat: "5",
        title: "அரசு பள்ளிகள் புனரமைப்பு",
        desc: "தென்காசி பகுதியில் அரசு பள்ளிகளில் ஸ்மார்ட் வகுப்பறைகள், கணினி ஆய்வகங்கள் மற்றும் நூலகங்கள் அமைக்கப்பட்டன. கிராமப்புற மாணவர்களுக்கு டிஜிட்டல் கல்வி வாய்ப்பு",
        gradient: "from-blue-500 to-indigo-600",
      },
      {
        icon: Road,
        stat: "85 km",
        title: "சாலை மேம்பாடு",
        desc: "தென்காசி, கடையநல்லூர், செங்கோட்டை பகுதிகளில் சாலைகள் புதுப்பிக்கப்பட்டன — விவசாயிகளின் போக்குவரத்து நேரம் 35% குறைக்கப்பட்டது",
        gradient: "from-amber-500 to-orange-600",
      },
      {
        icon: Building2,
        stat: "350+",
        title: "வீடுகள் கட்டப்பட்டன",
        desc: "PMAY திட்டத்தின் கீழ் ஏழை குடும்பங்களுக்கு புதிய வீடுகள் கட்டப்பட்டன. கிராமப்புற குடும்பங்களுக்கு கட்டுப்படியான வீடுகள் வழங்கப்பட்டன",
        gradient: "from-red-500 to-red-700",
      },
      {
        icon: Users,
        stat: "150+",
        title: "பெண்கள் சுய உதவிக் குழுக்கள்",
        desc: "கிராமப்புற பெண்களுக்கு நுண்கடன், தையல் பயிற்சி மற்றும் உணவு பதப்படுத்தும் திறன் பயிற்சி திட்டங்கள் மூலம் பொருளாதார சுதந்திரம்",
        gradient: "from-purple-500 to-pink-600",
      },
    ],
    testimonials: [
      {
        name: "செல்வி முருகேஸ்வரி",
        ward: "தென்காசி நகரம்",
        quote:
          "டாக்டர் கலை கதிரவன் நடத்திய இலவச மருத்துவ முகாமில் என் தாயாரின் கண் புரை கண்டறியப்பட்டது. இலவச அறுவை சிகிச்சை செய்து தந்தார். இப்போது அம்மா நன்றாகப் பார்க்கிறார்.",
        avatar: "செ",
        color: "bg-emerald-100 text-emerald-700",
      },
      {
        name: "கருப்பசாமி தா.",
        ward: "கடையநல்லூர்",
        quote:
          "எங்கள் கிராமத்துக்கு சரியான சாலை இல்லாமல் 10 வருடமாக கஷ்டப்பட்டோம். கதிரவன் அவர்கள் உதவியால் புதிய சாலை போடப்பட்டது. இப்போது மழைக்காலத்திலும் பயணம் எளிது.",
        avatar: "க",
        color: "bg-amber-100 text-amber-700",
      },
      {
        name: "பாக்கியலட்சுமி",
        ward: "செங்கோட்டை",
        quote:
          "சுய உதவிக் குழு மூலம் தையல் பயிற்சி பெற்றேன். இப்போது சொந்தமாக தையல் கடை நடத்துகிறேன். மாதம் ₹15,000 வருமானம் கிடைக்கிறது. என் குடும்பத்தின் வாழ்க்கை மாறிவிட்டது.",
        avatar: "பா",
        color: "bg-purple-100 text-purple-700",
      },
      {
        name: "முத்துக்குமார்",
        ward: "தென்காசி கிழக்கு",
        quote:
          "என் மகனுக்கு அரசு பள்ளியில் சேர்க்கை கிடைக்க உதவினார். ஸ்மார்ட் வகுப்பறையில் படிக்கும் வாய்ப்பு கிடைத்தது. கிராமத்து குழந்தைகளுக்கும் தரமான கல்வி கிடைக்கிறது.",
        avatar: "மு",
        color: "bg-blue-100 text-blue-700",
      },
    ],
    contact: {
      phone: "+919876543211",
      phoneDisplay: "+91 98765 43211",
      address: "தென்காசி நகரம், தென்காசி",
      pincode: "627811",
    },
    complaintStats: {
      total: 215,
      shares: 534,
      resolutionPercent: 92,
      resolutionDays: 7,
    },
    closingMessage:
      "தென்காசி தொகுதியை கழகத்தின் கோட்டையாக நிலைநிறுத்த அயராது உழைப்பேன் என உறுதியளிக்கிறேன். உங்கள் ஆதரவும் நம்பிக்கையும் எனக்கு மிகுந்த பலம்.",
    footerNote: "திமுக · தென்காசி · உருவாக்கம் Ownstory",
  },
];

/* ───────── Helpers ───────── */

export function getCandidateBySlug(
  slug: string
): CandidateData | undefined {
  return candidates.find((c) => c.slug === slug);
}

export function getAllSlugs(): string[] {
  return candidates.map((c) => c.slug);
}
