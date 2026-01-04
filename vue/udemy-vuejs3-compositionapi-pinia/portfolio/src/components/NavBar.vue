<template>
  <nav 
    class="navbar navbar-expand-lg bg-body-tertiary fixed-top" 
    data-bs-theme="dark"
  >
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Michael Kwon</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link 
              class="nav-link active" 
              aria-current="page" 
              to="/">Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link 
              class="nav-link" 
              to="/portfolio"
            >Portfolio</router-link>
          </li>
          <li class="nav-item">
            <router-link 
              class="nav-link" 
              to="/about"
            >About</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>    
</template>
  
<script setup>
  
</script>
  
<style lang="scss" scoped>
  .navbar {
    .nav-item { margin-left: 2em; }
  }
</style>