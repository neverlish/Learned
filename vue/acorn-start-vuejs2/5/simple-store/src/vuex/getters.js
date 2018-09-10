import { CHANGE_MSG } from "./mutation_types";

export default {
  getMessage(state) {
    return (state.message).toUpperCase()
  },
  getCounter(state) {
    return (state.counter)
  }
}
