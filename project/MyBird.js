import {CGFappearance, CGFobject, CGFtexture} from '../lib/CGF.js';
import { MyDiamond } from './MyDiamond.js';
import { MySphere } from './MySphere.js';
//import { MyCylinder } from './MyCylinder.js';
import { MyPyramid } from './MyPyramid.js';
import { MySmallTri } from './MySmallTri.js';

import { MyCone } from './MyCone.js';

/**
* MyBird
* @constructor
* @param scene - Reference to MyScene object
*/

export class MyBird extends CGFobject {
    constructor(scene){
        super(scene);
        this.initParts();
        this.initMaterials();
        
        //wing movement
        //this.angle = angle; // in degrees
        

        this.x = 0;
        this.y = 2;
        this.z = 0;
        this.orientation = 0;
        this.maxWingAngle = Math.PI/6;
        this.dWingAngle = 0;

        this.dy = 0;
        this.yScale = 0.15;

        this.speed = 0;
        this.maxSpeed = 4;
        this.speedScale = 0.5;

        this.speedFactor = 1; // Initialize speedFactor

    }

    initParts(){
        this.head = new BirdHead(this.scene);
        this.body = new BirdBody(this.scene);
        this.wing = new BirdWing(this.scene);
        this.rightWing = new BirdWing(this.scene, "right");
        this.leftWing = new BirdWing(this.scene, "left");
        this.tail = new BirdTail(this.scene);
    }

    initMaterials(){
    }

    update(t, dt) {
        console.log(this.x);
        console.log(this.y);
        console.log(this.z);
        console.log(dt);
        // Divide 't' and 'dt' by 1000 to convert into seconds.
        // Multiply by 2*Math.PI to get a period of 1 second.
        this.dy = this.yScale * Math.sin((t/1000) * 2*Math.PI);
        this.dWingAngle = 
            -Math.sin(this.speedFactor * (1 + this.speed * this.speedScale) * (t/1000) * 2*Math.PI);
        
        //wwings moving
        this.x += this.speed * this.speedFactor * Math.sin(this.orientation) * (dt / 1000);
        this.z += this.speed * this.speedFactor * Math.cos(this.orientation) * (dt / 1000);

        this.leftWing.wingAngle = this.dWingAngle;
        this.rightWing.wingAngle = this.dWingAngle;

    }

    move() {
        this.scene.translate(this.position.x, this.position.y, this.position.z);
        this.scene.rotate(this.angle * DEGREE_TO_RAD, 0, 1, 0);
      }
    
    moveWings(wing) {
        this.scene.rotate(
          wing * this.maxAngle * Math.sin(this.wingAngle) * DEGREE_TO_RAD,
          0,
          0,
          1
        );
    }

    accelerate(v) {
        this.speed = Math.max(0, Math.min(this.maxSpeed, this.speed + v));
    }

    turn(v) {
        this.orientation = (this.orientation + v * this.speedFactor) % (2*Math.PI);
    }
    resetBird() {
        this.x = 0;
        this.y = 3;
        this.z = 0;
        this.orientation=0;
        this.speed = 0;
    }

    display(){
        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y + this.dy, this.z);
        this.scene.translate(0.0, this.y, -0.6);
        this.scene.rotate(this.orientation, 0, 1, 0);
        this.scene.translate(0.0, -this.y, 0.6);
        this.scene.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
        
        
        
        this.head.display();
        this.body.display();
        this.leftWing.display();
        this.rightWing.display();
        this.tail.display();
        this.scene.popMatrix();
    
    }

}

