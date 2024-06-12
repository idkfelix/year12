> [!FAQ] Glossary
> - **Order**: the dimensions of a matrix, $height \cdot width$, or $m \cdot n$
> - **Leading diagonal**: a diagonal that runs from the top left to bottom right
> - **Counter diagonal**: a diagonal running from the top right to the bottom left
> - **Commutative**: the ability to rearrange an operation, $AB \neq BA$
> - **Binary Matrix**: a matrix that contains only $1$'s or $0$'s 

## Matrix
- Displays a collection of numerical elements in rows and columns
- Matrices are usually labelled as a capital letters
- The index of Columns and row in the matrix start at the integer $1$
- Order is the length of $m$ (rows) and $n$ (columns) as $m \cdot n$ spoken as $m$ by $n$
- Elements are usually labelled as the lowercase version of their parent: $Aa$
- Elements use subscript to define their row and column: $\large{a_{mn}}$
$$
\large{
  A = \begin{bmatrix}
    a_{11} & a_{12} & a_{13} \\
    a_{21} & a_{22} & a_{23}
 \end{bmatrix}
}
$$
## Transposition
- The transpose of a matrix, $A$, is denoted $A^T$
- A transposed matrix has the same elements just with rows and columns swapped
- If matrix $A$ has an order of $m\cdot{n}$, then $A^T$ has an order of $n\cdot{m}$
- Bottom row transposes to last column / first column transposes to first row
$$
\large
  A = \begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{bmatrix} \qquad
  A^{T} = \begin{bmatrix} 1 & 4 \\ 2 & 5 \\ 3 & 6 \end{bmatrix}
$$
## Addition & Subtraction
- To perform addition or subtraction all matrices must have the same order
- Elements are added or subtracted the same as regular numbers
$$
\large
\begin{bmatrix}2 & 3 \\ 5 & 2\end{bmatrix}
+\begin{bmatrix}3 & 1 \\ 2 & 1\end{bmatrix}
= \begin{bmatrix}5 & 4 \\ 7 & 3\end{bmatrix}
$$
## Multiplication
- **Scalar**
	- Resulting matrix is the product of each element of input matrix with a single number
$$
\large
\begin{bmatrix} 1 &  2 & 3 \end{bmatrix} 
\cdot 2 
= \begin{bmatrix} 2 & 4 & 6 \end{bmatrix}
$$
- **Matrices**
	- The columns ($n$) of the first matrix must match the rows ($m$) of the second
	- The remaining row ($n$) and column ($m$) of the matrices will become the order
	- the position of each element in the resulting matrix is formed from its row in the first matrix and its column in the second matrix
	- Row of first matrix is effectively transposed and overlaid then the sum of the aligning elements products form the new element
	- Matrices multiplication is generally  non-commutative (cannot be rearranged, except if both matrices are diagonal) 
$$
\large
\begin{align*}
	C&=\begin{bmatrix} 
		1 & 3 \\
		2 & 6
	\end{bmatrix}
	\begin{bmatrix} 
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
## Indices
- Must be a square matrix to raise to use an index operation
- Multiply matrix by itself to the index the same as a regular number
$$
\large
A^{2} = AA =
\begin{bmatrix} 4 & 3 \\ 6 & 5 \end{bmatrix}
\begin{bmatrix} 4 & 3 \\ 6 & 5 \end{bmatrix}
=
\begin{bmatrix} 34 & 27 \\ 54 & 43 \end{bmatrix}
$$
## Determinant, Inverse & Identity
- **Determinant**
	- The determinant is a number associated with a matrix which determines weather or not a matrix has an inverse
	- For a matrix to have an inverse its determinant must not equal zero
	- The determinant of a square matrix is denote with a pole either side of the matrix $|A|$ or as the $det()$ function $det(A)$
	- For a $2\cdot2$ matrix $A$ the determinant is the product elements across the leading diagonal minus the product of elements across the counter diagonal
	- $\large det(A) = |A| = a_{11} \cdot a_{22} - a_{12} \cdot a_{21}$
- **Inverse Matrix**
	- The inverse matrix is denoted as the negative power or $A^{-1}$ of $A$
	- $A^{-1}$ is found with the product of a new array derived from $A$ with elements on the leading diagonal swapped, the negative versions of each remaining elements and $1$ over $|A|$ or $det(A)$
- **Identity Matrix**
	- The identity matrix is denoted as $I$ in an expression 
	- A square matrix of all $0$'s and a stripe of $1$'s across the leading diagonal
	- The identity matrix of $A$ is the product of itself and its inverse: $I = AA^{-1}$
$$
\large
\begin{align*}
&\text{Determinant} &&\text{Inverse Matrix}\\
A&= \begin{bmatrix}2&2\\3&4\end{bmatrix} &
\therefore A^{-1}&= \begin{bmatrix}4&-2\\-3&2\end{bmatrix}\frac{1}{|A|} \\
|A|&= 2\cdot4 - 3\cdot2 = 2 &
A^{-1}&= \begin{bmatrix}4&-2\\-3&2\end{bmatrix}\frac{1}{2} \\
|A| &\neq 0 &
A^{-1}&=\begin{bmatrix}2&-1\\-1.5&1\end{bmatrix} \\
&\text{Identity Matrix}\\
\therefore I&= 
  \begin{bmatrix}2&2\\3&4\end{bmatrix}
  \begin{bmatrix}2&-1\\-1.5&1\end{bmatrix}\\
I&= \begin{bmatrix}1&0\\0&1\end{bmatrix}
\end{align*}
$$
## Permutation Matrices
- Permutation matrices is a type of binary matrix of which it only contains a single $1$ in each row and column, often denoted as the letter $P$ 
- A matrix of this kind can be used to rearrange the positions of various elements within another matrix when they are multiplied
- Multiplying with a permutation matrix is non-commutative however its arrangement switches between rearranging rows or columns
- Post multiplication, with the binary on the right, results in a column multiplication opposed to pre multiplication, with the binary on the left, resulting in a row permutation
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
- Communication matrices are a square binary matrices where the $1's$ represent the connections in a communication system, often denoted at $T$
- **One-step** communication links are a direct connection between two points represented by a singe $1$ in a communications matrix
$$
\large
\begin{align*}
&\text{One-Step Matrix}\\
P &= 
\begin{bmatrix}
0 & 1 & 0 \\
1 & 0 & 1 \\
0 & 1 & 0
\end{bmatrix}
\end{align*}
$$
- **Two-step** communication links are two points connected via a middle point, this can be found by squaring a communication matrix indicating all two-step links
- Redundant links of a two-step matrix, where the sender and receiver are the same, can be identified as any non-zero values across the leading diagonal
$$
$$