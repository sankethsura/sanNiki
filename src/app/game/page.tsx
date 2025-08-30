'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

export default function GamePage() {
  const [gameStarted, setGameStarted] = useState(false);
  const [clickedHearts, setClickedHearts] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [hearts, setHearts] = useState<Array<{id: number, x: number, y: number, speed: number, direction: {x: number, y: number}}>>([]);
  const [isClient, setIsClient] = useState(false);

  // Ensure client-side only rendering after hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Simple speed constant - each heart is 0.2 units faster than the previous
  const SPEED_INCREMENT = 0.4;

  const loveStory = [
    "💝 True love begins with the first heart - find it to start your journey!",
    "💕 Two hearts beating as one - your love is growing stronger!",
    "💖 Three hearts of destiny - you're meant to be together!",
    "💗 Four hearts of trust - you believe in each other completely!",
    "💓 Five hearts of passion - your love burns bright!",
    "💘 Six hearts of devotion - you're committed to forever!",
    "💝 Seven hearts of understanding - you know each other's souls!",
    "💞 Eight hearts of unity - two hearts become one!",
    "💟 Nine hearts of eternity - your love transcends time!",
    "❤️ Ten hearts of true love - you've proven your love is real! ❤️"
  ];

  const createNewHeart = useCallback((id: number) => {
    // Only create hearts on client side to avoid hydration mismatch
    if (typeof window === 'undefined') {
      return {
        id,
        x: 50,
        y: 50,
        speed: SPEED_INCREMENT,
        direction: { x: 1, y: 1 }
      };
    }
    
    // Speed increases linearly: heart 1 = 0.2, heart 2 = 0.4, etc.
    const heartSpeed = (clickedHearts + 1) * SPEED_INCREMENT;
    
    return {
      id,
      x: Math.random() * 85 + 5, // Keep some margin from edges
      y: Math.random() * 85 + 5,
      speed: heartSpeed,
      direction: {
        x: (Math.random() - 0.5) * 2, // Random direction
        y: (Math.random() - 0.5) * 2
      }
    };
  }, [clickedHearts, SPEED_INCREMENT]);

  const handleHeartClick = (heartId: number) => {
    setClickedHearts(prev => prev + 1);
    // Remove the current heart (next heart will be created by useEffect)
    setHearts([]);
    
    if (clickedHearts >= 9) {
      setShowMessage(true);
      setHearts([]);
    }
  };

  // Initialize one heart at a time
  useEffect(() => {
    if (gameStarted && hearts.length === 0 && clickedHearts < 10) {
      // Create one heart with increasing speed
      const newHeart = createNewHeart(clickedHearts);
      setHearts([newHeart]);
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
    <div className="h-screen h-[100dvh] bg-gradient-to-br from-rose-900 via-pink-900 to-purple-900 relative overflow-hidden">
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
      <div className="relative z-10 h-full flex flex-col">
        {/* Back to Home Button */}
        <div className="absolute top-4 left-4 z-50">
          <Link href="/">
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm transition-all border border-white/20">
              ← Home
            </button>
          </Link>
        </div>

        {/* Game Section */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-8 max-w-lg w-full text-center border border-white/20">
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
                    🎯 Your challenge: Catch 10 hearts, one at a time!
                  </p>
                  <p className="text-xs md:text-sm text-pink-200 mb-3 md:mb-4 leading-relaxed">
                    Warning: Each heart moves FASTER than the previous one! Heart #10 will be incredibly challenging to catch! 🏃‍♀️💨
                  </p>
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
                    💖 Heart #{clickedHearts + 1} - Getting faster with each one!
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
                      ✨ Amazing! Next heart will be {Math.round(((clickedHearts + 2) * SPEED_INCREMENT) * 100)}% speed! ✨
                    </p>
                  )}
                  <p className="text-xs text-yellow-300 mt-2">
                    Current Speed: {Math.round(((clickedHearts + 1) * SPEED_INCREMENT) * 100)}%
                  </p>
                </div>
              )}
            </div>

            {gameStarted && (
              <div className="flex gap-3 md:gap-4 mt-4 md:mt-6">
                <Link href="/" className="flex-1">
                  <button className="w-full bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 text-white px-3 md:px-4 py-2 rounded-full transition-all text-sm md:text-base">
                    Give Up 💔
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* True Love Achievement Message */}
        {showMessage && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-gradient-to-br from-pink-400/40 to-red-400/40 backdrop-blur-md rounded-3xl p-4 md:p-8 max-w-lg w-full text-center border-2 border-pink-300/60 shadow-2xl my-4 max-h-[100dvh] overflow-y-auto">
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
                  "Nikitha, you've just proven that true love conquers all challenges! This little game was created with all my love for you. You mean everything to me, and I wanted to show you in a fun, interactive way. You complete me in every way possible! 💻❤️"
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
                  onClick={() => {setShowMessage(false); setGameStarted(false); setClickedHearts(0); setHearts([]);}}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-3 md:px-4 py-2 md:py-3 rounded-full transition-all text-xs md:text-sm font-semibold"
                >
                  Play Again 🔄
                </button>
                <Link href="/love" className="flex-1">
                  <button className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-3 md:px-4 py-2 md:py-3 rounded-full transition-all text-xs md:text-sm font-semibold">
                    More Love 💖
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}