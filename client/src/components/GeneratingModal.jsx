import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Constants ───────────────────────────────────────────────────────────────
const W = 700;
const H = 180;
const GROUND = H - 30;
const DINO_W = 40;
const DINO_H = 48;
const DINO_X = 80;
const GRAVITY = 0.6;
const JUMP_V = -13;
const BASE_SPEED = 5;

function randomBetween(a, b) {
  return Math.floor(Math.random() * (b - a + 1)) + a;
}

// ─── Canvas Dino Game ─────────────────────────────────────────────────────────
function DinoGame() {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    dino: { y: GROUND - DINO_H, vy: 0, onGround: true },
    obstacles: [],
    score: 0,
    speed: BASE_SPEED,
    frameCount: 0,
    nextObstacle: randomBetween(60, 130),
    gameOver: false,
    started: false,
    legPhase: 0,
  });
  const rafRef = useRef(null);
  const [displayScore, setDisplayScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);

  const jump = useCallback(() => {
    const s = stateRef.current;
    if (s.gameOver) {
      // restart
      stateRef.current = {
        dino: { y: GROUND - DINO_H, vy: 0, onGround: true },
        obstacles: [],
        score: 0,
        speed: BASE_SPEED,
        frameCount: 0,
        nextObstacle: randomBetween(60, 130),
        gameOver: false,
        started: true,
        legPhase: 0,
      };
      setGameOver(false);
      setDisplayScore(0);
      setStarted(true);
      return;
    }
    if (!s.started) {
      s.started = true;
      setStarted(true);
    }
    if (s.dino.onGround) {
      s.dino.vy = JUMP_V;
      s.dino.onGround = false;
    }
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        jump();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [jump]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    function drawDino(ctx, s) {
      const { y, onGround } = s.dino;
      const x = DINO_X;
      ctx.save();

      // Body
      ctx.fillStyle = '#eb5e28';
      ctx.beginPath();
      ctx.roundRect(x, y, DINO_W, DINO_H - 10, 8);
      ctx.fill();

      // Head bump
      ctx.fillStyle = '#d4521e';
      ctx.beginPath();
      ctx.roundRect(x + 10, y - 12, 22, 16, 6);
      ctx.fill();

      // Eye
      ctx.fillStyle = '#fffcf2';
      ctx.beginPath();
      ctx.arc(x + 25, y - 6, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#1C1917';
      ctx.beginPath();
      ctx.arc(x + 26, y - 6, 2, 0, Math.PI * 2);
      ctx.fill();

      // Legs (animate when on ground)
      ctx.fillStyle = '#d4521e';
      const legCycle = Math.floor(s.legPhase / 8) % 2;
      if (onGround) {
        // Left leg
        ctx.fillRect(x + 8, y + DINO_H - 10, 8, legCycle === 0 ? 14 : 10);
        // Right leg
        ctx.fillRect(x + 22, y + DINO_H - 10, 8, legCycle === 0 ? 10 : 14);
      } else {
        ctx.fillRect(x + 8, y + DINO_H - 10, 8, 12);
        ctx.fillRect(x + 22, y + DINO_H - 10, 8, 12);
      }

      // Tiny arm
      ctx.fillStyle = '#eb5e28';
      ctx.fillRect(x + DINO_W, y + 10, 10, 6);

      ctx.restore();
    }

    function drawObstacle(ctx, ob) {
      ctx.save();
      ctx.fillStyle = '#1C1917';
      // Main cactus body
      ctx.beginPath();
      ctx.roundRect(ob.x + ob.w / 2 - 6, ob.y, 12, ob.h, 4);
      ctx.fill();
      // Left arm
      ctx.beginPath();
      ctx.roundRect(ob.x, ob.y + ob.h * 0.25, ob.w / 2 - 2, 8, 3);
      ctx.fill();
      ctx.beginPath();
      ctx.roundRect(ob.x, ob.y + ob.h * 0.05, 8, ob.h * 0.25 + 4, 3);
      ctx.fill();
      // Right arm
      ctx.beginPath();
      ctx.roundRect(ob.x + ob.w / 2 + 8, ob.y + ob.h * 0.35, ob.w / 2 - 10, 8, 3);
      ctx.fill();
      ctx.beginPath();
      ctx.roundRect(ob.x + ob.w - 8, ob.y + ob.h * 0.1, 8, ob.h * 0.3 + 4, 3);
      ctx.fill();
      ctx.restore();
    }

    function drawGround(ctx, frameCount) {
      ctx.save();
      ctx.strokeStyle = '#ccc5b9';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, GROUND + DINO_H + 2);
      ctx.lineTo(W, GROUND + DINO_H + 2);
      ctx.stroke();

      // Ground dots
      ctx.fillStyle = '#ccc5b9';
      for (let i = 0; i < 10; i++) {
        const x = ((i * 80 - (frameCount * 2 % 80)) + 800) % (W + 40);
        ctx.fillRect(x, GROUND + DINO_H + 6, randomBetween(4, 20), 2);
      }
      ctx.restore();
    }

    function drawScore(ctx, score) {
      ctx.save();
      ctx.fillStyle = '#eb5e28';
      ctx.font = 'bold 18px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(`${String(Math.floor(score)).padStart(5, '0')}`, W - 16, 30);
      ctx.restore();
    }

    function drawStartHint(ctx) {
      ctx.save();
      ctx.fillStyle = '#403d39';
      ctx.font = '600 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Press SPACE or TAP to start & jump', W / 2, H / 2);
      ctx.restore();
    }

    function drawGameOver(ctx, score) {
      ctx.save();
      ctx.fillStyle = 'rgba(255, 252, 242, 0.85)';
      ctx.fillRect(W / 2 - 130, H / 2 - 44, 260, 80);
      ctx.strokeStyle = '#eb5e28';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(W / 2 - 130, H / 2 - 44, 260, 80, 12);
      ctx.stroke();

      ctx.fillStyle = '#1C1917';
      ctx.font = 'bold 18px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('GAME OVER', W / 2, H / 2 - 14);

      ctx.fillStyle = '#eb5e28';
      ctx.font = '600 13px sans-serif';
      ctx.fillText(`Score: ${Math.floor(score)}  — Press SPACE to restart`, W / 2, H / 2 + 12);
      ctx.restore();
    }

    function tick() {
      const s = stateRef.current;
      const { dino } = s;

      ctx.clearRect(0, 0, W, H);

      // Background
      ctx.fillStyle = '#fffcf2';
      ctx.fillRect(0, 0, W, H);

      if (!s.started) {
        drawGround(ctx, 0);
        drawDino(ctx, s);
        drawStartHint(ctx);
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      if (!s.gameOver) {
        // Physics
        dino.vy += GRAVITY;
        dino.y += dino.vy;
        if (dino.y >= GROUND - DINO_H) {
          dino.y = GROUND - DINO_H;
          dino.vy = 0;
          dino.onGround = true;
        }

        s.legPhase++;
        s.frameCount++;
        s.score += 0.12;
        s.speed = BASE_SPEED + s.score * 0.004;

        // Spawn obstacles
        s.nextObstacle--;
        if (s.nextObstacle <= 0) {
          const h = randomBetween(28, 52);
          s.obstacles.push({ x: W + 10, y: GROUND - h + DINO_H, w: randomBetween(26, 36), h });
          s.nextObstacle = randomBetween(55, 120);
        }

        // Move obstacles
        s.obstacles = s.obstacles
          .map(ob => ({ ...ob, x: ob.x - s.speed }))
          .filter(ob => ob.x + ob.w > -10);

        // Collision detection (shrunk hitbox)
        const pad = 10;
        const dinoBox = {
          x1: DINO_X + pad, y1: dino.y + pad,
          x2: DINO_X + DINO_W - pad, y2: dino.y + DINO_H + 8,
        };
        for (const ob of s.obstacles) {
          if (
            dinoBox.x2 > ob.x + 4 &&
            dinoBox.x1 < ob.x + ob.w - 4 &&
            dinoBox.y2 > ob.y + 4 &&
            dinoBox.y1 < ob.y + ob.h
          ) {
            s.gameOver = true;
            setGameOver(true);
            setDisplayScore(Math.floor(s.score));
            break;
          }
        }

        setDisplayScore(Math.floor(s.score));
      }

      // Draw
      drawGround(ctx, s.frameCount);
      s.obstacles.forEach(ob => drawObstacle(ctx, ob));
      drawDino(ctx, s);
      drawScore(ctx, s.score);
      if (s.gameOver) drawGameOver(ctx, s.score);

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="relative select-none" onClick={jump}>
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        className="w-full rounded-2xl cursor-pointer"
        style={{ maxWidth: W, display: 'block', margin: '0 auto' }}
      />
      {!started && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" />
      )}
    </div>
  );
}

