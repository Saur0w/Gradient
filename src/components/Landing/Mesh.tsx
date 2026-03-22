"use client";

import { } from "@react-three/fiber";

export default function Mesh() {
    return (
      <group>
          <mesh>
              <boxGeometry />
              <meshStandardMaterial color="hotpink"/>
          </mesh>
          <mesh></mesh>
      </group>
    );
}