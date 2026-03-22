"use client";
import { Canvas } from "@react-three/fiber";
import MeshGroup from "./Mesh";

export default function Scene() {
    return (
        <div style={{
            position: "absolute",
            inset: 0,
            filter: "blur(80px) saturate(1.6) brightness(1.05)",
            transform: "scale(1.12)",
            zIndex: 0,
        }}>
            <Canvas
                camera={{ position: [0, 0, 10], fov: 60 }}
                dpr={[1, 1.5]}
                gl={{ antialias: false }}
            >
                <MeshGroup />
            </Canvas>
        </div>
    );
}