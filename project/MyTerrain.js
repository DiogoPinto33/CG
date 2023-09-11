import { CGFobject } from '../lib/CGF.js';
import { CGFshader } from "../lib/CGF.js";
import { CGFtexture } from "../lib/CGF.js";
import { CGFappearance } from "../lib/CGF.js";
import { MyPlane } from './MyPlane.js';

export class MyTerrain extends CGFobject {
	constructor(scene, parts, heightscale, terrainTex, terrainMap, terrainAlt) {
	  super(scene);

	  this.terrain = new MyPlane(this.scene, parts);

	  this.terrainMap = terrainMap;
	  this.terrainTex = terrainTex;
	  this.terrainAlt = terrainAlt;
  
	  this.shader = new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");
	  this.shader.setUniformsValues({ normScale: heightscale });
	  this.shader.setUniformsValues({ uSampler2: 1 });
	  this.shader.setUniformsValues({ uSampler3: 2 });
  
	  this.terrainTex_ = new CGFtexture(this.scene, this.terrainTex);
	  this.terrainMap_ = new CGFtexture(this.scene, this.terrainMap);
	  this.terrainAlt_ = new CGFtexture(this.scene, this.terrainAlt);
    
	  this.material = new CGFappearance(this.scene);
	  this.material.setShininess(1);
	  this.material.setEmission(1, 1, 1, 1);
	  this.material.setAmbient(1, 1, 1, 1);
	  this.material.setDiffuse(1, 1, 1, 1);
	  this.material.setSpecular(1, 1, 1, 1);
	  this.material.setTexture(this.terrainTex_);
	}
  
	display() {
	  this.scene.setActiveShader(this.shader);
	  this.material.apply();
	  this.terrainMap_.bind(1);
	  this.terrainAlt_.bind(2);
	  this.terrain.display();
	  this.scene.setActiveShader(this.scene.defaultShader);
	}
  }
  