<template>
  <v-card-media
    :src="srcImage"
    height="150px"
  >
  </v-card-media>
</template>

<script>
export default {
	props: ['src'],
	data: () => ({ observer: null, intersected: false }),
	computed: {
		srcImage() {
			return this.intersected ? this.src : ''
		},
	},
	mounted() {
		this.observer = new IntersectionObserver(
			entries => {
				const entry = entries[0]

				if (entry.isIntersecting) {
					this.intersected = true
					this.observer.disconnect()
				}
			},
			{
				rootMargin: '120px',
			}
		)

		this.observer.observe(this.$el)
	},
	destroyed() {
		this.observer.disconnect()
	},
}
</script>
