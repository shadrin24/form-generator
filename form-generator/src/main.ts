import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import store, { key } from './store'

// Создаем приложение
const app = createApp(App)

// Подключаем роутер и хранилище
app.use(router)
app.use(store, key)

// Монтируем приложение
app.mount('#app')
