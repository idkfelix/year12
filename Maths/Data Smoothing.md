## Median Smoothing
- $x = \text{middle point of range around current data}$ 
	- $x=3$  with a smoothing of $5$ includes one data either side $2,3,4$
- 

## Seasonal Smoothing
- Smooths any reoccurring change each year
- Finds a trend line from seasonal data
$$
\begin{align*}
\text{Seasonal Index} &= \frac{\text{Season Value}}{\text{Mean of all Seasons}}\\\\
\text{Deseasonalised Figure} &= \frac{\text{Actual figure}}{\text{Seasonal Index}}\\\\
\text{Actual Figure} &= \text{Deseasonalised Figure} \cdot \text{Seasonal Index}
\end{align*}
$$