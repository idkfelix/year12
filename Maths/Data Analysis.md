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
        \node[coordinate, pin={68.2\%}] at (axis cs: 0, 0.4){};
        \node[coordinate, pin={95\%}] at (axis cs: 0, 0.3){};
        \node[coordinate, pin={99.7\%}] at (axis cs: 0, 0.2){};
        \node[coordinate, pin={34.1\%}] at (axis cs: -0.5, 0){};
        \node[coordinate, pin={34.1\%}] at (axis cs: 0.5, 0){};
        \node[coordinate, pin={13.6\%}] at (axis cs: 1.5, 0){};
        \node[coordinate, pin={13.6\%}] at (axis cs: -1.5, 0){};
        \node[coordinate, pin={2.1\%}] at (axis cs: 2.5, 0){};
        \node[coordinate, pin={2.1\%}] at (axis cs: -2.5, 0){};
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
```tikz
\usepackage{pgfplots}
\pgfplotsset{compat=1.10}
\usepgfplotslibrary{statistics}

\begin{document}
\begin{tikzpicture}
\begin{axis}[
y=1.5cm,
]
	\addplot+[
	  boxplot prepared={
	    lower whisker=5,
	    lower quartile=7,
	    median=8.5,
	    upper quartile=9.5,
	    upper whisker=10,
	    box extend=2,  % height of box
	    whisker extend=2.2, % height of whiskers
	    every box/.style={very thick,dashed,draw=black,fill=yellow},
	    every whisker/.style={red,ultra thick},
	    every median/.style={densely dotted,cyan,ultra thick},
	  },
	]
table[row sep=\\,y index=0] {
data\\ 1\\ 3\\
};
\end{axis}
\end{tikzpicture}
\end{document}
```
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
## Calculator
- **Statistics**
	 - fill out list > "Calc" > "One-Variable"
		- Finds $S_x$ and $\bar{x}$