import { forwardRef } from "react";
import { Button, ButtonProps } from "./button";
import { cn } from "@/lib/utils";

interface GradientButtonProps extends ButtonProps {
  gradientFrom?: string;
  gradientTo?: string;
  hoverEffect?: "shine" | "pulse" | "scale" | "glow";
}

export const GradientButton = forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, gradientFrom, gradientTo, hoverEffect = "shine", children, ...props }, ref) => {
    // Default gradient colors if not provided
    const from = gradientFrom || "from-primary";
    const to = gradientTo || "to-accent";
    
    // Determine hover effect classes
    const hoverClasses = {
      shine: "overflow-hidden relative after:absolute after:inset-0 after:translate-x-[-100%] after:bg-white/20 after:transition-transform hover:after:translate-x-[100%] after:duration-500",
      pulse: "animate-pulse",
      scale: "hover:scale-105 transition-transform",
      glow: "hover:shadow-[0_0_15px_rgba(var(--primary),0.7)] transition-shadow",
    };
    
    return (
      <Button
        ref={ref}
        className={cn(
          // Base classes
          "relative overflow-hidden group",
          // Gradient background
          `bg-gradient-to-r ${from} ${to}`,
          // Apply selected hover effect
          hoverClasses[hoverEffect],
          // Custom classes passed in
          className
        )}
        {...props}
      >
        {/* Content with potential overlay effects */}
        <div className="relative z-10 flex items-center justify-center">
          {children}
        </div>
      </Button>
    );
  }
);

GradientButton.displayName = "GradientButton";

