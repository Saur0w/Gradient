"use client";

import { Canvas } from "@react-three/fiber";
import Mesh from "./Mesh";
import { Suspense } from "react";

export default function Scene() {
    return (
        <Canvas camera={{ position: [0, 0, 2] }}>
            <Suspense fallback={null}>
                <Mesh />
            </Suspense>
        </Canvas>
    )
}