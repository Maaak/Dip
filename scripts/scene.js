var app = app || {};

setTimeout(function() {
	app.scene = function(){
		"use strict";

		var Scene = function(){
			this.zoom = 20;
			this.colors = ["#511", "#81F", "#21a", "#4a1", "#ba1", "#49b", "#25b", "#111", "#111", "#111"];
			this.colorsIndex = 0;
			this.canvasInit();
			


			this.isAnimating = false;
		};

		Scene.prototype.canvasInit = function(){
			this.canvasEl = app.ui.canvasEl;

			this.canvas = this.canvasEl.getContext("2d");
			this.canvas.width = this.canvasEl.clientWidth;
			this.canvas.height = this.canvasEl.clientHeight;

			this.canvas.translate(this.canvas.width/4, this.canvas.height/4);
			this.canvasClear(this.canvas);
		};

		Scene.prototype.canvasClear = function(canvas){
			canvas.save();
			canvas.setTransform(1, 0, 0, 1, 0, 0);
			canvas.clearRect(0, 0, canvas.width, canvas.height);
			canvas.restore();
		};

		Scene.prototype.renderGrid = function(canvas){
			canvas.save();
			canvas.setTransform(1, 0, 0, 1, 0, 0);
			canvas.lineWidth = 0.1;
			canvas.strokeStyle = "#fff";
			var i = 0;
			var loopLength = Math.floor(this.canvas.width/this.zoom);
			while(i < loopLength){
				canvas.beginPath();
				canvas.moveTo(0.5, i*this.zoom  + 0.5);
				canvas.lineTo(this.canvas.width, i*this.zoom  + 0.5);
				canvas.stroke();

				canvas.beginPath();
				canvas.moveTo(i*this.zoom + 0.5, 0.5);
				canvas.lineTo(i*this.zoom + 0.5, this.canvas.height);
				canvas.stroke();
				
				i++;
			}
			canvas.restore();
		};

		Scene.prototype.renderRectangle = function(rect){
			this.canvas.beginPath();
			this.canvas.fillStyle = this.colors[this.colorsIndex++];
			this.canvas.rect(
				rect.lt.x * this.zoom+ 0.5,
				rect.lt.y * this.zoom + 0.5, 
				(rect.rt.x-rect.lt.x) * this.zoom,
				(rect.lb.y-rect.lt.y) * this.zoom
			);
			this.canvas.fill();
			this.canvas.stroke();

			this.canvas.font = "10px Calibri";
      		this.canvas.fillText("[" +rect.lt.x+ "," +rect.lt.y+ "]", rect.lt.x * this.zoom - 10, rect.lt.y  * this.zoom - 5);
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

			this.renderGrid(this.canvas);
		};


		Scene.prototype.animate = function() {
			this.render();
			if (!this.isAnimating) {
				this.animationId = window.requestAnimationFrame(this.animate);
				//this.isAnimating = true;
			}
		};
		
		return new Scene();
	}();
}, 50);