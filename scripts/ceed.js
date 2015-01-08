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
							el.textContent = note.action + " " +note.target + 
							" with begin at [" + note.data.lt.x + "," +note.data.lt.y+ "] and " + 
							(note.data.rt.x-note.data.lt.x) + " width and " + (note.data.lb.y-note.data.lt.y) + " height";
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