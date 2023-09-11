import { CGFobject, CGFappearance } from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";

export class MyBirdEgg extends CGFobject {
  constructor(scene, slices, stacks, x, y, z) {
    super(scene);

    this.x = x;
    this.y = y;
    this.z = z;

    this.sphere = new MySphere(scene, slices, stacks, false);
    this.initMaterials();
  }

  initMaterials() {
    this.material = new CGFappearance(this.scene);

    // TO BE EASILY VISIBLE
    this.material.setShininess(1);
    this.material.setEmission(1, 1, 1, 1);
    this.material.setAmbient(1, 1, 1, 1);
    this.material.setDiffuse(1, 1, 1, 1);
    this.material.setSpecular(1, 1, 1, 1);

    this.material.loadTexture("images/egg-texture.jpg");
    this.material.setTextureWrap("REPEAT", "REPEAT");
  }

  display() {
    this.scene.pushMatrix();
    this.scene.translate(2, 1, 2);
    this.scene.scale(0.5, 0.8, 0.5);
    //this.material.apply();
    this.sphere.display();
    this.scene.popMatrix();
  }

  getPosition() {
    return { x: this.x, y: this.y, z: this.z };
  }

  setPosition(p) {
    this.x = p.x;
    this.y = p.y;
    this.z = p.z;
  }

  drop(){
    this.y -= -0.5;
    if (this.y<-9)
       this.y = -9;
}
}