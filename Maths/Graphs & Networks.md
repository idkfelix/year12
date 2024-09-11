## Basics
- **Vertex**: an object represented by a point on the graph
- **Edge**: an edge is a connection between two vertices represented by a line
- **Loop**: a loop is an edge that connects a vertex to itself
- **Graph**: a graph is a collection of vertices that may be connected to each other using edges is a specific way
- **Degree**: the degree of a vertex is the number of edges connected to itself. A *loop* counts as 2 edges for the degree of the vertex
- **Walk**: a walk is an alternating sequences of vertices and edges
- **Traversable**: a graph is considered traversable if there is a walk that can be drawn around the graph without doubling over any edge
## Types of Graphs
- **Undirected**: a graph where the edges between vertices work in both directions
- **Directed**: a graph in which edges only work in one direction, making some vertices unreachable for other vertices.
- **Simple**: a simple graph has no loops or multiple edges between the same pair of vertices. 
	- Each vertex has a degree of at most $\large n-1$ .
	- The graph has a maximum number of edges of $\huge\frac{n(n-1)}{2}$
- **Complete**: a complete graph is a simple graph where all vertices are connected directly to all other vertices. A graph of this kind will utilise the maximum number of edges possible for a simple graph of its vertices.
- **Connected**: a graph is connected if it is possible to move from any vertex of the graph to any other vertex of the graph using edges.
- **Network**: a network is a *weighted* graph where the weights are physical quantities. This graph may or may not be directed.

## Planar Graphs
- A graph is planar if it can be drawn on a plane with no overlapping edges, only intersecting at their connected vertices
- **Faces**: an area if finite or infinite space bounded by an alternating sequence of vertices and edges (a walk). This includes the infinitely large face bound by the outermost part of the graph.
- **Euler's Formula**: for a *connected* planar graph, the sum of vertices and faces is equal to two more than the number of edges
	- $\bf{v+f=e+2}$
	- $2=v+f-e$
	- $e=v+f-2$
	- $v=2+e-f$
	- $f=2+e-v$
## Walks
- **Trail**: a trail is a walk that does not repeat any edges, but can pass through a vertex more than once.
- **Path**: a path is a walk that does not repeat vertices, hence does not repeat any edges either.
- **Circuit**: a circuit is a trail that starts and ends at the same vertex with no repeated edges.
- **Cycle**: a cycle is a path that begins and ends at the same vertex with no repeated vertices.
## Eulerian
- **Eulerian Trail**: an Eulerian trail is a trail which uses every edge exactly once.
- **Eulerian Circuit**: an Eulerian circuit is an Eulerian trail which starts and ends at the same vertex.
- A connected graph has an Euler circuit if and only if every vertex on the graph is even (has an even degree).
- A connected graph has an Euler trail, but not an Euler circuit, if and only if the graph has two odd vertices. The trail must start at one of these vertices and end at the other.
## Hamiltonian 
- **Hamiltonian Path**: a Hamiltonian path is a path that visits each vertex exactly once, hence not repeating any edges either
- **Hamiltonian Cycle**; a Hamiltonian cycle is a Hamiltonian path, using every vertex exactly once, that starts and ends with the same vertex
- Vertices with a degree of $1$ must be the start or end of a Hamiltonian path
- If there are more than two vertices with a degree of $1$ in a graph, a Hamiltonian path cannot exist.
- Vertices with a degree of 2 must have both its edges included in the Hamiltonian path or circuit.
## Spanning Trees
- A tree is a simple, connected graph with no cycles. It uses the smallest number of edges to connect the graph. A tree with $\large n$ vertices has $\large n-1$ edges.
- A graph is connected if and only if it has a spanning tree.
- **Minimum Spanning Tree**: the minimum spanning tree of a graph is a spanning tree of the graph with the smallest total weight.
- **Prim's Algorithm**: a method to determine the minimum spanning tree of a graph
	1. Choose an arbitrary vertex to begin the spanning tree from
	2. Choose the edge with the smallest weight leading to a connected vertex
	3. Choose the edge with the smallest weight leading from any connected vertex that does not lead to a vertex that is already connected