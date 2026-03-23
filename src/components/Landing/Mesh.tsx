"use client";

import { useThree } from "@react-three/fiber";
import { vertexShader, fragmentShader } from "@/lib/Shaders";
import { useMemo } from "react";

export default function Mesh() {
    const { size } = useThree();
    const uniforms = useMemo(() => ({
        uResolution: { value: [size.width, size.height] },
        uColorA: { value: [1.0, 0.9, 0.88] },
        uColorB: { value: [0.96, 0.6, 0.7] },
    }), [size]);
    return (
        <group>
            <mesh
                position={[4, 0, 0]}
            >
                <planeGeometry args={[2, 2]} />
                <shaderMaterial
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                    uniforms={uniforms}
                    depthWrite={false}
                />
            </mesh>
        </group>
    )
}