var app = app || {};

app.ui = function(){
	"use strict";


	var UI = function(){
		
		this.keydown = function(event){
			
			console.log(event.keyCode);

			if (event.keyCode === 13) {
				app.ceed.setVectorData(this.value);
			}
		};

		this.inputEl = document.getElementById("map-input");
		this.inputEl.addEventListener("keydown", this.keydown, false);


		this.canvasEl = document.getElementById("canvas");

		app.ceed.setVectorData("o8s11w9n3o2n3o1s5o5n7w1s5w3n6w2s2w1n4");
	};
	

	return new UI();
}();