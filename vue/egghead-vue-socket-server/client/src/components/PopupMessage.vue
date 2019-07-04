<template>
  <v-snackbar v-model="snackbar" :timeout="timeout" :color="color" top>{{ notification_text }}</v-snackbar>
</template>

<script>
export default {
  data: () => ({
    snackbar: false,
    notification_text: "",
    timeout: 3000,
    color: "success"
  }),

  sockets: {
    POPUP_NOTIFICATION: function(socket_data) {
      this.notification_text = socket_data.message;
      this.color = socket_data.color || "success";
      this.snackbar = true;
    },
    disconnect: function() {
      this.notification_text = "CAUTION SERVER DISCONNECTED";
      this.color = "red";
      this.snackbar = true;
    }
  }
};
</script>
