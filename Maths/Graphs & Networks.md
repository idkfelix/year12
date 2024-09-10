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
- **Planar**: a graph that can be drawn on a plane with no intersecting 