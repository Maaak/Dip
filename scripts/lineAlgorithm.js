var app = app || {};

app.lineAlgorithm = function(){
	
	LineAlgorithm = function(){

		this.edges = [];
		this.rectangles = [];
	};

	/**
	* Build rectangle form 4 points
	* @param  {Array} 	points	Array with rectangle coordinates(left edge - right edge)
	* @return {Object}  	    Rectangle with coordinates
	*/
	LineAlgorithm.prototype.buildRectangle = function(points){
		return {
			0: { x: points[0].x, y: points[2].y	},
			1: { x: points[1].x, y: points[3].y },
			2: { x: points[2].x, y: points[2].y },
			3: { x: points[3].x, y: points[3].y	},
		}
	}

	/**
	 * Adds edge as a begin of rectangle
	 * @param {Object} fPoint Coordinates for point(x, y)
	 * @param {Object} lPoint Coordinates for point(x, y)
	 */
	LineAlgorithm.prototype.addEdge = function(fPoint, lPoint){
		
		var startEdge = _.find(this.edges, function(rect){
			return  (rect[0].y <= fPoint.y && rect[1].y >= fPoint.y) ||
					(rect[0].y <= lPoint.y && rect[1].y >= lPoint.y);
		});


		if (startEdge) {
			// filling existed rectangle
			var filledRect = LineAlgorithm.prototype.buildRectangle({
				0: startEdge[0],
				1: startEdge[1],
				2: fPoint,
				3: lPoint,
			});

			if (startEdge[1].y > filledRect[0].y) {
				startEdge[1].y = filledRect[0].y;
			}

			this.rectangles.push(filledRect);
		}else{
			// adding new rectangle
			this.edges.push({
				0: fPoint,
				1: lPoint,
			});
		}

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