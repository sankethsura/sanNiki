'use client';
import Link from 'next/link';

export default function Home() {

  return (
    <div className="h-[100dvh] bg-gradient-to-br from-rose-900 via-pink-900 to-purple-900 relative overflow-hidden">
      {/* Animated background with heartbeat effect */}
      <div className="absolute inset-0">
        {/* Large romantic orbs with slow, profound heartbeat */}
        <div 
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-pink-400/30 to-rose-400/25 rounded-full blur-[100px]"
          style={{
            animation: 'heartbeat 3s ease-in-out infinite'
          }}
        ></div>
        <div 
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-r from-purple-400/25 to-indigo-400/30 rounded-full blur-[80px]"
          style={{
            animation: 'heartbeat 4s ease-in-out infinite 1.5s'
          }}
        ></div>
        <div 
          className="absolute top-2/3 left-1/2 w-[300px] h-[300px] bg-gradient-to-r from-red-400/20 to-pink-400/25 rounded-full blur-[60px]"
          style={{
            animation: 'heartbeat 2.5s ease-in-out infinite 0.8s'
          }}
        ></div>
        
        {/* Floating sparkles */}
        <div className="absolute top-1/6 right-1/3 w-2 h-2 bg-white/60 rounded-full animate-ping"></div>
        <div className="absolute bottom-1/3 left-1/6 w-1 h-1 bg-yellow-300/80 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-1/6 w-1.5 h-1.5 bg-pink-300/70 rounded-full animate-ping" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-1/6 right-2/3 w-1 h-1 bg-purple-300/60 rounded-full animate-ping" style={{ animationDelay: '6s' }}></div>
      </div>

      {/* Custom heartbeat animation */}
      <style jsx>{`
        @keyframes heartbeat {
          0%, 100% {
            transform: scale(1);
            opacity: 0.6;
          }
          25% {
            transform: scale(1.05);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.1);
            opacity: 1;
          }
          75% {
            transform: scale(1.05);
            opacity: 0.8;
          }
        }
      `}</style>

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col">
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

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/game">
                <button className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Heart Collection 💕
                </button>
              </Link>
              
              {/* <Link href="/memory">
                <button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Memory Match 🧠💖
                </button>
              </Link> */}
              
              <Link href="/love">
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Love Messages 💖
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
