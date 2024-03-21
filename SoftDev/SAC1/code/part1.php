<?php
// function to check if a chicken farm is free range using the time chickens roam and the density of the chickens
function freeRangeFarm($timeChickensRoam,$numberOfChickenPerHectare){
    // set max and min parameters
    $minTimeForChickensToRoam = 8.0;
    $maxChickensPerHectare = 10000;
    // compare input values to the parameters and return true if free range
    if($timeChickensRoam >= $minTimeForChickensToRoam && $numberOfChickenPerHectare <= $maxChickensPerHectare){
        return TRUE;
    } else {
        return FALSE;
    }
};

// define variables for testing
$roamingHours = 8.0;
$chickenCount = 9020;
// get free range status
$classifiedAsFreeRange = freeRangeFarm($roamingHours,$chickenCount);

// print the values of the farm and free range status
echo "there are ".$chickenCount." chickens roaming and foraging for ".$roamingHours." hours per day.<br/>";
if($classifiedAsFreeRange == TRUE){
    echo "The egg farm produces free range eggs.";
} else {
    echo "the egg farm does not produce free range eggs.";
}
?>