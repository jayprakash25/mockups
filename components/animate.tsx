import React, { useEffect, useRef, useState } from 'react';
import { FileText, Brain, Sparkles, CheckCircle2, Bot, LucideIcon } from 'lucide-react';
import { gsap } from 'gsap';

interface QuizLoaderProps {
  onComplete?: () => void;
}

interface Stage {
  message: string;
  Icon: LucideIcon;
}

interface ParticlePosition {
  x: number;
  y: number;
}

const generateParticlePositions = (count: number): ParticlePosition[] => {
  const positions: ParticlePosition[] = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    // Generate two sets of particles at different radiuses
    const radius = i % 2 === 0 ? 120 : 100;
    positions.push({
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius
    });
  }
  return positions;
};

const STAGES: Stage[] = [
  { message: "Analyzing document...", Icon: FileText },
  { message: "Creating questions...", Icon: Brain },
  { message: "Finalizing quiz...", Icon: Bot },
  { message: "Ready!", Icon: CheckCircle2 }
];

const PremiumQuizLoader: React.FC<QuizLoaderProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<number>(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<(HTMLDivElement | null)[]>([]);
  const messageRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const centralIconRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const particles: ParticlePosition[] = generateParticlePositions(32);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete?.();
      }
    });

    // Initial setup
    tl.set(circleRef.current, { scale: 0.8, opacity: 0 });
    tl.set(particlesRef.current, { scale: 0, opacity: 0 });
    tl.set(progressRef.current, { scaleX: 0 });
    tl.set(messageRef.current, { opacity: 0, y: 20 });
    tl.set(glowRef.current, { scale: 0.8, opacity: 0 });

    // Entrance animation with glow effect
    tl.to([circleRef.current, glowRef.current], {
      duration: 1.2,
      scale: 1,
      opacity: 1,
      stagger: 0.1,
      ease: "elastic.out(1, 0.7)"
    });

    // Rotating particle animations
    particlesRef.current.forEach((particle, index) => {
      if (particle) {
        // Create a continuous rotation animation
        gsap.to(particle, {
          duration: "random(4, 6)",
          rotation: "random(-360, 360)",
          repeat: -1,
          ease: "none"
        });

        // Fade in animation
        tl.to(particle, {
          duration: 0.8,
          scale: 1,
          opacity: index % 2 === 0 ? 0.6 : 0.4,
          ease: "power2.out",
          stagger: 0.02
        }, "<0.2");
      }
    });

    // Stage transitions with enhanced animations
    STAGES.forEach((_, index) => {
      // Progress bar animation
      tl.to(progressRef.current, {
        duration: 1.2,
        scaleX: (index + 1) / STAGES.length,
        ease: "power2.inOut"
      });

      // Stage update
      tl.to({}, {
        duration: 0.1,
        onComplete: () => setStage(index)
      });

      // Enhanced pulse animation for central icon
      if (centralIconRef.current) {
        tl.to(centralIconRef.current, {
          duration: 0.6,
          scale: 1.3,
          ease: "power2.inOut"
        }).to(centralIconRef.current, {
          duration: 0.6,
          scale: 1,
          ease: "elastic.out(1, 0.5)"
        });

        // Add glow pulse
        tl.to(glowRef.current, {
          duration: 0.4,
          opacity: 0.8,
          scale: 1.1,
          ease: "power2.inOut"
        }, "<").to(glowRef.current, {
          duration: 0.4,
          opacity: 0.4,
          scale: 1,
          ease: "power2.inOut"
        });
      }

      if (index < STAGES.length - 1) {
        tl.to({}, { duration: 0.6 });
      }
    });

    // Final celebration animation
    tl.to(particlesRef.current, {
      duration: 0.6,
      scale: 1.2,
      opacity: 0.8,
      stagger: {
        each: 0.02,
        from: "random"
      },
      ease: "power2.out"
    });

    tl.to(messageRef.current, {
      duration: 0.8,
      opacity: 1,
      y: 0,
      ease: "back.out(1.7)"
    }, "<0.2");

    // Cleanup
    return () => {
      tl.kill();
    };
  }, [onComplete]);

  const CurrentIcon = STAGES[stage].Icon;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-white/95 dark:bg-gray-900/95 backdrop-blur-md z-50 ml-0 sm:ml-[240px]"
      aria-live="polite"
      role="status"
    >
      <div 
        className="relative w-full max-w-sm mx-auto h-80 flex flex-col items-center justify-center p-6" 
        ref={containerRef}
      >
        {/* Glow effect */}
        <div 
          ref={glowRef}
          className="absolute w-40 h-40 rounded-full bg-emerald-400/20 dark:bg-emerald-500/20 blur-xl"
        />
        
        {/* Main circular container */}
        <div 
          ref={circleRef}
          className="relative w-32 h-32 rounded-full bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-900/20 dark:to-gray-900 
                   shadow-[0_0_40px_-15px_rgba(16,185,129,0.25)] flex items-center justify-center backdrop-blur-sm"
        >
          {/* Particle effects */}
          {particles.map((particle, index) => (
            <div
              key={`particle-${index}`}
              ref={(el) => { if (el) particlesRef.current[index] = el; }}
              className={`absolute w-1 h-1 rounded-full ${
                index % 2 === 0 
                  ? 'bg-emerald-400/60 dark:bg-emerald-500/60' 
                  : 'bg-emerald-300/40 dark:bg-emerald-400/40'
              }`}
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(${particle.x * 0.6}px, ${particle.y * 0.6}px)`
              }}
            />
          ))}

          {/* Central icon */}
          <div 
            ref={centralIconRef}
            className="relative z-10 transform transition-transform duration-500"
          >
            <CurrentIcon 
              size={24}
              className="text-emerald-600 dark:text-emerald-400"
            />
          </div>
        </div>

        {/* Progress bar */}
        <div 
          className="w-40 h-1 mt-8 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={((stage + 1) / STAGES.length) * 100}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            ref={progressRef}
            className="h-full w-full bg-gradient-to-r from-emerald-400 to-emerald-500 origin-left"
          />
        </div>

        {/* Status message */}
        <div
          ref={messageRef}
          className="mt-4 flex flex-col items-center gap-1.5"
        >
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
            {STAGES[stage].message}
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 font-medium">
              Premium Quiz Generator
            </span>
            <Sparkles className="w-3 h-3 text-emerald-500/70" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumQuizLoader;