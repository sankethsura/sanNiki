'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const [showHearts, setShowHearts] = useState(false);
  const [clickedHearts, setClickedHearts] = useState(0);
  const [showMessage, setShowMessage] = useState(false);

  const loveMessages = [
    "Every moment with you feels like magic ✨",
    "You make my world brighter, Nikitha 🌟",
    "Together we created something beautiful - sanNiki 💕",
    "Your smile is my favorite notification 📱💖",
    "Distance means nothing when you mean everything 🌍",
    "You're not just my girlfriend, you're my best friend 👫",
    "Thank you for being the reason I smile every day 😊"
  ];

  const handleHeartClick = () => {
    setClickedHearts(prev => prev + 1);
    if (clickedHearts >= 9) {
      setShowMessage(true);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowHearts(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const FloatingHeart = ({ delay, size = "text-2xl" }: { delay: number; size?: string }) => (
    <div 
      className={`absolute ${size} text-red-400 animate-bounce cursor-pointer hover:scale-125 transition-transform`}
      style={{
        left: `${Math.random() * 90}%`,
        top: `${Math.random() * 90}%`,
        animationDelay: `${delay}s`
      }}
      onClick={handleHeartClick}
    >
      ❤️
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-900 via-pink-900 to-purple-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating Hearts */}
      {showHearts && (
        <div className="absolute inset-0 z-20 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="pointer-events-auto">
              <FloatingHeart delay={i * 0.5} size={i % 3 === 0 ? "text-3xl" : "text-xl"} />
            </div>
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header Section */}
        <div className="flex-1 flex items-center justify-center text-center px-8">
          <div>
            <div className="mb-8">
              <h1 className="text-6xl md:text-8xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                  San
                </span>
                <span className="text-red-400">❤️</span>
                <span className="bg-gradient-to-r from-pink-300 to-red-300 bg-clip-text text-transparent">
                  Niki
                </span>
              </h1>
              <div className="text-lg md:text-xl text-white/70 mb-2">
                <span className="text-blue-300">Sanketh</span> + <span className="text-pink-300">Nikitha</span>
              </div>
              <div className="h-1 w-40 mx-auto bg-gradient-to-r from-blue-400 via-pink-400 to-red-400 rounded-full animate-pulse"></div>
            </div>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 font-light">
              A love story written in code 💻
            </p>

            <button 
              onClick={() => setCurrentSection(1)}
              className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Click to explore our story 💕
            </button>
          </div>
        </div>

        {/* Interactive Story Section */}
        {currentSection >= 1 && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 flex items-center justify-center p-4">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 max-w-lg w-full text-center border border-white/20">
              <h2 className="text-3xl font-bold text-white mb-6">
                💕 For My Beautiful Nikitha 💕
              </h2>
              
              <div className="space-y-4 text-white/90 text-lg">
                <p className="leading-relaxed">
                  {loveMessages[Math.floor(Math.random() * loveMessages.length)]}
                </p>
                
                <div className="mt-6 p-4 bg-pink-500/20 rounded-2xl">
                  <p className="text-sm text-pink-200">
                    💡 Find and click all the floating hearts to unlock a special surprise!
                  </p>
                  <p className="text-xs text-pink-300 mt-2">
                    Hearts found: {clickedHearts}/10
                  </p>
                  <div className="w-full bg-pink-800/30 rounded-full h-2 mt-2">
                    <div 
                      className="bg-pink-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(clickedHearts / 10) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button 
                  onClick={() => setCurrentSection(0)}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full transition-all"
                >
                  Back 🔙
                </button>
                <button 
                  onClick={() => setCurrentSection(2)}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-4 py-2 rounded-full transition-all"
                >
                  More Love 💖
                </button>
              </div>
            </div>
          </div>
        )}

        {/* More Love Section */}
        {currentSection >= 2 && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center p-4">
            <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 backdrop-blur-md rounded-3xl p-8 max-w-2xl w-full text-center border border-pink-300/30">
              <h2 className="text-4xl font-bold text-white mb-8">
                🌟 Why I Love You, Nikitha 🌟
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6 text-white/90">
                <div className="bg-pink-500/10 p-6 rounded-2xl border border-pink-300/20">
                  <h3 className="text-xl font-semibold mb-3 text-pink-300">Your Smile 😊</h3>
                  <p>Lights up my entire world and makes even the darkest days bright</p>
                </div>
                
                <div className="bg-purple-500/10 p-6 rounded-2xl border border-purple-300/20">
                  <h3 className="text-xl font-semibold mb-3 text-purple-300">Your Laugh 😂</h3>
                  <p>Is the most beautiful sound I've ever heard, music to my soul</p>
                </div>
                
                <div className="bg-red-500/10 p-6 rounded-2xl border border-red-300/20">
                  <h3 className="text-xl font-semibold mb-3 text-red-300">Your Heart ❤️</h3>
                  <p>So kind, caring, and full of love that inspires me every day</p>
                </div>
                
                <div className="bg-blue-500/10 p-6 rounded-2xl border border-blue-300/20">
                  <h3 className="text-xl font-semibold mb-3 text-blue-300">Your Support 🤝</h3>
                  <p>Always believing in me and standing by my side through everything</p>
                </div>
              </div>

              <div className="mt-8 text-center">
                <button 
                  onClick={() => setCurrentSection(0)}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  Back to Our Story 💕
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Special Surprise Message */}
        {showMessage && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gradient-to-br from-pink-400/30 to-red-400/30 backdrop-blur-md rounded-3xl p-8 max-w-md w-full text-center border-2 border-pink-300/50 animate-pulse">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Surprise Unlocked! 🔓
              </h2>
              <p className="text-xl text-white/90 mb-6">
                You found all the hearts! ❤️
              </p>
              <div className="bg-white/10 p-6 rounded-2xl mb-6">
                <p className="text-lg text-pink-200 font-semibold">
                  "Nikitha, you complete me in every way possible. This little website is just a tiny representation of how much you mean to me. I love you more than code loves semicolons! 💻❤️"
                </p>
                <p className="text-sm text-white/70 mt-4">
                  - Your loving boyfriend, Sanketh 💕
                </p>
              </div>
              <button 
                onClick={() => {setShowMessage(false); setCurrentSection(0); setClickedHearts(0);}}
                className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-6 py-2 rounded-full transition-all"
              >
                Start Over 🔄
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
