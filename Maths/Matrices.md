> [!FAQ] Glossary
> - **Order**: the dimensions of a matrix, $height \cdot width$, or $m \cdot n$.
> - **Leading diagonal**: a diagonal that runs from the top left to bottom right.
> - **Counter diagonal**: a diagonal running from the top right to the bottom left.
> - **Commutative**: the ability to rearrange an operation, i.e. $AB = BA$.
> - **Binary Matrix**: a matrix that contains only $1$'s or $0$'s.

## Matrix
- Displays a collection of numerical elements in rows and columns.
- Matrices are usually labelled as a capital letters.
- The index of Columns and row in the matrix start at the integer $1$.
- Order is the length of $m$ (rows) and $n$ (columns) as $m \cdot n$ spoken as $m$ by $n$.
- Elements are usually labelled as the lowercase version of their parent: $Aa$.
- Elements use subscript to define their row and column: $\large{a_{mn}}$.
$$
\large{
  A = \begin{bmatrix}
    a_{11} & a_{12} & a_{13} \\
    a_{21} & a_{22} & a_{23}
 \end{bmatrix}
}
$$
## Addition & Subtraction
- To perform addition or subtraction all matrices must have the same order.
- Elements are added or subtracted the same as a normal evaluation.
$$
\large
\begin{bmatrix}2 & 3 \\ 5 & 2\end{bmatrix}
+\begin{bmatrix}3 & 1 \\ 2 & 1\end{bmatrix}
= \begin{bmatrix}5 & 4 \\ 7 & 3\end{bmatrix}
$$
## Scalar Multiplication
- Resulting matrix is the product of each element with a single number.
$$
\large
\begin{bmatrix} 1 &  2 & 3 \end{bmatrix} 
\cdot 2 
= \begin{bmatrix} 2 & 4 & 6 \end{bmatrix}
$$
## Transposition
- The transpose of a matrix, $A$, is denoted $A^T$.
- A transposed matrix has the same elements just with rows and columns swapped.
- If matrix $A$ has an order of $m\cdot{n}$, then $A^T$ has an order of $n\cdot{m}$.
- Bottom row transposes to last column / first column transposes to first row.
$$
\large
  A = \begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{bmatrix} \qquad
  A^{T} = \begin{bmatrix} 1 & 4 \\ 2 & 5 \\ 3 & 6 \end{bmatrix}
$$
## Matrices Multiplication
- The columns ($n$) of the first matrix must match the rows ($m$) of the second.
- The remaining row ($n$) and column ($m$) of the matrices will become the order.
- the position of each element in the resulting matrix is formed from its row in the first matrix and its column in the second matrix.
- Row of first matrix is effectively transposed and overlaid then the sum of the aligning elements products form the new element.
- Matrices multiplication is generally  non-commutative (cannot be rearranged, except if both matrices are diagonal) .
$$
\large
\begin{align*}
	C&=\begin{bmatrix} 
		1 & 3 \\
		2 & 6
	\end{bmatrix}
	\cdot\begin{bmatrix} 
		3 \\ 5
	\end{bmatrix}
	= \begin{bmatrix}
		a_{1}b_{1} & a_{1}b_{2} \\
		a_{2}b_{1} & a_{2}b_{2}
	\end{bmatrix}\\ \\
	C&= \begin{bmatrix}
		(1\cdot{3}+3\cdot{3}) & (1\cdot{5}+3\cdot{5}) \\
		(2\cdot{3}+6\cdot{3}) & (2\cdot{5}+6\cdot{5})
	\end{bmatrix}\\ \\
	C&=  \begin{bmatrix}
		10 & 20 \\
		24 & 40
	\end{bmatrix}
