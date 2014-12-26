var app = app || {};

app.logger = function(){
	
	Logger = function(){
		this.notes = {};
		this.popIndex = 0;
		this.pushIndex = 0;
	};

	Logger.prototype.push = function(note){
		this.notes[this.pushIndex++] = note;
	};

	Logger.prototype.pop = function(index){
		if (!index) { index = this.popIndex; }

		var note = this.notes[index];

		delete this.notes[index];
		index++;

		return note || null;
	};

	Logger.prototype.clear = function(){
		var key;
		for (key in this.notes) {
			delete this.notes[key];
		}
		this.popIndex = 0;
		this.pushIndex = 0;
	};

	Logger.prototype.getScene = function(){
		return this.notes;
	};

	return new Logger();
}();