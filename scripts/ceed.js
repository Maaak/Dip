var app = app || {};

app.ceed = function(){
	"use strict";
	
	var Ceed = function(){};

	Ceed.prototype.setVectorData = function(data) {
		
		var coordinates = app.parser.toCoordinates(data);

		var sceneLog = app.logic.buildScene(coordinates, true);

		if (app.scene) {
			app.scene.render(sceneLog);
		}else{
			setTimeout(function() {
				app.scene.render(sceneLog);	
				this.stripUpdate(sceneLog);
			}.bind(this), 50);
		}

		return sceneLog;
	};

	Ceed.prototype.stripUpdate = function(log){
	
		this.stripEl = app.ui.stripEl;
		var el;
		var fragment = document.createDocumentFragment();
		_.forEach(log, function(note){
			el = document.createElement("div");
			switch(note.action){
				case "render":
					switch(note.target){
						case "rectangle":
							el.textContent = "отрисовка прямоугольника с началом в точке [" + note.data.lt.x + "," +note.data.lt.y+ "] " + 
							(note.data.rt.x-note.data.lt.x) + " шириной и " + (note.data.lb.y-note.data.lt.y) + " высотой";
						break;
					}
				break;
			}
			
			fragment.appendChild(el);
		}.bind(this));
		
		_.forEach(log, function(note){
			
		})

		this.stripEl.appendChild(fragment);
	};

	return new Ceed();
}();