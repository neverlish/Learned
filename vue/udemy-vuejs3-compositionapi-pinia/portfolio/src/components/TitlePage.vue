
<template>
  <section id="title">
    <div class="container">
      <div class="detail row">
        <figure class="col-md-6">
          <img src="../assets/images/title.png" alt="title">
        </figure>
        <div class="text col-md-6">
          <h2 v-html="title"></h2>
        </div>
      </div>
    </div>
  </section>    
</template>
  
<script setup>
  const title = "Hello,<br> I'm Michael Kwon"; 

</script>
  
<style lang="scss">
#title {
  .container {
    $navbar_height: 56px; // navbar 높이값
    height: 100vh;
    padding: $navbar_height;

    .row {
      height: 100%;
      flex-direction: row-reverse;
    }
  }

  figure {
    img {
      width: 100%;
    }
    display: grid;
    place-items: center;
  }

  .text {
    h2 {
      font-size: 4em;
    }

    display: grid;
    place-items: center;
  }
}
</style>
