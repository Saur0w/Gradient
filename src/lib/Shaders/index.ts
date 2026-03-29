
export const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

export const fragmentShader =  `
  precision highp float;

  uniform float uTime;
  uniform vec2  uResolution;
  uniform vec2  uMouse;       

  varying vec2 vUv;

  float hash(vec2 p) {
    p = fract(p * vec2(234.34, 435.345));
    p += dot(p, p + 34.23);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f); 

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amp   = 0.5;
    float freq  = 1.0;
    for (int i = 0; i < 5; i++) {
      value += amp * noise(p * freq);
      amp   *= 0.5;
      freq  *= 2.1;
    }
    return value;
  }
  
  float blob(vec2 uv, vec2 center, float radius) {
    float d = length(uv - center);
    return 1.0 - smoothstep(0.0, radius, d);
  }

  vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
    return a + b * cos(6.28318 * (c * t + d));
  }

  void main() {
    float aspect = uResolution.x / uResolution.y;
    vec2 uv = (vUv - 0.5) * vec2(aspect, 1.0);

    float t = uTime * 0.3;
    vec2 mouse = uMouse * vec2(aspect, 1.0) * 0.5;
    vec2 warp = vec2(
      fbm(uv * 1.2 + vec2(t * 0.6, t * 0.4)),
      fbm(uv * 1.2 + vec2(t * 0.4, t * 0.7))
    );
    vec2 warpedUv = uv + warp * 0.35;

    vec2 centerA = vec2(
      -0.3 + sin(t * 0.7) * 0.25 + mouse.x * 0.18,
       0.15 + cos(t * 0.5) * 0.20 + mouse.y * 0.12
    );
    float blobA = blob(warpedUv, centerA, 0.65);

    vec2 centerB = vec2(
       0.35 + cos(t * 0.6) * 0.20 + mouse.x * 0.12,
      -0.20 + sin(t * 0.8) * 0.22 + mouse.y * 0.18
    );
    float blobB = blob(warpedUv, centerB, 0.55);
    vec2 centerC = vec2(
      mouse.x * 0.35 + sin(t * 1.1) * 0.15,
      mouse.y * 0.35 + cos(t * 0.9) * 0.15
    );
    float blobC = blob(warpedUv, centerC, 0.38);
    
    float field = blobA * 0.6 + blobB * 0.5 + blobC * 0.7;
    field = clamp(field, 0.0, 1.0);
    
    vec3 colA = palette(
      field + t * 0.08,
      vec3(0.92, 0.88, 0.85),   
      vec3(0.12, 0.10, 0.14),   
      vec3(0.80, 0.90, 1.00),   
      vec3(0.00, 0.15, 0.30)   
    );

    vec3 colB = palette(
      field * 1.3 + t * 0.12 + 0.5,
      vec3(0.95, 0.82, 0.82), 
      vec3(0.10, 0.14, 0.12),
      vec3(1.00, 0.80, 0.90),
      vec3(0.30, 0.00, 0.10)
    );

    vec3 color = mix(colA, colB, smoothstep(0.2, 0.8, field));

    float vignette = 1.0 - smoothstep(0.45, 1.1, length(uv * vec2(0.8, 1.0)));
    color = mix(color * 0.88, color, vignette);
    float grain = hash(vUv * 220.0 + uTime * 0.6);
    grain = (grain - 0.5) * 2.0;
    color += grain * 0.045;

    gl_FragColor = vec4(color, 1.0);
  }
`;