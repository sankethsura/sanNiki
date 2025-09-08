"use client";
import { useState, useEffect } from 'react';

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isCountdownFinished, setIsCountdownFinished] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<Array<{id: number, x: number, delay: number, driftStart: number, driftEnd: number, hue: number}>>([]);
  const [typewriterText, setTypewriterText] = useState("");

  const birthdayDate = new Date('2025-09-08T10:30:40').getTime();
  const loveMessage = "My dearest Nikitha, every moment with you feels like a celebration. You light up my world with your smile, your laugh, and your beautiful heart. Here's to another year of making incredible memories together. I love you more than words can express.";

  // Countdown timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = birthdayDate - now;

      if (distance < 0) {
        setIsCountdownFinished(true);
        clearInterval(timer);
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [birthdayDate]);

  // Typewriter effect
  useEffect(() => {
    let index = 0;
    const typeTimer = setInterval(() => {
      if (index < loveMessage.length) {
        setTypewriterText(loveMessage.substring(0, index + 1));
        index++;
      } else {
        clearInterval(typeTimer);
      }
    }, 50);

    return () => clearInterval(typeTimer);
  }, [loveMessage]);

  // Enhanced Easter egg with pre-calculated values
  const triggerEasterEgg = () => {
    setShowEasterEgg(true);
    
    const numHearts = 8;
    const hearts = Array.from({ length: numHearts }, (_, i) => ({
      id: Date.now() + i + Math.random() * 1000,
      x: Math.random() * 80 + 10,
      delay: i * 0.3,
      driftStart: (Math.random() - 0.5) * 15,
      driftEnd: (Math.random() - 0.5) * 30,
      hue: Math.random() * 20
    }));
    
    setFloatingHearts(hearts);
    
    setTimeout(() => {
      setShowEasterEgg(false);
      setFloatingHearts([]);
    }, 4000);
  };

  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #581c87 25%, #7c2d12 45%, #881337 65%, #4c1d95 85%, #0f172a 100%)'
    }}>
      {/* Minimal CSS */}
      <style jsx>{`
        .typewriter::after {
          content: '|';
          animation: blink 1s infinite;
          background: linear-gradient(135deg, #e879f9, #be185d, #881337);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        @keyframes heartFloat {
          0% {
            opacity: 0;
            transform: translateY(0) translateX(0) scale(0.6);
          }
          8% {
            opacity: 1;
            transform: translateY(-8vh) translateX(var(--drift-start)) scale(1);
          }
          92% {
            opacity: 1;
            transform: translateY(-92vh) translateX(var(--drift-end)) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-100vh) translateX(var(--drift-end)) scale(0.9);
          }
        }
        
        .floating-heart {
          animation: heartFloat 4s ease-out forwards;
          opacity: 0;
          will-change: transform, opacity;
        }
        
        .elegant-card {
          backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
        }
        
        .elegant-hover {
          transition: all 0.3s ease;
        }
        
        .elegant-hover:hover {
          transform: translateY(-2px);
          background: linear-gradient(135deg, rgba(232, 121, 249, 0.1), rgba(190, 24, 93, 0.1), rgba(136, 19, 55, 0.1));
          border: 1px solid rgba(232, 121, 249, 0.3);
        }
      `}</style>

      {/* Enhanced Easter Egg */}
      {showEasterEgg && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {floatingHearts.map((heart) => (
            <div
              key={heart.id}
              className="floating-heart absolute text-2xl"
              style={{
                left: `${heart.x}%`,
                bottom: '0px',
                animationDelay: `${heart.delay}s`,
                filter: `hue-rotate(${heart.hue}deg)`,
                ['--drift-start' as any]: `${heart.driftStart}px`,
                ['--drift-end' as any]: `${heart.driftEnd}px`
              }}
            >
              💜
            </div>
          ))}
        </div>
      )}

      {/* Header */}
      <header className="elegant-card border-b border-white/10">
        <div className="max-w-5xl mx-auto px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span 
                className="text-2xl font-light text-slate-200 cursor-pointer hover:text-white transition-colors"
                onClick={triggerEasterEgg}
              >
                San
              </span>
              <span style={{
                background: 'linear-gradient(135deg, #e879f9, #be185d, #881337)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                scale: "150%"
              }}>♥</span>
              <span 
                className="text-2xl font-light text-slate-200 cursor-pointer hover:text-white transition-colors"
                onClick={triggerEasterEgg}
              >
                Niki
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="py-32">
          <div className="max-w-4xl mx-auto text-center px-8">
            {!isCountdownFinished ? (
              <div className="mb-16">
                <h1 className="text-6xl md:text-8xl font-thin text-white mb-8 leading-tight tracking-tight">
                  Something Special
                  <br />
                  <span className="font-light" style={{
                    background: 'linear-gradient(135deg, #e879f9, #be185d, #881337)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>Is Coming</span>
                </h1>
                <p className="text-xl text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
                  A moment in time reserved just for you
                </p>
              </div>
            ) : (
              <div className="mb-16">
                <h1 className="text-6xl md:text-8xl font-thin text-white mb-8 leading-tight tracking-tight">
                  Happy Birthday
                  <br />
                  <span className="font-light" style={{
                    background: 'linear-gradient(135deg, #e879f9, #be185d, #881337)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>Nikitha</span>
                </h1>
                <p className="text-xl text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
                  Celebrating another year of your extraordinary journey
                </p>
              </div>
            )}

            {/* Mystery Teaser / Countdown Timer */}
            {!isCountdownFinished ? (
              <div className="mb-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
                  {[
                    { label: 'Days', value: timeLeft.days },
                    { label: 'Hours', value: timeLeft.hours },
                    { label: 'Minutes', value: timeLeft.minutes },
                    { label: 'Seconds', value: timeLeft.seconds }
                  ].map((item) => (
                    <div key={item.label} className="elegant-card rounded-xl p-8 elegant-hover">
                      <div className="text-4xl md:text-5xl font-thin text-white mb-4">
                        {item.value.toString().padStart(2, '0')}
                      </div>
                      <div className="text-xs text-slate-400 uppercase tracking-[0.2em] font-light">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
                
                <p className="text-slate-400 font-light text-center mt-8">
                  Every second brings us closer to unveiling your surprise
                </p>
              </div>
            ) : (
              <div className="mb-20">
                <h2 className="text-4xl md:text-6xl font-thin mb-6" style={{
                  background: 'linear-gradient(135deg, #e879f9, #be185d, #881337)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  Today is your day
                </h2>
                <p className="text-xl text-slate-300 font-light">
                  Hope it&apos;s as wonderful as you are
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Hidden content until countdown finishes */}
        {isCountdownFinished && (
          <>
            {/* Love Message Section */}
            <section className="py-32">
              <div className="max-w-4xl mx-auto text-center px-8">
                <div className="elegant-card rounded-2xl p-12 md:p-20">
                  <h3 className="text-3xl md:text-4xl font-thin text-white mb-16">
                    A message from my heart
                  </h3>
                  <blockquote className="text-lg md:text-xl text-slate-200 leading-relaxed font-light typewriter italic">
                    {typewriterText}
                  </blockquote>
                </div>
              </div>
            </section>

            {/* Photo Gallery Section */}
            <section className="py-32">
              <div className="max-w-6xl mx-auto px-8">
                <h3 className="text-3xl md:text-4xl font-thin text-white text-center mb-20">
                  Our memories
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[...Array(9)].map((_, i) => (
                    <div 
                      key={i} 
                      className="elegant-card rounded-xl aspect-square flex items-center justify-center elegant-hover group"
                    >
                      <div className="text-center">
                        <div className="w-16 h-16 border border-slate-400 rounded-lg mb-4 mx-auto flex items-center justify-center group-hover:border-slate-300 transition-colors">
                          <div className="text-slate-400 text-2xl group-hover:text-slate-300 transition-colors">+</div>
                        </div>
                        <p className="text-slate-400 text-sm font-light">Photo {i + 1}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Special Moments Section */}
            <section className="py-32">
              <div className="max-w-5xl mx-auto px-8">
                <h3 className="text-3xl md:text-4xl font-thin text-white text-center mb-24">
                  Special moments
                </h3>
                
                <div className="space-y-24">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16`}>
                      <div className="w-full lg:w-1/2">
                        <div className="elegant-card rounded-xl aspect-video flex items-center justify-center elegant-hover group">
                          <div className="text-center">
                            <div className="w-20 h-20 border border-slate-400 rounded-lg mx-auto flex items-center justify-center group-hover:border-slate-300 transition-colors mb-4">
                              <div className="text-slate-400 text-3xl group-hover:text-slate-300 transition-colors">+</div>
                            </div>
                            <p className="text-slate-400 font-light">Memory {i + 1}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="w-full lg:w-1/2 text-center lg:text-left">
                        <h4 className="text-2xl md:text-3xl font-thin text-white mb-8">
                          Caption {i + 1}
                        </h4>
                        <p className="text-slate-300 leading-relaxed font-light text-lg">
                          Add a beautiful caption describing this special moment we shared together. 
                          Every memory with you is a treasure that I&apos;ll cherish forever.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="elegant-card border-t border-white/10 py-10">
        <div className="max-w-4xl mx-auto text-center px-8">
          <p className="text-slate-300 font-light mb-2">
            Made with <span style={{
              background: 'linear-gradient(135deg, #e879f9, #be185d, #881337)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>love</span> by Sanketh for Nikitha
          </p>
        </div>
      </footer>
    </div>
  );
}