var app = app || {};

app.lineAlgorithm = function(){
	
	LineAlgorithm = function(){

		this.rectangles = [];
	};

	LineAlgorithm.prototype.addEdge = function(fPoint, lPoint){
		
		
		_.find(this.rectangles, function(rect){
			var buf = rect[0].y <= fPoint.y && rect[1].y >= fPoint.y || rect[0].y <= lPoint.y && rect[1].y >= lPoint.y;
			console.log(buf);
			return buf;
		});



		// adding new rectangle
		this.rectangles.push({
			0: {fPoint},
			1: {lPoint},
		});
	}




	LineAlgorithm.prototype.setData = function(coords){
		// width and height calculation
		var minCoordX = _.min(coords, function(coord){ return coord.x; });
		var maxCoordX = _.max(coords, function(coord){ return coord.x; });
		var width = maxCoordX.x-minCoordX.x;
		var minCoordY = _.min(coords, function(coord){ return coord.y; });
		var maxCoordY = _.max(coords, function(coord){ return coord.y; });
		var height = maxCoordY.y-minCoordY.y;

		
		// main loop
		var i = minCoordX.x;
		while(i < maxCoordX.x){
			
			stepCoords = _.filter(coords, {x: i});
			stepCoords = _.sortBy(stepCoords, "y");

			var j = 0;
			while(j < stepCoords.length){
				
				this.addEdge(stepCoords[j], stepCoords[j+1]);
				

				// coordinates go always by pair 
				j++;
				j++;
			}






			
			i++;
		}
	};


	return new LineAlgorithm();
}();