/* eslint-disable sonarjs/pseudo-random */
"use client";

import { type FC, useRef, useState, useLayoutEffect, useCallback } from "react";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";


import { type Task } from "@/types/tasks";

import { getLinkIcon } from "./utils";
import { TaskCompleteInterface } from "../Interfaces/VectorInterfaces/TaskInterfaceComplete";
import { TaskHoverInterface } from "../Interfaces/VectorInterfaces/TaskInterfaceHover";
import { ArrowAngleIcon } from "../UI/Icons/ArrowAngle.icon";

// Particle class for effects
class Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  life: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 3 + 1;
    this.speedX = (Math.random() - 0.5) * 2;
    this.speedY = (Math.random() - 0.5) * 2;
    this.life = 1;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life -= 0.02;
    this.speedX *= 0.99;
    this.speedY *= 0.99;
  }
}

interface TaskCardProps {
  data: Task;
  onClick: (task: Task) => void;
}

export const TaskCard: FC<TaskCardProps> = ({ data: taskData, onClick }) => {
  const { taskName, reward, finished } = taskData;
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [currentState, setCurrentState] = useState<
    "default" | "hover" | "complete"
  >(finished ? "complete" : "default");

  const containerRef = useRef<HTMLDivElement>(null);
  const interfaceRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Animation refs
  const hoverTlRef = useRef<gsap.core.Timeline>(null);
  const transitionTlRef = useRef<gsap.core.Timeline>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>(0);

  // Particle animation
  const animateParticles = useCallback(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesRef.current = particlesRef.current.filter((particle) => {
      particle.update();

      if (particle.life <= 0) return false;

      ctx.save();
      ctx.globalAlpha = particle.life;
      ctx.fillStyle = finished ? "#FFD700" : "#00FFFF";
      ctx.shadowBlur = 10;
      ctx.shadowColor = finished ? "#FFD700" : "#00FFFF";
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      return true;
    });

    if (isHovered && particlesRef.current.length < 20) {
      const rect = canvas.getBoundingClientRect();
      particlesRef.current.push(
        new Particle(Math.random() * rect.width, Math.random() * rect.height)
      );
    }

    animationFrameRef.current = requestAnimationFrame(animateParticles);
  }, [isHovered, finished]);

  // Update current state
  useLayoutEffect(() => {
    let newState: "default" | "hover" | "complete";
    if (finished) {
      newState = "complete";
    } else if (isHovered) {
      newState = "hover";
    } else {
      newState = "default";
    }
    if (newState !== currentState) {
      setCurrentState(newState);
    }
  }, [finished, isHovered, currentState]);

  // Initialize canvas
  useLayoutEffect(() => {
    const canvas = particleCanvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const updateCanvasSize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    animationFrameRef.current = requestAnimationFrame(animateParticles);

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animateParticles]);

  // Main GSAP setup
  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Enhanced 3D setup
      gsap.set(containerRef.current, {
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
      });

      // Create master hover timeline
      hoverTlRef.current = gsap.timeline({ paused: true });

      // Complex hover animation sequence
      hoverTlRef.current
        .to(containerRef.current, {
          scale: 1,
          rotationY: 2,
          rotationX: -1,
          duration: 0.4,
          ease: "power3.out",
        })
        .to(
          glowRef.current,
          {
            opacity: 0.3,
            scale: 1.1,
            duration: 0.6,
            ease: "power2.out",
          },
          0
        )
        .to(
          iconRef.current,
          {
            scale: 1.2,
            rotate: 180,
            duration: 1,
            ease: "back.out(2)",
          },
          0
        )
        .to(
          particleCanvasRef.current,
          {
            opacity: 1,
            duration: 0.3,
          },
          0
        );

      return () => {
        hoverTlRef.current?.kill();
        transitionTlRef.current?.kill();
      };
    },
    { scope: containerRef }
  );

  // Hover state management
  useGSAP(
    () => {
      if (!hoverTlRef.current || finished) return;

      if (isHovered) {
        hoverTlRef.current.play();
      } else {
        hoverTlRef.current.reverse();
      }
    },
    { dependencies: [isHovered, finished] }
  );

  // Enhanced mouse handlers
  const handleMouseEnter = useCallback(() => {
    if (!finished) {
      setIsHovered(true);

      // Create ripple effect on enter
      if (containerRef.current) {
        gsap.fromTo(
          glowRef.current,
          {
            scale: 0,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 0.3,
            duration: 0.6,
            ease: "power2.out",
          }
        );
      }
    }
  }, [finished]);

  const handleMouseLeave = useCallback(() => {
    if (!finished) {
      // Delayed to prevent accidental exits
      const timeoutId = setTimeout(() => {
        setIsHovered(false);
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [finished]);

  const taskIcon = getLinkIcon(taskData.link);

  return (
    <div
      ref={containerRef}
      role="button"
      className={`flex flex-col ${
        finished ? "cursor-not-allowed" : "cursor-pointer"
      } justify-between gap-16 relative p-7 transform-gpu overflow-hidden`}
      style={{
        willChange: "transform",
        backfaceVisibility: "hidden",
        position: "relative",
      }}
      // eslint-disable-next-line react/jsx-no-bind
      onClick={!finished ? onClick.bind(null, taskData) : undefined}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow effect layer */}
      <div
        ref={glowRef}
        className="absolute inset-0 bg-gradient-radial from-accent/20 to-transparent opacity-0 pointer-events-none"
        style={{ filter: "blur(40px)" }}
      />

      {/* Particle canvas */}
      <canvas
        ref={particleCanvasRef}
        className="absolute inset-0 pointer-events-none opacity-0"
        style={{ mixBlendMode: "screen" }}
      />

      {/* Interface container */}
      <div
        ref={interfaceRef}
        style={{ transformStyle: "preserve-3d" }}
        className={`absolute inset-0 z-[1] pointer-events-none duration-500 transform-gpu ${
          isHovered ? "text-accent" : "text-transparent"
        }`}
      >
        {finished ? <TaskCompleteInterface /> : <TaskHoverInterface />}
      </div>

      {/* Content */}
      <div className="relative z-[2] flex justify-between items-start">
        <div
          className="h-10 w-10 bg-pagani text-white shrink-0 flex justify-center items-center transition-colors duration-500 data-[finished=true]:bg-accent data-[finished=true]:rotate-0 data-[finished=true]:text-black transform-gpu"
          data-finished={finished}
        >
          <span ref={iconRef} className="inline-block">
            {taskIcon}
          </span>
        </div>
        <span
          className="inline-block shrink-0 transform-gpu"
          style={{ willChange: "transform" }}
        >
          <ArrowAngleIcon />
        </span>
      </div>

      <div ref={contentRef} className="relative z-[2] flex flex-col gap-2">
        <span className="text-white text-lg block">{taskName}</span>
        <span className="text-lg font-semibold text-accent block">
          {reward} xp {finished ? "(Complete)" : null}
        </span>
      </div>
    </div>
  );
};
