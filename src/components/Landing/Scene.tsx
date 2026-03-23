"use client";

import { Canvas } from "@react-three/fiber";
import MeshGroup from "./Mesh";

export default function Scene() {
    return (
        <div style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            filter: "blur(30px) saturate(1.4) brightness(1.1)",
            transform: "scale(1.12)",
        }}>
            <Canvas
                style={{ width: "100%", height: "100%" }}
                camera={{ position: [0, 0, 10], fov: 60 }}
                dpr={[1, 1.5]}
                gl={{ antialias: false }}
            >
                <MeshGroup />
            </Canvas>
        </div>
    );
}