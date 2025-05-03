
import React from 'react';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-card py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="text-xl font-bold text-primary font-mono">{"<Umer Qureshi />"}</div>
            <p className="mt-2 text-muted-foreground max-w-md">
              Engineering the Future with Code and Creativity
            </p>
          </div>
          
          <div className="flex flex-col space-y-2">
            <h3 className="text-foreground font-semibold mb-2">Connect With Me</h3>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/umerqureshi409" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-primary transition-colors"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/in/umer-qureshi-526118259" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-primary transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="mailto:aa1660025@gmail.com" 
                className="text-foreground/70 hover:text-primary transition-colors"
              >
                <Mail size={20} />
              </a>
              <a 
                href="tel:03213021673" 
                className="text-foreground/70 hover:text-primary transition-colors"
              >
                <Phone size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Muhammad Umer Qureshi. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <p className="text-sm text-muted-foreground">
              Computer Systems Engineering | MUET, Jamshoro
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
