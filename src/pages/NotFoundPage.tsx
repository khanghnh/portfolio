import { useState } from 'react';
import { Navbar, Footer, Button, BugSmashGame } from '../components';

const WINNING_SCORE = 404;

export default function NotFoundPage() {
  const [score, setScore] = useState<number>(0);
  const [isBouncing, setIsBouncing] = useState<boolean>(false);

  const isWon = score >= WINNING_SCORE;

  const handleBugSmashed = (inc: number) => {
    if (isWon) return;
    setScore((prev) => {
      const next = prev + inc;
      return next > WINNING_SCORE ? WINNING_SCORE : next;
    });
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 180);
  };

  const handleResetGame = () => {
    setScore(0);
  };

  // Format counter to 3 digits (e.g. 001, 002, 042, 404)
  const formattedScore = score < 10 ? `00${score}` : score < 100 ? `0${score}` : `${score}`;

  return (
    <div className="min-h-screen bg-bg-main text-txt-primary flex flex-col selection:bg-brand-primary selection:text-white relative overflow-hidden">
      {/* ── HEADER NAVIGATION (UNTOUCHED BY BUGS) ── */}
      <div className="relative z-30 bg-bg-main">
        <Navbar />
      </div>

      {/* ── MAIN AREA (CONFINED 8-BIT BUG SMASHING CANVAS) ── */}
      <main className="flex-1 relative overflow-hidden flex flex-col items-center justify-center text-center px-4 sm:px-6 py-12 sm:py-16 gap-6 sm:gap-8">
        
        {/* 8-Bit Bug Canvas with progressive spawning & victory fireworks */}
        <BugSmashGame
          onScoreChange={handleBugSmashed}
          isWon={isWon}
          score={score}
        />

        {/* 404 Context UI Layer */}
        <div className="flex flex-col items-center gap-2 max-w-md relative z-20 pointer-events-none select-none">
          
          {/* Constant 404 Route Tag or Victory Tag */}
          <span className="font-mono text-xs text-brand-primary font-bold tracking-widest uppercase">
            {isWon ? 'SYSTEM RESTORED // ALL BUGS ELIMINATED' : 'ERROR 404 // ROUTE NOT FOUND'}
          </span>

          {/* Monumental 404 Number (Turns into Active Bug Counter & Victory Display) */}
          <div className="flex items-center justify-center py-1">
            <h1
              className={`font-['Anton'] text-8xl sm:text-9xl md:text-[160px] lg:text-[190px] uppercase leading-none tracking-tight transition-all duration-200 ${
                isWon
                  ? 'text-brand-primary drop-shadow-[0_0_60px_rgba(255,69,0,0.85)] scale-105 animate-pulse'
                  : score > 0
                  ? 'text-brand-primary drop-shadow-[0_0_40px_rgba(255,69,0,0.45)]'
                  : 'text-txt-primary'
              } ${isBouncing ? 'scale-110 -rotate-1' : 'scale-100 rotate-0'}`}
            >
              {isWon ? '404' : score > 0 ? formattedScore : '404'}
            </h1>
          </div>

          {/* 404 Description / Victory Message */}
          <p className="font-['Space_Grotesk'] text-base sm:text-lg text-txt-secondary leading-relaxed">
            {isWon
              ? 'System fully debugged! You eliminated all 404 bugs and saved the architecture.'
              : 'The coordinate or archive route you requested does not exist or has been relocated.'}
          </p>

        </div>

        {/* ── ACTION BUTTONS ── */}
        <div className="relative z-20 pointer-events-auto pt-2 flex flex-wrap items-center justify-center gap-3">
          <Button to="/" variant="primary" size="md">
            ← Return to Headquarters
          </Button>

          {isWon && (
            <Button onClick={handleResetGame} variant="outline" size="md">
              Play Again ↺
            </Button>
          )}
        </div>

      </main>

      {/* ── FOOTER (UNTOUCHED BY BUGS) ── */}
      <div className="relative z-30 bg-bg-surface">
        <Footer />
      </div>
    </div>
  );
}
