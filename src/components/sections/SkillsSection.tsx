import React, { useRef, useEffect, useState } from 'react';
import { useInView } from '@/hooks/use-in-view';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { Button } from '@/components/ui/button';
import { 
  Code, Database, Layers, Terminal, Cpu, Globe, 
  LayoutGrid, 
  MonitorSmartphone,
  Wrench,
  Server,
  Award
} from 'lucide-react';

interface Skill {
  name: string;
  level: number; // 0-100
  description: string;
  category: string;
  projects?: string[];
  icon: React.ElementType;
}

const skills: Skill[] = [
  {
    name: "HTML/CSS",
    level: 90,
    category: "Frontend",
    description: "Proficient in creating responsive and semantic web layouts with modern CSS techniques.",
    projects: ["Personal Portfolio", "Student Management System"],
    icon: Globe
  },
  {
    name: "JavaScript",
    level: 85,
    category: "Frontend",
    description: "Strong understanding of ES6+ features, DOM manipulation, and asynchronous programming.",
    projects: ["Personal Portfolio", "Interactive Web Apps"],
    icon: Code
  },
  {
    name: "React",
    level: 80,
    category: "Frontend",
    description: "Experienced in building component-based UIs with state management and hooks.",
    projects: ["Personal Portfolio", "Student Management System"],
    icon: LayoutGrid
  },
  {
    name: "Python",
    level: 90,
    category: "Languages",
    description: "Skilled in data processing, automation scripts, and machine learning applications.",
    projects: ["AI Face Recognition System", "Gesture Control System"],
    icon: Terminal
  },
  {
    name: "C/C++",
    level: 75,
    category: "Languages",
    description: "Knowledgeable in system programming, data structures, and algorithms.",
    projects: ["Embedded Systems Projects", "Data Structure Implementations"],
    icon: Cpu
  },
  {
    name: "Node.js",
    level: 70,
    category: "Backend",
    description: "Capable of building REST APIs, handling file operations, and server-side logic.",
    projects: ["Student Management System", "Web APIs"],
    icon: Server
  },
  {
    name: "SQL Databases",
    level: 75,
    category: "Backend",
    description: "Experienced with database design, queries, and optimizations.",
    projects: ["Student Management System", "Data Storage Solutions"],
    icon: Database
  },
  {
    name: "Arduino",
    level: 85,
    category: "IoT",
    description: "Proficient in programming microcontrollers for IoT solutions.",
    projects: ["Smart Home Automation", "Environmental Monitoring System"],
    icon: Cpu
  },
  {
    name: "OpenCV",
    level: 80,
    category: "AI",
    description: "Experienced in computer vision algorithms and applications.",
    projects: ["AI Face Recognition System", "Gesture Control System"],
    icon: MonitorSmartphone
  },
  {
    name: "TensorFlow",
    level: 70,
    category: "AI",
    description: "Familiar with neural networks and machine learning models.",
    projects: ["AI Face Recognition System"],
    icon: Layers
  },
  {
    name: "Raspberry Pi",
    level: 75,
    category: "IoT",
    description: "Skilled in creating IoT solutions with Raspberry Pi.",
    projects: ["Smart Home Automation", "Environmental Monitoring System"],
    icon: Wrench
  },
  {
    name: "MongoDB",
    level: 65,
    category: "Backend",
    description: "Knowledge of NoSQL database design and operations.",
    projects: ["Student Management System"],
    icon: Database
  }
];

