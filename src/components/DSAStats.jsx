import { useEffect, useState } from 'react';
import './DSAStats.css';

function AnimatedNumber({ value }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const target = Number(value);

    if (!Number.isFinite(target)) {
      setDisplayValue(value);
      return;
    }

    let startTime = null;
    const duration = 900;

    const animate = (currentTime) => {
      if (!startTime) {
        startTime = currentTime;
      }

      const progress = Math.min(
        (currentTime - startTime) / duration,
        1
      );

      // Smooth ease-out
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      const currentValue = Math.round(target * easedProgress);

      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(target);
      }
    };

    setDisplayValue(0);
    requestAnimationFrame(animate);
  }, [value]);

  return <>{displayValue}</>;
}

export default function DSAStats({
  totalSolved,
  easySolved,
  mediumSolved,
  hardSolved
}) {
  const stats = [
    {
      label: 'Total Solved',
      value: totalSolved
    },
    {
      label: 'Easy',
      value: easySolved,
      modifier: 'easy'
    },
    {
      label: 'Medium',
      value: mediumSolved,
      modifier: 'medium'
    },
    {
      label: 'Hard',
      value: hardSolved,
      modifier: 'hard'
    }
  ];

  return (
    <div className="dsa-stats">
      {stats.map((s) => (
        <div key={s.label} className="dsa-stats__card">
          <span className="dsa-stats__label">
            {s.label}
          </span>

          <span
            className={`dsa-stats__value ${
              s.modifier
                ? `dsa-stats__value--${s.modifier}`
                : ''
            }`}
          >
            <AnimatedNumber value={s.value} />
          </span>
        </div>
      ))}
    </div>
  );
}