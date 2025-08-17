type ScrollBehavior = "auto" | "smooth";
type ScrollPosition = "start" | "center" | "end" | "nearest";

interface SmoothScrollOptions {
  behavior?: ScrollBehavior;

  block?: ScrollPosition;

  inline?: ScrollPosition;

  offset?: number;

  duration?: number;

  onComplete?: () => void;

  focusAfterScroll?: boolean;

  easing?: (t: number) => number;
}


const easingFunctions = {
  linear: (t: number): number => t,
  easeInQuad: (t: number): number => t * t,
  easeOutQuad: (t: number): number => t * (2 - t),
  easeInOutQuad: (t: number): number =>
    t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  easeInCubic: (t: number): number => t * t * t,
  easeOutCubic: (t: number): number => --t * t * t + 1,
  easeInOutCubic: (t: number): number =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
} as const;

const getElement = (selector: string): HTMLElement | null => {
  if (!selector || typeof selector !== "string") {
    console.error("SmoothScroll: Invalid selector provided");
    return null;
  }

  const cleanSelector = selector.trim();

  try {
    // Try as ID first (most common use case)
    if (cleanSelector.startsWith("#") || !cleanSelector.startsWith(".")) {
      const id = cleanSelector.startsWith("#")
        ? cleanSelector.slice(1)
        : cleanSelector;
      const element = document.getElementById(id);
      if (element) return element;
    }

    // Try as class or any valid CSS selector
    const element = document.querySelector<HTMLElement>(cleanSelector);
    return element;
  } catch (error) {
    console.error("SmoothScroll: Invalid selector syntax", error);
    return null;
  }
};

/**
 * Calculate the target scroll position with offset
 */
const calculateScrollPosition = (
  element: HTMLElement,
  offset = 0
): number => {
  const rect = element.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return rect.top + scrollTop - offset;
};

/**
 * Custom smooth scroll implementation with duration control
 */
const animatedScroll = (
  targetPosition: number,
  duration = 800,
  easing: (t: number) => number = easingFunctions.easeInOutCubic,
  onComplete?: () => void
): void => {
  const startPosition =
    window.pageYOffset || document.documentElement.scrollTop;
  const distance = targetPosition - startPosition;
  const startTime = performance.now();

  const scroll = (currentTime: number): void => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easing(progress);

    window.scrollTo({
      top: startPosition + distance * easedProgress,
      behavior: "auto",
    });

    if (progress < 1) {
      requestAnimationFrame(scroll);
    } else {
      onComplete?.();
    }
  };

  requestAnimationFrame(scroll);
};


export const smoothScrollTo = async (
  selector: string,
  options: SmoothScrollOptions = {}
): Promise<boolean> => {
  // Default options
  const {
    behavior = "smooth",
    block = "start",
    inline = "nearest",
    offset = 0,
    duration,
    onComplete,
    focusAfterScroll = false,
    easing = easingFunctions.easeInOutCubic,
  } = options;

  // Validate environment
  if (typeof window === "undefined") {
    console.warn("SmoothScroll: Window is undefined (SSR context)");
    return false;
  }

  const element = getElement(selector);
  if (!element) {
    console.error(`SmoothScroll: Element not found for selector "${selector}"`);
    return false;
  }

  try {
    if (duration && duration > 0) {
      const targetPosition = calculateScrollPosition(element, offset);

      return new Promise<boolean>((resolve) => {
        animatedScroll(targetPosition, duration, easing, () => {
          if (focusAfterScroll && element.tabIndex === -1) {
            element.tabIndex = -1;
            element.focus();
          }
          onComplete?.();
          resolve(true);
        });
      });
    }

    if (offset !== 0) {
      const targetPosition = calculateScrollPosition(element, offset);

      window.scrollTo({
        top: targetPosition,
        behavior,
      });
    } else {
      element.scrollIntoView({
        behavior,
        block,
        inline,
      });
    }

    if (focusAfterScroll) {
      if (element.tabIndex === -1) {
        element.tabIndex = -1;
      }

      setTimeout(
        () => {
          element.focus();
          onComplete?.();
        },
        behavior === "smooth" ? 500 : 0
      );
    } else {
      setTimeout(
        () => {
          onComplete?.();
        },
        behavior === "smooth" ? 500 : 0
      );
    }

    return true;
  } catch (error) {
    console.error("SmoothScroll: Error during scrolling", error);
    return false;
  }
};