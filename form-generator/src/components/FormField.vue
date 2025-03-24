<template>
  <div class="form-field" :class="{ 'form-field--required': field.required }">
    <label :for="field.name" class="form-field__label">
      {{ field.label }}
      <span v-if="field.required" class="form-field__required">*</span>
    </label>
    
    <div class="form-field__input-wrapper">
      <!-- Текстовое поле -->
      <input
        v-if="field.type === 'text' || field.type === 'email' || field.type === 'password'"
        :type="field.type"
        :value="modelValue"
        :id="field.name"
        :name="field.name"
        :required="field.required"
        :placeholder="field.placeholder"
        :disabled="field.disabled"
        class="form-field__input"
        @input="updateValue($event)"
      />
      
      <!-- Текстовая область -->
      <textarea
        v-else-if="field.type === 'textarea'"
        :value="modelValue"
        :id="field.name"
        :name="field.name"
        :required="field.required"
        :placeholder="field.placeholder"
        :disabled="field.disabled"
        class="form-field__textarea"
        @input="updateValue($event)"
      ></textarea>
      
      <!-- Чекбокс -->
      <div v-else-if="field.type === 'checkbox'" class="form-field__checkbox-wrapper">
        <input
          type="checkbox"
          :checked="!!modelValue"
          :id="field.name"
          :name="field.name"
          :required="field.required"
          :disabled="field.disabled"
          class="form-field__checkbox"
          @change="updateCheckbox($event)"
        />
        <span class="form-field__checkbox-label">{{ field.checkboxLabel || field.label }}</span>
      </div>
      
      <!-- Селект -->
      <select
        v-else-if="field.type === 'select'"
        :value="modelValue"
        :id="field.name"
        :name="field.name"
        :required="field.required"
        :disabled="field.disabled"
        class="form-field__select"
        @change="updateValue($event)"
      >
        <option value="" disabled selected>{{ field.placeholder || 'Выберите опцию' }}</option>
        <option
          v-for="(option, index) in field.options"
          :key="index"
          :value="typeof option === 'object' ? option.value : option"
        >
          {{ typeof option === 'object' ? option.label : option }}
        </option>
      </select>
      
      <!-- Слот для кастомного поля -->
      <slot
        v-else
        name="field"
        :field="field"
        :value="modelValue"
        :update-value="updateValue"
      ></slot>
    </div>
    
    <!-- Ошибка валидации -->
    <div v-if="error" class="form-field__error">
      {{ error }}
    </div>
    
    <!-- Подсказка -->
    <div v-if="field.hint" class="form-field__hint">
      {{ field.hint }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

// Определение типа поля формы
export interface FormFieldConfig {
  type: string;
  name: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  options?: Array<string | { label: string; value: any }>;
  hint?: string;
  checkboxLabel?: string;
}

export default defineComponent({
  name: 'FormField',
  props: {
    field: {
      type: Object as PropType<FormFieldConfig>,
      required: true,
    },
    modelValue: {
      type: [String, Number, Boolean, Object, Array],
      default: '',
    },
    error: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    // Обновляет значение для большинства типов полей
    const updateValue = (event: Event) => {
      const target = event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
      emit('update:modelValue', target.value);
    };
    
    // Специальная обработка для чекбоксов
    const updateCheckbox = (event: Event) => {
      const target = event.target as HTMLInputElement;
      emit('update:modelValue', target.checked);
    };
    
    return {
      updateValue,
      updateCheckbox,
    };
  },
});
</script>

<style lang="scss" scoped>
.form-field {
  margin-bottom: 1.5rem;
  
  &__label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    font-size: 1rem;
  }
  
  &__required {
    color: #f44336;
    margin-left: 0.25rem;
  }
  
  &__input,
  &__textarea,
  &__select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
    transition: border-color 0.3s, box-shadow 0.3s;
    
    &:focus {
      outline: none;
      border-color: #4caf50;
      box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.2);
    }
  }
  
  &__textarea {
    min-height: 100px;
    resize: vertical;
  }
  
  &__checkbox-wrapper {
    display: flex;
    align-items: center;
  }
  
  &__checkbox {
    margin-right: 0.5rem;
  }
  
  &__error {
    margin-top: 0.5rem;
    color: #f44336;
    font-size: 0.875rem;
  }
  
  &__hint {
    margin-top: 0.5rem;
    color: #757575;
    font-size: 0.875rem;
  }
}
</style> 