
import React from 'react';

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Gradient Waves */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-background to-secondary/5"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/10 to-primary-light/10 rounded-full blur-3xl animate-pulse opacity-60"></div>
          <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-secondary/10 to-success/10 rounded-full blur-3xl animate-pulse delay-1000 opacity-60"></div>
          <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-gradient-to-r from-warning/10 to-secondary/10 rounded-full blur-3xl animate-pulse delay-500 opacity-40"></div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-primary/20 rounded-full animate-bounce opacity-30`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Geometric Shapes */}
      <div className="absolute inset-0">
        <div className="absolute top-1/6 right-1/6 w-32 h-32 border border-primary/10 rotate-45 animate-spin opacity-20" style={{ animationDuration: '20s' }}></div>
        <div className="absolute bottom-1/6 left-1/8 w-24 h-24 border border-secondary/10 rotate-12 animate-spin opacity-20" style={{ animationDuration: '15s' }}></div>
        <div className="absolute top-2/3 right-1/3 w-16 h-16 border border-success/10 rotate-45 animate-spin opacity-20" style={{ animationDuration: '25s' }}></div>
      </div>

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)
            `,
            backgroundSize: '60px 60px',
          }}
        ></div>
      </div>

      {/* Flowing Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1000 1000" preserveAspectRatio="none">
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
            <stop offset="50%" stopColor="hsl(var(--secondary))" stopOpacity="0.1" />
            <stop offset="100%" stopColor="hsl(var(--success))" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <path
          d="M0,300 Q250,200 500,300 T1000,300"
          stroke="url(#gradient1)"
          strokeWidth="2"
          fill="none"
          className="animate-pulse"
        />
        <path
          d="M0,400 Q300,350 600,400 T1000,400"
          stroke="url(#gradient1)"
          strokeWidth="1.5"
          fill="none"
          className="animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        <path
          d="M0,500 Q400,450 800,500 T1000,500"
          stroke="url(#gradient1)"
          strokeWidth="1"
          fill="none"
          className="animate-pulse"
          style={{ animationDelay: '2s' }}
        />
      </svg>

      {/* Floating Elements with Different Shapes */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-10 animate-bounce delay-300">
          <div className="w-3 h-3 bg-primary/30 rounded-full shadow-glow"></div>
        </div>
        <div className="absolute top-1/3 right-16 animate-bounce delay-700">
          <div className="w-4 h-4 bg-secondary/30 rotate-45"></div>
        </div>
        <div className="absolute bottom-1/4 left-1/4 animate-bounce delay-500">
          <div className="w-2 h-2 bg-success/30 rounded-full"></div>
        </div>
        <div className="absolute bottom-1/3 right-1/3 animate-bounce delay-1000">
          <div className="w-3 h-3 bg-warning/30 rounded-full"></div>
        </div>
        <div className="absolute top-1/2 left-1/6 animate-bounce delay-200">
          <div className="w-2 h-6 bg-primary/20 rounded-full"></div>
        </div>
        <div className="absolute top-3/4 right-1/6 animate-bounce delay-800">
          <div className="w-5 h-2 bg-secondary/20 rounded-full"></div>
        </div>
      </div>

      {/* Radial Pulses */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-96 h-96 border border-primary/5 rounded-full animate-ping opacity-20"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-secondary/5 rounded-full animate-ping opacity-20" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-success/5 rounded-full animate-ping opacity-20" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedBackground;
