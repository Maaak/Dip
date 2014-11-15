var app = app || {};

app.ui = function(){
	
	this.keydown = function(event){
		
		console.log(event.keyCode);	
	};

	this.inputEl = document.getElementById("map-input");
	this.inputEl.addEventListener("keydown", this.keydown, false);

	



}();