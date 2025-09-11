"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isCountdownFinished, setIsCountdownFinished] = useState(false);
  const [typewriterText, setTypewriterText] = useState("");

  const birthdayDate = new Date("2025-09-11T20:38:00").getTime();
  const loveMessage =
    "My dearest Chinaama, every moment with you feels like a celebration. You light up my world with your smile, your laugh, and your beautiful heart. Here's to another year of making incredible memories together. I love you more than words can express.";

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


  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, #0f172a 0%, #581c87 25%, #7c2d12 45%, #881337 65%, #4c1d95 85%, #0f172a 100%)",
      }}
    >
      {/* Minimal CSS */}
      <style jsx>{`
        .typewriter::after {
          content: "|";
          animation: blink 1s infinite;
          background: linear-gradient(135deg, #e879f9, #be185d, #881337);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        @keyframes blink {
          0%,
          50% {
            opacity: 1;
          }
          51%,
          100% {
            opacity: 0;
          }
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
          background: linear-gradient(
            135deg,
            rgba(232, 121, 249, 0.1),
            rgba(190, 24, 93, 0.1),
            rgba(136, 19, 55, 0.1)
          );
          border: 1px solid rgba(232, 121, 249, 0.3);
        }
      `}</style>


      {/* Header */}
      <header className="elegant-card border-b border-white/10">
        <div className="max-w-5xl mx-auto px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-2xl font-light text-slate-200">
                San
              </span>
              <span
                style={{
                  background: "linear-gradient(135deg, #e879f9, #be185d, #881337)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  scale: "150%",
                }}
              >
                ♥
              </span>
              <span className="text-2xl font-light text-slate-200">
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
                  <span
                    className="font-light"
                    style={{
                      background: "linear-gradient(135deg, #e879f9, #be185d, #881337)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Is Coming
                  </span>
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
                  <span
                    className="font-light"
                    style={{
                      background: "linear-gradient(135deg, #e879f9, #be185d, #881337)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Niki
                  </span>
                </h1>
                <p className="text-xl text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
                  Your first birthday with me - the start of celebrating you forever
                </p>
              </div>
            )}

            {/* Mystery Teaser / Countdown Timer */}
            {!isCountdownFinished ? (
              <div className="mb-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
                  {[
                    { label: "Days", value: timeLeft.days },
                    { label: "Hours", value: timeLeft.hours },
                    { label: "Minutes", value: timeLeft.minutes },
                    { label: "Seconds", value: timeLeft.seconds },
                  ].map((item) => (
                    <div key={item.label} className="elegant-card rounded-xl p-8 elegant-hover text-center">
                      <div className="text-4xl md:text-5xl font-thin text-white mb-4">
                        {item.value.toString().padStart(2, "0")}
                      </div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-light">
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
                <h2
                  className="text-4xl md:text-6xl font-thin mb-6"
                  style={{
                    background: "linear-gradient(135deg, #e879f9, #be185d, #881337)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Today is your day
                </h2>
                <p className="text-xl text-slate-300 font-light">
                  I promise to fill your life with endless colors of love and joy
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

            {/* Special Moments Section */}
            <section className="py-32">
              <div className="max-w-5xl mx-auto px-8">
                <h3 className="text-3xl md:text-4xl font-thin text-white text-center mb-24">
                  Special moments
                </h3>

                <div className="space-y-24">
                  <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="w-full lg:w-1/2">
                      <div className="elegant-card rounded-xl aspect-video flex items-center justify-center elegant-hover group">
                        <div className="text-center">
                          <img
                            src={`/${8}.jpeg`}
                            alt={`Memory 8`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="w-full lg:w-1/2 text-center lg:text-left">
                      <h4 className="text-2xl md:text-3xl font-thin text-white mb-8">Our First Selfie</h4>
                      <p className="text-slate-300 leading-relaxed font-light text-lg">
                        That nervous excitement captured in a single frame - the beginning of countless photos together. I remember being amazed that someone so beautiful wanted to take a picture with me. Little did I know it would be the first of thousands, each one marking another precious moment in our love story.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
                    <div className="w-full lg:w-1/2">
                      <div className="elegant-card rounded-xl aspect-video flex items-center justify-center elegant-hover group">
                        <div className="text-center">
                        <img
                            src={`/${6}.jpeg`}
                            alt={`Memory 6`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="w-full lg:w-1/2 text-center lg:text-left">
                      <h4 className="text-2xl md:text-3xl font-thin text-white mb-8">The Drive That Changed Everything</h4>
                      <p className="text-slate-300 leading-relaxed font-light text-lg">
                        Miles of open road, music playing softly, and my heart pounding with anticipation. When I finally found the courage to ask you to be mine, your excitement lit up the entire car brighter than any sunset. That yes, that beautiful, enthusiastic yes - it turned a simple drive into the most magical journey of our lives.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="w-full lg:w-1/2">
                      <div className="elegant-card rounded-xl aspect-video flex items-center justify-center elegant-hover group">
                        <div className="text-center">
                        <img
                            src={`/${4}.jpeg`}
                            alt={`Memory 4`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="w-full lg:w-1/2 text-center lg:text-left">
                      <h4 className="text-2xl md:text-3xl font-thin text-white mb-8">That Electric Moment</h4>
                      <p className="text-slate-300 leading-relaxed font-light text-lg">
                        Time seemed to stop as we drew closer, hearts racing in perfect synchronization. That tender touch of our lips sparked something magical - pure joy, overwhelming happiness, and an excitement that made us both laugh like giddy teenagers. In that beautiful moment, the whole world felt new and full of endless possibilities.
                      </p>
                    </div>
                  </div>
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
                      className="elegant-card rounded-xl aspect-square overflow-hidden elegant-hover group"
                    >
                      <img
                        src={`/${i + 1}.jpeg`}
                        alt={`Memory ${i + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Promise Section */}
            <section className="py-32">
              <div className="max-w-4xl mx-auto text-center px-8">
                <div className="elegant-card rounded-2xl p-12 md:p-20">
                  <h3 className="text-3xl md:text-4xl font-thin text-white mb-16">
                    My promise to you
                  </h3>
                  <div className="space-y-8 text-lg md:text-xl text-slate-200 leading-relaxed font-light">
                    <p>
                      Even when distance keeps us apart, know that my heart remains forever close to yours. 
                      Though I may not always find the perfect words to express what's in my soul, 
                      my love for you flows deeper than any ocean, purer than any star in the night sky.
                    </p>
                    <p>
                      We are two souls perfectly crafted for each other, completing what the other lacks, 
                      strengthening what the other possesses. In your eyes, I see our beautiful tomorrow - 
                      a canvas of endless adventures waiting to be painted with the most vibrant colors of joy, 
                      laughter, and unconditional love.
                    </p>
                    <p className="text-xl md:text-2xl font-normal" style={{
                      background: 'linear-gradient(135deg, #e879f9, #be185d, #881337)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}>
                      Together, we will write the most beautiful love story the world has ever seen.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Final Quote */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto text-center px-8">
          <blockquote className="text-2xl md:text-3xl font-light text-white italic">
            "Your smile is my favorite sight in this world - I live to see it light up your face every single day"
          </blockquote>
        </div>
      </div>

      {/* Footer */}
      <footer className="elegant-card border-t border-white/10 py-10">
        <div className="max-w-4xl mx-auto text-center px-8">
          <p className="text-slate-300 font-light mb-2">
            Made with{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #e879f9, #be185d, #881337)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              love
            </span>
          </p>
        </div>
      </footer>
    </div>
  );
}
