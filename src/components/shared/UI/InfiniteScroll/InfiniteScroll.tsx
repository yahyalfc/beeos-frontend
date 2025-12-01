/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useRef, useEffect, useState } from "react";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";

import { useLoading } from "@/components/providers/LoadingProvider";

gsap.registerPlugin(Observer);

interface InfiniteScrollItem {
  content: React.ReactNode;
}

type ItemData = {
  element: HTMLDivElement;
  height: number;
  y: number;
}[];

interface InfiniteScrollProps {
  maxHeight?: string;
  negativeMargin?: string;
  items?: InfiniteScrollItem[];
  itemMinHeight?: number; // Now used as min-height instead of fixed height
  isTilted?: boolean;
  tiltDirection?: "left" | "right";
  autoplay?: boolean;
  autoplaySpeed?: number;
  autoplayDirection?: "down" | "up";
  pauseOnHover?: boolean;
  delay?: number;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  maxHeight = "100%",
  items = [],
  itemMinHeight = 150,
  isTilted = false,
  tiltDirection = "left",
  autoplay = false,
  autoplaySpeed = 0.5,
  autoplayDirection = "down",
  pauseOnHover = false,
  // delay = 0,
}) => {
  const { isLoaded } = useLoading();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const getTiltTransform = (): string => {
    if (!isTilted) return "none";
    return tiltDirection === "left"
      ? "rotateX(6deg) rotateZ(-6deg) skewX(6deg)"
      : "rotateX(6deg) rotateZ(6deg) skewX(-6deg)";
  };

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container || !isLoaded) return;
      if (items.length === 0) return;

      // Wait for items to render and get their natural heights
      const initializeScroll = () => {
        const divItems = gsap.utils.toArray<HTMLDivElement>(container.children);
        if (!divItems.length) return;

        // Measure each item's actual height and calculate positions
        // eslint-disable-next-line sonarjs/no-unused-collection
        const itemData: ItemData = [];
        let cumulativeY = 0;

        divItems.forEach((item) => {
          const itemStyle = getComputedStyle(item);
          const itemHeight = item.offsetHeight;
          const itemMarginTop = parseFloat(itemStyle.marginTop) || 20;
          const itemMarginBottom = parseFloat(itemStyle.marginBottom) || 20;

          itemData.push({
            element: item,
            height: itemHeight + itemMarginTop + itemMarginBottom,
            y: cumulativeY,
          });

          // Set initial position
          gsap.set(item, { y: cumulativeY });

          cumulativeY += itemHeight + itemMarginTop;
        });

        const totalHeight = cumulativeY;
        const wrapFn = gsap.utils.wrap(-totalHeight / 2, totalHeight / 2);

        const observer = Observer.create({
          target: container,
          type: "wheel,touch,pointer",
          preventDefault: true,
          onPress: ({ target }) => {
            (target as HTMLElement).style.cursor = "grabbing";
          },
          onRelease: ({ target }) => {
            (target as HTMLElement).style.cursor = "grab";
          },
          onChange: ({ deltaY, isDragging, event }) => {
            const d = event.type === "wheel" ? -deltaY : deltaY;
            const distance = isDragging ? d * 5 : d * 10;

            divItems.forEach((child) => {
              gsap.to(child, {
                duration: 0.5,
                ease: "expo.out",
                y: `+=${distance}`,
                modifiers: {
                  y: gsap.utils.unitize(wrapFn),
                },
              });
            });
          },
        });

        let rafId: number;
        if (autoplay) {
          const directionFactor = autoplayDirection === "down" ? 1 : -1;
          const speedPerFrame = autoplaySpeed * directionFactor;

          const tick = () => {
            divItems.forEach((child) => {
              gsap.set(child, {
                y: `+=${speedPerFrame}`,
                modifiers: {
                  y: gsap.utils.unitize(wrapFn),
                },
              });
            });
            rafId = requestAnimationFrame(tick);
          };

          rafId = requestAnimationFrame(tick);

          if (pauseOnHover) {
            const stopTicker = () => rafId && cancelAnimationFrame(rafId);
            const startTicker = () => {
              rafId = requestAnimationFrame(tick);
            };

            container.addEventListener("mouseenter", stopTicker);
            container.addEventListener("mouseleave", startTicker);

            return () => {
              observer.kill();
              stopTicker();
              container.removeEventListener("mouseenter", stopTicker);
              container.removeEventListener("mouseleave", startTicker);
            };
          } else {
            return () => {
              observer.kill();
              rafId && cancelAnimationFrame(rafId);
            };
          }
        }

        return () => {
          observer.kill();
          if (rafId) cancelAnimationFrame(rafId);
        };
      };

      // Use a slight delay to ensure all content is rendered and measured correctly
      const timeoutId = setTimeout(() => {
        const cleanup = initializeScroll();
        setIsInitialized(true);

        return () => {
          if (cleanup) cleanup();
        };
      }, 10);

      return () => {
        clearTimeout(timeoutId);
      };
    },
    {
      scope: wrapperRef,
      dependencies: [isLoaded],
    }
  );

  // Reset initialization when items change
  useEffect(() => {
    setIsInitialized(false);
  }, [items]);

  return (
    <>
      <style>
        {`
          .infinite-scroll-wrapper {
            max-height: ${maxHeight};
            overflow: hidden;
          }

          .infinite-scroll-container {
            width: full;
            cursor: grab;
          }

          .infinite-scroll-container:active {
            cursor: grabbing;
          }

          .infinite-scroll-item {
            min-height: ${itemMinHeight}px;
            height: auto;
            margin: 0;
            /* Ensure items don't collapse or have layout issues */
            box-sizing: border-box;
          }

          /* Optional: smooth transitions for content changes */
          .infinite-scroll-item * {
            max-width: 100%;
            word-wrap: break-word;
          }
        `}
      </style>

      <div
        ref={wrapperRef}
        className="infinite-scroll-wrapper w-full h-full inset-0"
      >
        <div
          ref={containerRef}
          className="infinite-scroll-container w-full h-full inset-0"
          style={{
            transform: getTiltTransform(),
            opacity: isInitialized ? 1 : 0.8, // Slight visual feedback during initialization
            transition: isInitialized ? "none" : "opacity 0.2s ease",
          }}
        >
          {items.map((item, i) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              className="infinite-scroll-item absolute left-0 right-0"
            >
              {item.content}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default InfiniteScroll;
