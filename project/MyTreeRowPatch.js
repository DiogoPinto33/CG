import { CGFobject } from "../lib/CGF.js";
import { MyBillboard } from "./MyBillboard.js";

export class MyTreeRowPatch extends CGFobject {
	constructor(scene, x, y, z) {
		super(scene);
		this.x = x;
		this.y = y;
		this.z = z;
		this.trees = [];

		for (let i = 0; i < 6; i++) {
			const treeX = this.x + i * Math.random() * 0.20 - 0.10;
			const treeZ = this.z + i + Math.random() * 0.35 - 0.20;
			const tree = new MyBillboard(scene, treeX, this.y, treeZ);
			this.trees.push(tree);
		}
	}

	display() {
		for (let i = 0; i < this.trees.length; i++) {
			this.scene.pushMatrix();
			this.scene.translate(this.trees[i].x, this.trees[i].y, this.trees[i].z);
            this.scene.rotate(90, 0, 1, 0);
			this.trees[i].display();
			this.scene.popMatrix();
		}
	}
}