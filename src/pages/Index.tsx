import React, { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ContactSection from '@/components/sections/ContactSection';
import { RotatingCube } from '@/components/3d/RotatingCube';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';

const Index: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Show scroll to top button when scrolled past a certain point
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Enhanced background decoration */}
      <div className="fixed inset-0 -z-10">
        {/* Base pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50 dark:bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)]"></div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background"></div>
      </div>
      
      {/* Corner cube decoration */}
      <div className="hidden lg:block fixed bottom-8 right-8 w-32 h-32 z-10 opacity-90 hover:opacity-100 transition-opacity">
        <RotatingCube size={120} />
      </div>
      
      {/* Scroll to top button */}
      <Button 
        onClick={scrollToTop} 
        className={`fixed bottom-8 left-8 z-50 rounded-full p-3 bg-primary/80 hover:bg-primary shadow-lg backdrop-blur-sm transition-all duration-300 ${showScrollTop ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </Button>
      
      <Header />
      
      <main className="flex-grow">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
