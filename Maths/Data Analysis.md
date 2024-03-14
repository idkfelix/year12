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
	- Represents mode
- **Segmented Bar Chart**
	- Stacked bars
	- Shows percentage
- **Dot Plot**
	- Stacks of dots for each value
	- Might have a key
- **Stem and leaf**
	- Check key
	- Common first digit on left
	- Sliced digits listed on the right
	- **Split Leaf**
		- Multiple of each common value
		- Each with rage, (0-4),(5-9)
- **Frequency Chart**
	- Match value column
	- Number of matches
	- Percentage of total matches
	- **Grouped**
		- Groups match values
		- represented as a range, (3.2-5.6)
- **Grouped Histogram**
	- Bars touching
	- Staggered X values
	- Bar between values represents matches in that range
## Mean, Median & Mode
- **Mean**
	- Average of all numbers in a list 
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
	