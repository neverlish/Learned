<template>
  <div class='col-md-6'>
    <div class='joke-card'>
      <div class='card-block'>
        <p><u>{{ joke.setup }}</u></p>
        <p><em>{{ joke.punchline }}</em></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['joke']
}
</script>
