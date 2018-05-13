<template>
  <v-app>
    <Toolbar/>
    <main>
      <v-content>
          <router-view></router-view>
      </v-content>
    </main>
    <v-footer app></v-footer>
    <v-snackbar
      :absolute="true"
      v-model="show"
      :timeout="4000"
    >
      {{ message }}
    </v-snackbar>
  </v-app>
</template>

<script>
import Toolbar from './components/Toolbar'
export default {
	props: ['show', 'message'],
	components: {
		Toolbar,
	},
}
</script>

<style>
.notification {
	position: absolute;
}
</style>
