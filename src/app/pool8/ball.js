import * as THREE from "three";
import SceneItem from "./scene-item";
import { SceneUtils } from "three/examples/jsm/utils/SceneUtils";

const getColor = (number) => {
  switch (number) {
    case 1:
      return "#fdd01c";
    case 2:
      return "#0080ff";
    case 3:
      return "#f1302b";
    case 4:
      return "#ff42ff";
    case 5:
      return "#ff8c1a";
    case 6:
      return "#30aa4c";
    case 7:
      return "#ca1e27";
    case 8:
      return "#000000";
  }
};

const getBallColor = (number) => {
  const color = getColor(number > 8 ? number - 7 : number);
  return { color, isStripped: number > 8 };
};

const getBallInitialPosition = (w, h) => {};

export default class Ball extends SceneItem {
  getObject() {
    const {
      args: { ballNumber },
    } = this;

    const group = new THREE.Group();
    const { color, isStripped } = getBallColor(ballNumber);
    const radius = 3;
    const radialSegments = 32;

    const sphereBaseMaterial = new THREE.MeshPhongMaterial({
      color,
      specular: 0xffffff,
    });
    const sphereBaseGeometry = new THREE.SphereGeometry(
      radius,
      radialSegments,
      radialSegments
    );
    const sphereBase = new THREE.Mesh(sphereBaseGeometry, sphereBaseMaterial);
    sphereBase.castShadow = true;
    group.add(sphereBase);

    if (isStripped) {
      const sphereStrippedMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        specular: 0xffffff,
        alphaTest: false,
      });
      const sphereStrippedGeometry = new THREE.SphereBufferGeometry(
        radius,
        radialSegments * Math.PI,
        radialSegments * Math.PI,
        100,
        Math.PI * 2,
        100,
        Math.PI / 2
      );
      const sphereStrippedTop = new THREE.Mesh(
        sphereStrippedGeometry,
        sphereStrippedMaterial
      );
      const sphereStrippedBottom = sphereStrippedTop.clone();
      sphereStrippedTop.rotateX(Math.PI - 0.1);
      sphereStrippedBottom.castShadow = true;
      sphereStrippedTop.castShadow = true;
      group.add(sphereStrippedTop);
      group.add(sphereStrippedBottom);
    }

    group.translateZ(radius);
    return group;
  }

  render() {
    if (this.renderObj.position.y >= 50 - this.args.ballNumber) return;
    const movementRation = 0.2;
    const movement = this.args.ballNumber * (movementRation / 10.9);
    this.renderObj.position.y = this.renderObj.position.y + movement;
    this.renderObj.rotateX(movement * -movementRation);
  }
}
