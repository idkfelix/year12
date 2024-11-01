<h1 style="text-align: center; font-size: 60px; margin-top: 100px;">General Maths 3&4</h1>
<div style="display: flex; justify-content: center">
<img src="https://9p.io/plan9/img/plan9bunnywhite.jpg" style="width: 500px"/>
</div>
<h1 style="text-align: center; font-size: 40px; font-weight: 200;">Felix Coulthard</h1>
<div style="page-break-after: always;"></div>

# Data Analysis
## Terms
- **Population** - all of the data
- **Sample** - subset of the population
- **Element** - term in data
- **Measure of Centre**
	- Median
	- Mean
- **Measure of Spread**
	- Standard Deviation
	- Interquartile Range ($IQR$)
- **Mean & Std Dev** - used for bell shaped data
- **Median & IQR** - used for un-uniform data
## Types of Data
- ***Numerical / Quantitative***
	- **Discrete**: Countable data
	- **Continuous**: Measurable data
- ***Categorical / Qualitative***
	- **Ordinal**: Creates a scale
	- **Nominal**: Identifier or description
## Significant Figures
- All non-zero digits are significant
- Zeros between non-zero digits are significant
- All leading and zeros are not significant
- Single zero before decimal point is not significant
- Trailing zeros of a whole number that ends in a decimal are significant
- Trailing zeros to the right of a decimal place are significant
<div style="page-break-after: always;"></div>
## Symbols
$$
\begin{align}
x&=\text{Sample Data}\\
\bar{x}&=\text{Mean}\\
n&=\text{Count}\\
Z&=\text{Standard Score}\\
S_x&=\text{Standard Deviation of sample}\\
\sigma&=\text{Std Dev of population} \\
\mu&=\text{Mean}\\
\sum{x}&=\text{Sum of }x\\
\end{align}
$$
## Mean, Median & Mode
- **Mean**
	- Average of all numbers in sample
	- Sensitive to outliers making it represent the centre of accurately
	- Mean is used to samples measure the centre in any situation 
$$
\frac{\sum x}{n}=\bar{x}
$$
- **Mode**
	- Most common value in sample
	- Found by ordering data and identifying the most re-recurring value
- **Median**
	- Middle value of sample
	- Median is used to measure samples the centre if it is symmetrical (no skew)
	- Also represented as $Q2$
  - When $n$ is even the Median is the average of the $+/-0.5^{th}$ elements
	- If $n$ is odd $n$ is ignored from the $IQR$ calculation
$$
\begin{align*}
\frac{n+1}{2}^{th} &= Median\\
  n &= count
\end{align*}
$$
## Quartiles, Interquartile Range ($IQR$) & Fences
- **Quartiles**
	- $Q_1$ represents the $25^{th}$ percentile
		- Median of the samples lower half
  - $Q_3$ represents the $75^{th}$ percentile
		- Median of the samples upper half
$$ 
\begin{align}
\frac{n+1}{4}^{th} &= Q_1\\
\frac{n+1}{4 \cdot 3}^{th} &= Q_3 
\end{align}
$$
- **Interquartile Range ($IQR$)**
	- $IQR$ is the range between $Q_1$ and $Q_3$
	- represents the middle $50\%$ of the sample
$$ 
Q_{3}-Q_{1} = IQR 
$$
- **Fences**
	- Used to identify outliers that deviate too far from the $IQR$
	- Can be used on a plot to prevent skew by omitting outliers
$$
\begin{align}
\text{Lower Fence} = Q_{1} - IQR \cdot 1.5 \\
\text{Upper Fence} = Q_{3} + IQR \cdot 1.5
\end{align}
$$
## Symmetry & Skew
- **Symmetry**
	- A symmetrical sample will form a perfect bell curve on a chart
	- There will be a line of reflection that can be identified on a chart
	- Mean, Median and Mode will equate to one another
- **Skew**
	- **Positive**
		- Presents with a tail to the right of the bell curve
		- Most data in low range with minimal high range
	- **Negative**
		- Presents with a tail to the left of the bell curve
		- Most data in high range with minimal low range
	- Mean of data falls on skewed tail
	- Median falls roughly at the peak of the curve
