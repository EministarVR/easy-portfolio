import * as THREE from 'three';
import { PlayerState } from '../../types/game';

export class Player {
  mesh: THREE.Mesh;
  velocity: THREE.Vector3;
  isJumping: boolean;
  state: PlayerState;

  constructor() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.set(0, 0.5, 0);
    this.velocity = new THREE.Vector3(0, 0, 0);
    this.isJumping = false;
    this.state = 'running';
  }

  jump() {
    if (!this.isJumping) {
      this.velocity.y = 0.4;
      this.isJumping = true;
      this.state = 'jumping';
    }
  }

  update(deltaTime: number, gameSpeed: number) {
    // Apply gravity
    this.velocity.y -= 0.02;

    // Update position
    this.mesh.position.y += this.velocity.y;

    // Ground collision
    if (this.mesh.position.y <= 0.5) {
      this.mesh.position.y = 0.5;
      this.velocity.y = 0;
      this.isJumping = false;
      this.state = 'running';
    }

    // Side movement animation
    this.mesh.rotation.y += deltaTime * gameSpeed * 2;
  }
}