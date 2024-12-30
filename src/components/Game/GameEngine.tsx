import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import useGameStore from '../../store/gameStore';
import { Player } from './Player';
import { World } from './World';
import { Obstacle } from './Obstacle';
import { AudioManager } from './AudioManager';
import { handleTouchControls } from '../../utils/controls';
import GameControls from './GameControls';

const GameEngine: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { 
    perspective, 
    isPlaying, 
    isPaused,
    gameSpeed,
    volume,
    setScore,
    setPerspective,
    endGame 
  } = useGameStore();

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      antialias: true 
    });

    // Setup
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x87CEEB);
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 0);
    scene.add(directionalLight);

    // Game objects
    const player = new Player();
    const world = new World();
    const obstacles: Obstacle[] = [];
    const audio = new AudioManager();

    scene.add(player.mesh);
    world.segments.forEach(segment => scene.add(segment));

    // Game state
    let score = 0;
    let lastTime = 0;
    let obstacleSpawnTimer = 0;
    
    audio.setVolume(volume);
    audio.playBgMusic();

    // Controls
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        player.jump();
        audio.playJumpSound();
      } else if (e.code === 'Tab') {
        e.preventDefault();
        setPerspective(perspective === '2d' ? '3d' : '2d');
      }
    };

    const handleTouch = (e: TouchEvent) => {
      handleTouchControls(e, () => {
        player.jump();
        audio.playJumpSound();
      });
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('touchstart', handleTouch);

    // Game loop
    const animate = (time: number) => {
      if (!isPaused && isPlaying) {
        const deltaTime = (time - lastTime) / 16.67;
        lastTime = time;

        player.update(deltaTime, gameSpeed);
        world.update(deltaTime, gameSpeed);
        
        obstacleSpawnTimer += deltaTime;
        if (obstacleSpawnTimer > 60) {
          obstacleSpawnTimer = 0;
          const obstacle = new Obstacle(new THREE.Vector3(
            Math.random() * 10 - 5,
            1,
            -50
          ));
          obstacles.push(obstacle);
          scene.add(obstacle.mesh);
        }

        obstacles.forEach(obstacle => {
          obstacle.update(deltaTime, gameSpeed);
          
          if (obstacle.active) {
            const collision = player.mesh.position.distanceTo(obstacle.mesh.position) < 1.5;
            if (collision) {
              audio.playCollisionSound();
              audio.stopBgMusic();
              endGame();
            }
          }
        });

        score += deltaTime * gameSpeed;
        setScore(Math.floor(score));

        if (perspective === '2d') {
          camera.position.set(0, 5, 10);
        } else {
          camera.position.set(
            player.mesh.position.x + 5,
            player.mesh.position.y + 5,
            player.mesh.position.z + 10
          );
        }
        camera.lookAt(player.mesh.position);
      }
      
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate(0);

    return () => {
      renderer.dispose();
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('touchstart', handleTouch);
      audio.stopBgMusic();
    };
  }, [isPlaying, isPaused, perspective, gameSpeed, volume]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="w-full h-full absolute top-0 left-0"
      />
      <GameControls />
    </>
  );
};