```tikz
\begin{document}
\centering
  \begin{tikzpicture}[domain=0:7]
    \draw[very thin,color=gray] (-0.1,-0.1) grid (7,4);
    \draw[->] (-0.2,0) -- (7.2,0) node[right] {$x$};
    \draw[->] (0,-0.2) -- (0,4.2) node[above] {$y$};
    \draw[color=green,smooth] plot (\x,{3*1/exp(((\x-3.5)^2)/2)});
    \node[below,font=\large\bfseries] at (current bounding box.south){Symmetrical Data Bell Curve};
  \end{tikzpicture}
  \hspace{1cm}
  \begin{tikzpicture}[domain=0:7, ]
    \draw[very thin,color=gray] (-0.1,-0.1) grid (7,4);
    \draw[->] (-0.2,0) -- (7.2,0) node[right] {$x$};
    \draw[->] (0,-0.2) -- (0,4.2) node[above] {$y$};
    \draw[color=red,smooth] plot (\x,{3*1/exp(((\x-3)^2)/2)});
    \draw[color=blue,smooth] plot (\x,{3*1/exp(((\x-4)^2)/2)});
    \node[color=red] at (2.5,3.5) {Positive};
    \node[color=blue] at (4.5,3.5) {Negative};
    \node[below,font=\large\bfseries] at (current bounding box.south){Examples of Data Skew};

  \end{tikzpicture}
\end{document}
```
## Standard Deviation, Normal Distribution & Z Score
- **Standard Deviation (Std Dev)**
	- Average distance Between elements
	- Shows how spread out sample data is
	- Only works on normal distribution
$$
\begin{align*}
x&=\text{real value}\\
\mu &=\text{mean (mu)} \\
\sigma &=\text{Std Dev of population (sigma)}\\
S &= \text{Std Dev of sample}\\\\
S_x&=\sqrt{\frac{\sum\;(x-\bar{x})}{n-1}}
\end{align*}
$$
- **Normal Distribution**
	- Sample that forms a perfect bell shape
	- Allows use of Std Dev
	- range of $-1S_{x}\text{ to }1S_{x}=68\%$
  - range of $-2S_{x}\text{ to }2S_{x}=95\%$
  - range of $-3S_{x}\text{ to }3S_{x}=99.7\%$
- **Z Score**
	- Standardised score
	- Describes a values relationship to the mean
	- Can be used to represent float $S_x$ on normal data
$$
\begin{align*}
Z&=\frac{x-\bar{x}}{S_{x}}\\\\
x&=Z\cdot{S_x}+\bar{x}
\end{align*}
$$
<div style="page-break-after: always;"></div>
- **Example of Normal Distribution**
```tikz
\usepackage{pgfplots}
\usepackage{amssymb, amsmath}
\usepackage{xcolor}
\pgfplotsset{compat=1.7}
\usetikzlibrary {backgrounds}

\begin{document}
\pgfmathdeclarefunction{gauss}{2}{\pgfmathparse{1/(#2*sqrt(2*pi))*exp(-((x-#1)^2)/(2*#2^2))}%
}

\begin{tikzpicture}[
	every node/.style={text=black}
	background rectangle/.style={fill=white},
	show background rectangle
]
    \begin{axis}[
        no markers, domain=0:14, samples=100,
        axis lines*=left, xlabel=Standard deviations, ylabel=Frequency,,
        height=6cm, width=14cm,
        xtick={-4, -3, -2, -1, 0, 1, 2, 3, 4}, ytick=\empty,
        enlargelimits=false, clip=false, axis on top,
        grid = major
    ]
        \addplot [fill=cyan!20, draw=none, domain=-3:3] {gauss(0,1)} \closedcycle;
        \addplot [fill=orange!20, draw=none, domain=-3:-2] {gauss(0,1)} \closedcycle;
        \addplot [fill=orange!20, draw=none, domain=2:3] {gauss(0,1)} \closedcycle;
        \addplot [fill=blue!20, draw=none, domain=-2:-1] {gauss(0,1)} \closedcycle;
        \addplot [fill=blue!20, draw=none, domain=1:2] {gauss(0,1)} \closedcycle;
        \addplot[] coordinates {(-1,0.4) (1,0.4)};
        \addplot[] coordinates {(-2,0.3) (2,0.3)};
        \addplot[] coordinates {(-3,0.2) (3,0.2)};
        \addplot[] coordinates {(-4,0) (4,0)};
        \node[coordinate, pin={68\%}] at (axis cs: 0, 0.36){};
        \node[coordinate, pin={95\%}] at (axis cs: 0, 0.26){};
        \node[coordinate, pin={99.7\%}] at (axis cs: 0, 0.16){};
        \node[coordinate, pin={34\%}] at (axis cs: -0.5, 0){};
        \node[coordinate, pin={34\%}] at (axis cs: 0.5, 0){};
        \node[coordinate, pin={13.5\%}] at (axis cs: 1.5, 0){};
        \node[coordinate, pin={13.5\%}] at (axis cs: -1.5, 0){};
        \node[coordinate, pin={2.35\%}] at (axis cs: 2.5, 0){};
        \node[coordinate, pin={2.35\%}] at (axis cs: -2.5, 0){};
        \node[coordinate, pin={0.15\%}] at (axis cs: 3.5, 0){};
        \node[coordinate, pin={0.15\%}] at (axis cs: -3.5, 0){};
    \end{axis}
\end{tikzpicture}
\end{document}
```
## Box whisker & Stem Leaf Plots
- **Box whisker**
	- Represents median, $IQR$ and fences
	- Wires on either side represent the the upper and lower fence
		- Wire length calculated as $1.5\cdot{IQR}$
		- Bottom wire $=Q_1-1.5\cdot{IQR}$
		- Top wire $=Q_3+1.5\cdot{IQR}$
	- Line dividing the box represents $\large\tilde{x}$ (the median)
	- Box represents the $IQR$ and median
		- Bottom line represents $Q_1$
		- Top line represents $Q_3$
		- The range of the box represents the $IQR$
	- Outliers are represented as dots past the wires (fences) on either side
