export const vertexShader = `
  
  void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

export const fragmentShader = `
  uniform vec3  uColor;
 
  void main() {
      gl_FragColor  = vec4(color, 1.0);
  }
`;