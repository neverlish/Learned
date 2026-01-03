<script setup>

</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top" data-bs-theme="dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Doolee</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Portfolio</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">About</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <section id="title">
    <div class="container">
      <div class="detail row">
        <figure class="col-md-6">
          <img src="./assets/images/title.png" alt="title">
        </figure>
        <div class="text col-md-6">
          <h2>Hello,<br>I'm Doolee</h2>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
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
}</style>