- **Stem and leaf**
	- Check key
	- Common first digit on left
	- Sliced digits listed on the right
	- **Split Leaf**
		- Multiple of each common value
		- Each with range, ($0\text{-}4$),($5\text{-}9$)
	- **Back to back**
		- leaf on either side
		- used to compare sets of data
		- no value on leaf means no elements
## Other Graphs
- **Bar chart**
	- Gaps between bars
	- Single value with bar
	- Shows mode of data
- **Segmented Bar Chart**
	- Measured percentage
	- Stacked bars
	- Shows frequency
- **Histogram Chart**
	- Bars touching
	- Represent data in ranges to show distribution
	- Values on $x$ axis are staggered between the bars
	- Bars between $x$ axis $a$ & $b$ represents range of ($a\text{-}b$)
- **Frequency Chart**
	- Match value column
	- Number of matches
	- Percentage of total matches
	- **Grouped**
		- Groups match values
		- represented as a range, ($3.2\text{-}5.6$)
## Bi-variate Data
- 2 Dimensional data 
- Plotted on a scatter plot
- Explanatory variable ($EV$)
	- Value that influences the $RV$
	- Plotted on the $X$ axis
- Response Variable ($RV$)
	- Created from the $EV$
	- Plotted on the $Y$ axis
<div style="page-break-after: always;"></div>
##  Association
- **Direction**
	- The direction of the trend
	- Positive - upward trend on plot
	- Negative - downward trend on plot
- **Form**
	- The shape of the trend
	- Linear - straight line
	- Non-linear - curved line
- **Strength**
	- How well the data matches chosen form
	- **Correlation Coefficient ($\large{r}$)**
		- Used only when there are
			- No outliers
			- Data is linear
		- $r=0$ indicated no association
		- $r=+1$ is a perfect positive association 		
		- $r=-1$ is a perfect negative association
		- **Linear Strengths**
			- No Association $r=0.24\text{ to}-0.24$
			- Weak $\pm{r}=0.25\text{ to }0.49$
			- Moderate $\pm{r}=0.50\text{ to }0.74$
			- Strong $\pm{r}=0.75\text{ to }0.99$
		- **Coefficient of determination ($\large r^2$)**
			- Greater than 30% shows significant predictive power
			- "$\large (r^2\cdot100)$% of the variation in the $RV$ can be explained by the variation in the $EV$"
$$
\begin{align*}
\Huge r&=\frac{\sum\limits(x-\bar{x})(y-\bar{x})}{(n-1)_{S_{x}S_{y}}}\\
\Huge b&=r\frac{S_y}{S_x}\\
\Huge a&=\bar{y}-b\cdot\bar{x}
\end{align*}
$$
<div style="page-break-after: always;"></div>
## Regression Line
$$
\begin{align*}
a &= intercept\\
b &= gradient\\
r &= coefficent
\end{align*}
$$
- Linear Regression - straight line
- $y=a+bx$
	- $RV=y\text{ intercept}+\text{gradient/slope }EV$
- If $\text{actual figure} > \text{predicted figure}$ the residual is positive
	- $\text{resifual} = \text{actual figure} - \text{predicted figure}$
## Smoothing
- Median
	- $x = \text{middle point of range around current data}$ 
		- $x=3$  with a smoothing of $5$ includes one data either side $2,3,4$
	- $y=\text{value of middle y value in range}$
- Seasonal
	- Smooths any reoccurring change each year
	- Finds a trend line from seasonal data
