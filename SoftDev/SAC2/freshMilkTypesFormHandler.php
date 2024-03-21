<?php
    /**
     * Form handler for SAC Part 2 - Fresh Milk Types
     * 
     * Gives the fat content of milk in percentage, determine the fresh milk type
     * Validates form data, provides error messages with link back to form
     * 
     * @author Applied Computing - Software Development, Virtual School Victoria
     * @author Felix Coulthard
     * @copyright Virtual School Victoria 2024
     */

    // ***** PUT YOUR FUNCTIONS AFTER THIS LINE  *****

    /**
     * Define milk sample data
     * @var array<string,int|float> $milk_data
     */
    $milk_data = array(
        "Sample 1"=>3.7,
        "Sample 2"=>0.45,
        "Sample 3"=>2.07,
        "Sample 4"=>2.5,
        "Sample 5"=>1.41,
        "Sample 6"=>1.5,
        "Sample 7"=>0.10,
        "Sample 8"=>0,
        "Sample 9"=>2,
        "Sample 10"=>3.8,
    );
	
    /**
     * Identify type of milk from fat%
     * @param int|float $fatContent
     * @return string Milk classification 
     */
    function milkType($fatContent) {
        switch ($fatContent) {
            case ($fatContent > 3.2 && $fatContent <= 3.8):
                return "Regular Full Fat";
            case ($fatContent >= 1.9 && $fatContent <= 2.1):
                return "Reduced Fat";
            case ($fatContent < 1.5):
                return "Low Fat";
            case ($fatContent > 0 && $fatContent < 0.15):
                return "Skim Milk";
            default:
                return "Unclassified";
        }
    }

    /**
     * Get grams of fat per liter from fat%
     * @param int|float $fatPercent
     * @return float
     */
    function fatGramsPerLitre($fatPercent) {
        /** @var float $realPercent */
        $realPercent = $fatPercent /100;
        return $realPercent *1035;
    }
    
    /**
     * Round param num to 2 decimal places\
     * Dont ever do this IRL, just use round($num,2)
     * @param int|float $num
     * @return float
     */
    function roundNumber($num){
        // This is very bad practice
        return round($num,2);
    }

    // Check that a form has been submitted using POST
    if ($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        // Try-Catch blocks to handle exceptions
        try {
            // Check selection exists and is in data then set var
            if (!isset($_POST['MilkSample']) || !array_key_exists($_POST['MilkSample'], $milk_data)){
                throw new Exception("No valid fresh milk sample selected. Please select a sample from the list");
            } else {
                /** @var string $selection */
                $selection = $_POST['MilkSample'];
            }

            // Check value is positive then set var
            if ($milk_data[$selection] <=0){
                throw new Exception("The fresh milk content for $selection cannot be determined as the percentage of fat is invalid");
            } else{
                /** @var int|float $fat_percent */
                $fat_percent = $milk_data[$selection];
            }

            // Get grams from percent and round to 2 decimals
            /** @var float $fat_grams */
            $fat_grams = roundNumber(fatGramsPerLitre($fat_percent));
            /** @var string $milk_type */
            $milk_type = milkType($fat_percent);

            // Echo milk sample, fat%, fat grams and classification
            echo "<p>$selection contains $fat_percent% of fat ($fat_grams grams per litre). Based on the fat content of this sample, the fresh milk type would be $milk_type</p>";

        } catch (Exception $e) {
            // Echo Exception
            echo '<p>'.$e->getMessage().'</p>';
        }

        // Link back to form
        echo '<a href="freshMilkTypesForm.html">Go to form</a>';

    }
    else
    {
        // If the page was loaded with other method link back to form
        echo '<p>Please select a fresh milk sample from the list.</p>';
        echo '<a href="freshMilkTypesForm.html">Go to form</a>';
    }
?>