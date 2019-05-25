<template>
  <div>
    <article class="pa3 pa5-ns">
      <h1 class="f4 bold center mw6">Todos</h1>
      <ul class="list p10 m10 center mw6 ba b--light-silver br2">
        <li v-for="(todo, i) of todos" :key="i" class="ph3 pv3 bb b--light-silver">{{todo.task}}</li>
      </ul>
    </article>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import axios from "axios";
export default {
  async fetch({ store }) {
    const res = await axios.get("https://todos-cuvsmolowg.now.sh/todos");
    store.commit("init", res.data);
  },
  computed: {
    ...mapState({
      todos: state => state.todos
    })
  },
  methods: {}
};
</script>
