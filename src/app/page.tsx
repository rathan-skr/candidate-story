import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { candidates } from "@/data/candidates";

export default function Home() {
  return (
    <div className="min-h-screen bg-warm-50 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-baseline">
            <span className="font-extrabold text-charcoal-dark text-xl tracking-tight">
              ownstory
            </span>
            <span className="w-2 h-2 rounded-full bg-yellow-400 ml-0.5 mb-0.5 inline-block" />
          </div>
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

      {/* Main */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <h1 className="text-2xl md:text-3xl font-bold text-charcoal-dark text-center mb-2">
            Candidate Stories
          </h1>
          <p className="text-sm text-charcoal-light text-center mb-8">
            வேட்பாளர்களின் கதைகள்
          </p>

          <div className="space-y-3">
            {candidates.map((c) => (
              <Link
                key={c.slug}
                href={`/${c.slug}`}
                className="block bg-white rounded-2xl shadow-soft p-4 border border-warm-200/60 hover:shadow-floating transition-shadow duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-500 to-red-700 p-0.5 flex-shrink-0">
                    <div className="w-full h-full rounded-full overflow-hidden">
                      <Image
                        src={c.photo}
                        alt={c.name}
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-charcoal-dark text-base">
                      {c.name}
                    </p>
                    <p className="text-sm text-red-600 font-medium">
                      {c.party}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-charcoal-light mt-0.5">
                      <MapPin className="w-3 h-3" />
                      {c.constituency}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-4 border-t border-warm-200/60 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-baseline justify-center mb-2">
            <span className="font-extrabold text-charcoal-dark text-base tracking-tight">
              ownstory
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 ml-0.5 mb-0.5 inline-block" />
          </div>
          <p className="text-[10px] text-charcoal-light/40">
            &copy; 2026 ownstory. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
