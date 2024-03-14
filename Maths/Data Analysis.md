## Data Types
- ***Numerical / Quantitative***
	- **Discrete**
		- Countable data
		- Static number
	- **Continuous**
		- Measurable data
		- Variable number
- ***Categorical / Qualitative***
	- **Ordinal**
		- Orderable
		- Ordered array of strings
		- Creates a scale
	- **Nominal**
		- Non orderable
		- Descriptive string
## Graph types
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
- **Stem and leaf**
	- Check key
	- Common first digit on left
	- Sliced digits listed on the right
	- **Split Leaf**
		- Multiple of each common value
		- Each with rage, ($0\text{-}4$),($5\text{-}9$)
- **Frequency Chart**
	- Match value column
	- Number of matches
	- Percentage of total matches
	- **Grouped**
		- Groups match values
		- represented as a range, ($3.2\text{-}5.6$)
## Mean, Median & Mode
- **Mean**
	- Average of all numbers in a data
	- $$\frac{\text{sum of data}}{\text{count}}=\text{Mean}$$
- **Mode**
	- Most common value in data
	- Found by ordering data and identifying the most re-recurring value
- **Median**
	- Middle value of data
	- Also represented as $Q2$
	- $$\begin{align*}
	\frac{n+1}{2}^{th} &= Median\\
	 n &= count
	\end{align*}$$
	- When $n$ is even the Median is the average of the numbers $+/-0.5$
	- If $n$ is odd $n$ is ignored from the $IQR$ calculation
## Quartiles, Interquartile Range ($IQR$) & Fences
- **Quartiles**
	- $Q_1$ represents the $25^{th}$ percentile
		- Median of the data's lower half
		- $$ \frac{count+1}{4}^{th} = Q_1 $$
	- $Q_3$ represents the $75^{th}$ percentile
		- Median of the data's upper half
		- $$ \frac{count+1}{4 \cdot 3}^{th} = Q_3 $$
- **Interquartile Range ($IQR$)**
	- $IQR$ is the range between $Q_1$ and $Q_3$
	- represents the middle $50\%$ of the data
	- $$ Q_{3}-Q_{1} = IQR $$
- **Fences**
	- Used to identify outliers that deviate too far from the $IQR$
	- Can be used on a plot to prevent skew by omitting outliers
	- $$\begin{align}
	  \text{Lower Fence} = Q_{1} - IQR \cdot 1.5 \\
	  \text{Upper Fence} = Q_{3} + IQR \cdot 1.5
	  \end{align}$$
## Symmetry & Skew
- **Symmetry**
	- A symmetrical set of data will form a perfect bell curve on a chart
	- There will be a line of reflection that can be identified on a chart
	- Mean, Median and Mode will equate to one another
```latex
\usepackage{pgfplots}
\begin{tikzpicture}
\begin{axis}[
  no markers, domain=0:10, samples=100,
  axis lines*=left, xlabel=$x$, ylabel=$y$,
  every axis y label/.style={at=(current axis.above origin),anchor=south},
  every axis x label/.style={at=(current axis.right of origin),anchor=west},
  height=5cm, width=12cm,
  xtick={4,6.5}, ytick=\empty,
  enlargelimits=false, clip=false, axis on top,
  grid = major
  ]
  \addplot [fill=cyan!20, draw=none, domain=0:5.96] {gauss(6.5,1)} \closedcycle;
  \addplot [very thick,cyan!50!black] {gauss(4,1)};
  \addplot [very thick,cyan!50!black] {gauss(6.5,1)};


\draw [yshift=-0.6cm, latex-latex](axis cs:4,0) -- node [fill=white] {$1.96\sigma$} (axis cs:5.96,0);
\end{axis}

\end{tikzpicture}
```
