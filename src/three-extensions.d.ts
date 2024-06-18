import * as THREE from 'three';

declare module 'three' {
  export class TextGeometry extends THREE.ExtrudeGeometry {
    constructor(
      text: string,
      parameters?: TextGeometryParameters
    );
  }

  export interface TextGeometryParameters extends THREE.ExtrudeGeometryParameters {
    font?: THREE.Font;
    size?: number;
    height?: number;
    curveSegments?: number;
    bevelEnabled?: boolean;
    bevelThickness?: number;
    bevelSize?: number;
    bevelSegments?: number;
  }
}