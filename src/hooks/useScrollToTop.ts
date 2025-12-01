import { useLayoutEffect } from "react";

import { gsap } from 'gsap';

export const useScrollToTop = () => {
  if (typeof window !== 'undefined') {
    gsap.killTweensOf(window);
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }
  
  useLayoutEffect(() => {
    gsap.killTweensOf(window);
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    if ('ScrollTrigger' in gsap) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      (gsap as any).ScrollTrigger.refresh(true);
    }
  }, []);
};