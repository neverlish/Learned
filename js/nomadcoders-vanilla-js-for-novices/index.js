const age = prompt('How old are you')

if (age > 18 && age < 21) {
  console.log('you can drink but you should not')
} else if (age > 21) {
  console.log('go ahead')
} else {
  console.log('too young')
}
