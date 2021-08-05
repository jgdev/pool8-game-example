import * as THREE from "three";

export const createSphereText = (str, { size = 1, font } = {}) => {
  const letterGeometries = {};
  console.log(Object.keys(new THREE.Font(font)));
  return str.split("").map((letter) => {
    const geometry = new THREE.TextBufferGeometry(letter, {
      font: font,
      size: 3.0,
      height: 0.2,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.5,
      bevelSize: 0.3,
      bevelSegments: 5,
    });
    geometry.computeBoundingBox();
    geometry.boundingBox.getSize(size);
    letterGeometries[letter] = {
      geometry,
      width: size.x / 2, // no idea why size.x is double size
      height: size.y,
    };
    const { width, height } = letterGeometries[letter];
    const mesh = geometry ? new THREE.Mesh(geometry, letterMaterial) : null;
    totalWidth += width;
    maxHeight = Math.max(maxHeight, height);
    return {
      mesh,
      width,
    };
  });
};
