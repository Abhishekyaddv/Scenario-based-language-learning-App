import { useState, useEffect, useRef } from "react";

const STEPS = [
  { label: "Analyzing Interests",   tags: ["Cognitive Mapping"] },
  { label: "Indexing Resources",    tags: ["Cognitive Mapping", "Resource Indexing"] },
  { label: "Syncing Your Persona",  tags: ["Cognitive Mapping", "Resource Indexing", "Persona Sync"] },
  { label: "Building Your Path",    tags: ["Cognitive Mapping", "Resource Indexing", "Persona Sync", "Curriculum Ready"] },
];

const TOTAL_DURATION = 8500; // ms

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

  .lingo-loader * { box-sizing: border-box; margin: 0; padding: 0; }

  .lingo-loader {
    position: fixed; inset: 0; z-index: 9999;
    background: #FDF3ED;
    display: flex; align-items: center; justify-content: center;
    flex-direction: column;
    font-family: 'DM Sans', sans-serif;
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .lingo-loader.exiting {
    opacity: 0;
    transform: scale(1.03);
    pointer-events: none;
  }

  /* Radial soft bg */
  .lingo-loader::before {
    content: '';
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 60% 55% at 50% 40%, rgba(205,100,60,0.08) 0%, transparent 70%),
      radial-gradient(ellipse 40% 30% at 30% 70%, rgba(230,160,100,0.05) 0%, transparent 60%);
    pointer-events: none;
  }

  /* ── Icon ── */
  .loader-icon-wrap {
    position: relative;
    width: 140px; height: 140px;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 36px;
  }

  /* outer soft halo (3 rings) */
  .loader-halo {
    position: absolute; inset: 0; border-radius: 50%;
    animation: halo-breathe 2.8s ease-in-out infinite;
  }
  .loader-halo-1 { background: rgba(200, 90, 50, 0.10); inset: -16px; border-radius: 50%; }
  .loader-halo-2 { background: rgba(200, 90, 50, 0.07); inset: -30px; border-radius: 50%; animation-delay: 0.4s; }
  .loader-halo-3 { background: rgba(200, 90, 50, 0.04); inset: -46px; border-radius: 50%; animation-delay: 0.8s; }

  .loader-circle {
    width: 100px; height: 100px; border-radius: 50%;
    background: linear-gradient(145deg, #C85A2A, #A83E18);
    display: flex; align-items: center; justify-content: center;
    position: relative; z-index: 2;
    box-shadow:
      0 8px 32px rgba(180,70,30,0.35),
      0 2px 8px rgba(180,70,30,0.2),
      inset 0 1px 0 rgba(255,255,255,0.15);
    animation: icon-bob 3s ease-in-out infinite;
  }

  /* sparkle stars inside circle */
  .sparkle-svg { width: 44px; height: 44px; }
  .star-center { animation: star-pop 1.6s ease-in-out infinite; }
  .star-tl     { animation: star-pop 1.6s ease-in-out infinite 0.3s; }
  .star-br     { animation: star-pop 1.6s ease-in-out infinite 0.6s; }

  /* ── Text ── */
  .loader-heading {
    font-family: 'Fraunces', serif;
    font-size: clamp(22px, 4vw, 30px);
    font-weight: 800;
    color: #2A1810;
    text-align: center;
    max-width: 360px;
    line-height: 1.25;
    margin-bottom: 14px;
    letter-spacing: -0.02em;
    animation: fade-up 0.5s ease both;
  }
  .loader-sub {
    font-size: 15px;
    color: #9A7060;
    text-align: center;
    max-width: 300px;
    line-height: 1.6;
    font-weight: 300;
    margin-bottom: 48px;
  }

  /* ── Progress ── */
  .progress-wrap {
    width: min(340px, 88vw);
  }
  .progress-meta {
    display: flex; justify-content: space-between; align-items: center;
    margin-bottom: 10px;
  }
  .progress-label {
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #B08070;
    font-weight: 500;
    transition: opacity 0.4s ease;
  }
  .progress-pct {
    font-size: 13px;
    font-weight: 600;
    color: #C85A2A;
    font-variant-numeric: tabular-nums;
  }
  .progress-track {
    width: 100%; height: 6px;
    background: rgba(200,100,60,0.15);
    border-radius: 100px;
    overflow: hidden;
  }
  .progress-fill {
    height: 100%;
    border-radius: 100px;
    background: linear-gradient(90deg, #C85A2A, #E07840);
    transition: width 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
  }
  .progress-fill::after {
    content: '';
    position: absolute; right: 0; top: 50%;
    transform: translateY(-50%);
    width: 10px; height: 10px;
    border-radius: 50%;
    background: #E07840;
    box-shadow: 0 0 10px rgba(224,120,64,0.8);
  }

  /* ── Tags ── */
  .tags-row {
    display: flex; flex-wrap: wrap; gap: 8px;
    justify-content: center;
    margin-top: 28px;
    min-height: 40px;
  }
  .tag {
    padding: 6px 16px;
    border-radius: 100px;
    background: rgba(205,100,60,0.1);
    border: 1px solid rgba(205,100,60,0.2);
    color: #A84020;
    font-size: 12px;
    font-weight: 500;
    transition: all 0.35s ease;
  }
  .tag.entering {
    animation: tag-pop 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  }

  /* ── Keyframes ── */
  @keyframes halo-breathe {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.06); opacity: 0.7; }
  }
  @keyframes icon-bob {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
  }
  @keyframes star-pop {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(0.75); }
  }
  @keyframes fade-up {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes tag-pop {
    from { opacity: 0; transform: scale(0.7) translateY(6px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }
`;

function SparkleIcon() {
  return (
    <svg className="sparkle-svg" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Large center star */}
      <path className="star-center" d="M22 8 L24.5 19.5 L36 22 L24.5 24.5 L22 36 L19.5 24.5 L8 22 L19.5 19.5 Z"
        fill="white" />
      {/* Small top-left star */}
      <path className="star-tl" d="M12 10 L13 14 L17 15 L13 16 L12 20 L11 16 L7 15 L11 14 Z"
        fill="white" opacity="0.85" />
      {/* Tiny bottom-right dot */}
      <circle className="star-br" cx="32" cy="31" r="2.5" fill="white" opacity="0.7" />
    </svg>
  );
}

export default function LingoAILoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [stepIdx, setStepIdx]   = useState(0);
  const [tags, setTags]         = useState([]);
  const [exiting, setExiting]   = useState(false);
  const [newTag, setNewTag]     = useState(null);
  const startRef = useRef(Date.now());
  const rafRef   = useRef(null);

  // smooth progress animation
  useEffect(() => {
    const tick = () => {
      const elapsed = Date.now() - startRef.current;
      const raw = Math.min(elapsed / TOTAL_DURATION, 1);
      // ease-out cubic for natural deceleration near 100%
      const eased = 1 - Math.pow(1 - raw, 2.5);
      const pct = Math.round(eased * 100);
      setProgress(pct);

      // advance steps at 25% / 50% / 75% / 95%
      const thresholds = [0, 25, 50, 75, 95];
      const idx = thresholds.filter(t => pct >= t).length - 1;
      setStepIdx(prev => {
        if (idx > prev) {
          const nextTag = STEPS[idx]?.tags?.at(-1);
          if (nextTag) {
            setNewTag(nextTag);
            setTags(STEPS[idx].tags.slice(0, -1));
            setTimeout(() => setTags(STEPS[idx].tags), 50);
          }
          return idx;
        }
        return prev;
      });

      if (raw < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setProgress(100);
        setTimeout(() => {
          setExiting(true);
          setTimeout(() => onComplete?.(), 700);
        }, 400);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [onComplete]);

  const currentStep = STEPS[Math.min(stepIdx, STEPS.length - 1)];

  return (
    <>
      <style>{css}</style>
      <div className={`lingo-loader${exiting ? " exiting" : ""}`}>
        {/* Icon */}
        <div className="loader-icon-wrap">
          <div className="loader-halo loader-halo-3" />
          <div className="loader-halo loader-halo-2" />
          <div className="loader-halo loader-halo-1" />
          <div className="loader-circle">
            <SparkleIcon />
          </div>
        </div>

        {/* Heading */}
        <h1 className="loader-heading" key={stepIdx}>
          {stepIdx === 0 && "Curating your personalized coursework…"}
          {stepIdx === 1 && "Indexing the best resources for you…"}
          {stepIdx === 2 && "Syncing your learning persona…"}
          {stepIdx === 3 && "Your path is almost ready…"}
        </h1>
        <p className="loader-sub">
          Our AI is tailoring lessons to your interests and goals.
        </p>

        {/* Progress bar */}
        <div className="progress-wrap">
          <div className="progress-meta">
            <span className="progress-label">{currentStep.label}</span>
            <span className="progress-pct">{progress}%</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Tags */}
        <div className="tags-row">
          {tags.map((tag, i) => (
            <span
              key={tag}
              className={`tag${tag === newTag ? " entering" : ""}`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
