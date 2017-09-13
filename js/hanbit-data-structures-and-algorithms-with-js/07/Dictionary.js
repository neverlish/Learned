function Dictionary() {
	this.datastore = new Array();
	this.add = add;
	this.find = find;
	this.remove = remove;
	this.showAll = showAll;
}

function add(key, value) {
	this.datastore[key] = value;
}

function find(key) {
	return this.datastore[key];
}

function remove(key) {
	delete this.datastore[key];
}

function showAll() {
	var keys = Object.keys(this.datastore)
	for (var i = 0; i < keys.length; i++) {
		console.log(keys[i] + ' -> ' + this.datastore[keys[i]]);
	}
}

module.exports.Dictionary = Dictionary