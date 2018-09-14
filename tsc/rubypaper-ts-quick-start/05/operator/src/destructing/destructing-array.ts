// 5-2-2 배열 디스트럭처링 - 디스트럭처링을 이용해 배열 요소를 변수에 할당

let numbers = ["one", "two", "three", "four", "five"];
let [nums1, nums2] = numbers;
console.log(nums1, nums2); // one two

let [, , nums3, nums4, ] = numbers;
console.log(nums3, nums4); // three four

let [color1, color2 = "blue"] = ["black"];
console.log(color1, color2); // black bluoe
