export default class SceneItem {
  renderer;
  scene;
  camera;
  args = {};
  _renderObj;

  get renderObj() {
    if (!this._renderObj) {
      this._renderObj = this.getObject();
    }
    return this._renderObj;
  }

  set renderObj(_) {}

  constructor({ renderer, scene, camera }, args = {}) {
    this.renderer = renderer;
    this.camera = camera;
    this.scene = scene;
    this.args = args;
    this.scene.add(this.renderObj);
    this.renderer.render(this.scene, this.camera);
  }

  getObject() {
    return null;
  }

  render() {}
}
