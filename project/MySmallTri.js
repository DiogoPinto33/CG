import {CGFobject} from '../lib/CGF.js';
/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MySmallTri extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-1, 0, 0,	//0
			1, 0, 0,	//1
            0, 1, 0,    //2
            -1, 0, 0,	//0
			1, 0, 0,	//1
            0, 1, 0, 
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
            2, 1, 0
		];

		//Define normals for each vertex here.
        this.normals = [
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
        ];

        //Define texture coordinates for each vertex here.
        this.texCoords = [
            0, 0,
            0, 1,
            1, 1

        ];
        
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}