//TODO: Adjust scaling and position
/**
* BirdHead
* @constructor
 * @param scene - Reference to MyScene object
*/
class BirdHead extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initParts();
        this.initMaterials();
    }

    initParts() {
        this.head = new MySphere(this.scene, 36, 18);
        this.leftEyeWhite = new MySphere(this.scene, 16, 8);
        this.rightEyeWhite = new MySphere(this.scene, 16, 8);
        this.leftEyeBlack = new MySphere(this.scene, 16, 8);
        this.rightEyeBlack = new MySphere(this.scene, 16, 8);
        this.beak = new MyPyramid(this.scene, 3, 1);
    }
    initMaterials() {
        this.material = new CGFappearance(this.scene);
        this.material.setSpecular(0.0, 0.0, 0.3, 1.0);
        this.material.setDiffuse(0.0, 0.0, 0.3, 1.0);
        this.material.setAmbient(0.0, 0.0, 0.3, 1.0);

        this.beakMaterial = new CGFappearance(this.scene);
        this.beakMaterial.setAmbient(1,1,0,1); // Yellow ambient color
        this.beakMaterial.setDiffuse(1,1,0,1); // Yellow diffuse color

        // Eye materials
        this.eyeWhiteMaterial = new CGFappearance(this.scene);
        this.eyeWhiteMaterial.setAmbient(1, 1, 1, 1); // White color
        this.eyeBlackMaterial = new CGFappearance(this.scene);
        this.eyeBlackMaterial.setAmbient(0, 0, 0, 1); // Black color
        this.eyeBlackMaterial.setDiffuse(0, 0, 0, 1);
        this.eyeBlackMaterial.setSpecular(0, 0, 0, 1);
        this.eyeBlackMaterial.setEmission(0, 0, 0, 1);

        //  Texture
        this.textureBird = new CGFappearance(this.scene);
        this.textureBird.setAmbient(0.8, 0.8, 0.8, 1);
        this.textureBird.setDiffuse(0.8, 0.8, 0.8, 1);
        this.textureBird.setSpecular(0.8, 0.8, 0.8, 1);
        this.textureBird.setShininess(10.0);
        this.textureBird.loadTexture('images/texture_bird.jpg'); // Set the path to your texture here
        this.textureBird.setTextureWrap('REPEAT', 'REPEAT');
    }
    display() {

        this.textureBird.apply();

        // Head Bird
        this.scene.pushMatrix();
        this.textureBird.apply();
        this.scene.scale(0.3, 0.28, 0.32);
        this.head.display();
        this.scene.popMatrix();

        // Left Eye
        this.scene.pushMatrix();
        this.eyeWhiteMaterial.apply();
        this.scene.translate(-0.1, 0.1, 0.25);
        this.scene.scale(0.07, 0.07, 0.07);
        this.leftEyeWhite.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.eyeBlackMaterial.apply();
        this.scene.translate(0.1, 0.1, 0.30); // Adjust the z-value to position black part on the white part
        this.scene.scale(0.03, 0.03, 0.03);  // Adjust the scale to make the black part smaller
        this.leftEyeBlack.display();
        this.scene.popMatrix();

        // Right Eye
        this.scene.pushMatrix();
        this.eyeWhiteMaterial.apply();
        this.scene.translate(0.1, 0.1, 0.25);
        this.scene.scale(0.07, 0.07, 0.07);
        this.rightEyeWhite.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.eyeBlackMaterial.apply();
        this.scene.translate(-0.1, 0.1, 0.30);  // Adjust the z-value to position black part on the white part
        this.scene.scale(0.03, 0.03, 0.03);  // Adjust the scale to make the black part smaller
        this.rightEyeBlack.display();
        this.scene.popMatrix();

        // Beak
        this.scene.pushMatrix();
        this.scene.translate(0.0, -0.05, 0.22);
        this.scene.scale(0.1, 0.1, 0.3);
        this.scene.rotate(-Math.PI/6, 0, 0, 1);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.beakMaterial.apply();
        this.beak.display();
        this.scene.popMatrix();
    }
}


// BirdBody
class BirdBody extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initParts();
        this.initMaterials();
    }

    initParts() {
        this.body = new MySphere(this.scene, 36, 18);
    }
    
    initMaterials() {
        this.material = new CGFappearance(this.scene);
        this.material.setSpecular(0.0, 0.2, 0.0, 1.0);
        this.material.setDiffuse(0.0, 0.2, 0.0, 1.0);
        this.material.setAmbient(0.0, 0.2, 0.0, 1.0);

        //  Texture
        this.textureBird = new CGFappearance(this.scene);
        this.textureBird.setAmbient(0.8, 0.8, 0.8, 1);
        this.textureBird.setDiffuse(0.8, 0.8, 0.8, 1);
        this.textureBird.setSpecular(0.8, 0.8, 0.8, 1);
        this.textureBird.setShininess(10.0);
        this.textureBird.loadTexture('images/texture_bird.jpg'); // Set the path to your texture here
        this.textureBird.setTextureWrap('REPEAT', 'REPEAT');
    }
    
    display() {
        this.textureBird.apply();

        this.scene.pushMatrix();
        //this.material.apply();
        this.scene.scale(0.4, 0.4, 0.5);
        this.scene.translate(0, -1.0, -0.75);
        this.body.display();
        this.scene.popMatrix();
    }
}

