let unit: string = 'awesome';
let miles: 'MILES' = 'MILES';

type distanceMetric = "MILES" | "KILOMETERS" | "METERS" | "YARDS" | "FEET" | "INCHES";
function moveCharacter(distance: number, value: distanceMetric) {
  console.log(`You moved ${distance} ${value}`);
}

// moveCharacter(3, 'dragon');
// 에러 발생. dragon은 distanceMetric 에 없는 것
