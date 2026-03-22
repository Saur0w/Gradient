"use client";

import {useFrame} from "@react-three/fiber";
import { vertexShader, fragmentShader } from "@/lib/Shaders";
import {useMemo, useRef} from "react";
import * as THREE from "three";

const BLOBS = [
    { position: [-5.5,  3.0, -2.0] as const, color: "#ff5500", scale: 2.6, speed: 0.9  },
    { position: [ 5.0, -2.5, -1.5] as const, color: "#4400ff", scale: 2.8, speed: 0.65 },
    { position: [-3.0, -4.0,  0.0] as const, color: "#00e5ff", scale: 2.2, speed: 1.2  },
    { position: [ 4.5,  4.0, -3.0] as const, color: "#ff0080", scale: 2.0, speed: 1.0  },
    { position: [ 0.0,  0.5, -4.0] as const, color: "#ffcc00", scale: 1.8, speed: 0.75 },
];

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