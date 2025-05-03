
import React, { useState, useEffect } from 'react';
import { Menu, X, Code, Github, Linkedin } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Button } from '@/components/ui/button';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-md shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a href="#" className="text-xl font-bold font-mono flex items-center group">
          <span className="relative text-primary mr-1">
            <Code className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
          </span>
          <span className="bg-clip-text bg-gradient-to-r from-primary to-accent text-transparent">
            {"<Umer Qureshi />"}
          </span>
        </a>
        
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map(link => (
            <a 
              key={link.label} 
              href={link.href}
              className="text-sm text-foreground/80 hover:text-primary relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:-bottom-1 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
            >
              {link.label}
            </a>
          ))}
          
          <div className="flex items-center space-x-3">
            <a href="https://github.com/umerqureshi409" target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-primary transition-colors">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/umer-qureshi-526118259" target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-primary transition-colors">
              <Linkedin size={20} />
            </a>
            <ThemeToggle />
          </div>
        </nav>
        
        <div className="flex md:hidden items-center space-x-4">
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="ml-2" onClick={() => setIsMenuOpen(true)} aria-label="Open menu">
            <Menu size={24} />
          </Button>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-background/95 backdrop-blur-md z-50 flex flex-col md:hidden">
            <div className="flex justify-between items-center p-4">
              <a href="#" className="text-xl font-bold font-mono text-primary">
                {"<Umer />"}
              </a>
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
                <X size={24} />
              </Button>
            </div>
            <nav className="flex flex-col items-center justify-center flex-1 space-y-8">
              {navLinks.map(link => (
                <a 
                  key={link.label} 
                  href={link.href} 
                  className="text-lg font-medium relative overflow-hidden group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="relative z-10">{link.label}</span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                </a>
              ))}
              
              <div className="flex space-x-6 mt-6">
                <a href="https://github.com/umerqureshi409" target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-primary transition-colors">
                  <Github size={24} />
                </a>
                <a href="https://www.linkedin.com/in/umer-qureshi-526118259" target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-primary transition-colors">
                  <Linkedin size={24} />
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
