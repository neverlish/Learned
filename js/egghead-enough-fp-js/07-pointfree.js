// 07 Eliminate Anonymous JavaScript Functions with Pointfree Programming

// Pointfree Programming

const array = [1, 2, 3]
const double = x => x * 2
array.map(double)

// Legibility
// Reduce surface area for bugs
// unit test our named functions