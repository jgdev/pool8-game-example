import * as THREE from "three";
import { Game } from "./game";
import SceneItem from "./scene-item";
import { createSphereText } from "./utils/font";

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

const loader = new THREE.FontLoader();

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
    const { DroidSerifBoldFont } = Game.getInstance().options.resources;

    const group = new THREE.Group();
    const { color, isStripped } = getBallColor(ballNumber);
    const radius = 3;
    const radialSegments = 80;

    // Base sphere
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

    // Stripped parts
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
        Math.PI / 2 - 0.1
      );
      const sphereStrippedTop = new THREE.Mesh(
        sphereStrippedGeometry,
        sphereStrippedMaterial
      );
      const sphereStrippedBottom = sphereStrippedTop.clone();
      sphereStrippedTop.rotateX(Math.PI);
      sphereStrippedBottom.castShadow = true;
      sphereStrippedTop.castShadow = true;
      group.add(sphereStrippedTop);
      group.add(sphereStrippedBottom);
    }

    // Ball number

    const sphereBallNumberMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      specular: 0xffffff,
    });

    const sphereBallNumberGeometry = new THREE.SphereBufferGeometry(
      radius,
      radialSegments * Math.PI,
      radialSegments * Math.PI,
      100,
      Math.PI * 2,
      100,
      Math.PI / 2 - 0.55
    );
    const sphereBallNumberFront = new THREE.Mesh(
      sphereBallNumberGeometry,
      sphereBallNumberMaterial
    );
    sphereBallNumberFront.rotateX(Math.PI / 2);
    const sphereBallNumberBack = sphereBallNumberFront.clone();
    sphereBallNumberBack.rotateZ(radius);

    const ballNumberTextGeometry = new THREE.TextGeometry(ballNumber, {});
    const ballNumberTextMaterial = new THREE.MeshPhongMaterial({
      color: 0x000000,
      specular: 0xffffff,
    });
    // const ballNumberText = new THREE.Mesh(
    //   ballNumberTextGeometry,
    //   ballNumberTextMaterial
    // );
    // ballNumberText.rotateZ(radius);
    // group.add(ballNumberText);
    // const ballText = createText2D(ballNumber, 0x000000, "Verdana", 2);
    const ballText = createSphereText(String(ballNumber), {
      font: DroidSerifBoldFont,
    });
    group.add(ballText);

    group.add(sphereBallNumberFront);
    group.add(sphereBallNumberFront);
    group.add(sphereBallNumberBack);

    group.translateZ(radius);
    group.rotateY(radius / 2);
    return group;
  }

  render() {
    // if (this.renderObj.position.y >= 50 - this.args.ballNumber) return;
    // const movementRation = 0.2;
    // const movement = this.args.ballNumber * (movementRation / 10.9);
    // this.renderObj.position.y = this.renderObj.position.y + movement;
  }
}
