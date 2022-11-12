import { Text } from "react-native"

function MealDetailScreen({ route, navigation }) {
  const mealId = route.params.mealId;
  return <Text>
    This is the Meal Detail screen({ mealId })
  </Text>
}

export default MealDetailScreen