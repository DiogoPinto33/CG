import { MySphere } from "./MySphere.js";
import { CGFappearance } from "../lib/CGF.js";

export class MyPanorama {
  constructor(scene, texture) {
    this.scene = scene;
    this.texture = texture;
    this.invertedSphere = new MySphere(scene, scene.slices, scene.stacks, true);
    this.material = new CGFappearance(scene);
    this.material.setEmission(1, 1, 1, 1);
    this.material.setTexture(texture);
    this.material.setTextureWrap("REPEAT", "REPEAT");
  }

  display() {
    this.material.apply();
    this.scene.pushMatrix();
    this.scene.scale(200, 200, 200);
    this.invertedSphere.display();
    this.scene.popMatrix();
  }
}
