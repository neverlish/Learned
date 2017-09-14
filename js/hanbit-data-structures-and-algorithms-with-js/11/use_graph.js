var {Graph} = require('./Graph');

var g = new Graph(5);
g.addEdge(0,1);
g.addEdge(0,2);
g.addEdge(1,3);
g.addEdge(2,4);
g.showGraph();
/*
0 ->  1 2 
1 ->  0 3 
2 ->  0 4 
3 ->  1 
4 ->  2 
*/
