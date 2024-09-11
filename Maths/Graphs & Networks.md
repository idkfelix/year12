# Basics
- **Vertex**: an object represented by a point on the graph
- **Edge**: an edge is a connection between two vertices represented by a line
- **Loop**: a loop is an edge that connects a vertex to itself
- **Graph**: a graph is a collection of vertices that may be connected to each other using edges is a specific way
- **Degree**: the degree of a vertex is the number of edges connected to itself. A *loop* counts as 2 edges for the degree of the vertex
# Types of Graphs
- **Undirected**: a graph where the edges between vertices work in both directions
- **Directed**: a graph in which edges only work in one direction, making some vertices unreachable for other vertices.
- **Simple**: a simple graph has no loops or multiple edges between the same pair of vertices. 
	- Each vertex has a degree of at most $\large n-1$ .
	- The graph has a maximum number of edges of $\huge\frac{n(n-1)}{2}$
- **Complete**: a complete graph is a simple graph where all vertices are connected directly to all other vertices. A graph of this kind will utilise the maximum number of edges possible for a simple graph of its vertices.
- **Connected**: a graph is connected if it is possible to move from any vertex of the graph to any other vertex of the graph using edges.
- **Network**: a network is a *weighted* graph where the weights are physical quantities. This graph may or may not be directed.

# Planar Graphs
- A graph is planar if it can be drawn on a plane with no overlapping edges, only intersecting at their connected vertices
- **Faces**: an area if finite or infinite space bounded by an alternating sequence of vertices and edges (a walk). This includes the infinitely large face bound by the outermost part of the graph.
- **Euler's Formula**: for a *connected* planar graph, the sum of vertices and faces is equal to two more than the number of edges
	- $\bf{v+f=e+2}$
	- $2=v+f-e$
	- $e=v+f-2$
	- $v=2+e-f$
	- $f=2+e-v$
# Traversable Graphs
- **Traversable**: a graph is traversable if there is a walk that can be drawn around the graph 