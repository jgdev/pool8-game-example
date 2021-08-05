import * as THREE from "three";
import Board from "./board";
import Ball from "./ball";

let instance;

export class Game {
  options;
  board = null;
  balls = [];
  renderItems = [];
  clock = null;

  static getInstance(options) {
    if (!instance) instance = new Game(options);
    return instance;
  }

  render() {
    const { renderer, scene, camera } = this.options;
    const callback = () => {
      renderer.render(scene, camera);
      window.requestAnimationFrame(() => this.render());
    };
    this.renderItems.forEach((item, index) => {
      item.render();
      if (index === this.renderItems.length - 1) callback();
    });
  }

  init(options) {
    this.clock = new THREE.Clock();
    options.clock = this.clock;
    this.options = options;
    this.board = new Board(options);
    // this.balls = new Array(3)
    //   .fill(null)
    //   .map((_, n) => new Ball(options, { ballNumber: n + 1 }));
    this.balls = [new Ball(options, { ballNumber: 13 })];
    this.renderItems = [...this.balls, this.board];

    const { light, scene } = this.options;
    const helper = new THREE.CameraHelper(light.shadow.camera);
    scene.add(helper);
    this.render();
  }
}

export default {
  getInstance: (options) => Game.getInstance().init(options),
};
