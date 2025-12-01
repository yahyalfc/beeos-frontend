import React, { useEffect, useRef, useState } from "react";

const GradientBackground = ({
  // Configuration props
  backgroundColor = "#080a0c",
  accentColor1 = "#1C3443",
  accentColor2 = "#142631",
  accentColor3 = "#0A283A",
  orbSize = 0.4,
  blur = 0.6,
  speed = 0.0001,
  intensity = 0.8,
  className = "",
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const glRef = useRef(null);
  const programRef = useRef(null);
  const startTimeRef = useRef(Date.now());
  const [isClient, setIsClient] = useState(false);

  // Vertex shader - positions vertices
  const vertexShaderSource = `
    attribute vec2 a_position;
    void main() {
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `;

  // Fragment shader - creates smooth gradient orbs with full screen coverage
  const fragmentShaderSource = `
    precision mediump float;
    uniform vec2 u_resolution;
    uniform float u_time;
    uniform vec3 u_backgroundColor;
    uniform vec3 u_accentColor1;
    uniform vec3 u_accentColor2;
    uniform vec3 u_accentColor3;
    uniform float u_orbSize;
    uniform float u_blur;
    uniform float u_speed;
    uniform float u_intensity;
    
    // Smooth minimum function for blending
    float smin(float a, float b, float k) {
      float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
      return mix(b, a, h) - k * h * (1.0 - h);
    }
    
    // Distance function for a circle
    float sdCircle(vec2 p, vec2 center, float radius) {
      return length(p - center) - radius;
    }
    
    void main() {
      vec2 st = gl_FragCoord.xy / u_resolution.xy;
      vec2 coord = st * 2.0 - 1.0;
      float aspectRatio = u_resolution.x / u_resolution.y;
      coord.x *= aspectRatio;
      
      float t = u_time * u_speed;
      
      // Calculate screen bounds to ensure full coverage
      float maxX = aspectRatio * 1.2; // Extra margin to ensure corners are covered
      float maxY = 1.2;
      
      // More complex motion patterns that cover the entire screen
      vec2 orb1 = vec2(
        sin(t * 0.7) * maxX + cos(t * 0.3) * maxX * 0.3,
        cos(t * 0.5) * maxY + sin(t * 0.8) * maxY * 0.2
      );
      
      vec2 orb2 = vec2(
        sin(t * 0.5 + 2.1) * maxX * 0.9 + sin(t * 1.1) * maxX * 0.4,
        cos(t * 0.3 + 2.1) * maxY + cos(t * 0.9) * maxY * 0.3
      );
      
      vec2 orb3 = vec2(
        sin(t * 0.3 + 4.2) * maxX + cos(t * 0.7) * maxX * 0.5,
        cos(t * 0.6 + 4.2) * maxY * 0.8 + sin(t * 0.4) * maxY * 0.4
      );
      
      // Additional orbs for better coverage
      vec2 orb4 = vec2(
        sin(t * 0.4 + 1.0) * maxX * 1.1 + sin(t * 0.9) * maxX * 0.2,
        cos(t * 0.7 + 1.0) * maxY * 0.9 + cos(t * 0.5) * maxY * 0.3
      );
      
      vec2 orb5 = vec2(
        sin(t * 0.6 + 3.5) * maxX * 0.8 + cos(t * 0.4) * maxX * 0.6,
        cos(t * 0.4 + 3.5) * maxY * 1.1 + sin(t * 0.7) * maxY * 0.2
      );
      
      // Calculate distances to orbs
      float d1 = sdCircle(coord, orb1, u_orbSize);
      float d2 = sdCircle(coord, orb2, u_orbSize * 0.8);
      float d3 = sdCircle(coord, orb3, u_orbSize * 1.2);
      float d4 = sdCircle(coord, orb4, u_orbSize * 0.9);
      float d5 = sdCircle(coord, orb5, u_orbSize * 1.1);
      
      // Smooth blend between all orbs
      float d = smin(d1, smin(d2, smin(d3, smin(d4, d5, u_blur), u_blur), u_blur), u_blur);
      
      // Create smooth gradient falloff
      float gradient = 1.0 - smoothstep(0.0, u_blur * 2.5, d);
      gradient = pow(gradient, 2.2 - u_intensity);
      
      // Mix colors based on position and distance
      vec3 color = u_backgroundColor;
      
      if (gradient > 0.001) {
        // Determine which orb influences the color most
        float influence1 = exp(-d1 * 2.5);
        float influence2 = exp(-d2 * 2.5);
        float influence3 = exp(-d3 * 2.5);
        float influence4 = exp(-d4 * 2.5);
        float influence5 = exp(-d5 * 2.5);
        float totalInfluence = influence1 + influence2 + influence3 + influence4 + influence5;
        
        if (totalInfluence > 0.0) {
          // Create color variation based on position
          vec3 color1Var = u_accentColor1 * (1.0 + sin(t * 0.5) * 0.2);
          vec3 color2Var = u_accentColor2 * (1.0 + cos(t * 0.7) * 0.2);
          vec3 color3Var = u_accentColor3 * (1.0 + sin(t * 0.3) * 0.2);
          
          vec3 orbColor = (
            color1Var * influence1 +
            color2Var * influence2 +
            color3Var * influence3 +
            mix(color1Var, color2Var, 0.5) * influence4 +
            mix(color2Var, color3Var, 0.5) * influence5
          ) / totalInfluence;
          
          color = mix(u_backgroundColor, orbColor, gradient * u_intensity);
        }
      }
      
      // Add subtle animated vignette
      float vignette = 1.0 - length(st - 0.5) * 0.3 * (1.0 + sin(t * 0.2) * 0.1);
      color *= vignette;
      
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  // Convert hex color to RGB array
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? [
          parseInt(result[1], 16) / 255,
          parseInt(result[2], 16) / 255,
          parseInt(result[3], 16) / 255,
        ]
      : [1, 0, 0];
  };

  // Create and compile shader
  const createShader = (gl, type, source) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error("Shader compilation error:", gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  };

  // Create shader program
  const createProgram = (gl, vertexShader, fragmentShader) => {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program linking error:", gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return null;
    }

    return program;
  };

  // Initialize WebGL
  const initWebGL = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext("webgl", {
        alpha: false,
        antialias: false,
        preserveDrawingBuffer: false,
        powerPreference: "high-performance",
      }) || canvas.getContext("experimental-webgl");

    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    // Create shaders
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(
      gl,
      gl.FRAGMENT_SHADER,
      fragmentShaderSource
    );

    if (!vertexShader || !fragmentShader) return;

    // Create program
    const program = createProgram(gl, vertexShader, fragmentShader);
    if (!program) return;

    // Store references
    glRef.current = gl;
    programRef.current = program;

    // Create buffer for full-screen quad
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [-1, -1, 1, -1, -1, 1, 1, 1];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    // Get attribute location
    const positionAttributeLocation = gl.getAttribLocation(
      program,
      "a_position"
    );
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    return true;
  };

  // Render frame
  const render = () => {
    const gl = glRef.current;
    const program = programRef.current;
    const canvas = canvasRef.current;

    if (!gl || !program || !canvas) return;

    // Resize canvas if needed
    if (
      canvas.width !== canvas.clientWidth ||
      canvas.height !== canvas.clientHeight
    ) {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    }

    // Use program
    gl.useProgram(program);

    // Set uniforms
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    gl.uniform2f(resolutionLocation, canvas.width, canvas.height);

    const timeLocation = gl.getUniformLocation(program, "u_time");
    gl.uniform1f(timeLocation, Date.now() - startTimeRef.current);

    // Set color uniforms
    const bgColorLocation = gl.getUniformLocation(program, "u_backgroundColor");
    gl.uniform3fv(bgColorLocation, hexToRgb(backgroundColor));

    const color1Location = gl.getUniformLocation(program, "u_accentColor1");
    gl.uniform3fv(color1Location, hexToRgb(accentColor1));

    const color2Location = gl.getUniformLocation(program, "u_accentColor2");
    gl.uniform3fv(color2Location, hexToRgb(accentColor2));

    const color3Location = gl.getUniformLocation(program, "u_accentColor3");
    gl.uniform3fv(color3Location, hexToRgb(accentColor3));

    // Set other uniforms
    const orbSizeLocation = gl.getUniformLocation(program, "u_orbSize");
    gl.uniform1f(orbSizeLocation, orbSize);

    const blurLocation = gl.getUniformLocation(program, "u_blur");
    gl.uniform1f(blurLocation, blur);

    const speedLocation = gl.getUniformLocation(program, "u_speed");
    gl.uniform1f(speedLocation, speed);

    const intensityLocation = gl.getUniformLocation(program, "u_intensity");
    gl.uniform1f(intensityLocation, intensity);

    // Draw
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    // Continue animation
    animationRef.current = requestAnimationFrame(render);
  };

  // Handle SSR
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialize and start animation
  useEffect(() => {
    if (!isClient) return;

    if (initWebGL()) {
      render();
    }

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (glRef.current && programRef.current) {
        glRef.current.deleteProgram(programRef.current);
      }
    };
  }, [
    isClient,
    backgroundColor,
    accentColor1,
    accentColor2,
    accentColor3,
    orbSize,
    blur,
    speed,
    intensity,
  ]);

  // Handle window resize
  useEffect(() => {
    if (!isClient) return;

    const handleResize = () => {
      const canvas = canvasRef.current;
      const gl = glRef.current;
      if (canvas && gl) {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isClient]);

  if (!isClient) {
    return <div className={`fixed inset-0 bg-black ${className}`} />;
  }

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full ${className}`}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        pointerEvents: "none",
      }}
    />
  );
};

export default GradientBackground;