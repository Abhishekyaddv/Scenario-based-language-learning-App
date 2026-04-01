export const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@400;500;600&display=swap');

  .ob-root {
    min-height: 100vh;
    background: radial-gradient(ellipse at 0% 0%, #f7d9c4 0%, #fdf3ee 40%, #fdf6f2 100%);
    font-family: 'DM Sans', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 1rem 4rem;
    position: relative;
    overflow-x: hidden;
  }

  /* ── Progress bar ── */
  .ob-progress-wrap {
    width: 100%;
    max-width: 640px;
    padding: 2rem 0 0;
    margin-bottom: 2.5rem;
  }
  .ob-progress-meta {
    display: flex;
    justify-content: space-between;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #9e7060;
    margin-bottom: 0.55rem;
  }
  .ob-progress-track {
    width: 100%;
    height: 5px;
    background: #e8cfc5;
    border-radius: 99px;
    overflow: hidden;
  }
  .ob-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #c0442a, #e07050);
    border-radius: 99px;
    transition: width 0.5s cubic-bezier(.4,0,.2,1);
  }

  /* ── Page heading ── */
  .ob-heading {
    text-align: center;
    margin-bottom: 2.5rem;
  }
  .ob-heading h2 {
    font-family: 'Lora', serif;
    font-size: clamp(2rem, 5vw, 2.8rem);
    font-weight: 700;
    color: #1a1a1a;
    line-height: 1.15;
    margin: 0 0 0.5rem;
  }
  .ob-heading h2 em {
    font-style: italic;
    color: #c0442a;
  }
  .ob-heading p {
    font-size: 0.95rem;
    color: #7a5a50;
    margin: 0;
    max-width: 440px;
    line-height: 1.6;
  }

  /* ── Continue button ── */
  .ob-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 2.4rem;
    border-radius: 999px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    cursor: pointer;
    border: none;
    transition: all 0.25s ease;
  }
  .ob-btn-primary {
    background: #1a3f52;
    color: #fff;
    box-shadow: 0 6px 20px rgba(26,63,82,0.3);
  }
  .ob-btn-primary:hover {
    background: #15303f;
    transform: translateY(-1px);
    box-shadow: 0 10px 28px rgba(26,63,82,0.35);
  }
  .ob-btn-primary:active { transform: translateY(0); }
  .ob-btn-disabled {
    background: #e8cfc5;
    color: #b89088;
    cursor: not-allowed;
    box-shadow: none;
  }

  /* ─────────────────────────────────────────────
     STEP 0 — Language list
  ───────────────────────────────────────────── */
  .ob-lang-list {
    width: 100%;
    max-width: 540px;
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    max-height: 420px;
    overflow-y: auto;
    padding-right: 4px;
  }
  .ob-lang-list::-webkit-scrollbar { width: 4px; }
  .ob-lang-list::-webkit-scrollbar-track { background: transparent; }
  .ob-lang-list::-webkit-scrollbar-thumb { background: #dbb9ae; border-radius: 99px; }

  .ob-lang-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.85rem 1.1rem;
    background: #fff;
    border: 2px solid #f0ddd8;
    border-radius: 16px;
    cursor: pointer;
    transition: all 0.22s ease;
    user-select: none;
  }
  .ob-lang-item:hover {
    border-color: #c0442a;
    box-shadow: 0 4px 14px rgba(192,68,42,0.1);
    transform: translateX(3px);
  }
  .ob-lang-item.active {
    background: #2b7db8;
    border-color: #2b7db8;
    box-shadow: 0 6px 20px rgba(43,125,184,0.3);
  }
  .ob-lang-flag {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: #f5ede9;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.6rem;
    flex-shrink: 0;
    transition: background 0.2s;
  }
  .ob-lang-item.active .ob-lang-flag { background: rgba(255,255,255,0.2); }
  .ob-lang-name {
    font-size: 1rem;
    font-weight: 600;
    color: #1a1a1a;
    flex: 1;
    transition: color 0.2s;
  }
  .ob-lang-item.active .ob-lang-name { color: #fff; }
  .ob-lang-check {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: 2px solid #e0c8c2;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    flex-shrink: 0;
  }
  .ob-lang-item.active .ob-lang-check {
    background: #fff;
    border-color: #fff;
  }
  .ob-lang-check svg { display: none; }
  .ob-lang-item.active .ob-lang-check svg { display: block; }

  .ob-lang-hint {
    margin-top: 1.2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.7rem 1.1rem;
    background: rgba(192,68,42,0.07);
    border-radius: 12px;
    font-size: 0.8rem;
    color: #9e7060;
    max-width: 540px;
  }

  /* ─────────────────────────────────────────────
     STEP 1 — Level cards
  ───────────────────────────────────────────── */
  .ob-level-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.2rem;
    width: 100%;
    max-width: 860px;
  }
  @media (max-width: 640px) {
    .ob-level-grid { grid-template-columns: 1fr; }
  }

  .ob-level-card {
    position: relative;
    background: #fff;
    border: 2px solid #f0ddd8;
    border-radius: 22px;
    padding: 1.8rem 1.5rem 1.5rem;
    cursor: pointer;
    transition: all 0.25s ease;
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
    outline: none;
    user-select: none;
  }
  .ob-level-card:hover {
    border-color: #c0442a;
    box-shadow: 0 8px 28px rgba(192,68,42,0.12);
    transform: translateY(-3px);
  }
  .ob-level-card.active {
    border-color: #c0442a;
    background: #f0f7fc;
    box-shadow: 0 10px 32px rgba(192,68,42,0.18);
  }
  .ob-level-icon-wrap {
    width: 52px;
    height: 52px;
    border-radius: 14px;
    background: #f5ede9;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;
  }
  .ob-level-card.active .ob-level-icon-wrap { background: #f5ede9; }
  .ob-level-icon-wrap svg, .ob-level-icon-wrap span { color: #c0442a; font-size: 1.4rem; }
  .ob-level-title {
    font-family: 'Lora', serif;
    font-size: 1.25rem;
    font-weight: 700;
    color: #1a1a1a;
  }
  .ob-level-desc {
    font-size: 0.85rem;
    color: #7a5a50;
    line-height: 1.6;
    flex: 1;
  }
  .ob-level-num {
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #c0442a;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .ob-level-radio {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid #dbb9ae;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
  }
  .ob-level-card.active .ob-level-radio {
    border-color: #c0442a;
    background: #c0442a;
  }
  .ob-level-card.active .ob-level-radio::after {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #fff;
  }
  .ob-check-badge {
    position: absolute;
    top: -10px;
    right: -10px;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: #c0442a;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(192,68,42,0.4);
  }
  .ob-check-badge svg { color: #fff; width: 14px; height: 14px; }

  /* ─────────────────────────────────────────────
     STEP 2 — Goal cards (desktop: row, mobile: list)
  ───────────────────────────────────────────── */
  .ob-goal-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.2rem;
    width: 100%;
    max-width: 960px;
  }
  @media (max-width: 768px) {
    .ob-goal-grid {
      grid-template-columns: 1fr;
      max-width: 540px;
    }
    .ob-goal-card {
      flex-direction: row !important;
      align-items: center !important;
      text-align: left !important;
      padding: 1rem 1.2rem !important;
    }
    .ob-goal-card .ob-goal-icon-wrap { margin-bottom: 0 !important; flex-shrink: 0; }
    .ob-goal-card-body { flex: 1; }
  }

  .ob-goal-card {
    position: relative;
    background: #fff;
    border: 2px solid #f0ddd8;
    border-radius: 22px;
    padding: 1.8rem 1.4rem;
    cursor: pointer;
    transition: all 0.25s ease;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
    outline: none;
    user-select: none;
  }
  .ob-goal-card:hover {
    border-color: #c0442a;
    box-shadow: 0 8px 28px rgba(192,68,42,0.12);
    transform: translateY(-3px);
  }
  .ob-goal-card.active {
    background: #c0442a;
    border-color: #c0442a;
    box-shadow: 0 12px 36px rgba(192,68,42,0.35);
  }
  .ob-goal-icon-wrap {
    width: 58px;
    height: 58px;
    border-radius: 16px;
    background: #f5ede9;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.2rem;
    transition: background 0.2s;
  }
  .ob-goal-card.active .ob-goal-icon-wrap { background: rgba(255,255,255,0.22); }
  .ob-goal-icon-wrap svg { color: #c0442a; transition: color 0.2s; }
  .ob-goal-card.active .ob-goal-icon-wrap svg { color: #fff; }
  .ob-goal-title {
    font-family: 'Lora', serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: #1a1a1a;
    transition: color 0.2s;
  }
  .ob-goal-card.active .ob-goal-title { color: #fff; }
  .ob-goal-desc {
    font-size: 0.8rem;
    color: #7a5a50;
    line-height: 1.55;
    transition: color 0.2s;
  }
  .ob-goal-card.active .ob-goal-desc { color: rgba(255,255,255,0.82); }

  /* ─────────────────────────────────────────────
     STEP 3 — Interests
  ───────────────────────────────────────────── */
  .ob-interests-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.8rem;
    width: 100%;
    max-width: 640px;
    margin-bottom: 2.5rem;
  }
  @media (max-width: 520px) {
    .ob-interests-grid { grid-template-columns: repeat(2, 1fr); }
  }

  .ob-interest-btn {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    padding: 0.75rem 1rem;
    border-radius: 14px;
    border: 2px solid #f0ddd8;
    background: #fff;
    cursor: pointer;
    transition: all 0.22s ease;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.82rem;
    font-weight: 600;
    color: #4a3530;
    user-select: none;
    outline: none;
    position: relative;
  }
  .ob-interest-btn:hover {
    border-color: #c0442a;
    box-shadow: 0 4px 12px rgba(192,68,42,0.1);
    transform: translateY(-2px);
  }
  .ob-interest-btn.active {
    background: #ed8c72;
    border-color: #1a1a1a;
    color: #fff;
    box-shadow: 0 6px 18px rgba(26,122,176,0.3);
  }
  .ob-interest-emoji { font-size: 1.2rem; flex-shrink: 0; }

  /* ─── Divider ── */
  .ob-divider {
    width: 100%;
    max-width: 640px;
    border: none;
    border-top: 1px solid #e8cfc5;
    margin-bottom: 2rem;
  }
`;
