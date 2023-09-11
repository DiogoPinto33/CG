import { CGFobject } from "../lib/CGF.js";

/**
 * MyCone
 * @constructor
 */
export class MyCone extends CGFobject {
  constructor(scene, slices, radius, height) {
    super(scene);
    this.radius = radius;
    this.height = height;
    this.slices = slices;
    this.initBuffers();
  }
  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    var ang = 0;
    var alphaAng = (2 * Math.PI) / this.slices;

    for (var i = 0; i < this.slices; i++) {
      this.vertices.push(
        this.radius * Math.cos(ang),
        0,
        this.radius * -Math.sin(ang)
      );
      this.indices.push(i, (i + 1) % this.slices, this.slices + 1);
      this.normals.push(Math.cos(ang), Math.cos(Math.PI / 4.0), -Math.sin(ang));
      ang += alphaAng;
    }
    this.vertices.push(this.radius, 0, 0);
    this.indices.push(this.slices - 1, this.slices, this.slices + 1);
    this.normals.push(1, 0, 0);

    this.vertices.push(0, this.height, 0);
    this.normals.push(0, 1, 0);

    for (var j = 0; j < this.slices; j++) {
      this.texCoords.push(j / this.slices, 0);
    }
    this.texCoords.push(1, 0);
    this.texCoords.push(0.5, 1);

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }

  updateBuffers(complexity) {
    this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

    // reinitialize buffers
    this.initBuffers();
    this.initNormalVizBuffers();
  }
}