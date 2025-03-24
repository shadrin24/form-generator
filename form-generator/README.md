# Vue Form Generator

Динамический генератор форм на Vue 3 + TypeScript с использованием Composition API.

## Особенности

- Vue 3 + TypeScript + Composition API
- Vuex для управления состоянием
- Vue Router для маршрутизации
- SCSS для стилизации
- Динамическое создание форм на основе конфигурации
- Поддержка слотов для кастомизации полей
- Валидация полей формы
- Полная типизация с использованием TypeScript

## Установка

```bash
# Клонирование репозитория
git clone [url-репозитория]
cd form-generator

# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Сборка для продакшена
npm run build
```

## Использование

Пример использования компонента формы:

```vue
<template>
  <FormGenerator
    v-model="formData"
    :fields="formConfig"
    :errors="errors"
    title="Моя форма"
    description="Описание формы"
    @submit="handleSubmit"
    @cancel="handleCancel"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import FormGenerator from '@/components/FormGenerator.vue';
import { FormFieldConfig } from '@/components/FormField.vue';

export default defineComponent({
  components: { FormGenerator },
  setup() {
    const formData = ref({});
    
    const formConfig: FormFieldConfig[] = [
      { type: "text", label: "Имя", name: "name", required: true },
      { type: "email", label: "E-mail", name: "email", required: true },
      { type: "select", label: "Город", name: "city", options: ["Москва", "Санкт-Петербург"] }
    ];
    
    const handleSubmit = (data) => {
      // Обработка отправки формы
      console.log(data);
    };
    
    const handleCancel = () => {
      // Обработка отмены
    };
    
    return {
      formData,
      formConfig,
      handleSubmit,
      handleCancel
    };
  }
});
</script>
```

## Кастомизация полей

Для создания кастомных полей используйте именованные слоты:

```vue
<FormGenerator
  v-model="formData"
  :fields="formConfig"
>
  <!-- Кастомное поле через слот -->
  <template #customField="{ field, modelValue, updateField }">
    <!-- Ваша кастомная разметка -->
  </template>
</FormGenerator>
```

## Структура проекта

```
src/
├── components/         # Компоненты
│   ├── FormGenerator.vue  # Основной компонент формы
│   ├── FormField.vue      # Компонент поля формы
├── views/              # Страницы
│   ├── Home.vue           # Главная страница
│   ├── ExampleForm.vue    # Пример использования формы
├── store/              # Vuex хранилище
│   ├── index.ts
├── router/             # Vue Router
│   ├── index.ts
├── styles/             # Глобальные стили
│   ├── main.scss
├── App.vue             # Корневой компонент
└── main.ts             # Точка входа
```
