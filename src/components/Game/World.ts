import * as THREE from 'three';

export class World {
  ground: THREE.Mesh;
  segments: THREE.Mesh[];
  segmentSize: number;
  totalSegments: number;

  constructor() {
    // Create infinite ground
    const groundGeometry = new THREE.PlaneGeometry(20, 1000);
    const groundMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x444444,
      wireframe: false
    });
    this.ground = new THREE.Mesh(groundGeometry, groundMaterial);
    this.ground.rotation.x = -Math.PI / 2;
    
    // Create segments for infinite scrolling
    this.segmentSize = 50;
    this.totalSegments = 3;
    this.segments = [];
    
    for (let i = 0; i < this.totalSegments; i++) {
      const segment = new THREE.Mesh(
        new THREE.PlaneGeometry(20, this.segmentSize),
        groundMaterial
      );
      segment.rotation.x = -Math.PI / 2;
      segment.position.z = -i * this.segmentSize;
      this.segments.push(segment);
    }
  }

  update(deltaTime: number, gameSpeed: number) {
    // Move segments
    this.segments.forEach(segment => {
      segment.position.z += 0.1 * deltaTime * gameSpeed;
      
      // Reset segment position when it goes behind camera
      if (segment.position.z > this.segmentSize) {
        segment.position.z -= this.totalSegments * this.segmentSize;
      }
    });
  }
}