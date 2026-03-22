"use client";

import {useFrame} from "@react-three/fiber";
import { vertexShader, fragmentShader } from "@/lib/Shaders";
import {useMemo, useRef} from "react";
import * as THREE from "three";

const BLOBS = [
    { position: [-4.5,  2.5, -2.0] as const, color: "#eacfb2", scale: 4.8, speed: 0.9  },
    { position: [ 4.0,  2.0, -2.0] as const, color: "#b6cee4", scale: 3.8, speed: 0.8  },
    { position: [-1.5, -3.5, -1.5] as const, color: "#d4c4e8", scale: 4.2, speed: 0.7  },
    { position: [ 4.5, -1.5, -2.5] as const, color: "#e8c4d4", scale: 3.4, speed: 1.0  },
];


function Blob({ position, color, scale, speed }: {
    position: readonly [number, number, number];
    color: string;
    scale: number;
    speed: number;
}) {

    const meshRef = useRef<THREE.Mesh>(null);

    const uniforms = useMemo(() => ({
        uColor: { value: new THREE.Color(color)},
        uTime:  { value: 0 }
    }), [color]);

    useFrame(({ clock }) => {
        if (!meshRef.current) return;
        const mat = meshRef.current.material as THREE.ShaderMaterial;
        mat.uniforms.uTime.value = clock.getElapsedTime() * speed;
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

export default function MeshGroup() {
    return (
        <group>
            {BLOBS.map((blob, i) => (
                <Blob key={i} {...blob} />
            ))}
        </group>
    );
}