## Task 1a
| Operator | Type of Operator                | Operation of Operator                    |
| -------- | ------------------------------- | ---------------------------------------- |
| `=`      | Assignment                      | Assigns a value                          |
| `<>`     | Comparison (Not equal to)       | Checks inequality                        |
| `==`     | Comparison (Equal to)           | Checks equality                          |
| `<=`     | Comparison (Less than or equal) | Checks less than or equal                |
| `and`    | Logical (AND)                   | Returns true if both conditions are true |
| `*`      | Arithmetic (Multiplication)     | Multiplies numbers                       |
| \|\|     | Logical (OR)                    | Returns true if either condition is true |
| `>`      | Comparison (Greater than)       | Checks if greater than                   |
| `&&`     | Logical (AND)                   | Returns true if both conditions are true |
| `!`      | Logical (NOT)                   | Negates a boolean                        |
| `/`      | Arithmetic (Division)           | Divides numbers                          |
| `or`     | Logical (OR)                    | Returns true if either condition is true |
| `!=`     | Comparison (Not equal to)       | Checks inequality                        |
## Task 1b
- ||, or
- !=, <>
- and, &&
## Task 2a
| Description of What is to Be Stored | Data Type | Justification for Choosing That Particular Data Type | Variable Name (Must be Descriptive, and in PHP Format) |
|---------------------------------------|-----------|------------------------------------------------------|------------------------------------------------------------|
| Store a person’s age                   | Int       | A person's age, in years, is a whole number         | `$userAge`                                                |
| Store an interest rate                 | Float     | An interest rate is normally a percentage           | `$interestRate`                                            |
| Store a person’s surname               | String    | A name is a word                                      | `$userSurname`                                             |
| Store an Australian postcode           | String    | Post codes are a four-digit number that can start with  0 | `$australianPostcode`                                     |
| Store Australian and international postcodes | String | Post codes can vary across countries                 | `$internationalPostcode`                                   |
| Store a person’s date of birth          | String    | Dates are complicated, and can be stored as DD/MM/YYYY | `$dateOfBirth`                                             |
| Store whether a light is switched on or off | Bool | It is a binary value                                  | `$lightSwitch`                                              |
## Task 3a
>switch.php
```php
<?php
	function getDrink(int $choice)
	{
		switch ($choice)
		{
		case 1:
			return 'lemonade';
		case 2:
			return 'orange squash';
		case 3:
			return 'cola';
		case 4:
			return 'ginger beer';
		default:
			return null;
		}
	}
	echo 'Here is your ' . getDrink(3);
?>
```
![[Pasted image 20240207121515.png]]
## Task 3b
```
FUNCTION getSchoolMessageFromAge(age)
	IF age < 3 THEN 
		RETURN 'You are too young for school' 
	ELSEIF age <= 4 THEN 
		RETURN 'You can go to preschool' 
	ELSEIF age < 12 THEN 
		RETURN 'You can go to primary school' 
	ELSEIF age < 18 THEN 
		RETURN 'You can go to high school' 
	ELSE THEN 
		RETURN 'You do not have to go to school' 
	END IF 
END FUNCTION 

age <- INPUT 
PRINT getSchoolMessageFromAge(age)
```
## Task 3c
>getSchool.php
```php
<?php
	function getSchoolMessageFromAge(int $age)
	{
		if ($age < 3)
		{
			return 'You are too young for school';
		}
		elseif ($age <= 4)
		{
			return 'You can go to preschool';
		}
		elseif ($age < 12)
		{
			return 'You can go to primary school';
		}
		elseif ($age < 18)
		{
			return 'You can go to high school';
		}
		else
		{
			return 'You do not have to go to school';
		}
	}
	echo getSchoolMessageFromAge(17);
?>
```