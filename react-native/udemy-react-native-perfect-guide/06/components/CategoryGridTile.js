import { Pressable, Text, View } from 'react-native';

function CategoryGridTile({ title, color }) {
  return <View>
    <Pressable>
      <Text>{title}</Text>
    </Pressable>
  </View>
}

export default CategoryGridTile;