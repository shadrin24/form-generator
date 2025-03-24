<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>

<template>
  <div class="app-container">
    <nav class="app-navigation">
      <div class="nav-container">
        <router-link to="/" class="logo">FormGenerator</router-link>
        <div class="nav-links">
          <router-link to="/">Главная</router-link>
          <router-link to="/form">Пример формы</router-link>
        </div>
      </div>
    </nav>
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<style lang="scss">
@forward "./styles/main.scss";
</style>
