import * as THREE from 'three';

export class Obstacle {
  mesh: THREE.Mesh;
  speed: number;
  active: boolean;

  constructor(position: THREE.Vector3) {
    const geometry = new THREE.BoxGeometry(1, 2, 1);
    const material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.copy(position);
    this.speed = 0.1;
    this.active = true;
  }

  update(deltaTime: number, gameSpeed: number) {
    if (!this.active) return;
    this.mesh.position.z += this.speed * deltaTime * gameSpeed;
    
    // Remove obstacle when it's behind the player
    if (this.mesh.position.z > 10) {
      this.active = false;
    }
  }

  reset(position: THREE.Vector3) {
    this.mesh.position.copy(position);
    this.active = true;
  }
}