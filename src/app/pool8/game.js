import * as THREE from "three";
import Board from "./board";
import Ball from "./ball";

let instance;

export class Game {
  rendererOptions;
  board = null;
  balls = [];
  renderItems = [];
  clock = null;

  static getInstance(rendererOptions) {
    if (!instance) instance = new Game(rendererOptions);
    return instance;
  }

  constructor(rendererOptions) {
    this.clock = new THREE.Clock();
    rendererOptions.clock = this.clock;
    this.rendererOptions = rendererOptions;
    this.board = new Board(rendererOptions);
    // this.balls = new Array(14)
    //   .fill(null)
    //   .map((_, n) => new Ball(rendererOptions, { ballNumber: n + 1 }));
    this.balls = [new Ball(rendererOptions, { ballNumber: 13 })];
    this.renderItems = [...this.balls, this.board];
  }

  render() {
    const { renderer, scene, camera } = this.rendererOptions;
    const callback = () => {
      renderer.render(scene, camera);
      window.requestAnimationFrame(() => this.render());
    };
    this.renderItems.forEach((item, index) => {
      item.render();
      if (index === this.renderItems.length - 1) callback();
    });
  }

  init() {
    const { light, scene } = this.rendererOptions;
    const helper = new THREE.CameraHelper(light.shadow.camera);
    scene.add(helper);
    this.render();
  }
}

export default {
  getInstance: (rendererOptions) => Game.getInstance(rendererOptions),
};
