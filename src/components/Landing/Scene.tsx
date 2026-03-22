"use client";

import { Canvas } from "@react-three/fiber";
import { EffectComposer, TiltShift2 } from '@react-three/postprocessing'
import { KernelSize } from 'postprocessing';
import Meshes from "./Mesh";

export default function Scene() {
    return (
        <Canvas>
            <Meshes />
            <EffectComposer>
                <TiltShift2 kernelSize={KernelSize.SMALL} />
            </EffectComposer>
        </Canvas>
    );
}
