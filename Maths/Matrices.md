## Matrix
- Displays a collection of numerical elements in rows and columns
- Matrices are usually labelled as a capital letters
- The index of Columns and row in the matrix start at the integer $1$
- Order is the length of $m$ (rows) and $n$ (columns) as $m \cdot n$ spoken as $m$ by $n$
- Elements are usually labelled as the lowercase version of their parent: $Aa$
- Elements use subscript to define their row and column: $\large{a_{mn}}$
$$
\huge{
  A = \begin{bmatrix}
    a_{11} & a_{12} & a_{13} \\
    a_{21} & a_{22} & a_{23}
 \end{bmatrix}
}
$$
## Addition & Subtraction
- To perform addition or subtraction all matrices must have the same order
## Multiplication
- **Scalar**
	- Resulting matrix is the product of each element of input matrix with a single number
	- $2 \cdot \begin{bmatrix} 1 &  2 & 3 \end{bmatrix} = \begin{bmatrix} 2 & 4 & 6 \end{bmatrix}$
- **Matrices**
	- The columns ($n$) of the first matrix must match the rows ($m$) of the second
	- The remaining row ($n$) and column ($m$) of the matrices will become the order
	- the position of each element in the resulting matrix is formed from its row in the first matrix and its column in the second matrix
	- Row of first matrix is effectively transformed and overlaid then the sum of the aligning elements products form the new element
$$
\begin{align*}
  C&=
  \begin{bmatrix} 
    1 & 3 \\ 2 & 6
  \end{bmatrix}
  \cdot
  \begin{bmatrix} 
    3 \\ 5
  \end{bmatrix}\\
  C&= \begin{bmatrix}
    a_{1}b_{1} & a_{1}b_{2} \\
    a_{2}b_{1} & a_{2}b_{2}
  \end{bmatrix}\\
  C&= \begin{bmatrix}
    (1\cdot{3}+3\cdot{3}) & (1\cdot{5}+3\cdot{5})\\
    (2\cdot{3}+6\cdot{3}) & (2\cdot{5}+6\cdot{5})
  \end{bmatrix}\\
  C&= \begin{bmatrix}
    10 & 20\\
    24 & 
  \end{bmatrix}
\end{align*}
$$
## Transposing
- The transpose of a matrix, $A$, is denoted $A^T$
- A transposed matrix has the same elements just with rows and columns swapped
- If matrix $A$ has an order of $m\cdot{n}$, then $A^T$ has an order of $n\cdot{m}$
- Bottom row transposes to last column / first column transposes to first row
$$
\large{
  A = \begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{bmatrix} \qquad
  A^{T} = \begin{bmatrix} 1 & 4 \\ 2 & 5 \\ 3 & 6 \end{bmatrix}
}
$$