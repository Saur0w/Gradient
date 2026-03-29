"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { vertexShader, fragmentShader } from "@/lib/Shaders";
import * as THREE from "three";
import { useMemo } from "react";

export default function Mesh() {
    const { size } = useThree();

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(size.width, size.height)},
        uMouse: { value: new THREE.Vector2(0, 0)},
        uColorA: { value: new THREE.Vector3(1.0, 0.9, 0.88) },
        uColorB: { value: new THREE.Vector3(0.96, 0.6, 0.7) },
    }), []); // eslint-disable-line react-hooks/exhaustive-deps

    useFrame(({ clock, size: s }) => {
        //eslint-disable-next-line
        uniforms.uTime.value = clock.getElapsedTime();
        uniforms.uResolution.value.set(s.width, s.height);
    });

    const handleMouseMove = (e: THREE.Event) => {
        const { clientX, clientY } = e as unknown as PointerEvent;
        uniforms.uMouse.value.set(
            (clientX / size.width)  *  2 - 1,
            -(clientY / size.height) *  2 + 1,
        );
    };

    return (
        <mesh onPointerMove={handleMouseMove}>
            <planeGeometry args={[2, 2]} />
            <shaderMaterial vertexShader={vertexShader}
                            fragmentShader={fragmentShader}
                            uniforms={uniforms}
                            depthWrite={false}/>
        </mesh>
    );
}