// Achievement badges component
const AchievementBadges: React.FC = () => {
  const achievements = [
    {
      title: "Frontend Developer",
      description: "Mastered essential frontend technologies including HTML, CSS, and JavaScript.",
      icon: Globe,
      color: "bg-gradient-to-r from-blue-500 to-cyan-500"
    },
    {
      title: "Python Expert",
      description: "Demonstrated advanced proficiency in Python programming and applications.",
      icon: Terminal,
      color: "bg-gradient-to-r from-green-500 to-emerald-500"
    },
    {
      title: "AI Explorer",
      description: "Successfully implemented AI and machine learning projects.",
      icon: Layers,
      color: "bg-gradient-to-r from-purple-500 to-violet-500"
    },
    {
      title: "IoT Innovator",
      description: "Built creative IoT solutions using Arduino and Raspberry Pi.",
      icon: Cpu,
      color: "bg-gradient-to-r from-orange-500 to-amber-500"
    },
    {
      title: "Database Designer",
      description: "Created efficient database schemas and implemented data solutions.",
      icon: Database,
      color: "bg-gradient-to-r from-red-500 to-pink-500"
    },
    {
      title: "Fast Learner",
      description: "Quickly mastered new technologies and programming concepts.",
      icon: Award,
      color: "bg-gradient-to-r from-yellow-500 to-amber-500"
    }
  ];
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12">
      {achievements.map((achievement, index) => (
        <div
          key={index}
          className="group relative flex flex-col items-center justify-center p-6 rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-xl"
        >
          <div className={`absolute inset-0 opacity-80 ${achievement.color}`}></div>
          <div className="absolute inset-0 bg-card opacity-90 group-hover:opacity-70 transition-opacity"></div>
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="p-3 mb-3 rounded-full bg-background/30 backdrop-blur-sm">
              <achievement.icon size={24} className="text-primary" />
            </div>
            <h4 className="font-bold text-lg mb-2">{achievement.title}</h4>
            <p className="text-sm text-muted-foreground">{achievement.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// Animated skill card component
const SkillCard: React.FC<{ skill: Skill; isVisible: boolean; delay: number }> = ({ skill, isVisible, delay }) => {
  const [isHovering, setIsHovering] = useState(false);
  
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div 
          className={`skill-card relative p-6 bg-card rounded-lg border border-border shadow-md transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
          style={{ transitionDelay: `${delay}ms` }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-md bg-primary/10 ${isHovering ? 'text-primary' : 'text-muted-foreground'} transition-colors`}>
                <skill.icon size={20} />
              </div>
              <h3 className="font-medium">{skill.name}</h3>
            </div>
            <Badge variant="outline">{skill.category}</Badge>
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Proficiency</span>
              <span className="font-medium">{skill.level}%</span>
            </div>
            <Progress 
              value={isHovering || isVisible ? skill.level : 0} 
              className="transition-all duration-1000" 
            />
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <h4 className="font-semibold">{skill.name}</h4>
          <p className="text-sm">{skill.description}</p>
          {skill.projects && skill.projects.length > 0 && (
            <div className="pt-2">
              <h5 className="text-xs font-medium text-muted-foreground mb-2">Related Projects:</h5>
              <div className="flex flex-wrap gap-2">
                {skill.projects.map((project, idx) => (
                  <Badge key={idx} variant="secondary">{project}</Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

const categories = ["All", "Frontend", "Backend", "Languages", "AI", "IoT"];

const SkillsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 });
  const [activeCategory, setActiveCategory] = useState("All");
  
  const filteredSkills = activeCategory === "All" 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);
  
  const [showBadges, setShowBadges] = useState(false);

  return (
    <section id="skills" ref={sectionRef} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className={`text-3xl font-bold mb-4 text-center transition-all duration-700 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
          My <span className="text-primary">Skills</span>
        </h2>
        <p className={`text-center text-muted-foreground max-w-2xl mx-auto mb-8 transition-all duration-700 delay-200 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
          A collection of technologies and tools I've worked with through my journey.
        </p>
        
        <div className={`flex justify-center gap-4 mb-8 transition-all duration-700 delay-300 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
          <Button 
            variant={!showBadges ? "default" : "outline"} 
            onClick={() => setShowBadges(false)}
          >
            Skills Grid
          </Button>
          <Button 
            variant={showBadges ? "default" : "outline"} 
            onClick={() => setShowBadges(true)}
          >
            Achievement Badges
          </Button>
        </div>
        
        {showBadges ? (
          <AchievementBadges />
        ) : (
          <Tabs defaultValue="All" className="w-full">
            <div className={`flex justify-center mb-8 transition-all duration-700 delay-400 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSkills.map((skill, index) => (
                <SkillCard 
                  key={skill.name} 
                  skill={skill} 
                  isVisible={isInView} 
                  delay={index * 100 + 500}
                />
              ))}
            </div>
          </Tabs>
        )}
      </div>
    </section>
  );
};

export default SkillsSection;