$$
\begin{align*}
\text{Seasonal Index} &= \frac{\text{Season Value}}{\text{Mean of all Seasons}}\\\\
\text{Deseasonalised Figure} &= \frac{\text{Actual figure}}{\text{Seasonal Index}}\\\\
\text{Actual Figure} &= \text{Deseasonalised Figure} \cdot \text{Seasonal Index}\\\\
\text{Seasonal Correction} &= \frac{1}{\text{Seasonal Index}}\cdot100-100\\\\
\text{Seasonal Index} &= \frac{\text{Actual Figure}}{\text{Deseasonalised Figure}}
\end{align*}
$$
<div style="page-break-after: always;"></div>
# Financial
## Terms
- **Sequence** - List of numbers following a pattern
- **Term** - A product of a pattern
- **Arithmetic** - Pattern with only addition and subtraction
- **Geometric** - Pattern with multiplication and division
- **Annuity** - payment of investment interest + part of the value
- **Perpetuity** - payment of interest only
## Types of Recursion
- **Growth**
	- **Simple Interest** - linear increase of principle value percentage per annum
	- **Compound Interest** - exponential increase of percentage value over time
- **Decay**
	- **Flat Rate** - linear decrease of principle value percentage per annum
	- **Unit Cost** - decrease of value for each use or term
	- **Reducing Balance** - exponential decrease of percentage value over time
## Arithmetic Sequence
- Simple Interest
- Flat Rate Depreciation
- Linear growth / decay
- Increase / Decrease by percentage of the principle value each term
$$
\begin{align}
V_{0} &= \text{Principle Value}\\
r &= \text{Annual Interest}\\
n &= \text{Term Count}\\
D &= \text{Common Diff}\\
D &= V_{0}\cdot(\frac{r}{100})\\ 
\end{align}
$$
$$
\begin{align}
V_{n+1}&=\text{Reccurance Relation}\\
V_{n+1}&=V_{n}+(V_{0}\cdot\frac{r}{100})\\
\end{align}
$$
$$
\begin{align}
V_{n}&=\text{Solve for n}^{th}\ Term\\
V_{n}&=V_{0}+(V_{0}\cdot\frac{r}{100})\cdot n\\
\end{align}
$$
## Geometric Sequence
- Compound Interest
- Reducing Balance Depreciation 
- Uses common ratio instead of diff
$$
\begin{align}
X &= \text{Periods Per Annum}\\
R &= \text{Common Ratio}\\
R\gt 1 &= Growth\\
R\lt 1 &= Decay\\
\end{align}
$$
$$
\begin{align}
\text{Growth: }R &= 1+\frac{r}{100\cdot X}\\
\text{Decay: }R &= 1-\frac{r}{100\cdot X}\\
\end{align}
$$
$$
\begin{align}
V_{n+1} &= \text{Reccurance Relation}\\
V_{n+1} &= V_{n}\cdot(1\pm\frac{r}{100\cdot X})^{X}\\
V_{n+1} &= V_{n}\cdot R^X
\end{align}
$$
$$
\begin{align}
V_{n}&=\text{Solve for n}^{th}\ Term\\
V_{n}&=V_{0}\cdot(1\pm\frac{r}{100\cdot X})^{Xn}\\
V_{n}&=V_{0}\cdot R^{Xn}
\end{align}
$$
## Effective Interest Rate
- Can be used to compare compounding periods
- Cannot compare different nominal interest rates
$$
\begin{align}
EAR &= \text{Effective Annual Rate}\\
n &= \text{Compounding Period Per Annum}\\
i &= \text{Nominated Interest Rate}\\
\end{align}
$$
$$
EAR=(1+\frac{i}{n})^n-1 
$$
<div style="page-break-after: always;"></div>
# Matrices
## Terms
 - **Order**: the dimensions of a matrix, $height \cdot width$, or $m \cdot n$.
 - **Leading diagonal**: a diagonal that runs from the top left to bottom right.
 - **Counter diagonal**: a diagonal running from the top right to the bottom left.
 - **Commutative**: the ability to rearrange an operation, i.e. $AB = BA$.
 - **Binary Matrix**: a matrix that contains only $1$'s or $0$'s.

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
	\begin{bmatrix} 
		3 \\ 5
	\end{bmatrix}
	= \begin{bmatrix}
		a_{1}b_{1}  \\
		a_{2}b_{1} 
	\end{bmatrix}\\ \\
	C&= \begin{bmatrix}
		(1\cdot{3}+3\cdot{5}) \\
		(2\cdot{3}+6\cdot{5})
	\end{bmatrix}\\ \\
	C&=  \begin{bmatrix}
		18 \\
		36
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
- **Two-Step Dominance Scores** are found with the method of a connections matrix by squaring $D$, denoted as $D^{2}$
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
## Row & Column Matrices
- $A\cdot{\text{Col Matrix}}$ to sum rows
- $\text{Row Matrix}\cdot{A}$ to sum columns
---
# Graphs & Networks
## Terms
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
- Crashing along the critical path reduces the will reduce the float time of other predecessors and if fully consumed the critical path may change.
