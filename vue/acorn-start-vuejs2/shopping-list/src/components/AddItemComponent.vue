<template>
  <div>
    <div class='input-group'>
      <input type='text' @keyup.enter='addItem' v-model='newItem' class='input form-control' placeholder='add shopping list item'>
      <span class='input-group-btn'>
        <button @click='addItem' class='btn btn-default' type='button'>Add!</button>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      newItem: ''
    }
  },
  methods: {
    addItem () {
      var text

      text = this.newItem.trim()
      if (text) {
        this.$emit('add', this.newItem)
        this.newItem = ''
      }
    }
  }
}
</script>
