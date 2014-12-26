var app = app || {};

app.scene = function(){
	"use strict";

	var Scene = function(){
		
	};

	Scene.prototype.renderRectangle = function(rect){
		// The creation of the square is done in the same way as the triangle, except of the 
		// face definition. Instead of using one THREE.Face3, we have to define two 
		// THREE.Face3 objects. 
		// 1. Instantiate the geometry object 
		// 2. Add the vertices 
		// 3. Define the faces by setting the vertices indices 
		var squareGeometry = new THREE.Geometry(); 
		squareGeometry.vertices.push(new THREE.Vector3(-1.0,  1.0, 0.0)); 
		squareGeometry.vertices.push(new THREE.Vector3( 1.0,  1.0, 0.0)); 
		squareGeometry.vertices.push(new THREE.Vector3( 1.0, -1.0, 0.0)); 
		squareGeometry.vertices.push(new THREE.Vector3(-1.0, -1.0, 0.0)); 
		squareGeometry.faces.push(new THREE.Face3(0, 1, 2)); 
		squareGeometry.faces.push(new THREE.Face3(0, 2, 3)); 

		// Create a white basic material and activate the 'doubleSided' attribute. 
		var squareMaterial = new THREE.MeshBasicMaterial({ 
			color:0xFFFFFF, 
			side:THREE.DoubleSide 
		}); 

		// Create a mesh and insert the geometry and the material. Translate the whole mesh 
		// by 1.5 on the x axis and by 4 on the z axis and add the mesh to the scene. 
		var squareMesh = new THREE.Mesh(squareGeometry, squareMaterial); 
		squareMesh.position.set(1.5, 0.0, 4.0); 
		scene.add(squareMesh); 
	};

	Scene.prototype.render = function(log){
	
		_.forEach(log, function(note){
			switch(note.action){
				case "render":
					switch(note.target){
						case "rectangle":
							this.renderRectangle(note.data)
						break;
					}
				break;
			}
		}.bind(this));
	};
	var renderer = new THREE.WebGLRenderer({antialias:true});
	renderer.setClearColor(0x000000, 1); 
	var canvasWidth = document.getElementById("scene").clientWidth; 
	var canvasHeight = document.getElementById("scene").clientHeight;
 	document.getElementById("scene").appendChild(renderer.domElement);
	renderer.setSize(canvasWidth, canvasHeight); 
	var camera = new THREE.PerspectiveCamera(45, canvasWidth / canvasHeight, 1, 100); 
	var scene = new THREE.Scene(); 
	camera.position.set(0, 0, 10); 
	camera.lookAt(scene.position); 
	scene.add(camera); 


	function render() {
		requestAnimationFrame( render );

		/*cube.rotation.x += 0.1;
		cube.rotation.y += 0.1;*/

		renderer.render(scene, camera);
	}
	render();

	
	return new Scene();
}();
