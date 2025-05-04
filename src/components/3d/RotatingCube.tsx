
import React, { useRef, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface CubeFace {
  text: string;
  color: string;
}

interface RotatingCubeProps {
  size?: number;
  faces?: CubeFace[];
}

const defaultFaces: CubeFace[] = [
  { text: "React", color: "rgba(97, 218, 251, 0.8)" },
  { text: "Node.js", color: "rgba(104, 160, 99, 0.8)" },
  { text: "Python", color: "rgba(55, 118, 171, 0.8)" },
  { text: "IoT", color: "rgba(233, 159, 13, 0.8)" },
  { text: "AI", color: "rgba(162, 98, 214, 0.8)" },
  { text: "Arduino", color: "rgba(0, 151, 157, 0.8)" },
];

export const RotatingCube: React.FC<RotatingCubeProps> = ({ 
  size = 120,
  faces = defaultFaces
}) => {
  const cubeRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (!cubeRef.current) return;
    
    let rotateY = 0;
    let rotateX = 0;
    const speed = 0.5;
    
    // Auto rotation
    const rotate = () => {
      if (!cubeRef.current) return;
      
      rotateY += speed;
      cubeRef.current.style.transform = 
        `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      
      requestAnimationFrame(rotate);
    };
    
    rotate();
    
    // Interactive rotation on mouse move
    if (!isMobile) {
      const handleMouseMove = (e: MouseEvent) => {
        if (!cubeRef.current) return;
        const container = cubeRef.current.parentElement;
        if (!container) return;
        
        const rect = container.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate distance from center
        const distanceX = (e.clientX - centerX) / 20;
        const distanceY = (e.clientY - centerY) / 20;
        
        rotateX = -distanceY;
        rotateY = distanceX;
        
        cubeRef.current.style.transform = 
          `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      };
      
      document.addEventListener('mousemove', handleMouseMove);
      return () => document.removeEventListener('mousemove', handleMouseMove);
    }
  }, [isMobile]);
  
  // Calculate dimensions
  const halfSize = size / 2;
  
  return (
    <div className="cube-container perspective-500 w-full h-full flex items-center justify-center">
      <div
        ref={cubeRef}
        className="cube relative transform-style-3d transition-transform duration-100 ease-out"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        {/* Front face */}
        <div className="cube-face absolute w-full h-full flex items-center justify-center transform-style-3d font-mono font-bold text-white" 
             style={{ 
               transform: `translateZ(${halfSize}px)`,
               backgroundColor: faces[0].color
             }}>
          {faces[0].text}
        </div>
        
        {/* Back face */}
        <div className="cube-face absolute w-full h-full flex items-center justify-center transform-style-3d font-mono font-bold text-white" 
             style={{ 
               transform: `rotateY(180deg) translateZ(${halfSize}px)`,
               backgroundColor: faces[1].color
             }}>
          {faces[1].text}
        </div>
        
        {/* Right face */}
        <div className="cube-face absolute w-full h-full flex items-center justify-center transform-style-3d font-mono font-bold text-white" 
             style={{ 
               transform: `rotateY(90deg) translateZ(${halfSize}px)`,
               backgroundColor: faces[2].color
             }}>
          {faces[2].text}
        </div>
        
        {/* Left face */}
        <div className="cube-face absolute w-full h-full flex items-center justify-center transform-style-3d font-mono font-bold text-white" 
             style={{ 
               transform: `rotateY(-90deg) translateZ(${halfSize}px)`,
               backgroundColor: faces[3].color
             }}>
          {faces[3].text}
        </div>
        
        {/* Top face */}
        <div className="cube-face absolute w-full h-full flex items-center justify-center transform-style-3d font-mono font-bold text-white" 
             style={{ 
               transform: `rotateX(90deg) translateZ(${halfSize}px)`,
               backgroundColor: faces[4].color
             }}>
          {faces[4].text}
        </div>
        
        {/* Bottom face */}
        <div className="cube-face absolute w-full h-full flex items-center justify-center transform-style-3d font-mono font-bold text-white" 
             style={{ 
               transform: `rotateX(-90deg) translateZ(${halfSize}px)`,
               backgroundColor: faces[5].color
             }}>
          {faces[5].text}
        </div>
      </div>
    </div>
  );
};
