"use client";

import {useFrame} from "@react-three/fiber";
import { vertexShader, fragmentShader } from "@/lib/Shaders";
import {useMemo, useRef} from "react";
import * as THREE from "three";

const BLOBS = [
    { position: [-3.2,  1.0, -1.0] as const, color: '#f4d8ca', scale: 5.9, speed: .3},
    { position: [ 2.0, -0.8, -0.5] as const, color: '#536ae6', scale: 3.1, speed: 0.7 },
    { position: [ 0.2,  1.8, -2.0] as const, color: '#20e8c0', scale: 2.5, speed: .3 },
    { position: [-1.0, -2.0,  0.5] as const, color: '#ff30a0', scale: 1.7, speed: 0.9 },
    { position: [ 2.5,  1.5, -1.5] as const, color: '#eac25a', scale: 4.3, speed: .5 },
]

function Blob({ position, color, scale, speed }: typeof BLOBS[number]) {
    const meshRef = useRef<THREE.Mesh>(null);
    const smoothMouse = useRef(new THREE.Vector2(0, 0));
    const targetMouse = useRef(new THREE.Vector2(0, 0));
    const mouseStrength = useRef(0);

    const uniforms = useMemo(() => ({
        uTime:  { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uMouseStrength: { value: 0 },
        uColor: { value: new THREE.Color(color) },
    }), [color]);

    useFrame(({ clock, pointer }) => {
        if (!meshRef.current) return

        targetMouse.current.set(pointer.x, pointer.y);
        smoothMouse.current.lerp(targetMouse.current, 0.06);
        const speed2 = targetMouse.current.distanceTo(smoothMouse.current);
        mouseStrength.current += (Math.min(speed2 * 8, 1.8) - mouseStrength.current) * 0.08;

        const mat = meshRef.current.material as THREE.ShaderMaterial
        mat.uniforms.uTime.value = clock.getElapsedTime() * speed
        mat.uniforms.uMouse.value.set(pointer.x, pointer.y)
        mat.uniforms.uMouseStrength.value = mouseStrength.current;
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