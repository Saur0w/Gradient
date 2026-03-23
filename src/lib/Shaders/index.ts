export const vertexShader = `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`;

export const fragmentShader = `
  uniform vec2 uResolution;
  uniform vec3 uColorA;
  uniform vec3 uColorB;

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution;
    vec3 color = mix(uColorA, uColorB, uv.y);
    gl_FragColor = vec4(color, 1.0);
  }
`;