\end{align*}
$$
## Division
- Division is not possible with matrices, however this is related to inverse matrices (a matrix to the power of $-1$) and can be used to effectively divide a matrix with the product of a terms inverse.   
- $\large\frac{A}{B}=A \cdot B^{-1}\text{ or }B^{-1}\cdot A$
- $\large AB^{-1}$ solves for $XB=A$
- $\large B^{-1}A$ solves for $BX=A$
## Indices
- Must be a square in order to raise matrix to a power.
- Matrix is multiplied by itself many times as specified in the power.
$$
\large
A^{2} = AA =
\begin{bmatrix} 4 & 3 \\ 6 & 5 \end{bmatrix}
\cdot \begin{bmatrix} 4 & 3 \\ 6 & 5 \end{bmatrix}
=
\begin{bmatrix} 34 & 27 \\ 54 & 43 \end{bmatrix}
$$
## Determinant
- The determinant is a number associated with a matrix which determines weather or not a matrix has an inverse.
- For a matrix to have an inverse its determinant must not equal zero.
- The determinant of a square matrix is denote with a pole either side of the matrix $|A|$ or as the $det()$ function $det(A)$.
- For a $2\cdot2$ matrix $A$ the determinant is the product elements across the leading diagonal minus the product of elements across the counter diagonal.
$$
\large
\begin{align*}
A= \begin{bmatrix}2&2\\3&4\end{bmatrix}\qquad
|A| &= a_{11} \cdot a_{22} - a_{12} \cdot a_{21}\\
|A| &= 2\cdot4 - 3\cdot2 = 2
\end{align*}
$$
## Inverse Matrix
- The inverse matrix is denoted as the negative power or $A^{-1}$ of $A$.
- $A^{-1}$ is found with the product of a new array derived from $A$ with elements on the leading diagonal swapped, the negative versions of each remaining elements and $1$ over $|A|$ or $det(A)$.
$$
\large
\begin{align*}
A^{-1}&= \begin{bmatrix}4&-2\\-3\phantom{-}&2\end{bmatrix}\cdot\frac{1}{|A|}\\
&= \begin{bmatrix}4&-2\\-3\phantom{-}&2\end{bmatrix}\cdot\frac{1}{2}\\
&=\begin{bmatrix}2&-1\\-1.5&1\end{bmatrix}
\end{align*}
$$
## Identity Matrix
- The identity matrix is denoted as $I$ in an expression .
- A square matrix of all $0$'s and a stripe of $1$'s across the leading diagonal.
- The identity matrix of $A$ is the product of itself and its inverse: $I = AA^{-1}$
$$
\large
I= AA^{-1}\qquad
I= \begin{bmatrix}2&2\\3&4\end{bmatrix} \cdot\begin{bmatrix}2&-1\\-1.5&1\end{bmatrix}\qquad
I= \begin{bmatrix}1&0\\0&1\end{bmatrix}
$$
## Permutation Matrices
- Permutation matrices is a type of binary matrix of which it only contains a single $1$ in each row and column, often denoted as the letter $P$.
- A matrix of this kind can be used to rearrange the positions of various elements within another matrix when they are multiplied.
- Multiplying with a permutation matrix is non-commutative however its arrangement switches between rearranging rows or columns.
- Post-multiplication, with the binary on the right, results in a column permutation opposed to pre-multiplication, with the binary on the left, resulting in a row permutation.
$$
\large 
\begin{align*}
PA= \begin{bmatrix} 0 & 0 & 1 \\ 1 & 0 & 0 \\ 0 & 1 & 0 \end{bmatrix}
\cdot\begin{bmatrix} 1 & 1 & 1 \\ 2 & 2 & 2 \\ 3 & 3 & 3 \end{bmatrix}
&=\begin{bmatrix} 3 & 3 & 3 \\ 1 & 1 & 1 \\ 2 & 2 & 2 \end{bmatrix}
\\\\
AP= \begin{bmatrix} 1 & 2 & 3 \\ 1 & 2 & 3 \\ 1 & 2 & 3 \end{bmatrix}
\cdot\begin{bmatrix} 0 & 0 & 1 \\ 1 & 0 & 0 \\ 0 & 1 & 0 \end{bmatrix}
&=\begin{bmatrix} 3 & 1 & 2 \\ 3 & 1 & 2 \\ 3 & 1 & 2 \end{bmatrix}
\end{align*}
$$
## Communication Matrices
- Communication matrices, denoted as $C$, are a square binary matrices where each $1$ represent a connection in a communication system between row and column.
- These square matrices are generally symmetrically adjacent (drawing a line of symmetry along the leading diagonal).
- **One-step** communication links are a direct connection between two points represented by a singe $1$ in a communications matrix.
$$
\large
C = 
\begin{bmatrix}
0 & 1 & 0 \\
1 & 0 & 1 \\
0 & 1 & 0
\end{bmatrix}
$$
- **Two-step** communication matrix, denoted as $C^2$, represents links where two points are connected via a middle point, this can be found by squaring a one-step matrix.
- Any element of a two-step matrix not equal to $0$ represents a meaningful two-step communication link (i.e. not redundant).
- Two-step communication matrices can have redundant link where the sender and receiver are the same, these can be identified as any element not equal to $0$ across the leading diagonal of the matrix.
$$
\large 
C^{2}= \begin{bmatrix} 0 & 1 & 0 \\ 1 & 0 & 1 \\ 0 & 1 & 0 \end{bmatrix}
\cdot \begin{bmatrix}0 & 1 & 0 \\ 1 & 0 & 1 \\ 0 & 1 & 0 \end{bmatrix}
= \begin{bmatrix} 1 & 0 & 1 \\ 0 & 2 & 0 \\ 1 & 0 & 1 \end{bmatrix}
$$
- The total number of one and two step links in a communications system, commonly denoted as $T$, can be found by evaluating the sum of $C+C^2$.
$$
\large
T = C+C^{2} \qquad
T = \begin{bmatrix} 0 & 1 & 0 \\ 1 & 0 & 1 \\ 0 & 1 & 0 \end{bmatrix} + \begin{bmatrix} 1 & 0 & 1 \\ 0 & 2 & 0 \\ 1 & 0 & 1 \end{bmatrix} = \begin{bmatrix} 1 & 1 & 1 \\ 1 & 2 & 1 \\ 1 & 1 & 1 \end{bmatrix}
$$
## Dominance Matrices
- Represents one way connections on a square binary matrix, commonly denoted as the letter $D$
- Rows and columns represent start and end of a one way connection similar to a communications matrix, this is read on the matrix's rows with $1$'s representing a dominance over the column
- Unlike a communication matrix it is not a symmetrical matrix as each communication link only works one way
- **One-Step Dominance Scores** are found by summing each row of a dominance matrix 
$$
\large
D = \begin{bmatrix}
  0 & 0 & 1 & 1 & 0 \\ 
  1 & 0 & 1 & 0 & 1 \\ 
  0 & 0 & 0 & 1 & 0 \\ 
  0 & 1 & 0 & 0 & 0 \\ 
  1 & 0 & 1 & 1 & 0 \\ 
