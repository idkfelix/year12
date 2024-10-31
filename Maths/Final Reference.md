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
- All leading and trailing zeros are not significant
- Single zero before decimal point is not significant
- Zeros between non-zero digits are significant
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
---
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
