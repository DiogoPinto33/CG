import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { MySphere } from "./MySphere.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyBird } from "./MyBird.js";
import { MyTerrain } from "./MyTerrain.js";
import { MyBirdEgg } from "./MyBirdEgg.js";
import { MyNest } from "./MyNest.js";
import { MyBillboard } from "./MyBillboard.js";
import { MyTreeGroupPatch } from "./MyTreeGroupPatch.js";
import { MyTreeRowPatch } from "./MyTreeRowPatch.js";


export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);
    this.initCameras();
    this.initLights();

    this.timePrevFrame=Date.now();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    this.enableTextures(true);


    this.slices = 40;  
    this.stacks = 40;

    this.aceleration = 0.5;
    this.theta = 1;


    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this,30);
    this.sphere = new MySphere(this,this.slices,this.stacks);  //esfera
    this.panorama = new MyPanorama(this, new CGFtexture(this, "images/panorama4.jpg"));
    this.terrain = new MyTerrain(this, 30, 85, "images/terrain.jpg", "images/heightmap.jpg", "images/altimetry.png");

    //Ovo
    this.egg = new MyBirdEgg(this, this.slices, this.stacks, 0, 0, 0);
    this.texture11 = new CGFtexture(this, "images/egg-texture.jpg");
    this.nnAppearance = new CGFappearance(this);
    this.nnAppearance.setTexture(this.texture11);
    this.nnAppearance.setTextureWrap('REPEAT', 'REPEAT');
    
    //ninho
    this.nest= new MyNest(this,15,15,false)
    this.texture10 = new CGFtexture(this, "images/nest-texture.jpg");
    this.nAppearance = new CGFappearance(this);
    this.nAppearance.setTexture(this.texture10);
    this.nAppearance.setTextureWrap('REPEAT', 'REPEAT');

    //trees
    this.rowTree1 = new MyTreeRowPatch(this, -2, -5.05, -8.4);
    this.rowTree2 = new MyTreeRowPatch(this, 14.3, -4.35, 2.2);
    this.groupTree1 = new MyTreeGroupPatch(this, 13, -4.62, -4);
    this.groupTree2 = new MyTreeGroupPatch(this, 13, -4.63, 5);
    this.groupTree3 = new MyTreeGroupPatch(this, 12, -4.63, 0.5);

    // Initialize the bird
    this.bird = new MyBird(this);


    this.bird.scaleFactor = 1;
    this.setUpdatePeriod(100);
    

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;
    this.displaySphere = true;  //esfera


    //Textures
    this.texture = new CGFtexture(this, "images/terrain.jpg");  //Terreno
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');
    
    this.texture2 = new CGFtexture(this, "images/earth.jpg");  //Terra
    this.appearance2 = new CGFappearance(this);
    this.appearance2.setAmbient(1.0, 1.0, 1.0, 1);
    this.appearance2.setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.appearance2.setSpecular(10.0, 10.0, 10.0, 1);
    this.appearance2.setShininess(10.0);
    this.appearance2.setTexture(this.texture2);
    this.appearance2.setTextureWrap('REPEAT', 'REPEAT');


  }

  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(1.0, 0.1, 1000, vec3.fromValues(50, 10, 15), vec3.fromValues(0, 0, 0));
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setEmission(0,0,0,1);  
    this.setShininess(10.0);
  }



  update(t) {
    //console.log(this.bird.x);
    this.checkKeys();

    var dt = t - this.timePrevFrame;
    this.bird.update(t, dt);

    this.timePrevFrame = t;
  }

  getBird() {
    return this.bird;
  }

  checkKeys(){
    var text = "Keys pressed: ";
    var keysPressed=false;

    if (this.gui.isKeyPressed("KeyW")){
      text += " W ";
      this.bird.accelerate(this.aceleration);
      keysPressed = true;
    }

    if (this.gui.isKeyPressed("KeyS")){
      text += " S ";
      this.bird.accelerate(-this.aceleration);
      keysPressed = true;
    }

    if (this.gui.isKeyPressed("KeyA")){
      text += " A ";
      this.bird.turn(this.theta);
      keysPressed = true;
    }

    if (this.gui.isKeyPressed("KeyD")){
      text += " D ";
      this.bird.turn(-this.theta);
      keysPressed = true;
    }

    if (this.gui.isKeyPressed("KeyR")){
      text += " R ";
      this.bird.resetBird();
      keysPressed = true;
    }

    if (keysPressed)
      console.log(text);
  }





  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    //egg1
    this.pushMatrix();
    this.translate(-44, -48.55, -29);
    this.scale(1, 1, 1);
    this.nnAppearance.apply();
    this.egg.display();
    this.popMatrix();
    //egg2
    this.pushMatrix();
    this.translate(-90, -49.2, -10); 
    this.egg.display();
    this.popMatrix();
    //egg3
    this.pushMatrix();
    this.translate(-40, -58.35, 60); 
    this.egg.display();
    this.popMatrix();
    //egg4
    this.pushMatrix();
    this.translate(-80, -55, -40);
    this.egg.display();
    this.popMatrix();
    //egg5
    this.pushMatrix();
    this.translate(-25, -58.35, 30);
    this.egg.display();
    this.popMatrix();

    //nest
    this.pushMatrix();
    this.translate(72, -51, 0); 
    this.scale(2.0,2.0,2.0);
    this.nAppearance.apply();
    this.nest.display();
    this.popMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();


    if (this.displaySphere){


    //panorama

    this.pushMatrix();
    //this.appearance2.apply();
    this.panorama.display();
    this.popMatrix();
 


    //mundo
    /*
    this.pushMatrix();
    this.appearance2.apply();
    this.sphere.display();
    this.popMatrix();
    */



    //ave

    this.pushMatrix();
    this.scale(1.7,1.7,1.7);
    this.bird.display();
    this.popMatrix();



    //plano
    /*
    this.pushMatrix();
    this.appearance.apply();
    this.translate(0,-100,0);
    this.scale(400,400,400);
    this.rotate(-Math.PI/2.0,1,0,0);
    this.plane.display();
    this.popMatrix();
    */



    //terreno
    
    this.pushMatrix();
    this.rotate(-0.5 * Math.PI, 1, 0, 0);
    this.translate(0, 0, -100);
    this.scale(400, 400, 15);
    this.terrain.display();
    this.popMatrix();
    


    //árvores

    this.pushMatrix();
    this.rowTree1.display();
    this.rowTree2.display();
    this.groupTree1.display();
    this.groupTree2.display();
    this.groupTree3.display();
    this.popMatrix();

    
    
    }
  }
}
