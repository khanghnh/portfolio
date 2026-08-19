import React, { useEffect, useRef, useCallback } from 'react';

interface Bug {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  legFrame: number;
  size: number;
  speed: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
  rotation: number;
}

interface FloatingText {
  id: number;
  x: number;
  y: number;
  text: string;
  opacity: number;
}

interface BugSmashGameProps {
  onScoreChange?: (inc: number) => void;
  isWon?: boolean;
  score?: number;
}

const MAX_BUGS_LIMIT = 26; // Safe performance limit for lag-free 60fps

export const BugSmashGame: React.FC<BugSmashGameProps> = ({
  onScoreChange,
  isWon = false,
  score = 0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bugsRef = useRef<Bug[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const floatingTextsRef = useRef<FloatingText[]>([]);
  const nextId = useRef<number>(1);
  const particleId = useRef<number>(1);
  const textId = useRef<number>(1);
  const legTick = useRef<number>(0);
  const animationFrameId = useRef<number>(0);
  const currentMaxBugs = useRef<number>(6);
  const hasTriggeredWinBurst = useRef<boolean>(false);

  // Spawn a single ant
  const spawnBug = useCallback(() => {
    if (isWon) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const width = canvas.width;
    const height = canvas.height;
    if (width === 0 || height === 0) return;

    if (bugsRef.current.length >= currentMaxBugs.current) return;

    // Pick side to enter
    const side = Math.floor(Math.random() * 4);
    let x = 0;
    let y = 0;
    if (side === 0) { x = Math.random() * width; y = 10; }
    else if (side === 1) { x = width - 10; y = Math.random() * height; }
    else if (side === 2) { x = Math.random() * width; y = height - 10; }
    else { x = 10; y = Math.random() * height; }

    // Speed slightly scales with score
    const speedBoost = Math.min(1.2, (score / 404) * 1.2);
    const speed = 1.3 + Math.random() * 1.5 + speedBoost;
    
    const targetX = width * 0.2 + Math.random() * width * 0.6;
    const targetY = height * 0.2 + Math.random() * height * 0.6;
    const dx = targetX - x;
    const dy = targetY - y;
    const dist = Math.hypot(dx, dy) || 1;
    const vx = (dx / dist) * speed;
    const vy = (dy / dist) * speed;
    const angle = (Math.atan2(vy, vx) * 180) / Math.PI + 90;

    const newBug: Bug = {
      id: nextId.current++,
      x,
      y,
      vx,
      vy,
      angle,
      legFrame: 0,
      size: 30 + Math.floor(Math.random() * 8),
      speed,
    };

    bugsRef.current.push(newBug);
  }, [isWon, score]);

  // Gradually increase bug spawn capacity over time and score up to MAX_BUGS_LIMIT
  useEffect(() => {
    if (isWon) return;

    // Time-based scaling: add 1 to capacity every 3.5 seconds
    const growthInterval = setInterval(() => {
      if (currentMaxBugs.current < MAX_BUGS_LIMIT) {
        currentMaxBugs.current = Math.min(MAX_BUGS_LIMIT, currentMaxBugs.current + 1);
      }
    }, 3500);

    // Regular spawn loop
    const spawnInterval = setInterval(() => {
      if (bugsRef.current.length < currentMaxBugs.current) {
        spawnBug();
      }
    }, 900);

    return () => {
      clearInterval(growthInterval);
      clearInterval(spawnInterval);
    };
  }, [isWon, spawnBug]);

  // Handle Win Celebratory Explosion Chain
  useEffect(() => {
    if (isWon && !hasTriggeredWinBurst.current) {
      hasTriggeredWinBurst.current = true;
      const canvas = canvasRef.current;
      if (!canvas) return;

      // Explode all remaining bugs
      const colors = ['#ff4500', '#ffd700', '#00ffcc', '#ffffff', '#ff1493', '#39ff14'];
      bugsRef.current.forEach((bug) => {
        for (let i = 0; i < 20; i++) {
          const angle = (Math.PI * 2 * i) / 20 + Math.random() * 0.5;
          const speed = 4.0 + Math.random() * 6.0;
          particlesRef.current.push({
            id: particleId.current++,
            x: bug.x,
            y: bug.y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size: Math.random() > 0.4 ? 7 : 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            opacity: 1,
            rotation: Math.random() * Math.PI * 2,
          });
        }
      });
      bugsRef.current = [];

      // Continuous victory fireworks
      const fireworkTimer = setInterval(() => {
        if (!canvasRef.current) return;
        const fx = Math.random() * canvasRef.current.width;
        const fy = Math.random() * canvasRef.current.height;
        for (let i = 0; i < 25; i++) {
          const angle = (Math.PI * 2 * i) / 25;
          const speed = 3.0 + Math.random() * 5.0;
          particlesRef.current.push({
            id: particleId.current++,
            x: fx,
            y: fy,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size: 6,
            color: colors[Math.floor(Math.random() * colors.length)],
            opacity: 1,
            rotation: Math.random() * Math.PI * 2,
          });
        }
      }, 700);

      return () => clearInterval(fireworkTimer);
    }
  }, [isWon]);

  // Handle canvas click to smash bug
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isWon) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Check hit against bugs (generous radius for satisfying clicks)
    let hitIndex = -1;
    for (let i = bugsRef.current.length - 1; i >= 0; i--) {
      const bug = bugsRef.current[i];
      const hitRadius = bug.size * 0.9;
      const dist = Math.hypot(bug.x - clickX, bug.y - clickY);
      if (dist <= hitRadius) {
        hitIndex = i;
        break;
      }
    }

    if (hitIndex !== -1) {
      const smashedBug = bugsRef.current[hitIndex];

      // Remove the smashed bug
      bugsRef.current.splice(hitIndex, 1);

      // Score increment
      onScoreChange?.(1);

      // Create 24 8-bit pixel explosion blocks
      const colors = ['#ff4500', '#ff8c00', '#ffd700', '#ffffff', '#e03000', '#ff5722'];
      for (let i = 0; i < 24; i++) {
        const angle = (Math.PI * 2 * i) / 24 + (Math.random() - 0.5) * 0.6;
        const speed = 3.0 + Math.random() * 5.0;
        particlesRef.current.push({
          id: particleId.current++,
          x: smashedBug.x,
          y: smashedBug.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() > 0.4 ? 6 : 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: 1,
          rotation: Math.random() * Math.PI * 2,
        });
      }

      // Add floating score text
      floatingTextsRef.current.push({
        id: textId.current++,
        x: smashedBug.x,
        y: smashedBug.y - 12,
        text: '+1 SMASHED!',
        opacity: 1,
      });

      // Respawn replacement bug after short delay
      setTimeout(spawnBug, 400);
    }
  };

  // Resize canvas to match its container precisely
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    // Initial spawn of 6 ants
    for (let i = 0; i < 6; i++) {
      setTimeout(spawnBug, i * 200);
    }

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [spawnBug]);

  // Main 60 FPS HTML5 Canvas Rendering Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      legTick.current += 1;
      const shouldTickLegs = legTick.current % 7 === 0;

      // ── 1. UPDATE & DRAW BUGS ──
      for (let i = 0; i < bugsRef.current.length; i++) {
        const bug = bugsRef.current[i];

        // Random steering jitter
        if (Math.random() < 0.035) {
          const wander = (Math.random() - 0.5) * 0.5;
          const cos = Math.cos(wander);
          const sin = Math.sin(wander);
          const nvx = bug.vx * cos - bug.vy * sin;
          const nvy = bug.vx * sin + bug.vy * cos;
          bug.vx = nvx;
          bug.vy = nvy;
          bug.angle = (Math.atan2(bug.vy, bug.vx) * 180) / Math.PI + 90;
        }

        bug.x += bug.vx;
        bug.y += bug.vy;

        // Bounce strictly within the canvas bounds (never touching Navbar / Footer)
        const pad = bug.size * 0.6;
        if (bug.x < pad) {
          bug.x = pad;
          bug.vx = Math.abs(bug.vx);
          bug.angle = (Math.atan2(bug.vy, bug.vx) * 180) / Math.PI + 90;
        }
        if (bug.x > width - pad) {
          bug.x = width - pad;
          bug.vx = -Math.abs(bug.vx);
          bug.angle = (Math.atan2(bug.vy, bug.vx) * 180) / Math.PI + 90;
        }
        if (bug.y < pad) {
          bug.y = pad;
          bug.vy = Math.abs(bug.vy);
          bug.angle = (Math.atan2(bug.vy, bug.vx) * 180) / Math.PI + 90;
        }
        if (bug.y > height - pad) {
          bug.y = height - pad;
          bug.vy = -Math.abs(bug.vy);
          bug.angle = (Math.atan2(bug.vy, bug.vx) * 180) / Math.PI + 90;
        }

        if (shouldTickLegs) {
          bug.legFrame = (bug.legFrame + 1) % 2;
        }

        // Draw 8-Bit Pixel Art Ant
        ctx.save();
        ctx.translate(bug.x, bug.y);
        ctx.rotate((bug.angle * Math.PI) / 180);
        const s = bug.size / 16;

        // Head
        ctx.fillStyle = '#ff4500';
        ctx.fillRect(-2.5 * s, -6 * s, 5 * s, 3 * s);

        // Eyes
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(-2 * s, -6 * s, 1.5 * s, 1.5 * s);
        ctx.fillRect(0.5 * s, -6 * s, 1.5 * s, 1.5 * s);

        // Antennae
        ctx.fillStyle = '#ff7f50';
        ctx.fillRect(-3 * s, -9 * s, 1.5 * s, 3 * s);
        ctx.fillRect(1.5 * s, -9 * s, 1.5 * s, 3 * s);

        // Thorax
        ctx.fillStyle = '#c03000';
        ctx.fillRect(-1.5 * s, -3 * s, 3 * s, 1.5 * s);
        ctx.fillStyle = '#ff4500';
        ctx.fillRect(-2.5 * s, -1.5 * s, 5 * s, 4 * s);

        // Abdomen
        ctx.fillStyle = '#c03000';
        ctx.fillRect(-1.5 * s, 2.5 * s, 3 * s, 1.5 * s);
        ctx.fillStyle = '#e03000';
        ctx.fillRect(-3.5 * s, 4 * s, 7 * s, 6 * s);
        ctx.fillStyle = '#ff5722';
        ctx.fillRect(-2 * s, 5 * s, 4 * s, 4 * s);

        // 8-bit Pixel Legs
        ctx.fillStyle = '#ff4500';
        if (bug.legFrame % 2 === 0) {
          // Left legs
          ctx.fillRect(-6 * s, -3 * s, 4 * s, 1.5 * s);
          ctx.fillRect(-7 * s, 0 * s, 5 * s, 1.5 * s);
          ctx.fillRect(-6 * s, 4 * s, 4 * s, 1.5 * s);
          // Right legs
          ctx.fillRect(2 * s, -3 * s, 4 * s, 1.5 * s);
          ctx.fillRect(2 * s, 0 * s, 5 * s, 1.5 * s);
          ctx.fillRect(2 * s, 4 * s, 4 * s, 1.5 * s);
        } else {
          // Frame 2
          ctx.fillRect(-7 * s, -4 * s, 5 * s, 1.5 * s);
          ctx.fillRect(-5 * s, 1 * s, 4 * s, 1.5 * s);
          ctx.fillRect(-7 * s, 5 * s, 5 * s, 1.5 * s);
          ctx.fillRect(2 * s, -4 * s, 5 * s, 1.5 * s);
          ctx.fillRect(1 * s, 1 * s, 4 * s, 1.5 * s);
          ctx.fillRect(2 * s, 5 * s, 5 * s, 1.5 * s);
        }

        ctx.restore();
      }

      // ── 2. UPDATE & DRAW PARTICLES ──
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy + 0.16; // gravity
        p.vx *= 0.94;
        p.vy *= 0.94;
        p.opacity -= 0.025;
        p.rotation += 0.15;

        if (p.opacity <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      }

      // ── 3. UPDATE & DRAW FLOATING TEXTS ──
      for (let i = floatingTextsRef.current.length - 1; i >= 0; i--) {
        const t = floatingTextsRef.current[i];
        t.y -= 1.3;
        t.opacity -= 0.024;

        if (t.opacity <= 0) {
          floatingTextsRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, t.opacity);
        ctx.font = 'bold 12px monospace';
        ctx.fillStyle = '#ff4500';
        ctx.shadowColor = '#000000';
        ctx.shadowBlur = 4;
        ctx.textAlign = 'center';
        ctx.fillText(t.text, t.x, t.y);
        ctx.restore();
      }

      animationFrameId.current = requestAnimationFrame(render);
    };

    animationFrameId.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      onClick={handleCanvasClick}
      className="absolute inset-0 w-full h-full cursor-crosshair z-10 select-none"
    />
  );
};
