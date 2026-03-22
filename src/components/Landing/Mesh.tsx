"use client";

import {} from "@react-three/fiber";
import { vertexShader, fragmentShader } from "@/lib/Shaders";
import {useMemo} from "react";
import * as THREE from "three";

const BLOBS = [
    { position: [-5.5,  3.0, -2.0] as const, color: "#ff5500", scale: 3.8, speed: 0.9  },
    { position: [ 4.5,   3.0, -2.0] as const, color: "#3fefcc", scale: 3.8, speed: 0.8 }
];


function Blob({ position, color, scale }: {
    position: readonly [number, number, number];
    color: string;
    scale: number;
    speed: number;
}) {
    const uniforms = useMemo(() => ({
        uColor: { value: new THREE.Color(color)}
    }), [color]);

    return (
        <mesh position={position} scale={scale}>
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