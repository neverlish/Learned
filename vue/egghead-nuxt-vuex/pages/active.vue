<template>
  <div>
    <article class="pa3 pa5-ns">
      <h1 class="f4 bold center mw6">Active Todos</h1>
      <ul class="list p10 m10 center mw6 ba b--light-silver br2">
        <li v-for="(todo, i) of todos" :key="i" class="flex ph3 pv3 bb b--light-silver">
          <span v-bind:class="{strike: todo.complete}" class="flex-auto">{{todo.id}}. {{todo.task}}</span>
        </li>
      </ul>
    </article>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { init } from "./shared";

export default {
  fetch: init,
  computed: {
    ...mapState({
      todos: state => state.todos.filter(todo => !todo.complete)
    })
  }
};
</script>