\end{bmatrix} \quad
\begin{matrix}
2 \\ 3 \\ 1 \\ 1 \\ 3
\end{matrix}
$$
- **Two-Step Dominance Scores** are found similar to a connections matrix by squaring $D$, denoted as $D^{2}$
- 
## State-Transition Matrices
- **State** refers to a snapshot of data at a point in time
	- Within a scenario there is a regular time interval between states
	- States are denoted as $S_n$ where $n$ refers to the state number, this is an integer starting from $0$ or the 'initial state'
	- A state matrix is represented as a single row or column with adjacent labels
$$
\large S_{n}=\begin{bmatrix}0.14 \\ 0.26 \\ 0.60\end{bmatrix}
$$
- **Transition Diagram** is a network that represents the data of a transition matrix
	- Nodes in the diagram represent each state in the matrix
	- Arrows between nodes show probability of transition to another state
	- If an arrow between nodes is not present it indicates a probability of $0$
```tikz
\usepackage{tikz-cd}

\begin{document}
\huge\begin{tikzcd}[row sep=2.5em]

A \ar[loop left, "10\%"] \ar[r, bend left, "90\%"] & 
B \ar[loop right, "85\%"] \ar[l, bend left, "15\%"]

\end{tikzcd}
\end{document}
```
- A **transition matrix** is a square matrix representing probability between changes in a scenarios states, denoted as $T$
- Each column of the matrix should sum to $1$ as it is split into the probabilities of transitioning to each row or state.
- All transition matrices should indicated which of the rows and columns are 'from' and 'to' as they are not always column to row.
$$
\large\displaylines{
\begin{align*}
&\quad\begin{matrix}A \quad & B\end{matrix}\\
T= &\begin{bmatrix}0.10 & 0.15 \\ 0.90 & 0.85\end{bmatrix}
\begin{matrix}A\\B\end{matrix}
\end{align*}}
$$
- Transition matrices can be used to predict future and past states based on the values of a given state with the following formulas
	- $S_{0} = \text{initial state matrix}$, $S_{n+1}=T\cdot{S_{n}}$
	- $S_{n}=T^{n}\cdot{S_{0}}$
$$
\large S_{1}= TS_{0} = 
\begin{bmatrix}0.8 & 0.1 \\ 0.2 & 0.9\end{bmatrix}
\begin{bmatrix}50 \\ 40\end{bmatrix}
= \begin{bmatrix}
 0.8\cdot50+0.1\cdot40 \\
 0.2\cdot50+0.1\cdot40
\end{bmatrix}
= \begin{bmatrix}44 \\ 46\end{bmatrix}
$$
## Leslie Matrix
- A Leslie matrix, denoted as $L$, is a niche application of a transition matrix that can be used to model the growth of a population and its age distribution over time.
- When applying a Leslie matrix to a population, only the females are considered
- In contrast to a standard transition matrix, the columns of a Leslie matrix do not sum to $1$
$$
\large\displaylines{
\begin{align*}
&\quad\begin{matrix}0 & 1 & 2\end{matrix}\\
L= &\begin{bmatrix}
  F_0 & F_1 & F_{3}\\
  P_0 & 0 & 0  \\
  0 & P_1 & 0
\end{bmatrix}
\begin{matrix}
  \text{fertility rate}\qquad\qquad\\
  \text{survival rate from 0-1}\\
  \text{survival rate from 1-2}
\end{matrix}
\end{align*}}
$$