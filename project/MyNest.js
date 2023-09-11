import { CGFobject } from '../lib/CGF.js';
import { MyHalfSphere } from './MyHalfSphere.js';

export class MyNest extends CGFobject {
  constructor(scene) {
    super(scene);

    this.initBuffers();
  }

  initBuffers() {
    this.scene.out= new MyHalfSphere(this.scene,15,15,false)
    this.scene.in= new MyHalfSphere(this.scene,15,15,true)
  }

  display(){
    
    this.scene.pushMatrix()
    this.scene.translate(0,1.1,0)
    this.scene.rotate(Math.PI,1,0,0)
    this.scene.out.display()
    this.scene.in.display()
    this.scene.popMatrix()
  }
  
}
