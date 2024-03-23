```dataviewjs
const results = [
	["Software Dev","U3O1 SAC1",100,2],
	["Software Dev","U3O1 SAC2",null,4],
	["General Maths","U3O1 SAC1",90.3,7],
]

let s; let i
results.forEach(r => {
	if(r[2] !== null){
		s += r[2]
		i++
	} 
})

results.push([null,"**Average**",s/i,null])
results.map(r => [...r,r[2]*r[3]/200])

dv.table(
	["Subject","Assessment","Score %","Study Score %","SS Points"],
	results	
)
```
