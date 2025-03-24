<template>
  <div class="home">
    <h1>Генератор форм</h1>
    <p>
      Приложение для динамического создания форм на Vue 3 + TypeScript с
      использованием Composition API.
    </p>
    <div class="actions">
      <router-link to="/form" class="button">
        Перейти к примеру формы
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeView"
});
</script>

<style lang="scss" scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 1.2rem;
    line-height: 1.6;
    margin-bottom: 2rem;
  }
  
  .actions {
    margin-top: 2rem;
    
    .button {
      display: inline-block;
      padding: 0.75rem 1.5rem;
      background-color: #4caf50;
      color: white;
      text-decoration: none;
      border-radius: 4px;
      font-weight: 600;
      transition: background-color 0.3s;
      
      &:hover {
        background-color: #45a049;
      }
    }
  }
}
</style> 