## Task 1a
>count.php
```php
for($i=0;$i<10;$i++){
    echo $i+1;
}
```
## Task 1b
>calculateBMI.php
```php
function calculateBMI($weight, $height) {
    return $weight / ($height * $height);
}

$people = array(
    array("name" => "John", "height" =>  1.75, "weight" =>  70),
    array("name" => "Emma", "height" =>  1.6, "weight" =>  55),
    array("name" => "David", "height" =>  1.8, "weight" =>  85)
);

foreach ($people as $person) {
    $bmi = calculateBMI($person["weight"], $person["height"]);
    $classification = "";

    if ($bmi <  18.5) {
        $classification = "Underweight";
    } elseif ($bmi >=  18.5 && $bmi <=  24.9) {
        $classification = "Normal weight";
    } elseif ($bmi >=  25 && $bmi <=  29.9) {
        $classification = "Overweight";
    } else {
        $classification = "Obesity";
    }

    echo $person["name"] . " weighs " . $person["weight"] . " kilos and is " . $person["height"] . " metres tall. " . $person["name"] . "'s BMI is " . $bmi . " which classifies them as " . $classification . ".<br>";
}

```

## Task 2a
- **Indexed Arrays**: These are arrays with numeric indexes starting from 0 by default. The keys are the numbers themselves, and they start from 0 unless specified otherwise.
- **Associative Arrays**: These are arrays where each key is associated with a specific value, rather than a numeric index. The keys can be strings or integers and do not have to follow any particular order.
## Task 2b
- Array A is an **associative array** because its elements are paired with string keys representing colours.
- Array B is an **indexed array** because its elements are accessed by numerical indices starting from 0.
- The keys for Array A are `Red`, `White`, `Green`, and `Blue`.
- The elements stored in Array B are `22.7`,`28.5`,`22.1`

## Task 2c
>arrayLoop.php
```php
$arrayA = array("Red" => "#FF0000", "White" => "#FFFFFF", "Green" => "#008000", "Blue" => "#0000FF");
$arrayB = array(22.7,  28.5,  22.1);

foreach ($arrayA as $color => $hex) {
    echo "Color: " . $color . ", Hex Code: " . $hex . "<br>";
}

for ($i =  0; $i < count($arrayB); $i++) {
    echo "Value: " . $arrayB[$i] . "<br>";
}
```

![[Pasted image 20240209111457.png]]
