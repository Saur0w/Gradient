"use client";

import {} from "@react-three/fiber";

export default function Mesh() {
    return (
        <group>
            <mesh
                position={[4, 0, 0]}
            >
                <planeGeometry args={[2, 2]} />
                <meshBasicMaterial color="purple"/>
            </mesh>
        </group>
    )
}