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
## Flow Graph
- A flow graph is a directed network where the weights represent flow rate. this graph has a source vertex that represents incoming flow and a sink vertex that all directed edges eventually flow to. 
- **Cuts**: a cut is a line the intersects edges such that it block all flow to the sink.
- **Capacity**: the capacity of a cut is the sum of all intersected forward flowing edges that it blocks.
- **Minimum Cut**: the minimum cut of a flow graph is a cut that blocks all flow with the smallest total capacity.
- **Maximum Flow**: the maximum flow of a flow graph is equal to the capacity of said flow graphs minimum cut.
## Allocation
- **Bipartite Graph**: a bipartite graph is a graph whose vertices can be split into two groups where the the vertices are only connected to vertices in the other group.
- As a table the bipartite graph is represented with resources as rows and allocation targets as columns
- **Hungarian Algorithm**: the Hungarian algorithm is used to find the minimum allocation cost from weighted data.
	1. Subtract the lowest value in each row from every value in that row.
	2. If the minimum number of lines required to cover all zeros is equal to the number of allocations to be made, jump to step 6.
	3. If a column does not contain a zero, subtract the lowest value in the column from every value in that column.
	4. If the minimum number of lines required to cover all zeros is equal to the number of allocations to be made, jump to step 6.
	5. Add the smallest uncovered value from the previous step to all values covered by two lines. Subtract the same value from all uncovered values.
	6. Draw a bipartite graph with an edge for every zero value in the table.
	7. Make the allocation and calculate minimum cost from the original weights,
## Shortest Path
- Shortest path problems are about determining the path with the least total weight between two vertices.
- **Dijkstra's Algorithm**: Dijkstra's algorithm is used to determine the length and route of the shortest path between two vertices in a network
	1. Create a table with the first row being the starting vertex and the columns being all other vertices in the network.
	2. In the row list the weights for each connected vertex in their corresponding column, leaving a dash if there is no connection.
	3. Draw a box around the value with the lowest weight and copy the boxed value down to the next row, labelling the row as the chosen vertex.
	4. Once again fill out the column values of connected vertices using the combined weight of the edge and the boxed value. If a possible value has a value in any row above that is less that the new value use that instead. If there is no connection but there is a value in a row above use that instead.
	5. Repeat steps three and four until the destination vertex is chosen as the lowest value in a row, this is the final length of the shortest path.
	6. To find the route of the path work backwards through the table moving up to when the chosen of each row value first appeared marking the order of vertices taken.
## Activity Network
- **Precedence Table**: this table details the activities required to complete a project, the activities that immediately precede them, and the duration of each activity.
- If a activity has no immediate predecessors (activities only connecting to starting vertex), a dash is written in the table.
- Activities are not represented as vertices, rather edges as they are just a weight.
- Dijkstra's algorithm can be used once again to determine the Earliest Start Time (EST) and Latest Start Time (LST) of each activity. 
	- **EFT**: an activities EST plus its duration
	- **EST**: the latest EFT out of the activities predecessors.
	- **LFT**: the earliest LST out of its successors.
	- **LST**: an activities LFT minus its duration
- **Float**: the difference between and activities EST and LST. This represents how long an activity can be delayed without effecting the timeline / critical path.
- **Critical Path** the critical path of a project is the sequence of activities whose EST and LST are equal to each other (float of zero).
- **Crashing**: project crashing is shortening the length of a project by reducing the duration of activities along the critical path for an associated cost. 
- Crashing along the critical path reduces the will reduce the float time of other predecessors and if fully consumed the critical path may change, hence it is favourable to reduce the duration of a critical path's activity predecessor where its other predecessors have a large float.