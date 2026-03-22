"use client";

import {} from "@react-three/fiber";
import { vertexShader, fragmentShader } from "@/lib/Shaders";

const BLOBS = [
    { position: [-5.5,  3.0, -2.0] as const, color: "#ff5500", scale: 3.8, speed: 0.9  },
    { position: [ 5.0, -2.5, -1.5] as const, color: "#4400ff", scale: 4.0, speed: 0.65 },
    { position: [-3.0, -4.0,  0.0] as const, color: "#00e5ff", scale: 3.4, speed: 1.2  },
    { position: [ 4.5,  4.0, -3.0] as const, color: "#ff0080", scale: 3.2, speed: 1.0  },
    { position: [ 0.0,  0.5, -4.0] as const, color: "#ffcc00", scale: 2.8, speed: 0.75 },
];

export default function MeshGroup() {
    return (
        <group>
            {BLOBS.map((blob, i) => (
                <mesh key={i} position={blob.position} scale={blob.scale}>
                    <sphereGeometry args={[1, 128, 128]} />
                    <shaderMaterial
                        vertexShader={vertexShader}
                        fragmentShader={fragmentShader}
                    />
                </mesh>
            ))}
        </group>
    );
}