'use client';
import { useState, useEffect, useCallback } from 'react';

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [clickedHearts, setClickedHearts] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [hearts, setHearts] = useState<Array<{id: number, x: number, y: number, speed: number, direction: {x: number, y: number}}>>([]);
  const [gamePhase, setGamePhase] = useState(0);
  const [isClient, setIsClient] = useState(false);

  // Ensure client-side only rendering after hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  // ✨ HEART SPEED CONFIGURATION TABLE ✨
  // Edit these values to adjust difficulty! Lower = slower, Higher = faster
  const heartSpeedConfig = {
    baseSpeed: 0.3,           // Starting speed for all hearts (recommended: 0.2-0.5)
    speedVariation: 0.2,      // Random speed variation (recommended: 0.1-0.3)
    speedIncreasePerHeart: 0.1, // Speed increase per heart collected (recommended: 0.05-0.15)
    maxSpeedMultiplier: 2.0,  // Maximum speed multiplier (recommended: 1.5-3.0)
    
    // Individual heart speeds (if you want specific control)
    heartSpeeds: {
      1: 0.3,   // Heart 1 speed
      2: 0.35,  // Heart 2 speed  
      3: 0.4,   // Heart 3 speed
      4: 0.45,  // Heart 4 speed
      5: 0.5,   // Heart 5 speed
      6: 0.55,  // Heart 6 speed
      7: 0.6,   // Heart 7 speed
      8: 0.65,  // Heart 8 speed
      9: 0.7,   // Heart 9 speed
      10: 0.8   // Heart 10 speed (final heart)
    }
  };

  const loveStory = [
    "💝 True love begins with the first heart - find it to start your journey!",
    "💕 Two hearts beating as one - your love is growing stronger!",
    "💖 Three hearts of destiny - you&apos;re meant to be together!",
    "💗 Four hearts of trust - you believe in each other completely!",
    "💓 Five hearts of passion - your love burns bright!",
    "💘 Six hearts of devotion - you&apos;re committed to forever!",
    "💝 Seven hearts of understanding - you know each other&apos;s souls!",
    "💞 Eight hearts of unity - two hearts become one!",
    "💟 Nine hearts of eternity - your love transcends time!",
    "❤️ Ten hearts of true love - you&apos;ve proven your love is real! ❤️"
  ];

  const createNewHeart = useCallback((id: number) => {
    // Only create hearts on client side to avoid hydration mismatch
    if (typeof window === 'undefined') {
      return {
        id,
        x: 50,
        y: 50,
        speed: heartSpeedConfig.baseSpeed,
        direction: { x: 1, y: 1 }
      };
    }
    
    // Use configured base speed with variation
    const baseSpeed = heartSpeedConfig.baseSpeed + (Math.random() * heartSpeedConfig.speedVariation);
    
    return {
      id,
      x: Math.random() * 85 + 5, // Keep some margin from edges
      y: Math.random() * 85 + 5,
      speed: baseSpeed,
      direction: {
        x: (Math.random() - 0.5) * 2, // Random direction
        y: (Math.random() - 0.5) * 2
      }
    };
  }, [heartSpeedConfig]);

  const handleHeartClick = (heartId: number) => {
    setClickedHearts(prev => prev + 1);
    setHearts(prev => {
      const newHearts = prev.filter(h => h.id !== heartId);
      // Make remaining hearts faster after each collection using config
      const speedMultiplier = Math.min(
        1 + (clickedHearts * heartSpeedConfig.speedIncreasePerHeart), 
        heartSpeedConfig.maxSpeedMultiplier
      );
      return newHearts.map(heart => ({
        ...heart,
        speed: heart.speed * speedMultiplier
      }));
    });
    
    if (clickedHearts >= 9) {
      setShowMessage(true);
      setHearts([]);
    }
  };

  // Initialize all 10 hearts when game starts
  useEffect(() => {
    if (gameStarted && hearts.length === 0 && clickedHearts === 0) {
      const initialHearts = Array.from({ length: 10 }, (_, i) => createNewHeart(i));
      setHearts(initialHearts);
    }
  }, [gameStarted, hearts.length, clickedHearts, createNewHeart]);

  // Animate hearts movement
  useEffect(() => {
    if (!gameStarted || hearts.length === 0) return;

    const interval = setInterval(() => {
      setHearts(prevHearts => 
        prevHearts.map(heart => {
          let newX = heart.x + heart.direction.x * heart.speed;
          let newY = heart.y + heart.direction.y * heart.speed;
          let newDirectionX = heart.direction.x;
          let newDirectionY = heart.direction.y;

          // Bounce off walls
          if (newX <= 0 || newX >= 90) {
            newDirectionX = -heart.direction.x;
            newX = Math.max(0, Math.min(90, newX));
          }
          if (newY <= 0 || newY >= 90) {
            newDirectionY = -heart.direction.y;
            newY = Math.max(0, Math.min(90, newY));
          }

          return {
            ...heart,
            x: newX,
            y: newY,
            direction: { x: newDirectionX, y: newDirectionY }
          };
        })
      );
    }, 50);

    return () => clearInterval(interval);
  }, [gameStarted, hearts.length]);

  const FloatingHeart = ({ heart }: { heart: {id: number, x: number, y: number, speed: number, direction: {x: number, y: number}} }) => {
    // Size gets smaller as fewer hearts remain (more challenging)
    const remainingHearts = 10 - clickedHearts;
    const size = Math.max(20, 25 + remainingHearts * 2); // Hearts get smaller as fewer remain
    const opacity = Math.max(0.8, 1 - ((10 - remainingHearts) * 0.02)); // Slightly more transparent as game progresses
    
    return (
      <div 
        className="absolute cursor-pointer transition-all duration-200 hover:scale-125 z-30"
        style={{
          left: `${heart.x}%`,
          top: `${heart.y}%`,
          fontSize: `${size}px`,
          opacity: opacity,
          filter: `hue-rotate(${heart.id * 36}deg) brightness(1.2)`, // Different colors for each heart
          animation: `pulse ${Math.max(0.8, 2 - (10 - remainingHearts) * 0.15)}s infinite`
        }}
        onClick={() => handleHeartClick(heart.id)}
      >
        ❤️
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-900 via-pink-900 to-purple-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Moving Hearts Game */}
      {gameStarted && (
        <div className="absolute inset-0 z-20 pointer-events-none">
          {hearts.map((heart) => (
            <div key={heart.id} className="pointer-events-auto">
              <FloatingHeart heart={heart} />
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
              Prove Your True Love 💕
            </button>
          </div>
        </div>

        {/* Heart Collection Game Section */}
        {currentSection >= 1 && !showMessage && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-8 max-w-lg w-full text-center border border-white/20 my-4 max-h-screen overflow-y-auto relative z-[101]">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">
                💕 Prove Your True Love, Nikitha 💕
              </h2>
              
              <div className="space-y-3 md:space-y-4 text-white/90 text-base md:text-lg">
                <p className="leading-relaxed text-pink-200 font-semibold text-sm md:text-base">
                  {loveStory[clickedHearts] || loveStory[0]}
                </p>
                
                {!gameStarted ? (
                  <div className="mt-4 md:mt-6 p-4 md:p-6 bg-gradient-to-br from-pink-500/20 to-red-500/20 rounded-2xl border border-pink-300/30">
                    <p className="text-base md:text-lg text-white mb-3 md:mb-4">
                      🎯 Your challenge: Start with 10 hearts and catch them all!
                    </p>
                    <p className="text-xs md:text-sm text-pink-200 mb-3 md:mb-4 leading-relaxed">
                      Warning: Every heart you catch makes the remaining ones move FASTER! The final hearts will be incredibly challenging to catch! 🏃‍♀️💨
                    </p>
                    
                    {/* Speed Configuration Display */}
                    <div className="bg-blue-500/10 p-3 rounded-xl border border-blue-300/20 mb-3 md:mb-4">
                      <p className="text-xs text-blue-200 mb-1">⚡ Current Speed Settings:</p>
                      <div className="text-xs text-white/80 space-y-1">
                        <p>Base Speed: {heartSpeedConfig.baseSpeed} | Speed Increase: +{heartSpeedConfig.speedIncreasePerHeart * 100}% per heart</p>
                        <p>Max Speed: {heartSpeedConfig.maxSpeedMultiplier}x | Variation: ±{heartSpeedConfig.speedVariation}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setGameStarted(true)}
                      className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-full text-sm md:text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      Start The Love Quest ❤️
                    </button>
                  </div>
                ) : (
                  <div className="mt-4 md:mt-6 p-3 md:p-4 bg-pink-500/20 rounded-2xl">
                    <p className="text-xs md:text-sm text-pink-200 mb-2">
                      💖 {hearts.length} hearts remaining! They&apos;re getting faster and smaller!
                    </p>
                    <p className="text-base md:text-lg text-white font-bold mb-2">
                      Hearts Collected: {clickedHearts}/10
                    </p>
                    <div className="w-full bg-pink-800/30 rounded-full h-2 md:h-3 mb-2 md:mb-3">
                      <div 
                        className="bg-gradient-to-r from-pink-400 to-red-400 h-2 md:h-3 rounded-full transition-all duration-500"
                        style={{ width: `${(clickedHearts / 10) * 100}%` }}
                      ></div>
                    </div>
                    {clickedHearts > 0 && (
                      <p className="text-xs text-green-300">
                        ✨ {hearts.length === 1 ? "Last heart - you can do it!" : `${hearts.length} hearts left - they're speeding up!`} ✨
                      </p>
                    )}
                  </div>
                )}
              </div>

              {gameStarted && (
                <div className="flex gap-3 md:gap-4 mt-4 md:mt-6">
                  <button 
                    onClick={() => {
                      setCurrentSection(0);
                      setGameStarted(false);
                      setClickedHearts(0);
                      setHearts([]);
                      setShowMessage(false);
                    }}
                    className="flex-1 bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 text-white px-3 md:px-4 py-2 rounded-full transition-all text-sm md:text-base relative z-[999]"
                    type="button"
                    style={{ pointerEvents: 'auto' }}
                  >
                    Give Up 💔
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* More Love Section */}
        {currentSection >= 2 && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 backdrop-blur-md rounded-3xl p-4 md:p-8 max-w-2xl w-full text-center border border-pink-300/30 my-4 max-h-screen overflow-y-auto">
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-8">
                🌟 Why I Love You, Nikitha 🌟
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 text-white/90">
                <div className="bg-pink-500/10 p-4 md:p-6 rounded-2xl border border-pink-300/20">
                  <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-pink-300">Your Smile 😊</h3>
                  <p className="text-sm md:text-base">Lights up my entire world and makes even the darkest days bright</p>
                </div>
                
                <div className="bg-purple-500/10 p-4 md:p-6 rounded-2xl border border-purple-300/20">
                  <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-purple-300">Your Laugh 😂</h3>
                  <p className="text-sm md:text-base">Is the most beautiful sound I&apos;ve ever heard, music to my soul</p>
                </div>
                
                <div className="bg-red-500/10 p-4 md:p-6 rounded-2xl border border-red-300/20">
                  <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-red-300">Your Heart ❤️</h3>
                  <p className="text-sm md:text-base">So kind, caring, and full of love that inspires me every day</p>
                </div>
                
                <div className="bg-blue-500/10 p-4 md:p-6 rounded-2xl border border-blue-300/20">
                  <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-blue-300">Your Support 🤝</h3>
                  <p className="text-sm md:text-base">Always believing in me and standing by my side through everything</p>
                </div>
              </div>

              <div className="mt-6 md:mt-8 text-center">
                <button 
                  onClick={() => setCurrentSection(0)}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-6 md:px-8 py-2 md:py-3 rounded-full text-sm md:text-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  Back to Our Story 💕
                </button>
              </div>
            </div>
          </div>
        )}

        {/* True Love Achievement Message */}
        {showMessage && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-gradient-to-br from-pink-400/40 to-red-400/40 backdrop-blur-md rounded-3xl p-4 md:p-8 max-w-lg w-full text-center border-2 border-pink-300/60 shadow-2xl my-4 max-h-screen overflow-y-auto">
              <div className="text-6xl md:text-8xl mb-3 md:mb-4 animate-bounce">🏆</div>
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 md:mb-4 animate-pulse">
                TRUE LOVE ACHIEVED! 💖
              </h2>
              <p className="text-lg md:text-xl text-white/90 mb-4 md:mb-6 font-semibold">
                You collected all 10 hearts! Your love is proven! ❤️✨
              </p>
              
              <div className="bg-white/15 p-4 md:p-6 rounded-2xl mb-4 md:mb-6 border border-white/20">
                <h3 className="text-xl md:text-2xl font-bold text-yellow-300 mb-3 md:mb-4">🌟 Love Certificate 🌟</h3>
                <p className="text-sm md:text-lg text-pink-100 font-semibold leading-relaxed">
                  &ldquo;Nikitha, you&apos;ve just proven that true love conquers all challenges! This little game was created with all my love for you. You mean everything to me, and I wanted to show you in a fun, interactive way. You complete me in every way possible! 💻❤️&rdquo;
                </p>
                <p className="text-xs md:text-sm text-white/80 mt-3 md:mt-4 italic">
                  - Your loving boyfriend, Sanketh 💕
                </p>
              </div>

              <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 p-3 md:p-4 rounded-2xl mb-4 md:mb-6 border border-yellow-300/30">
                <p className="text-base md:text-lg font-bold text-yellow-200 mb-2">📱 Special Instructions 📱</p>
                <p className="text-white text-xs md:text-sm leading-relaxed">
                  Take a screenshot of this achievement and send it to your loved one! Share this moment of completing the love quest together! 💕📸
                </p>
              </div>

              <div className="flex gap-2 md:gap-3">
                <button 
                  onClick={() => {setShowMessage(false); setCurrentSection(0); setClickedHearts(0); setGameStarted(false); setHearts([]);}}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-3 md:px-4 py-2 md:py-3 rounded-full transition-all text-xs md:text-sm font-semibold"
                >
                  Play Again 🔄
                </button>
                <button 
                  onClick={() => setCurrentSection(2)}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-3 md:px-4 py-2 md:py-3 rounded-full transition-all text-xs md:text-sm font-semibold"
                >
                  More Love 💖
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
