import * as THREE from "three";
import SceneItem from "./scene-item";

export default class Board extends SceneItem {
  interval;

  getObject() {
    const geometry = new THREE.PlaneGeometry(240, 110, 32, 32);
    const bg = this.args.tableclothBg || "#007236";
    const material = new THREE.MeshStandardMaterial({
      color: bg,
    });
    const plane = new THREE.Mesh(geometry, material);
    plane.receiveShadow = true;
    return plane;
  }

  render() {}
}
