var app = app || {};

app.logic =function(){
	"use strict";
	
	var Logic = function(){
		
	};



	Logic.prototype.buildScene = function(data, isLineAlgorithm){
		if (isLineAlgorithm) {
			app.lineAlgorithm.setData(data);
		}else{

		}
	};


	

	return new Logic();
}();