/**
* BirdWing
* @constructor
 * @param scene - Reference to MyScene object
 * @param side  - Whether it's the right or the left wing
*/
class BirdWing extends CGFobject {
    constructor(scene, side) {
        super(scene);
        this.initParts();
        this.initMaterials();
        this.side = side;
        this.wingAngle = Math.PI/4;
    }
    
    initParts() {
        this.innerWing = new MyDiamond(this.scene);
        this.outerWing = new MySmallTri(this.scene);
    }
    initMaterials() {
        this.material = new CGFappearance(this.scene);
        this.material.setSpecular(0.0, 0.0, 0.0, 1.0);

        //BLUE
        this.blueMaterial = new CGFappearance(this.scene);
        this.blueMaterial.setAmbient(0,0,0,1.0);
        this.blueMaterial.setDiffuse(0.12, 0.56, 1.0, 1.0);
        this.blueMaterial.setSpecular(0.8, 0.8, 0.8, 1.0);
        this.blueMaterial.setShininess(10);

        // Yellow material (no ambient, high specular)
        this.yellowMaterial = new CGFappearance(this.scene);
        this.yellowMaterial.setAmbient(0,0,0,1.0);
        this.yellowMaterial.setDiffuse(1.0, 1.0, 0.0, 1.0);
        this.yellowMaterial.setSpecular(0.8, 0.8, 0.8, 1.0);
        this.yellowMaterial.setShininess(10);

        //  Texture
        this.textureBird = new CGFappearance(this.scene);
        this.textureBird.setAmbient(0.8, 0.8, 0.8, 1);
        this.textureBird.setDiffuse(0.8, 0.8, 0.8, 1);
        this.textureBird.setSpecular(0.8, 0.8, 0.8, 1);
        this.textureBird.setShininess(10.0);
        this.textureBird.loadTexture('images/texture_wing.jpg'); // Set the path to your texture here
        this.textureBird.setTextureWrap('REPEAT', 'REPEAT');     

    }



    display() {

        this.yellowMaterial.apply();

        this.scene.pushMatrix();
        if (this.side == "right") this.scene.scale(-1, 1, 1);
        this.scene.translate(0.3, -0.3, -0.35);
        this.scene.rotate(this.wingAngle, 0, 0, 1);//   to move wings

        this.scene.pushMatrix(); // Inner wing
        this.textureBird.apply();
        this.scene.scale(0.25, 1.0, 0.4);
        this.scene.rotate(Math.PI / 4, 0, 1, 0);// inner wings 
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.innerWing.display();
        this.scene.popMatrix();

        //this.scene.rotate(this.wingAngle, 0, 1, 1);//   to move wings
        this.scene.pushMatrix(); // Outer wing
        this.scene.rotate(Math.PI / 8, 0, 0, -1.3);
        this.scene.translate(0.37, 0.06, 0.24);
        this.scene.rotate(Math.PI / 8, 0, 1, 0);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.scale(0.24, 0.6, 0.4);
        this.outerWing.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }
    
}
/**
* BirdTail
* @constructor
 * @param scene - Reference to MyScene object
*/
class BirdTail extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initParts();
        this.initMaterials();
    }

    initParts() {
        this.tail = new MyCone(this.scene, 4, 4, Math.PI/2);
    }

    initMaterials() {
        this.material = new CGFappearance(this.scene);
        this.material.setSpecular(0.0, 0.0, 0.0, 1.0);

         // Yellow material (no ambient, high specular)
         this.yellowMaterial = new CGFappearance(this.scene);
         this.yellowMaterial.setAmbient(0,0,0,1.0);
         this.yellowMaterial.setDiffuse(1.0, 1.0, 0.0, 1.0);
         this.yellowMaterial.setSpecular(0.8, 0.8, 0.8, 1.0);
         this.yellowMaterial.setShininess(10);

        // Add your material properties here

    }

    display() {
        this.yellowMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, -0.4, -1);
        this.scene.scale(0.05, 0.04, 0.1);
        this.scene.rotate(Math.PI/4, 0, 0, 1);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.scale(1, -1, -1);
        this.tail.display();
        this.scene.popMatrix();
    }
}