// ─── Loading Modal ────────────────────────────────────────────────────────────
const TIPS = [
  "Tip: Describe the setting vividly for a more immersive scenario.",
  "Did you know? Short sentences feel more natural in conversation.",
  "Tip: Don't be afraid to make mistakes — that's how you learn!",
  "Did you know? Your AI conversation partner adapts to your level.",
  "Tip: Try to respond without overthinking — just speak naturally.",
  "Fun fact: The brain learns language best through real-world context.",
];

export default function GeneratingModal({ isOpen }) {
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setTipIndex(i => (i + 1) % TIPS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(28, 25, 23, 0.65)', backdropFilter: 'blur(8px)' }}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: 'spring', stiffness: 280, damping: 24 }}
            className="w-full max-w-2xl rounded-3xl overflow-hidden"
            style={{
              background: '#fffcf2',
              border: '1px solid rgba(204,197,185,0.5)',
              boxShadow: '0 32px 64px rgba(28,25,23,0.25)',
            }}
          >
            {/* Header */}
            <div
              className="px-8 pt-8 pb-6"
              style={{ borderBottom: '1px solid rgba(204,197,185,0.3)' }}
            >
              <div className="flex items-center gap-3 mb-3">
                {/* Animated dots */}
                <div className="flex gap-1.5">
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      className="w-2.5 h-2.5 rounded-full bg-[#eb5e28]"
                      animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-[#eb5e28] uppercase tracking-widest">
                  Building your scenario
                </span>
              </div>
              <h2 className="text-2xl font-black text-[#1C1917] leading-tight">
                Your AI environment is being crafted…
              </h2>
              <p className="text-sm text-gray-400 mt-1 font-normal">
                Play the dino game while you wait! Press <kbd className="bg-gray-100 text-gray-600 text-[11px] px-1.5 py-0.5 rounded font-mono">SPACE</kbd> or tap to jump.
              </p>
            </div>

            {/* Dino Game */}
            <div className="px-6 py-5" style={{ background: '#f5f0e8' }}>
              <DinoGame />
            </div>

            {/* Rotating tip */}
            <div className="px-8 py-5" style={{ borderTop: '1px solid rgba(204,197,185,0.3)' }}>
              <AnimatePresence mode="wait">
                <motion.p
                  key={tipIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="text-sm text-gray-500 text-center font-medium"
                >
                  💡 {TIPS[tipIndex]}
                </motion.p>
              </AnimatePresence>

              {/* Progress bar */}
              <div className="mt-4 h-1 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#eb5e28] to-[#f4a261] rounded-full"
                  initial={{ width: '5%' }}
                  animate={{ width: '92%' }}
                  transition={{ duration: 12, ease: 'easeOut' }}
                />
              </div>
              <p className="text-[11px] text-gray-400 text-center mt-2 font-medium">
                Generating immersive conversation context…
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
