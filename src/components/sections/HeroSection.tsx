
"use client";

import { useRef } from "react";
import { useInView } from "@/hooks/use-in-view";
import { ArrowDown, Code, Sparkles, Terminal, Github, Linkedin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GradientButton } from "@/components/ui/gradient-button";
import { ParticleField, ParallaxBackground } from "@/components/ui/animated-background";
import { TerminalText } from "@/components/ui/terminal-text";
import { cn } from "@/lib/utils";

const FloatingElement: React.FC<{
  className?: string;
  children?: React.ReactNode;
  delay?: number;
  size?: "sm" | "md" | "lg";
}> = ({ className, children, delay = 0, size = "md" }) => {
  const sizeClasses = {
    sm: "w-10 h-10 md:w-12 md:h-12",
    md: "w-16 h-16 md:w-20 md:h-20",
    lg: "w-24 h-24 md:w-32 md:h-32",
  };
  
  const delayClass = delay ? `animation-delay-${delay}` : "";
  
  return (
    <div
      className={cn(
        "absolute border border-primary/30 rounded-lg animate-float",
        sizeClasses[size],
        delayClass,
        className
      )}
    >
      {children}
    </div>
  );
};

const SocialLink: React.FC<{
  href: string;
  icon: React.ReactNode;
  label: string;
}> = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-card/40 backdrop-blur-sm p-2 rounded-full border border-primary/20 hover:scale-110 hover:border-primary/40 transition-all duration-300"
    aria-label={label}
  >
    {icon}
  </a>
);

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, threshold: 0.1 });
  
  const terminalLines = [
    "Hello, I am Muhammad Umer Qureshi.",
    "Engineering student | Innovator | Developer",
    "Exploring tech, solving real-world problems.",
    "Let's build something amazing together!"
  ];

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-16 md:pt-20"
    >
      {/* Background effects */}
      <ParallaxBackground />
      <ParticleField />
      
      {/* Floating decorative elements */}
      <FloatingElement 
        className="top-1/4 left-10 rotate-12" 
        delay={300}
        size="sm"
      />
      <FloatingElement 
        className="bottom-1/4 right-10 rounded-full" 
        delay={600}
        size="md"
      />
      <FloatingElement 
        className="top-1/3 right-1/4 rotate-45" 
        delay={900}
        size="sm"
      />
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-8 sm:py-12 flex flex-col items-center z-10">
        {/* Badge */}
        <div 
          className={cn(
            "flex items-center gap-2 text-primary mb-3 transition-all duration-700",
            isInView ? "opacity-100" : "opacity-0"
          )}
        >
          <Sparkles size={18} className="animate-pulse" />
          <span className="uppercase tracking-wider text-xs font-medium">Portfolio</span>
          <Sparkles size={18} className="animate-pulse" />
        </div>

        {/* Main heading with gradient text */}
<h1
  className={cn(
    "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6 transition-all duration-700",
    isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
  )}
>
  Engineering the Future with <br />
  <span className="bg-gradient-to-r from-violet-500 via-primary to-pink-500 dark:from-emerald-400 dark:via-cyan-300 dark:to-fuchsia-500 bg-clip-text text-transparent">
    Code and Creativity
  </span>
</h1>

        {/* Terminal component */}
        <div
          className={cn(
            "my-6 sm:my-8 w-full max-w-2xl transition-all duration-700 delay-300",
            isInView ? "opacity-100 scale-100" : "opacity-0 scale-95"
          )}
        >
          <TerminalText lines={terminalLines} typingSpeed={40} />
        </div>

        {/* Action buttons */}
        <div
          className={cn(
            "mt-8 flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-500",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <GradientButton 
            size="lg" 
            hoverEffect="glow"
            gradientFrom="from-primary/80"
            gradientTo="to-accent/80"
          >
            <Code className="mr-2 h-4 w-4" />
            <span>View My Projects</span>
          </GradientButton>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="group border-primary/30 hover:border-primary/80"
          >
            <Terminal className="mr-2 h-4 w-4 group-hover:text-primary transition-colors" />
            <span>Get In Touch</span>
          </Button>
        </div>

         {/* Social links */}
<div 
  className={cn(
    "mt-8 sm:mt-12 flex gap-4 justify-center transition-all duration-700 delay-700 mb-24 sm:mb-28 md:mb-32", // Added bottom margin
    isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
  )}
>
  <SocialLink 
     href="https://github.com/umerqureshi409"
            icon={<Github size={20} className="text-foreground/80 hover:text-primary transition-colors" />}
            label="GitHub Profile"
  />
  <SocialLink 
    href="https://www.linkedin.com/in/umer-qureshi-526118259"
    icon={<Linkedin size={20} className="text-foreground/80 hover:text-primary transition-colors" />}
    label="LinkedIn Profile"
  />
</div>

{/* Scroll down indicator */}
<div 
  className={cn(
    "absolute bottom-4 sm:bottom-6 md:bottom-8 left-0 right-0 mx-auto flex justify-center transition-all duration-700 delay-1000", // Adjusted bottom positioning
    isInView ? "opacity-100" : "opacity-0"
  )}
>
  <a
    href="#about"
    aria-label="Scroll down"
    className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors"
  >
    <span className="text-xs mb-2">Scroll Down</span>
    <div className="bg-card/40 backdrop-blur-sm p-1.5 rounded-full border border-primary/20 animate-bounce">
      <ArrowDown size={16} className="text-primary" />
    </div>
  </a>
</div>
      </div>
    </section>
  );
};

export default HeroSection;