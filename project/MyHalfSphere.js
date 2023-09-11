import { CGFobject } from '../lib/CGF.js';

export class MyHalfSphere extends CGFobject {
  constructor(scene, slices, stacks, invert) {
    super(scene);
    this.pilhas = stacks;
    this.lados = slices;
    this.invert = invert;

    this.initBuffers();
  }

  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    var phi = 0;
    var theta = 0;
    var phiInc = (Math.PI / 2) / this.pilhas;  // Adjust phi range to create a half sphere
    var thetaInc = (2 * Math.PI) / this.lados;

    for (let i = 0; i <= this.pilhas; i++) {
      var phiCos = Math.cos(phi);
      var phiSin = Math.sin(phi);

      theta = 0;
      for (let j = 0; j <= this.lados; j++) {
        var x = Math.cos(theta) * phiSin;
        var y = phiCos;
        var z = Math.sin(-theta) * phiSin;
        this.vertices.push(x, y, z);

        if (i < this.pilhas && j < this.lados) {
          var var1 = i * (this.lados + 1) + j;
          var var2 = var1 + this.lados + 1;

          if (this.invert) {
            this.indices.push(var2, var1, var1 + 1);
            this.indices.push(var2 + 1, var2, var1 + 1);
          } else {
            this.indices.push(var1 + 1, var1, var2);
            this.indices.push(var1 + 1, var2, var2 + 1);
          }
        }

        this.normals.push(x, y, z);
        this.texCoords.push(j / this.lados, i / this.pilhas);

        theta += thetaInc;
      }
      phi += phiInc;
    }

    if (this.invert)
      this.normals = this.normals.map(n => -n);

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }

  updateTexCoords(coords) {
    this.texCoords = [...coords];
    this.updateTexCoordsGLBuffers();
  }
}
