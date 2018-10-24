const { fromEvent } = rxjs;
const { debounceTime, map, distinctUntilChanged, share } = rxjs.operators;

export default class AutoComplete {
  constructor($autocomplete) {
    this.$input = $autocomplete.querySelector('input');
    this.$layer = $autocomplete.querySelector('.layer');
    this.$loading = $autocomplete.querySelector('.loading');
  }

  createKeyup$() {
    return fromEvent(this.$input, 'keyup')
      .pipe(
        debounceTime(300),
        map(event => event.target.value),
        distinctUntilChanged(),
        share()
      );
  }
};
