<script lang="ts">
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	let container: HTMLElement;
	let camera: THREE.PerspectiveCamera;
	let scene = new THREE.Scene();
	let cube: THREE.LineSegments;
	let renderer: THREE.WebGLRenderer;
	onMount(() => {
		// Create a camera
		camera = new THREE.PerspectiveCamera(
			50,
			container.offsetWidth / container.offsetHeight,
			0.1,
			1000
		);
		camera.position.z = 0.55;

		// Create a renderer
		renderer = new THREE.WebGLRenderer();
		renderer.setSize(container.offsetWidth, container.offsetHeight);
		renderer.setClearColor(0x000000, 0);
		container.appendChild(renderer.domElement);
		// Create a cube geometry and material

		// Create a wireframe geometry using WireframeGeometry
		const geometry = new THREE.WireframeGeometry(new THREE.OctahedronGeometry(1, 4));
		// Create a material for the wireframe lines
		const material = new THREE.LineBasicMaterial({
			color: 0xffffff,
		});

		// Create a cube mesh and add it to the scene
		cube = new THREE.LineSegments(geometry, material);
		cube.rotateZ(45);
		scene.add(cube);
		// Animation function
		function animate() {
			requestAnimationFrame(animate);

			// Rotate the cube
			cube.rotation.x += 0.00025;
			cube.rotation.y += 0.00025;

			// Render the scene with the camera
			renderer.render(scene, camera);
		}
		// Call the animate function to start the animation loop
		animate();
	});
</script>

<div bind:this={container} class="absolute top-0 h-full w-full"></div>
