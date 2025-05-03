
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Sparkles, Code, Terminal } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';

const TerminalText: React.FC = () => {
  const texts = [
    "Hello, I am Muhammad Umer Qureshi.",
    "Engineering student | Innovator | Developer",
    "Exploring tech, solving real-world problems."
  ];
  
  const [displayedTexts, setDisplayedTexts] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  
  useEffect(() => {
    if (currentIndex >= texts.length) {
      return;
    }
    
    if (isTyping) {
      if (currentText.length < texts[currentIndex].length) {
        const timeout = setTimeout(() => {
          setCurrentText(texts[currentIndex].substring(0, currentText.length + 1));
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        setIsTyping(false);
        const timeout = setTimeout(() => {
          setDisplayedTexts([...displayedTexts, currentText]);
          setCurrentText('');
          setCurrentIndex(currentIndex + 1);
          setIsTyping(true);
        }, 1000);
        return () => clearTimeout(timeout);
      }
    }
  }, [currentText, currentIndex, isTyping, texts, displayedTexts]);
  
  return (
    <div className="font-mono text-sm sm:text-base md:text-lg max-w-2xl mx-auto bg-card/80 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-primary/30 shadow-lg shadow-primary/5">
      <div className="flex items-center mb-4">
        <div className="flex space-x-2 mr-4">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex-1 text-center text-xs text-muted-foreground">terminal@umer-portfolio</div>
      </div>
      
      <div className="text-foreground">
        {displayedTexts.map((text, index) => (
          <div key={index} className="mb-2">
            <span className="text-primary mr-2">&gt;</span> {text}
          </div>
        ))}
        {currentIndex < texts.length && (
          <div>
            <span className="text-primary mr-2">&gt;</span>
            <span className="terminal-text">{currentText}</span>
          </div>
        )}
      </div>
    </div>
  );
};

// Enhanced 3D floating shapes component with parallax effect
const ParallaxShapes: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const shapes = containerRef.current.querySelectorAll('.parallax-shape');
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
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <div ref={containerRef} className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Modern gradient blobs */}
      <div className="parallax-shape absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl"></div>
      <div className="parallax-shape absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-l from-primary/20 to-accent/20 rounded-full blur-3xl"></div>
      <div className="parallax-shape absolute top-1/3 right-1/4 w-40 h-40 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-2xl"></div>
      <div className="parallax-shape absolute bottom-1/3 left-1/4 w-32 h-32 bg-gradient-to-tr from-accent/10 to-primary/10 rounded-full blur-2xl"></div>
      
      {/* Animated grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(var(--primary),0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(var(--primary),0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>
      
      {/* Floating code elements with glass effect */}
      <div className="parallax-shape absolute top-1/4 right-1/5 backdrop-blur-sm p-3 rounded-md font-mono rotate-6 border border-primary/20 bg-card/30 shadow-lg">
        &lt;div className="innovation"&gt;
      </div>
      <div className="parallax-shape absolute bottom-1/4 left-1/5 backdrop-blur-sm p-3 rounded-md font-mono -rotate-3 border border-primary/20 bg-card/30 shadow-lg">
        const future = createSolutions();
      </div>
      <div className="parallax-shape absolute top-2/3 right-1/3 backdrop-blur-sm p-3 rounded-md font-mono rotate-12 border border-primary/20 bg-card/30 shadow-lg">
        function solveProblems() &#123; &#125;
      </div>
    </div>
  );
};

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, threshold: 0.1 });
  
  return (
    <section id="hero" ref={sectionRef} className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-20">
      {/* Background elements and parallax shapes */}
      <ParallaxShapes />
      
      {/* Floating decorative elements */}
      <div className="absolute top-1/4 left-10 w-16 h-16 border border-primary/30 rounded-lg rotate-12 animate-float animation-delay-300"></div>
      <div className="absolute bottom-1/4 right-10 w-20 h-20 border border-accent/30 rounded-full animate-float animation-delay-600"></div>
      <div className="absolute top-1/3 right-1/4 w-12 h-12 border border-primary/30 rounded-md rotate-45 animate-float animation-delay-900"></div>
      
      <div className="container mx-auto px-4 py-12 flex flex-col items-center">
        <div className="flex items-center gap-2 text-primary mb-3">
          <Sparkles size={20} className="animate-pulse" />
          <span className="uppercase tracking-wider text-xs font-medium">Portfolio</span>
          <Sparkles size={20} className="animate-pulse" />
        </div>
        
        <h1 
          className={`text-3xl md:text-5xl lg:text-6xl font-bold text-center mb-6 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          Engineering the Future with <br />
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Code and Creativity</span>
        </h1>
        
        <div className={`my-8 w-full transition-all duration-700 delay-300 ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <TerminalText />
        </div>
        
        <div className={`mt-8 flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Button size="lg" className="group relative overflow-hidden">
            <span className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 animate-pulse group-hover:opacity-70 transition-opacity opacity-0"></span>
            <Code className="mr-2 h-4 w-4" />
            <span>View My Projects</span>
          </Button>
          <Button variant="outline" size="lg" className="group border-primary/30 hover:border-primary/80">
            <Terminal className="mr-2 h-4 w-4 group-hover:text-primary transition-colors" />
            <span>Get In Touch</span>
          </Button>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a href="#about" aria-label="Scroll down" className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors">
            <span className="text-xs mb-2">Scroll Down</span>
            <ArrowDown className="text-primary" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
