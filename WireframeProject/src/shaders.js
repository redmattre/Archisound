export const vertexShader = `
  attribute vec3 barycentric;
  varying vec3 vBarycentric;
  
  void main() {
      vBarycentric = barycentric;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const fragmentShader = `
  precision highp float;
  varying vec3 vBarycentric;
  uniform vec3 color;
  uniform float thickness;
  
  float edgeFactor(vec3 bary) {
      vec3 d = fwidth(bary);
      vec3 a3 = smoothstep(vec3(0.0), d * thickness, bary);
      return min(min(a3.x, a3.y), a3.z);
  }

  void main() {
      float edge = edgeFactor(vBarycentric);
      gl_FragColor = vec4(color, edge);
  }
`;