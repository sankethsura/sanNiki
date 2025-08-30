import Link from 'next/link';

export default function LovePage() {
  return (
    <div className="h-screen h-[100dvh] bg-gradient-to-br from-rose-900 via-pink-900 to-purple-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Back to Home Button */}
        <div className="absolute top-4 left-4 z-50">
          <Link href="/">
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm transition-all border border-white/20">
              ← Home
            </button>
          </Link>
        </div>

        {/* Love Messages Section */}
        <div className="flex-1 p-4 pt-16 overflow-y-auto">
          <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 backdrop-blur-md rounded-3xl p-4 md:p-8 max-w-4xl w-full mx-auto text-center border border-pink-300/30 min-h-max">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 md:mb-10">
              🌟 Why I Love You, Nikitha 🌟
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-white/90 mb-8 md:mb-12">
              <div className="bg-pink-500/10 p-6 md:p-8 rounded-2xl border border-pink-300/20 hover:bg-pink-500/20 transition-all duration-300">
                <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-pink-300">Your Smile 😊</h3>
                <p className="text-base md:text-lg leading-relaxed">
                  Your smile is like sunshine breaking through clouds - it instantly brightens my day and fills my heart with warmth. Every time I see it, I fall in love with you all over again.
                </p>
              </div>
              
              <div className="bg-purple-500/10 p-6 md:p-8 rounded-2xl border border-purple-300/20 hover:bg-purple-500/20 transition-all duration-300">
                <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-purple-300">Your Laugh 😂</h3>
                <p className="text-base md:text-lg leading-relaxed">
                  The sound of your laughter is the most beautiful melody I&apos;ve ever heard. It&apos;s music to my soul and reminds me that happiness is found in the simplest moments we share.
                </p>
              </div>
              
              <div className="bg-red-500/10 p-6 md:p-8 rounded-2xl border border-red-300/20 hover:bg-red-500/20 transition-all duration-300">
                <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-red-300">Your Heart ❤️</h3>
                <p className="text-base md:text-lg leading-relaxed">
                  Your heart is so pure, kind, and full of love. The way you care for others and the compassion you show inspires me to be a better person every single day.
                </p>
              </div>
              
              <div className="bg-blue-500/10 p-6 md:p-8 rounded-2xl border border-blue-300/20 hover:bg-blue-500/20 transition-all duration-300">
                <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-blue-300">Your Support 🤝</h3>
                <p className="text-base md:text-lg leading-relaxed">
                  You believe in me even when I don&apos;t believe in myself. Your unwavering support gives me strength and courage to chase my dreams and face any challenge.
                </p>
              </div>
              
              <div className="bg-green-500/10 p-6 md:p-8 rounded-2xl border border-green-300/20 hover:bg-green-500/20 transition-all duration-300">
                <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-green-300">Your Dreams 🌟</h3>
                <p className="text-base md:text-lg leading-relaxed">
                  The passion you have for your goals and the determination you show in pursuing them is absolutely inspiring. I love being part of your journey and supporting your dreams.
                </p>
              </div>
              
              <div className="bg-yellow-500/10 p-6 md:p-8 rounded-2xl border border-yellow-300/20 hover:bg-yellow-500/20 transition-all duration-300">
                <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-yellow-300">Our Future 💫</h3>
                <p className="text-base md:text-lg leading-relaxed">
                  Every day with you feels like a new adventure. I&apos;m excited about all the memories we&apos;ll create, the places we&apos;ll explore, and the love we&apos;ll continue to build together.
                </p>
              </div>
            </div>

            {/* Personal Message */}
            <div className="bg-white/10 p-6 md:p-8 rounded-2xl border border-white/20 mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-yellow-300 mb-4">💕 A Special Message 💕</h3>
              <p className="text-lg md:text-xl text-pink-100 font-semibold leading-relaxed mb-4">
                &ldquo;Nikitha, creating this website for you has been one of my favorite projects because it gave me a chance to express just a fraction of how much you mean to me. You are my best friend, my greatest love, and my perfect partner in this beautiful journey called life.&rdquo;
              </p>
              <p className="text-base md:text-lg text-white/90 leading-relaxed mb-4">
                &ldquo;From our late-night conversations to our silly jokes, from your support during tough times to celebrating our wins together - every moment with you is a treasure. You make ordinary days extraordinary just by being you.&rdquo;
              </p>
              <p className="text-sm md:text-base text-white/80 italic">
                &ldquo;I love you more than words can express, more than code can compute, and more than this website can show. But I hope this gives you a small glimpse into my heart. 💻❤️&rdquo;
              </p>
              <p className="text-sm md:text-base text-white/70 mt-4">
                - Forever yours, Sanketh 💕
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
              <Link href="/game">
                <button className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Prove Your Love 💕
                </button>
              </Link>
              
              <Link href="/">
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Back to Start 🏠
                </button>
              </Link>
            </div>
          </div>
          
          {/* Bottom Spacing */}
          <div className="h-8"></div>
        </div>
      </div>
    </div>
  );
}