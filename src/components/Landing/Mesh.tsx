"use client";

import {useFrame} from "@react-three/fiber";
import { vertexShader, fragmentShader } from "@/lib/Shaders";
import {useMemo, useRef} from "react";
import * as THREE from "three";

const BLOBS = [
    { position: [-2.2,  1.0, -1.0] as const, color: '#ff6030', scale: 1.9, speed: 1.0 },
    { position: [ 2.0, -0.8, -0.5] as const, color: '#3050ff', scale: 2.1, speed: 0.7 },
    { position: [ 0.2,  1.8, -2.0] as const, color: '#20e8c0', scale: 1.5, speed: 1.3 },
    { position: [-1.0, -2.0,  0.5] as const, color: '#ff30a0', scale: 1.7, speed: 0.9 },
    { position: [ 2.5,  1.5, -1.5] as const, color: '#ffd020', scale: 1.3, speed: 1.1 },
];

function Blob({ position, color, scale, speed }: typeof BLOBS[number]) {
    const meshRef = useRef<THREE.Mesh>(null);

    const uniforms = useMemo(() => ({
        uTime:  { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uColor: { value: new THREE.Color(color) },
    }), [color]);

    useFrame(({ clock, pointer }) => {
        if (!meshRef.current) return
        const mat = meshRef.current.material as THREE.ShaderMaterial
        mat.uniforms.uTime.value = clock.getElapsedTime() * speed
        mat.uniforms.uMouse.value.set(pointer.x, pointer.y)
    });

    return (
        <mesh ref={meshRef} position={position} scale={scale}>
            <sphereGeometry args={[1, 128, 128]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
            />
        </mesh>
    )
}

export default function Meshes() {
    return (
        <group>
            {BLOBS.map((b, i) => (
                <Blob key={i} {...b} />
            ))}
        </group>
    )
}