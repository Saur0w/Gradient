"use client";

import { Canvas } from "@react-three/fiber";
import Mesh from "./Mesh";
import { Suspense } from "react";

export default function Scene() {
    return (
        <Canvas camera={{ position: [0, 0, 2] }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <Suspense fallback={null}>
                <Mesh />
            </Suspense>
        </Canvas>
    )
}