import React from 'react';

export function AnimatedGradientText({
  children,
  speed = 2,
  colorFrom = '#1d4ed8', // Royal Blue
  colorTo = '#93c5fd',   // Soft Light Blue/White
  className = ''
}) {
  return (
    <span
      className={`animate-gradient-flow ${className}`}
      style={{
        background: `linear-gradient(135deg, ${colorFrom}, ${colorTo}, ${colorFrom})`,
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        animationDuration: `${speed}s`,
        display: 'inline-block'
      }}
    >
      {children}
    </span>
  );
}
