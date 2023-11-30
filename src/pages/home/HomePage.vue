<template>
  <main class="home-page">
    <nav class="home__nav">
      <router-link to="/people">People</router-link>
      <router-link to="/favorites">Favorites</router-link>
    </nav>
  </main>
</template>

<style lang="scss">
  .home__nav {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin: 20px;
  }
</style>