'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface Card {
  id: number;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
  color: string;
}

export default function MemoryGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);

  // Romantic symbols for matching
  const loveSymbols = [
    { symbol: '💕', color: 'text-pink-400' },
    { symbol: '💖', color: 'text-red-400' },
    { symbol: '💝', color: 'text-purple-400' },
    { symbol: '🌹', color: 'text-red-500' },
    { symbol: '✨', color: 'text-yellow-400' },
    { symbol: '🌟', color: 'text-blue-400' },
    { symbol: '💫', color: 'text-indigo-400' },
    { symbol: '🦋', color: 'text-cyan-400' }
  ];

  // Progressive love messages
  const progressMessages = [
    "💝 Our love story begins... Find the first pair!",
    "💕 Two hearts discovering each other - beautiful start!",
    "💖 Love is growing stronger with each connection!",
    "🌹 Like roses blooming, our love flourishes!",
    "✨ You bring magic into every moment we share!",
    "🌟 You&apos;re the brightest star in my universe!",
    "💫 Together we create something extraordinary!",
    "🦋 Our love transforms everything into beauty!"
  ];

  const finalMessages = [
    "🎉 INCREDIBLE! You matched all pairs with perfect love!",
    "💖 Your memory is as perfect as your heart, Chinnamma!",
    "🏆 Love Conquers All - and you just proved it!"
  ];

  // Initialize cards
  const initializeGame = useCallback(() => {
    const gameCards: Card[] = [];
    loveSymbols.forEach((symbol, index) => {
      // Create pairs
      gameCards.push({
        id: index * 2,
        symbol: symbol.symbol,
        isFlipped: false,
        isMatched: false,
        color: symbol.color
      });
      gameCards.push({
        id: index * 2 + 1,
        symbol: symbol.symbol,
        isFlipped: false,
        isMatched: false,
        color: symbol.color
      });
    });
    
    // Shuffle cards
    for (let i = gameCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [gameCards[i], gameCards[j]] = [gameCards[j], gameCards[i]];
    }
    
    setCards(gameCards);
    setFlippedCards([]);
    setMatches(0);
    setMoves(0);
    setGameWon(false);
    setCurrentMessage(0);
  }, []);

  // Handle card click
  const handleCardClick = (cardId: number) => {
    console.log("🚨 CARD CLICKED:", cardId);
    
    if (flippedCards.length >= 2) return;
    
    const card = cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);
    
    // Flip the card
    setCards(prev => prev.map(c => 
      c.id === cardId ? { ...c, isFlipped: true } : c
    ));

    // Check for match when 2 cards are flipped
    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1);
      
      const [firstId, secondId] = newFlippedCards;
      const firstCard = cards.find(c => c.id === firstId);
      const secondCard = cards.find(c => c.id === secondId);
      
      if (firstCard && secondCard && firstCard.symbol === secondCard.symbol) {
        // Match found!
        console.log("🚨 MATCH FOUND!");
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            c.id === firstId || c.id === secondId 
              ? { ...c, isMatched: true }
              : c
          ));
          setMatches(prev => prev + 1);
          setCurrentMessage(prev => Math.min(prev + 1, progressMessages.length - 1));
          setFlippedCards([]);
          
          // Check if game is won
          if (matches + 1 === loveSymbols.length) {
            setTimeout(() => setGameWon(true), 500);
          }
        }, 800);
      } else {
        // No match - flip cards back
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            c.id === firstId || c.id === secondId 
              ? { ...c, isFlipped: false }
              : c
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const MemoryCard = ({ card }: { card: Card }) => (
    <div
      className={`relative w-16 h-16 md:w-20 md:h-20 cursor-pointer transition-all duration-500 transform hover:scale-105 ${
        card.isFlipped || card.isMatched ? 'rotate-y-180' : ''
      }`}
      onClick={() => handleCardClick(card.id)}
      style={{ perspective: '1000px' }}
    >
      {/* Card Back */}
      <div className={`absolute inset-0 rounded-xl border-2 border-pink-300/50 bg-gradient-to-br from-pink-500/30 to-purple-500/30 backdrop-blur-sm flex items-center justify-center transition-all duration-500 ${
        card.isFlipped || card.isMatched ? 'opacity-0 rotate-y-180' : 'opacity-100'
      }`}>
        <div className="text-2xl">💕</div>
      </div>
      
      {/* Card Front */}
      <div className={`absolute inset-0 rounded-xl border-2 border-yellow-300/50 bg-gradient-to-br from-yellow-500/30 to-orange-500/30 backdrop-blur-sm flex items-center justify-center transition-all duration-500 ${
        card.isFlipped || card.isMatched ? 'opacity-100' : 'opacity-0 rotate-y-180'
      } ${card.isMatched ? 'bg-green-500/40 border-green-300/60' : ''}`}>
        <div className={`text-2xl md:text-3xl ${card.color} ${card.isMatched ? 'animate-pulse' : ''}`}>
          {card.symbol}
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    if (gameStarted) {
      initializeGame();
    }
  }, [gameStarted, initializeGame]);

  return (
    <div className="h-[100dvh] bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-pink-400/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col overflow-y-auto">
        {/* Back to Home Button */}
        <div className="absolute top-4 left-4 z-50">
          <Link href="/">
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm transition-all border border-white/20">
              ← Home
            </button>
          </Link>
        </div>

        {/* Game Content */}
        <div className="flex-1 p-4 pt-16">
          <div className="max-w-2xl mx-auto text-center">
            {!gameStarted ? (
              /* Game Introduction */
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/20">
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
                  🧠💕 Love Memory Match 💕🧠
                </h1>
                <p className="text-lg md:text-xl text-white/90 mb-6">
                  Test your memory and prove your love, Chinnamma!
                </p>
                
                <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 p-6 rounded-2xl border border-pink-300/30 mb-6">
                  <h3 className="text-xl font-semibold text-pink-300 mb-4">🎯 How to Play:</h3>
                  <div className="text-left text-white/80 space-y-2">
                    <p>• Find and match pairs of romantic symbols</p>
                    <p>• Each match reveals a special love message</p>
                    <p>• Complete all 8 pairs to unlock your surprise!</p>
                    <p>• Try to do it in as few moves as possible!</p>
                  </div>
                </div>

                <button 
                  onClick={() => setGameStarted(true)}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Start Memory Challenge 🧠💖
                </button>
              </div>
            ) : (
              /* Game Board */
              <div className="space-y-6">
                {/* Game Stats */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                  <div className="flex justify-between items-center mb-3">
                    <div className="text-white">
                      <span className="font-semibold">Matches: {matches}/8</span>
                    </div>
                    <div className="text-white">
                      <span className="font-semibold">Moves: {moves}</span>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-purple-800/30 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-pink-400 to-purple-400 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(matches / 8) * 100}%` }}
                    ></div>
                  </div>
                  
                  {/* Current Message */}
                  <p className="text-pink-200 text-sm md:text-base mt-3 font-semibold">
                    {progressMessages[currentMessage]}
                  </p>
                </div>

                {/* Memory Cards Grid */}
                <div className="grid grid-cols-4 gap-3 md:gap-4 max-w-lg mx-auto">
                  {cards.map((card) => (
                    <MemoryCard key={card.id} card={card} />
                  ))}
                </div>

                {/* Reset Button */}
                <div className="flex gap-4 justify-center">
                  <button 
                    onClick={() => {setGameStarted(false); initializeGame();}}
                    className="bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 text-white px-6 py-2 rounded-full transition-all"
                  >
                    Reset Game 🔄
                  </button>
                  <Link href="/game">
                    <button className="bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 text-white px-6 py-2 rounded-full transition-all">
                      Heart Game 💕
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Victory Message */}
        {gameWon && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-gradient-to-br from-yellow-400/40 to-orange-400/40 backdrop-blur-md rounded-3xl p-4 md:p-8 max-w-lg w-full text-center border-2 border-yellow-300/60 shadow-2xl my-4">
              <div className="text-6xl md:text-8xl mb-4 animate-bounce">🧠🏆</div>
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 animate-pulse">
                MEMORY MASTER! 🎉
              </h2>
              <p className="text-lg md:text-xl text-white/90 mb-6 font-semibold">
                {finalMessages[Math.floor(Math.random() * finalMessages.length)]}
              </p>
              
              <div className="bg-white/15 p-4 md:p-6 rounded-2xl mb-6 border border-white/20">
                <h3 className="text-xl md:text-2xl font-bold text-yellow-300 mb-4">📊 Your Love Stats 📊</h3>
                <div className="space-y-2 text-white">
                  <p className="text-lg"><strong>Matches Found:</strong> {matches}/8 💕</p>
                  <p className="text-lg"><strong>Total Moves:</strong> {moves} 🎯</p>
                  <p className="text-lg"><strong>Accuracy:</strong> {Math.round((matches * 2 / moves) * 100)}% 📈</p>
                </div>
                
                <div className="mt-4 p-4 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-xl">
                  <p className="text-pink-200 font-semibold">
                    &ldquo;Nikitha, your amazing memory matches how unforgettable you are to me! Every moment with you creates a beautiful memory I&apos;ll treasure forever. Just like this game, you make everything better! 💖&rdquo;
                  </p>
                  <p className="text-white/70 text-sm mt-2">- Sanketh 💕</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 p-3 md:p-4 rounded-2xl mb-6 border border-green-300/30">
                <p className="text-lg font-bold text-green-200 mb-2">📱 Share Your Victory! 📱</p>
                <p className="text-white text-xs md:text-sm leading-relaxed">
                  Take a screenshot of your amazing score and share this memory game victory with your loved one! 💕📸
                </p>
              </div>

              <div className="flex gap-2 md:gap-3">
                <button 
                  onClick={() => {setGameWon(false); setGameStarted(false);}}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-3 md:px-4 py-2 md:py-3 rounded-full transition-all text-xs md:text-sm font-semibold"
                >
                  Play Again 🔄
                </button>
                <Link href="/love" className="flex-1">
                  <button className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-3 md:px-4 py-2 md:py-3 rounded-full transition-all text-xs md:text-sm font-semibold">
                    Love Messages 💖
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