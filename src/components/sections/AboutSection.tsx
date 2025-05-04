
import React, { useEffect, useRef } from 'react';
import { useInView } from '@/hooks/use-in-view';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

const timelineData: TimelineItem[] = [
  {
    year: "2024",
    title: "Started Computer Systems Engineering at MUET",
    description: "Embarked on my journey at Mehran University of Engineering and Technology, Jamshoro, to pursue Computer Systems Engineering."
  },
  {
    year: "2024",
    title: "First Year Projects & Explorations",
    description: "Began exploring key concepts in programming, embedded systems, and digital logic design while working on foundational projects."
  },
  {
    year: "Present",
    title: "Focusing on Innovation & Research",
    description: "Currently exploring AI, IoT, and web development technologies to build solutions for real-world problems."
  }
];

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.2 });
  
  return (
    <section id="about" ref={sectionRef} className="py-16 md:py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-3xl font-bold mb-8 md:mb-12 text-center ${isInView ? 'animate-fade-in' : 'opacity-0'}`}>
            About <span className="text-primary">Me</span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 mb-16">
            <Card className={`col-span-1 border-primary/10 bg-card/60 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 ${isInView ? 'animate-fade-in-right' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
              <CardContent className="p-5">
                <h3 className="text-xl font-semibold mb-3 text-primary">Education</h3>
                <p className="text-muted-foreground mb-3">Computer Systems Engineering</p>
                <p className="font-medium">Mehran University of Engineering and Technology</p>
                <p className="text-sm text-muted-foreground">Jamshoro, Pakistan</p>
                <p className="mt-3 text-sm">Class of 2028 • Roll No: 24CS005</p>
              </CardContent>
            </Card>
            
            <Card className={`col-span-1 border-primary/10 bg-card/60 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 ${isInView ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
              <CardContent className="p-5">
                <h3 className="text-xl font-semibold mb-3 text-primary">Interests</h3>
                <ul className="space-y-2">
                  {["Artificial Intelligence", "IoT & Embedded Systems", "Face Recognition", "Web Development", "Automation"].map((interest, index) => (
                    <li key={index} className="flex items-center">
                      <Badge variant="outline" className="mr-2 bg-primary/10 border-primary/30 text-primary">
                        {index + 1}
                      </Badge>
                      <span>{interest}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card className={`col-span-1 sm:col-span-2 lg:col-span-1 border-primary/10 bg-card/60 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 ${isInView ? 'animate-fade-in-left' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
              <CardContent className="p-5">
                <h3 className="text-xl font-semibold mb-3 text-primary">Strengths</h3>
                <ul className="space-y-2">
                  {["Quick Learner", "Project-focused", "Research-minded", "Creative Thinker", "Problem Solver"].map((strength, index) => (
                    <li key={index} className="flex items-center">
                      <Badge variant="outline" className="mr-2 bg-accent/10 border-accent/30 text-accent">
                        {index + 1}
                      </Badge>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className={`mt-16 ${isInView ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
            <h3 className="text-2xl font-semibold mb-8 text-center">My <span className="text-primary">Journey</span></h3>
            
            {/* Modern timeline with proper alignment */}
            <div className="relative">
              {/* Timeline center line - properly positioned for all screen sizes */}
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/70 via-primary/40 to-primary/10"></div>
              
              {timelineData.map((item, index) => (
                <div 
                  key={index} 
                  className={`timeline-item mb-12 last:mb-0 relative flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col`}
                >
                  {/* Timeline dot - properly positioned for all screen sizes */}
                  <div className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full bg-primary shadow-glow transform -translate-x-1.5 mt-2"></div>
                  
                  <div className="md:w-1/2 pb-8 md:pb-0 pl-16 md:pl-0 md:px-6">
                    <Card className="hover:shadow-lg transition-shadow duration-300 border-primary/20 backdrop-blur-sm bg-card/60">
                      <CardContent className="p-6">
                        <Badge variant="outline" className="mb-3 bg-primary/10 border-primary/30 text-primary px-3 py-1">
                          {item.year}
                        </Badge>
                        <h4 className="text-lg font-medium mb-2">{item.title}</h4>
                        <p className="text-muted-foreground">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="md:w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Background decorations */}
      <div className="hidden md:block absolute top-1/4 right-10 w-64 h-64 bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-3xl -z-10"></div>
      <div className="hidden md:block absolute bottom-1/4 left-10 w-64 h-64 bg-gradient-to-tr from-accent/5 to-primary/5 rounded-full blur-3xl -z-10"></div>
    </section>
  );
};

export default AboutSection;
