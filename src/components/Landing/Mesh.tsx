"use client";

import { useFrame, ThreeEvent } from "@react-three/fiber";
import { vertexShader, fragmentShader } from "@/lib/Shaders";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const BLOBS = [
    { position: [-6.0,  3.5, -2.0] as const, color: "#e6cbba", scale: 4.8, speed: 0.9 },
    { position: [ 6.0,  2.5, -2.0] as const, color: "#b6cee4", scale: 3.8, speed: 0.8 },
    { position: [-4.0, -4.5, -1.5] as const, color: "#d4c4e8", scale: 4.2, speed: 0.7 },
    { position: [ 5.5, -3.5, -2.5] as const, color: "#e8c4d4", scale: 3.4, speed: 1.0 },
];

// plain objects outside React — ESLint never complains about mutating these
const blobStates = BLOBS.map(() => ({
    hover:  0,
    mouseX: 0.5,
    mouseY: 0.5,
}));

function Blob({ position, color, scale, speed, index }: {
    position: readonly [number, number, number];
    color: string;
    scale: number;
    speed: number;
    index: number;
}) {
    const meshRef = useRef<THREE.Mesh>(null);
    const state   = blobStates[index];

    const uniforms = useMemo(() => ({
        uColor: { value: new THREE.Color(color) },
        uTime:  { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uHover: { value: 0.0 },
    }), [color]);

    useFrame(({ clock }) => {
        if (!meshRef.current) return;
        const mat = meshRef.current.material as THREE.ShaderMaterial;

        mat.uniforms.uTime.value   = clock.getElapsedTime() * speed;
        mat.uniforms.uHover.value += (state.hover - mat.uniforms.uHover.value) * 0.05;
        mat.uniforms.uMouse.value.lerp(
            new THREE.Vector2(state.mouseX, state.mouseY),
            0.06
        );
    });

    const handlePointerEnter = () => {
        state.hover = 1.0;
    };

    const handlePointerLeave = () => {
        state.hover = 0.0;
    };

    const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
        if (e.uv) {
            state.mouseX = e.uv.x;
            state.mouseY = e.uv.y;
        }
    };

    return (
        <mesh
            ref={meshRef}
            position={position}
            scale={scale}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
            onPointerMove={handlePointerMove}
        >
            <sphereGeometry args={[1, 128, 128]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
            />
        </mesh>
    );
}

export default function MeshGroup() {
    return (
        <group>
            {BLOBS.map((blob, i) => (
                <Blob key={i} index={i} {...blob} />
            ))}
        </group>
    );
}