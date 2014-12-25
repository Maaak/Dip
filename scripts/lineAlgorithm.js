var app = app || {};

app.lineAlgorithm = function(){
	
	LineAlgorithm = function(){

		this.edges = [];
		this.coords = [];
		this.rectangles = [];
	};

	LineAlgorithm.prototype.checkChasm = function(startEdge, fPoint, lPoint){
		// from top
		if (!_.find(startEdge, function(item){ return item.y === fPoint.y; })) {
			return { 
				top: { x: fPoint.x, y: startEdge.top.y},
				bot: { x: fPoint.x, y: fPoint.y},
			};
		}

		// from bottom
		if (!_.find(startEdge, function(item){ return item.y === lPoint.y; })) {
			return { 
				top: { x: lPoint.x, y: lPoint.y},
				bot: { x: lPoint.x, y: startEdge.bot.y},
			};
		}
		return null;
	};

	/**
	* Build rectangle form 4 points
	* @param  {Array} 	points	Array with rectangle coordinates(left edge - right edge)
	* @return {Object}  	    Rectangle with coordinates
	*/
	LineAlgorithm.prototype.buildRectangle = function(startEdge, fPoint, lPoint){

		// chasm edges checks
		var chasm = this.checkChasm(startEdge, fPoint, lPoint);
		var rect = {
			lt: startEdge.top,
			lb: startEdge.bot
		};

		// from top
		if (!_.find(startEdge, function(item){ return item.y === fPoint.y; })) {
			rect.rt = { x: fPoint.x, y: rect.lt.y };
			rect.rb = lPoint;
		}

		// from bottom
		if (!_.find(startEdge, function(item){ return item.y === lPoint.y; })) {
			rect.rt = fPoint;
			rect.rb = { x: lPoint.x, y: rect.lb.y };
		}

										console.log("["+rect.lt.x+"."+rect.lt.y+"]  " + "["+rect.rt.x+"."+rect.rt.y+"]\n " + "["+rect.lb.x+"."+rect.lb.y+"]  "+"["+rect.rb.x+"."+rect.rb.y+"]");
										console.log("chasm ["+chasm.top.x+"."+chasm.top.y+"]-["+chasm.bot.x+"."+chasm.bot.y+"]");

		return { rect: rect, chasm: chasm};
	};

	LineAlgorithm.prototype.cutRectangle = function(startEdge, fPoint, lPoint){
	
		var rect = this.buildRectangle(JSON.parse(JSON.stringify(startEdge)), JSON.parse(JSON.stringify(fPoint)), JSON.parse(JSON.stringify(lPoint)));

		if (rect.chasm) {
			// create a new point after cut
			var buf = _.find(rect.chasm, function(item){ return !item.id });
			var newPoint = {
				id: this.coords.length,
				pre: null,
				next: null,
				x: buf.x,
				y: buf.y,
			};
			this.coords.push(newPoint);
		}

		// save filled rectangle
		this.rectangles.push( rect.rect );

		// add old edge
		this.edges.push(rect.chasm);

		// remove old edge
		_.remove(this.edges, startEdge);
		return rect;
	};

	/**
	 * Adds edge as a begin of rectangle
	 * @param {Object} fPoint Coordinates for point(x, y)
	 * @param {Object} lPoint Coordinates for point(x, y)
	 */
	LineAlgorithm.prototype.addEdge = function(fPoint, lPoint){
		
		var startEdge = _.find(this.edges, function(rect){
			return  (rect.top.y === fPoint.y && rect.bot.y === lPoint.y) ||

					(rect.top.y === fPoint.y && rect.top.y < lPoint.y) ||

					(rect.bot.y === lPoint.y && rect.bot.y > fPoint.y);
		});


		if (startEdge) {
			// filling existed rectangle
			var rect = this.cutRectangle(startEdge, fPoint, lPoint);
		}else{
			// adding new rectangle
			this.edges.push(
				{
					top: fPoint,
					bot: lPoint,
				}
			);
		}
	};

	LineAlgorithm.prototype.setData = function(coords){

		this.coords = coords;

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