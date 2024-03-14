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
	- $$\frac{\text{sum(list[0]:list[-1])}}{\text{count}}=\text{Mean}$$
- **Mode**
	- Most common value in list
	- Found by ordering list and identifying the most re-recurring value
- **Median**
	- Middle value of list
	- $$\frac{count+1}{2} = \text{Median Term}$$
	- When $n$ is even the Median is the average of the numbers $+/-0.5$
	- If $n$ is odd $n$ is ignored from the $IQR$ calculation
## Interquartile Range ($IQR$)
$$
\begin{aligned}
\frac{count+1}{4} = Q1\ Term\\\\
\frac{count+1}{4}\cdot 3 = Q3\ Term\\\\
Q3-Q1 = IQR
\end{aligned}
$$
