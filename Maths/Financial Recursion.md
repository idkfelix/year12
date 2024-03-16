## Terms
- **Sequence** - List of numbers following a pattern
- **Term** - A product of a pattern
- **Arithmetic** - Pattern with only addition and subtraction
- **Geometric** - Pattern with multiplication and division
## Types of Recursion
- ***Growth***
	- **Simple Interest** - linear increase of principle value percentage per annum
	- **Compound Interest** - exponential increase of percentage value over time
- **Decay**
	- **Flat Rate** - linear decrease of principle value percentage per annum
	- **Unit Cost** - decrease of value for each use or term
	- **Reducing Balance** - exponential decrease of percentage value over time
## Effective Interest Rate
- Can be used to compare compounding periods
- Cannot compare different nominal interest rates
- $$\begin{align}
EAR &= \text{Effective Annual Rate}\\
n &= \text{Compounding Period Per Annum}\\
i &= \text{Nominated Interest Rate}\\
\end{align}$$
- $$ EAR=(1+\frac{i}{n})^n-1 $$
## Arithmetic Sequence
- Simple Interest
- Flat Rate Depreciation
- Linear growth / decay
- Increase / Decrease by percentage of the principle value each term
- $$\begin{align}
V_{0} &= \text{Principle Value}\\
r &= \text{Annual Interest}\\
n &= \text{Term Count}\\
D &= \text{Common Diff}\\
D &= V_{0}\cdot(\frac{r}{100})\\ 
\end{align}$$
- $$\begin{align}
V_{n+1}&=\text{Reccurance Relation}\\
V_{n+1}&=V_{n}+(V_{0}\cdot\frac{r}{100})\\
\end{align}$$
- $$\begin{align}
V_{n}&=\text{Solve for n}^{th}\ Term\\
V_{n}&=V_{0}+(V_{0}\cdot\frac{r}{100})\cdot n\\
\end{align}$$
## Geometric Sequence
- Compound Interest
- Reducing Balance Depreciation
- Uses common ratio instead of diff
- $$\begin{align}
X &= \text{Periods Per Annum}\\
R &= \text{Common Ratio}\\
R\gt 1 &= Growth\\
R\lt 1 &= Decay\\
\end{align}$$
- $$\begin{align}
\text{Growth: }R &= 1+\frac{r}{100\cdot X}\\
\text{Decay: }R &= 1-\frac{r}{100\cdot X}\\
\end{align}$$
- $$\begin{align}
V_{n+1} &= \text{Reccurance Relation}\\
V_{n+1} &= V_{n}\cdot(1\pm\frac{r}{100\cdot X})^{X}\\
V_{n+1} &= V_{n}\cdot R^X
\end{align}$$
- $$\begin{align}
V_{n}&=\text{Solve for n}^{th}\ Term\\
V_{n}&=V_{0}\cdot(1\pm\frac{r}{100\cdot X})^{Xn}\\
V_{n}&=V_{0}\cdot R^{Xn}
\end{align}$$
## Calculator
- Financial Section
- Compound Interest
	- Solves compound interest, reducing balance, etc...
	- $$\begin{align}
N&=\text{Number of Payments}\\
I&=\text{Nominal Aunnual Interest \%}\\
PV&=\text{Principal Value / }V_0\\
PMT&=\text{Payment Value (per period) / }D\\
FV&=\text{Future Value / }V_n\\
P/Y&=\text{Payments per year}\\
C/Y&=\text{Compounding Periods per year}
\end{align}$$
	- Investment
		- $PV$ is negative
		- $PMT$ is negative
		- $FV$ is positive
	- Loan
		- $PV$ is positive
		- $PMT$ is negative
		- $FV$ is negative