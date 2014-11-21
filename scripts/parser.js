var app = app || {};

app.parser = function(){
	"use strict";

	var Parser = function(){
		
	};

	Parser.prototype.toCoordinates = function(data){
		var regex = /([oswn]\d+)/gi; 
		var vectors = [];
		var buf;
		 
		while ((buf = regex.exec(data)) != null) {
			vectors.push({
				dir: buf[0].slice(0,1),
				length: +buf[0].slice(1,buf[0].length)
			});
		}

		var coords = [];
		coords.push({
			id: 0,
			x: 0,
			y: 0,
			next: 1,
			pre: vectors.length-1
		});

		var i = 0;
		var vectorsLength = vectors.length-1;
		while(i < vectorsLength){
			coords.push({
				id: i+1,
				x: coords[i].x,
				y: coords[i].y,
				next: i+2,
				pre: i
			});
			switch(vectors[i].dir){
				case "o":
					coords[i+1].x = coords[i].x+vectors[i].length;
				break;
				case "s":
					coords[i+1].y = coords[i].y+vectors[i].length;
				break;
				case "w":
					coords[i+1].x = coords[i].x-vectors[i].length;
				break;
				case "n":
					coords[i+1].y = coords[i].y-vectors[i].length;
				break;
			}
			i++;
		}
		coords[coords.length-1].next = 0;

		return coords;
	};





	return new Parser();
}();