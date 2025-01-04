<template>
    <div class="relative">
      <div ref="container" class="w-full h-64 rounded-lg overflow-hidden"></div>
      <div class="absolute bottom-4 right-4 space-x-2">
        <button 
          @click="rotate('left')" 
          class="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
        >
          <rotate-ccw-icon class="w-4 h-4" />
        </button>
        <button 
          @click="rotate('right')" 
          class="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
        >
          <rotate-cw-icon class="w-4 h-4" />
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import { onMounted, onBeforeUnmount, ref } from 'vue';
  import * as THREE from 'three';
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
  import { RotateCwIcon, RotateCcwIcon } from 'lucide-vue-next';
  
  export default {
    name: 'AvatarViewer',
    components: {
      RotateCwIcon,
      RotateCcwIcon
    },
    props: {
      modelUrl: {
        type: String,
        required: true
      }
    },
    setup(props) {
      const container = ref(null);
      let scene, camera, renderer, controls, model;
  
      const initScene = () => {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, container.value.clientWidth / container.value.clientHeight, 0.1, 1000);
        
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(container.value.clientWidth, container.value.clientHeight);
        renderer.setClearColor(0xf3f4f6);
        container.value.appendChild(renderer.domElement);
  
        const light = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(light);
  
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(0, 1, 1);
        scene.add(directionalLight);
  
        camera.position.z = 5;
  
        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
  
        const loader = new GLTFLoader();
        loader.load(props.modelUrl, (gltf) => {
          model = gltf.scene;
          scene.add(model);
          
          // Center the model
          const box = new THREE.Box3().setFromObject(model);
          const center = box.getCenter(new THREE.Vector3());
          model.position.sub(center);
        });
  
        animate();
      };
  
      const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };
  
      const rotate = (direction) => {
        if (model) {
          const rotationAmount = direction === 'left' ? 0.5 : -0.5;
          model.rotation.y += rotationAmount;
        }
      };
  
      onMounted(() => {
        initScene();
        window.addEventListener('resize', handleResize);
      });
  
      onBeforeUnmount(() => {
        window.removeEventListener('resize', handleResize);
        if (renderer) {
          renderer.dispose();
        }
      });
  
      const handleResize = () => {
        if (camera && renderer && container.value) {
          camera.aspect = container.value.clientWidth / container.value.clientHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(container.value.clientWidth, container.value.clientHeight);
        }
      };
  
      return {
        container,
        rotate
      };
    }
  }
  </script>