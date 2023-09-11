import { CGFobject } from "../lib/CGF.js";

var DEGREE_TO_RAD = Math.PI / 180;

/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCylinder extends CGFobject {
  constructor(scene, slices, height, top, bottom) {
    super(scene);
    this.slices = slices;
    this.height = height;
    this.top = top;
    this.bottom = bottom;
    this.initBuffers();
  }
  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    /* VERTICES */
    for (var j = 0; j <= this.slices; j++) {
      this.vertices.push(
        this.top * Math.cos((j * 360 * DEGREE_TO_RAD) / this.slices),
        0,
        this.top * Math.sin((j * 360 * DEGREE_TO_RAD) / this.slices)
      );
      this.vertices.push(
        this.bottom * Math.cos((j * 360 * DEGREE_TO_RAD) / this.slices),
        this.height,
        this.bottom * Math.sin((j * 360 * DEGREE_TO_RAD) / this.slices)
      );
    }
    /* INDICES */
    for (var j = 0; j < this.slices * 2; j = j + 2) {
      this.indices.push(j, j + 2, j + 1, j + 1, j + 2, j + 2 + 1);
      this.indices.push(j, j + 1, j + 2, j + 2 + 1, j + 2, j + 1);
    }

    /* NORMALS */
    for (var j = 0; j <= this.slices; j++) {
      this.normals.push(
        Math.cos((j * 360 * DEGREE_TO_RAD) / this.slices),
        0,
        Math.sin((j * 360 * DEGREE_TO_RAD) / this.slices)
      );
      this.normals.push(
        Math.cos((j * 360 * DEGREE_TO_RAD) / this.slices),
        0,
        Math.sin((j * 360 * DEGREE_TO_RAD) / this.slices)
      );
    }

    /* TEXT COORDS */
    for (var j = 0; j <= this.slices; j++) {
      this.texCoords.push(j / this.slices, 1);
      this.texCoords.push(j / this.slices, 0);
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
  updateBuffers() {}
}