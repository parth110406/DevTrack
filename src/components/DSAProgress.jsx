import { useEffect, useState } from 'react';
import { getDSAStats, DSA_UPDATED_EVENT } from '../utils/dsaStatusStorage';
import './DSAProgress.css';

const opacitySteps = [1, 0.7, 0.55, 0.45, 0.35, 0.28, 0.2];

export default function DSAProgress() {
  const [stats, setStats] = useState(() => getDSAStats());
  const [animationProgress, setAnimationProgress] = useState(0);

  // Keep DSA data updated
  useEffect(() => {
    const refresh = () => {
      setStats(getDSAStats());
    };

    window.addEventListener(DSA_UPDATED_EVENT, refresh);
    window.addEventListener('storage', refresh);

    return () => {
      window.removeEventListener(DSA_UPDATED_EVENT, refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  // Smooth animation whenever DSA values change
  useEffect(() => {
    let animationFrame;
    let startTime = null;

    const duration = 1400;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setAnimationProgress(1);
      return;
    }

    setAnimationProgress(0);

    const animate = (currentTime) => {
      if (startTime === null) {
        startTime = currentTime;
      }

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth ease-out
      const easedProgress =
        1 - Math.pow(1 - progress, 3);

      setAnimationProgress(easedProgress);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [
    stats.totalSolved,
    stats.totalProblems,
    stats.categories
  ]);

  const animatedTotalSolved = Math.round(
    stats.totalSolved * animationProgress
  );

  return (
    <section className="dsa-progress">

      {/* =========================
          HEADER
      ========================= */}
      <div className="section-header">
        <h2 className="section-title">
          DSA Progress
        </h2>

        <span className="section-meta">
          {animatedTotalSolved} / {stats.totalProblems} solved
        </span>
      </div>


      {/* =========================
          MAIN DSA PROGRESS BAR
      ========================= */}
      <div
        className="dsa-progress__bar"
        role="progressbar"
        aria-valuenow={stats.totalSolved}
        aria-valuemin="0"
        aria-valuemax={stats.totalProblems}
      >
        {stats.categories.map((cat, i) => {

          const targetWidth =
            stats.totalProblems > 0
              ? (cat.solved / stats.totalProblems) * 100
              : 0;

          return (
            <div
              key={cat.name}
              className="dsa-progress__segment"
              style={{
                width: `${targetWidth}%`,
                opacity: opacitySteps[i] ?? 0.2,
                transform: `scaleX(${animationProgress})`,
                transformOrigin: 'left center'
              }}
              title={`${cat.name}: ${cat.solved}`}
            />
          );
        })}
      </div>


      {/* =========================
          TOPIC PROGRESS LIST
      ========================= */}
      <div className="dsa-progress__list">

        {stats.categories.map((cat, i) => {

          const targetPct =
            cat.total > 0
              ? (cat.solved / cat.total) * 100
              : 0;

          const animatedSolved = Math.round(
            cat.solved * animationProgress
          );

          const animatedPct = Math.round(
            targetPct * animationProgress
          );

          return (
            <div
              key={cat.name}
              className="dsa-progress__row"
            >

              {/* Topic dot */}
              <span
                className="dsa-progress__dot"
                style={{
                  opacity: opacitySteps[i] ?? 0.2
                }}
              />


              {/* Topic name */}
              <span className="dsa-progress__name">
                {cat.name}
              </span>


              {/* Solved / Total */}
              <span className="dsa-progress__count">
                {animatedSolved}/{cat.total}
              </span>


              {/* =========================
                  TOPIC LINE
              ========================= */}
              <div className="dsa-progress__inline-track">

                <div
                  className="dsa-progress__inline-fill"
                  style={{
                    width: `${targetPct}%`,
                    transform: `scaleX(${animationProgress})`,
                    transformOrigin: 'left center',
                    opacity: animationProgress
                  }}
                />

              </div>


              {/* Percentage */}
              <span className="dsa-progress__pct">
                {animatedPct}%
              </span>

            </div>
          );
        })}

      </div>

    </section>
  );
}