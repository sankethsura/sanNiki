import Link from 'next/link';

export default function Home() {

  return (
    <div className="h-[100dvh] bg-gradient-to-br from-rose-900 via-pink-900 to-purple-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

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
                  Prove Your True Love 💕
                </button>
              </Link>
              
              <Link href="/love">
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Why I Love You 💖
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
