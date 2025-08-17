"use client";

import { useGLTF, useAnimations, useProgress } from "@react-three/drei";
import React, { useRef, useEffect, useImperativeHandle, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Model({ ...props }) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/Bee.glb");
  const { actions, mixer } = useAnimations(animations, group);

  const initialPositioning = {
    x: 1,
    y: -5.5,
    z: 0,
  };

  const initialRotation = {
    x: -(Math.PI / 12),
    y: -(Math.PI / 2),
    z: 0.1,
  };

  const initialScale = 12;

  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const firstAction = Object.values(actions)[0];

      firstAction?.reset().setDuration(5).fadeIn(0.1).play();
    }
    return () => {
      mixer?.stopAllAction();
    };
  }, [actions, mixer]);

  useGSAP(
    () => {
      if (!group.current) return;

      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      gsap.set(group.current.position, initialPositioning);
      gsap.set(group.current.rotation, initialRotation);
      gsap.set(group.current.scale, { x: 1, y: 1, z: 1 });

      const allMaterials = Object.values(materials);
      allMaterials.forEach((material) => {
        material.transparent = true;
        material.opacity = 1;
      });

      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: "top 45%",
          end: `+=${window.innerHeight * 5.5}`,
          scrub: 1.5,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            if (group.current.material) {
              group.current.material.opacity = 0.3 + 0.7 * progress;
            }
          },
        },
      });

      // Phase 1: Initial movement with scale up
      masterTl
        .to(group.current.position, {
          x: -1,
          y: -2,
          z: 0,
          duration: 1,
          ease: "sine.in",
        })
        .to(
          group.current.rotation,
          {
            y: -(Math.PI / 12),
            z: Math.PI / 36,
            duration: 0.9,
            ease: "sine.inOut",
          },
          0
        )
        .to(
          group.current.scale,
          {
            x: 14,
            y: 14,
            z: 14,
            duration: 1.0,
            ease: "sine.out",
          },
          0
        );

      // Phase 2: Orbital movement
      masterTl
        .to(group.current.position, {
          x: -11,
          y: 2.3,
          z: -8,
          duration: 1.1,
          ease: "sine.in",
          onUpdate: function () {
            const progress = this.progress();
            group.current.position.y += Math.sin(progress * Math.PI * 2) * 0.1;
          },
        })
        .to(
          group.current.rotation,
          {
            x: Math.PI / 24,
            y: Math.PI / 4,
            z: -Math.PI / 48,
            duration: 1.1,
            ease: "sine.in",
          },
          "-=1.1"
        );

      // Phase 3: Spiral motion with scaling
      masterTl
        .to(
          group.current.position,
          {
            x: 2,
            y: 1.0,
            z: -7,
            duration: 1.2,
            ease: "sine.in",
            onUpdate: function () {
              // Add subtle floating motion
              const progress = this.progress();
              group.current.position.y +=
                Math.sin(progress * Math.PI * 2) * 0.1;
            },
          },
          "-=0"
        )
        .to(
          group.current.rotation,
          {
            x: Math.PI / 20,
            y: Math.PI / 48,
            z: -Math.PI / 24,
            duration: 0.9,
            ease: "sine.in",
          },
          "-=0.85"
        )
        .to(
          allMaterials.map((material) => material),
          {
            opacity: 0,
            duration: 0.55,
            ease: "sine.inOut",
          },
          "-=0.8"
        );

      // Phase 3.5: Cleaning after prev phase
      masterTl.to(group.current.position, {
        x: 10,
        y: -4.0,
        z: -7,
        duration: 0.2,
        ease: "sine.in",
      });
      masterTl.to(
        group.current.rotation,
        {
          x: Math.PI / 12,
          y: -(Math.PI / 3),
          z: Math.PI / 10,
          duration: 0.2,
          ease: "sine.in",
        },
        "-=0.2"
      );

      // Phase 4 : Return to center
      masterTl
        .to(
          group.current.position,
          {
            x: 0,
            y: -1.2,
            z: -1,
            duration: 1.0, // Adjust duration as needed
            ease: "power2.inOut", // Adjust easing as needed
            onUpdate: function () {
              const progress = this.progress();
              group.current.position.y +=
                Math.sin(progress * Math.PI * 2) * 0.1;
            },
          },
          "+=0.1"
        )
        .to(
          allMaterials.map((material) => material),
          {
            opacity: 1,
            duration: 0.55,
            ease: "sine.inOut",
          },
          "-=0.6"
        )
        .to(
          group.current.rotation,
          {
            x: 0,
            y: -(Math.PI / 4),
            z: Math.PI / 14,
            duration: 0.9,
            ease: "sine.in",
          },
          "-=1.25"
        );

      // Phase 5: Exit from Assistants
      masterTl.to(
        group.current.position,
        {
          x: -12,
          y: 0,
          z: -3,
          duration: 1.2,
          ease: "power2.in",
          onUpdate: function () {
            const progress = this.progress();
            group.current.position.y += Math.sin(progress * Math.PI * 2) * 0.1;
          },
        },
        "+=0.2"
      );

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    {
      scope: [group],
    }
  );

  return (
    <group
      ref={group}
      position={[
        initialPositioning.x,
        initialPositioning.y,
        initialPositioning.z,
      ]}
      rotation={[initialRotation.x, initialRotation.y, initialRotation.z]}
      dispose={null}
      scale={initialScale}
      {...props}
    >
      <group name="Scene">
        <group name="Main_Bone" scale={0.017471}>
          <primitive object={nodes.L_f_ik_target} />
          <primitive object={nodes.L_m_ik_target} />
          <primitive object={nodes.L_b_ik_target} />
          <primitive object={nodes.Main_bone} />
          <primitive object={nodes.R_f_ik_target} />
          <primitive object={nodes.R_m_ik_target} />
          <primitive object={nodes.R_b_ik_target} />
          <primitive object={nodes.tail2002} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/Bee.glb");
