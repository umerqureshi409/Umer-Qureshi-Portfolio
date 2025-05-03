
import { useState, useEffect, useRef, RefObject } from 'react';

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useInView(elementRef: RefObject<Element>, options: UseInViewOptions = {}) {
  const { threshold = 0, rootMargin = '0px', once = false } = options;
  const [isInView, setIsInView] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Clean up previous observer
    if (observer.current) {
      observer.current.disconnect();
    }

    // Create new observer
    observer.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // If once is true, disconnect after first intersection
          if (once && observer.current) {
            observer.current.disconnect();
          }
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.current.observe(element);

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [elementRef, threshold, rootMargin, once]);

  return isInView;
}
