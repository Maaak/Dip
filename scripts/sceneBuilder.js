var app = app || {};

app.sceneBuilder = function(){
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

	var sceneContainerEl = document.getElementById("scene");
	var renderer = new THREE.WebGLRenderer({ alpha: true });
	renderer.setClearColor( 0xBB5335, 1);
	renderer.setSize( sceneContainerEl.clientWidth, sceneContainerEl.clientHeight );
	sceneContainerEl.appendChild( renderer.domElement );


	var geometry = new THREE.BoxGeometry( 1, 1, 1 );
	var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	var cube = new THREE.Mesh( geometry, material );
	scene.add( cube );

	camera.position.z = 2;


	function render() {
		requestAnimationFrame( render );

		cube.rotation.x += 0.1;
		cube.rotation.y += 0.1;

		renderer.render(scene, camera);
	}
	//render();
}();
