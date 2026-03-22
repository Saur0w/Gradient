export const vertexShader = `
  uniform float uTime;
  uniform vec2  uMouse;
  uniform float uHover;
  varying vec3  vPosition;
  varying vec2  vUv;

  vec3 mod289(vec3 x){ return x - floor(x*(1./289.))*289.; }
  vec4 mod289(vec4 x){ return x - floor(x*(1./289.))*289.; }
  vec4 permute(vec4 x){ return mod289(((x*34.)+1.)*x); }
  vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314*r; }

  float snoise(vec3 v){
    const vec2 C = vec2(1./6., 1./3.);
    const vec4 D = vec4(0., 0.5, 1., 2.);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g  = step(x0.yzx, x0.xyz);
    vec3 l  = 1. - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.,i1.z,i2.z,1.))
    + i.y + vec4(0.,i1.y,i2.y,1.))
    + i.x + vec4(0.,i1.x,i2.x,1.));
    float n_ = 0.142857142857;
    vec3 ns  = n_ * D.wyz - D.xzx;
    vec4 j   = p - 49. * floor(p * ns.z * ns.z);
    vec4 x_  = floor(j * ns.z);
    vec4 y_  = floor(j - 7. * x_);
    vec4 x   = x_ *ns.x + ns.yyyy;
    vec4 y   = y_ *ns.x + ns.yyyy;
    vec4 h   = 1. - abs(x) - abs(y);
    vec4 b0  = vec4(x.xy, y.xy);
    vec4 b1  = vec4(x.zw, y.zw);
    vec4 s0  = floor(b0)*2. + 1.;
    vec4 s1  = floor(b1)*2. + 1.;
    vec4 sh  = -step(h, vec4(0.));
    vec4 a0  = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1  = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0  = vec3(a0.xy, h.x);
    vec3 p1  = vec3(a0.zw, h.y);
    vec3 p2  = vec3(a1.xy, h.z);
    vec3 p3  = vec3(a1.zw, h.w);
    vec4 norm= taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
    vec4 m = max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);
    m=m*m;
    return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }

  void main() {
    vUv       = uv;
    vPosition = position;

    // organic base deformation — makes it stop looking like a sphere
    float n        = snoise(normal * 1.4 + uTime * 0.3);
    float baseWarp = n * 0.35;

    // mouse bulge on top
    float mouseDot = dot(normalize(normal.xy), normalize(uMouse - vec2(0.5)));
    float bulge    = smoothstep(0.0, 1.0, mouseDot) * uHover * 0.5;

    vec3 pos = position + normal * (baseWarp + bulge);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
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
    vec3  color   = mix(uColor * 0.92, uColor * 1.08, grain);
    gl_FragColor  = vec4(color, 1.0);
  }
`;