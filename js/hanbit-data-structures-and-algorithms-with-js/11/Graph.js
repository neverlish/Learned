function Graph(v) {
	this.vertices = v;
	this.edges = 0;
	this.adj = [];
	for (var i = 0; i < this.vertices; ++i) {
		this.adj[i] = [];
	}
	this.addEdge = addEdge;
	this.showGraph = showGraph;
}

function addEdge(v, w) {
	this.adj[v].push(w);
	this.adj[w].push(v);
	this.edges++;
}

function showGraph() {
	for (var i = 0; i < this.vertices; ++i) {
		var result = i + ' -> ';
		for (var j = 0; j < this.vertices; ++j) {
			if (this.adj[i][j] != undefined) {
				result += this.adj[i][j] + ' ';
			}
		}
		console.log(result);
	}
}

module.exports.Graph = Graph;