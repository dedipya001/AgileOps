import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import "./LiquidOcean.css";

function OceanPlane({ accentColor, rotationSpeed }) {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (!meshRef.current) return;

    meshRef.current.rotation.z += rotationSpeed;

    const material = meshRef.current.material;
    material.uniforms.uTime.value = t;
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[8, 8, 128, 128]} />

      <shaderMaterial
        transparent
        uniforms={{
          uTime: { value: 0 },
          uColor: { value: new THREE.Color(accentColor) },
        }}
        vertexShader={`
          uniform float uTime;

          void main() {
            vec3 pos = position;

            pos.z += sin(pos.x * 2.0 + uTime) * 0.3;
            pos.z += cos(pos.y * 2.0 + uTime) * 0.3;

            gl_Position = projectionMatrix *
                          modelViewMatrix *
                          vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec3 uColor;

          void main() {
            gl_FragColor = vec4(uColor, 0.35);
          }
        `}
      />
    </mesh>
  );
}

export default function LiquidOcean({
  backgroundColor = 0x0a0a1a,
  accentColor = 0x9933ff,
  rotationSpeed = 0.002,
}) {
  return (
    <div className="ocean-layer">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <color attach="background" args={[backgroundColor]} />
        <OceanPlane
          accentColor={accentColor}
          rotationSpeed={rotationSpeed}
        />
      </Canvas>
    </div>
  );
}
