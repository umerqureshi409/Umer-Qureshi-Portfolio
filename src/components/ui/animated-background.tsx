"use client";

import { useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!canvasRef.current || isMobile) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      opacity: number;
    }[] = [];
    
    const particleCount = 40;
    const colors = ["rgba(var(--primary), 0.5)", "rgba(var(--accent), 0.5)"];

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
      createParticles();
    };

    // Create particles
    const createParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          size: Math.random() * 4 + 1,
          speedX: (Math.random() - 0.5) * 0.4,
          speedY: (Math.random() - 0.5) * 0.4,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.7 + 0.3,
        });
      }
    };

    setCanvasDimensions();
    window.addEventListener("resize", setCanvasDimensions);

    // Draw and update particles
    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color.replace("0.5", particle.opacity.toString());
        ctx.fill();

        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around edges
        if (particle.x > canvas.offsetWidth) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.offsetWidth;
        if (particle.y > canvas.offsetHeight) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.offsetHeight;
      });

      // Connect nearby particles with lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(var(--primary), ${0.15 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(drawParticles);
    };

    drawParticles();

    return () => {
      window.removeEventListener("resize", setCanvasDimensions);
      cancelAnimationFrame(animationRef.current);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full -z-10" />;
};

export const ParallaxBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const shapes = containerRef.current.querySelectorAll(".parallax-shape");
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const moveX = (e.clientX - centerX) / 25;
      const moveY = (e.clientY - centerY) / 25;

      shapes.forEach((shape, index) => {
        const factor = (index + 1) * 0.2;
        const htmlShape = shape as HTMLElement;
        htmlShape.style.transform = `translate(${moveX * factor}px, ${moveY * factor}px)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  return (
    <div ref={containerRef} className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Modern gradient blobs */}
      <div className="parallax-shape absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl"></div>
      <div className="parallax-shape absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-l from-primary/10 to-accent/10 rounded-full blur-3xl"></div>
      <div className="parallax-shape absolute top-1/3 right-1/4 w-32 h-32 md:w-48 md:h-48 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-2xl"></div>
      
      {/* Animated grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(var(--primary),0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(var(--primary),0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>
      
      {/* Floating code elements with glass effect */}
      <div className="parallax-shape hidden lg:block absolute top-1/4 right-1/5 backdrop-blur-sm p-3 rounded-md font-mono rotate-6 border border-primary/20 bg-card/30 shadow-lg">
        {'<div className="innovation">'}
      </div>
      <div className="parallax-shape hidden lg:block absolute bottom-1/4 left-1/5 backdrop-blur-sm p-3 rounded-md font-mono -rotate-3 border border-primary/20 bg-card/30 shadow-lg">
        {"const future = createSolutions();"}
      </div>
    </div>
  );
};

