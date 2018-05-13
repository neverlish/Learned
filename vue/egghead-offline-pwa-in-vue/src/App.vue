<template>
  <v-app>
    <Toolbar/>
    <main>
      <v-content>
        <router-view :online="online"></router-view>
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
    <v-snackbar
      :absolute="true"
      v-model="showOnline"
      :timeout="4000"
    >
      The app is offline. Some features might be disabled.
    </v-snackbar>
  </v-app>
</template>

<script>
import Toolbar from './components/Toolbar'
export default {
	props: ['show', 'message'],
	data: () => ({ online: false, showOnline: false }),
	mounted() {
		this.online = navigator.onLine
		window.addEventListener('online', () => {
			this.online = true
		})
		window.addEventListener('offline', () => {
			this.online = false
			this.showOnline = true
		})
	},
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
