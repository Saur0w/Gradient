export const vertexShader = `
  varying vec3 vPosition;

  void main() {
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const fragmentShader = `
  uniform vec3  uColor;
  uniform float uTime;
  varying vec3  vPosition;

  float hash(vec2 p) {
    p = fract(p * vec2(234.34, 435.345));
    p += dot(p, p + 34.23);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i + vec2(0,0)), hash(i + vec2(1,0)), u.x),
      mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x),
      u.y
    );
  }

  void main() {
    vec2  noiseUV = vPosition.xy * 0.08 + uTime * 0.03;
    float grain   = noise(noiseUV);

    vec3 color = mix(uColor * 0.92, uColor * 1.08, grain);

    gl_FragColor = vec4(color, 1.0);
  }
`;