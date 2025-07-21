import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface FloatingNeuralNetworkProps {
  className?: string;
}

const FloatingNeuralNetwork = ({ className = '' }: FloatingNeuralNetworkProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    nodes: THREE.Mesh[];
    connections: THREE.Line[];
    animationId: number;
  } | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      alpha: true, 
      antialias: true 
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    // Create neural network nodes
    const nodes: THREE.Mesh[] = [];
    const connections: THREE.Line[] = [];
    const nodePositions: THREE.Vector3[] = [];

    // Node geometry and materials
    const nodeGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    const nodeMaterial = new THREE.MeshBasicMaterial({
      color: 0x4f9cff,
      transparent: true,
      opacity: 0.8
    });

    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x64b5f6,
      transparent: true,
      opacity: 0.3
    });

    // Create nodes in 3D space
    for (let i = 0; i < 50; i++) {
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      const glow = new THREE.Mesh(
        new THREE.SphereGeometry(0.1, 8, 8),
        glowMaterial
      );

      // Random positions in 3D space
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 8;
      const z = (Math.random() - 0.5) * 6;
      
      node.position.set(x, y, z);
      glow.position.set(x, y, z);
      
      nodePositions.push(new THREE.Vector3(x, y, z));
      nodes.push(node);
      
      scene.add(node);
      scene.add(glow);
    }

    // Create connections between nearby nodes
    const connectionMaterial = new THREE.LineBasicMaterial({
      color: 0x64b5f6,
      transparent: true,
      opacity: 0.2
    });

    for (let i = 0; i < nodePositions.length; i++) {
      for (let j = i + 1; j < nodePositions.length; j++) {
        const distance = nodePositions[i].distanceTo(nodePositions[j]);
        
        // Only connect nearby nodes
        if (distance < 2.5) {
          const geometry = new THREE.BufferGeometry().setFromPoints([
            nodePositions[i],
            nodePositions[j]
          ]);
          
          const line = new THREE.Line(geometry, connectionMaterial);
          connections.push(line);
          scene.add(line);
        }
      }
    }

    // Position camera
    camera.position.z = 8;
    camera.position.y = 1;

    // Animation loop
    let time = 0;
    const animate = () => {
      time += 0.01;

      // Animate nodes
      nodes.forEach((node, index) => {
        node.position.y += Math.sin(time + index * 0.1) * 0.005;
        node.position.x += Math.cos(time + index * 0.05) * 0.003;
        node.rotation.x += 0.01;
        node.rotation.y += 0.01;
      });

      // Animate connections opacity
      connections.forEach((connection, index) => {
        const material = connection.material as THREE.LineBasicMaterial;
        material.opacity = 0.1 + Math.sin(time + index * 0.2) * 0.1;
      });

      // Rotate entire scene slowly
      scene.rotation.y += 0.002;
      scene.rotation.x = Math.sin(time * 0.3) * 0.1;

      renderer.render(scene, camera);
      const animationId = requestAnimationFrame(animate);
      
      if (sceneRef.current) {
        sceneRef.current.animationId = animationId;
      }
    };

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Store refs and start animation
    sceneRef.current = {
      scene,
      camera,
      renderer,
      nodes,
      connections,
      animationId: 0
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId);
        sceneRef.current.renderer.dispose();
        
        // Dispose geometries and materials
        sceneRef.current.nodes.forEach(node => {
          node.geometry.dispose();
          if (Array.isArray(node.material)) {
            node.material.forEach(mat => mat.dispose());
          } else {
            node.material.dispose();
          }
        });
        
        sceneRef.current.connections.forEach(connection => {
          connection.geometry.dispose();
          if (Array.isArray(connection.material)) {
            connection.material.forEach(mat => mat.dispose());
          } else {
            connection.material.dispose();
          }
        });
      }
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className={`fixed inset-0 -z-10 ${className}`}
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default FloatingNeuralNetwork;