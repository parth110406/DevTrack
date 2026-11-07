import { useEffect, useState } from 'react';
import './MetricCard.css';

function AnimatedNumber({ value }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const numericValue = Number(value);

    // If value is not a number, display it normally
    if (!Number.isFinite(numericValue)) {
      setDisplayValue(value);
      return;
    }

    let startTime = null;
    const duration = 900;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;

      const progress = Math.min(
        (currentTime - startTime) / duration,
        1
      );

      // Smooth ease-out effect
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      const currentValue = numericValue * easedProgress;

      // Keep decimal places if the original value has decimals
      const decimalPlaces = String(value).includes('.')
        ? String(value).split('.')[1].length
        : 0;

      setDisplayValue(currentValue.toFixed(decimalPlaces));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    setDisplayValue(0);
    requestAnimationFrame(animate);
  }, [value]);

  return <>{displayValue}</>;
}

export default function MetricCard({ label, value, subtext, trend }) {
  return (
    <div className="metric-card">
      <span className="metric-card__label">{label}</span>

      <span className="metric-card__value">
        <AnimatedNumber value={value} />
      </span>

      <span
        className={`metric-card__subtext ${
          trend === 'up' ? 'metric-card__subtext--up' : ''
        }`}
      >
        {trend === 'up' && '↑ '}
        {subtext}
      </span>
    </div>
  );
}