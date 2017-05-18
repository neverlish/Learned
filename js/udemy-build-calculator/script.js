function calculate() {
  document.calc.output.value=eval(document.calc.output.value);
}

function erase() {
  document.calc.output.value='';
}

function entries(s) {
  document.calc.output.value+=s;
}
