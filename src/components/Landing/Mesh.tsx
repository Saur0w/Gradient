"use client";

import { useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { vertexShader, fragmentShader } from "@/lib/Shaders";
import * as THREE from "three";

export default function Mesh() {
    const { size } = useThree();

    const uniforms = useMemo(() => ({
        uTime:       { value: 0 },
        uResolution: { value: new THREE.Vector2(size.width, size.height) },
        uMouse:      { value: new THREE.Vector2(0, 0) },
    }), []); // eslint-disable-line react-hooks/exhaustive-deps

    const mouseTarget = useMemo(() => new THREE.Vector2(0, 0), []);

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            mouseTarget.set(
                (e.clientX / window.innerWidth)  *  2 - 1,
                -(e.clientY / window.innerHeight) *  2 + 1,
            );
        };
        window.addEventListener("mousemove", onMove);
        return () => window.removeEventListener("mousemove", onMove);
    }, [mouseTarget]);

    useFrame(({ clock, size: s }) => {
        //eslint-disable-next-line
        uniforms.uTime.value = clock.getElapsedTime();
        uniforms.uResolution.value.set(s.width, s.height);
        uniforms.uMouse.value.lerp(mouseTarget, 0.04);
    });

    return (
        <mesh>
            <planeGeometry args={[2, 2]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                depthWrite={false}
            />
        </mesh>
    );
}