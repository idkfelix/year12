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
$minTimeForChickensToRoam = 8.0;
$maxChickensPerHectare = 10000;
$classifiedAsFreeRange = freeRangeFarm($minTimeForChickensToRoam,$maxChickensPerHectare);

// display data types and results of function
echo "Chickens roam and forage on the land for ".$minTimeForChickensToRoam." hours. Data Type: ".gettype($minTimeForChickensToRoam)."<br/>";
echo "There are ".$maxChickensPerHectare." chickens on one hectare of land. Data type: ".gettype($maxChickensPerHectare)."<br/>";
if($classifiedAsFreeRange == TRUE){
    echo "The egg farm produces free range eggs Data type: ".gettype($classifiedAsFreeRange);
} else{
    echo "The egg farm does not produces free range eggs Data type: ".gettype($classifiedAsFreeRange);
}