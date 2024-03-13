## Task 1a
1. length & width
2. perimeter
3. `$perimeterResult = perimeterRectangle(4, 3);`
4. Integers 
## Task 1b
>rectangle.php
```php
function areaRectangle($length, $width){ 
  $area = $length * $width;
  return $area; 
}
```
### Perimeter
| width | length | Expected | Real |
| ---- | ---- | ---- | ---- |
| 4 | 3 | 14 | 14 |
| 6 | 3 | 18 | 18 |
| 6 | 6 | 24 | 24 |
### Area
| width | length | Expected | Real |
| ---- | ---- | ---- | ---- |
| 4 | 3 | 12 | 12 |
| 6 | 3 | 18 | 18 |
| 6 | 6 | 36 | 36 |
## Task 2a
| Func Name | Desc |
| ---- | ---- |
| strcasecomp() | compares 2 strings ignoring case |
| strcomp() | compares 2 strings |
| strtolower() | converts a string to all lowercase |
| strtoupper() | converts a string to all uppercase |
| strlen() | return length of a string |
| ucfirst() | converts first character in string to uppercase |
| ucwords() | converts all words in a string to have uppercase first letters |
## Task 2b
![[Pasted image 20240207113237.png]]
>echo.php
```php
<?php
$testSentence = 'A quick brown fox jumps over the lazy dog';
echo $testSentence . '<br>';
// Convert the first letter of each word to uppercase
$testSentence = ucwords($testSentence);
echo $testSentence . '<br>';
?>
```
