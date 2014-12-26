var app = app || {};

app.ceed = function(){
	"use strict";
	
	var Ceed = function(){};

	Ceed.prototype.setVectorData = function(data) {
		
		var coordinates = app.parser.toCoordinates(data);

		var sceneLog = app.logic.buildScene(coordinates, true);

		app.scene.render(sceneLog);
	}


	return new Ceed();
}();