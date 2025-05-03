
import React, { useEffect, useRef } from 'react';
import { useInView } from '@/hooks/use-in-view';

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
    <section id="about" ref={sectionRef} className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-3xl font-bold mb-12 text-center ${isInView ? 'animate-fade-in' : 'opacity-0'}`}>
            About <span className="text-primary">Me</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className={`col-span-1 ${isInView ? 'animate-fade-in-right' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
              <div className="bg-card rounded-lg p-5 h-full border border-border shadow-lg">
                <h3 className="text-xl font-semibold mb-3 text-primary">Education</h3>
                <p className="text-muted-foreground mb-3">Computer Systems Engineering</p>
                <p className="font-medium">Mehran University of Engineering and Technology</p>
                <p className="text-sm text-muted-foreground">Jamshoro, Pakistan</p>
                <p className="mt-3 text-sm">Class of 2028 • Roll No: 24CS005</p>
              </div>
            </div>
            
            <div className={`col-span-1 ${isInView ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
              <div className="bg-card rounded-lg p-5 h-full border border-border shadow-lg">
                <h3 className="text-xl font-semibold mb-3 text-primary">Interests</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="text-primary mr-2">•</span> Artificial Intelligence
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">•</span> IoT & Embedded Systems
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">•</span> Face Recognition
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">•</span> Web Development
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">•</span> Automation
                  </li>
                </ul>
              </div>
            </div>
            
            <div className={`col-span-1 ${isInView ? 'animate-fade-in-left' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
              <div className="bg-card rounded-lg p-5 h-full border border-border shadow-lg">
                <h3 className="text-xl font-semibold mb-3 text-primary">Strengths</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="text-primary mr-2">•</span> Quick Learner
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">•</span> Project-focused
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">•</span> Research-minded
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">•</span> Creative Thinker
                  </li>
                  <li className="flex items-center">
                    <span className="text-primary mr-2">•</span> Problem Solver
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className={`mt-16 ${isInView ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
            <h3 className="text-2xl font-semibold mb-8 text-center">My Journey</h3>
            
            <div className="relative pl-8 border-l border-border">
              {timelineData.map((item, index) => (
                <div 
                  key={index} 
                  className="timeline-item relative pb-12 last:pb-0"
                >
                  <div className="flex flex-col md:flex-row md:items-center">
                    <div className="text-primary font-semibold mb-2 md:mb-0 md:w-24">{item.year}</div>
                    <div className="bg-card rounded-lg p-4 flex-1 border border-border shadow-md">
                      <h4 className="text-lg font-medium mb-2">{item.title}</h4>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
