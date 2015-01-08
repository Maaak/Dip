var app = app || {};

app.ui = function(){
	"use strict";


	var UI = function(){
		
		this.keydown = function(event){
			
			console.log(event.keyCode);

			if (event.keyCode === 13) {
				app.logger.clear();
				app.scene.canvasClear(app.scene.canvas);
				app.ceed.setVectorData(this.value);
			}
		};

		this.inputEl = document.getElementById("map-input");
		this.inputEl.addEventListener("keydown", this.keydown, false);


		this.canvasEl = document.getElementById("canvas");
		this.stripEl = document.getElementById("left-side");
		this.descriptionEl = document.getElementById("description");
		this.descriptionEl.textContent = "Система прямоугольников: ";

		var sceneLog = setTimeout(function() {
			this.inputEl.value = "o1s1o2s2o4s2w6n3w1n2";
			app.ceed.setVectorData("o1s1o2s2o4s2w6n3w1n2");
			//this.inputEl.value = "o8s8w6n4o3s1w2s2o3n5w5s4w1n6";
			//app.ceed.setVectorData("o8s8w6n4o3s1w2s2o3n5w5s4w1n6");
		}.bind(this), 0);
	};
	return new UI();
}();