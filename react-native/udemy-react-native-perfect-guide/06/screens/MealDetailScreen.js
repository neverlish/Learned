import { Image, Text, View } from "react-native";
import MealDetails from "../components/MealDetails";

import { MEALS } from '../data/dummy-data';

function MealDetailScreen({ route }) {
  const mealId = route.params.mealId;

  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  return <View>
    <Image source={{ uri: selectedMeal.imageUrl }} />
    <Text>{selectedMeal.title}</Text>
    <MealDetails
      duration={selectedMeal.duration}
      affordability={selectedMeal.affordability}
      complexity={selectedMeal.complexity} 
    />
    <Text>Ingredients</Text>
    {selectedMeal.ingredients.map((ingredient) => (
      <Text key={ingredient}>{ingredient}</Text>
    ))}
    <Text>Steps</Text>
    {selectedMeal.steps.map((step) => (
      <Text key={step}>{step}</Text>
    ))}
  </View>
}

export default MealDetailScreen;