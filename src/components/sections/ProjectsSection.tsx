
import React, { useState, useRef } from 'react';
import { useInView } from '@/hooks/use-in-view';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Github, ExternalLink } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  links: {
    github?: string;
    demo?: string;
  };
}

// Placeholder projects (you'll need to add real project data)
const projectsData: Project[] = [
  {
    id: 1,
    title: "AI Face Recognition System",
    description: "A facial recognition system using OpenCV and machine learning to identify and authenticate users in real-time.",
    image: "ai.png", // Using placeholder image
    category: "AI",
    technologies: ["C++", "OpenCV", "Esp32Cam", "Machine Learning"],
    links: {
      github: "#",
    }
  },
  {
    id: 2,
    title: "AL-QURAN-KANZUL-IMAN",
    description: "AL-QURAN-KANZUL-IMAN is a web application that provides users with access to the Holy Quran along with the renowned Urdu translation, Kanzul Iman. ",
    image: "al-quran.png", // Using placeholder image
    category: "Web",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
    links: {
      github: "https://github.com/umerqureshi409/AL-QURAN-KANZUL-IMAN",
      demo: "https://al-quran-kanzul-iman.vercel.app/"
    }
  },
  {
    id: 3,
    title: "Personal Portfolio Website",
    description: "A responsive portfolio website built with React, TypeScript, and Tailwind CSS to showcase projects and skills.",
    image: "portfolio.png", // Using placeholder image
    category: "Web",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    links: {
      github: "https://github.com/umerqureshi409/umerqureshi409.github.io",
      demo: "https://umerqureshi409.github.io/"
    }
  },
  {
    id: 4,
    title: "Committee Management System",
    description: "A web-based platform for managing committee records, transection, and performance with authentication and reporting features.",
    image: "bc-man.png", // Using placeholder image
    category: "Web",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    links: {
      github: "https://github.com/umerqureshi409/bc-management",
      demo: "https://umerqureshi409.github.io/bc-management/"
    }
  },
  {
    id: 5,
    title: "Face Capture Attendance System",
    description: "The Face Detection Attendance System is a robust and versatile application built using C++ that leverages face recognition technology to streamline attendance management for students and teachers.",
    image: "face.png", // Using placeholder image
    category: "AI",
    technologies: ["C++", "OpenCV", "Machine Learning", "Computer Vision"],
    links: {
      github: "https://github.com/umerqureshi409/CPP-Face-Detection-Attendance-System",
    }
  },
  {
    id: 6,
    title: "TFP Website",
    description: "Created a website for TFP (Talpur Foundation Pakistan) using HTML, CSS, and JavaScript. The website features a responsive design and includes sections for information about TFP, its mission, and contact details.",
    image: "tfp.png", // Using placeholder image
    category: "Web",
    technologies: ["HTML5", "CSS", "Java Script", "Figma"],
    links: {
      github: "https://github.com/umerqureshi409/TFP-HOME",
      
    }
  }
];


const categories = ["All", "AI", "IoT", "Web", "Mobile"];

const ProjectCard: React.FC<{ project: Project; isVisible: boolean; delay: number }> = ({ project, isVisible, delay }) => {
  return (
    <div 
      className={`bg-card rounded-lg overflow-hidden border border-border shadow-md transition-all duration-700 h-full flex flex-col ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-60"></div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{project.title}</h3>
          <Badge variant="secondary">{project.category}</Badge>
        </div>
        
        <p className="text-muted-foreground text-sm mb-4 flex-1">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech) => (
            <Badge key={tech} variant="outline">{tech}</Badge>
          ))}
          {project.technologies.length > 3 && (
            <Badge variant="outline">+{project.technologies.length - 3}</Badge>
          )}
        </div>
        
        <div className="flex gap-3 mt-auto">
          {project.links.github && (
            <Button size="sm" variant="outline" className="flex items-center gap-2" asChild>
              <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                <Github size={16} /> Code
              </a>
            </Button>
          )}
          {project.links.demo && (
            <Button size="sm" className="flex items-center gap-2" asChild>
              <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={16} /> Demo
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

const ProjectsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 });
  
  const filteredProjects = activeCategory === "All" 
    ? projectsData 
    : projectsData.filter(project => project.category === activeCategory);
  
  return (
    <section id="projects" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4">
        <h2 className={`text-3xl font-bold mb-4 text-center transition-all duration-700 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
          My <span className="text-primary">Projects</span>
        </h2>
        <p className={`text-center text-muted-foreground max-w-2xl mx-auto mb-12 transition-all duration-700 delay-200 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
          Explore my latest projects and technical work across various domains and technologies.
        </p>
        
        <Tabs defaultValue="All" className="w-full max-w-4xl mx-auto">
          <div className={`flex justify-center mb-8 transition-all duration-700 delay-300 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
            <TabsList>
              {categories.map(category => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          {categories.map(category => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project, index) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    isVisible={isInView && category === activeCategory}
                    delay={index * 100 + 400}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No projects found in this category yet.
            </div>
          )}
        </Tabs>
      </div>
    </section>
  );
};

export default ProjectsSection;
