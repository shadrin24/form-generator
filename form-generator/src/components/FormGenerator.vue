<template>
  <form class="form-generator" @submit.prevent="handleSubmit">
    <!-- Заголовок формы -->
    <div v-if="title" class="form-generator__header">
      <h2 class="form-generator__title">{{ title }}</h2>
      <p v-if="description" class="form-generator__description">
        {{ description }}
      </p>
    </div>
    
    <!-- Поля формы -->
    <div class="form-generator__fields">
      <template v-for="(field) in fields" :key="field.name">
        <!-- Слот для полностью кастомного поля -->
        <slot 
          v-if="hasSlot(field.name)" 
          :name="field.name" 
          :field="field" 
          :modelValue="formData[field.name]" 
          :errors="errors"
          :updateField="(value: any) => updateField(field.name, value)"
        ></slot>
        
        <!-- Текстовое поле -->
        <TextField
          v-else-if="['text', 'email', 'password'].includes(field.type)"
          :field="field"
          :modelValue="formData[field.name]"
          :error="errors[field.name]"
          @update:modelValue="(value) => updateField(field.name, value)"
        />
        
        <!-- Текстовая область -->
        <TextareaField
          v-else-if="field.type === 'textarea'"
          :field="field"
          :modelValue="formData[field.name]"
          :error="errors[field.name]"
          @update:modelValue="(value) => updateField(field.name, value)"
        />
        
        <!-- Чекбокс -->
        <CheckboxField
          v-else-if="field.type === 'checkbox'"
          :field="field"
          :modelValue="formData[field.name]"
          :error="errors[field.name]"
          @update:modelValue="(value) => updateField(field.name, value)"
        />
        
        <!-- Селект -->
        <SelectField
          v-else-if="field.type === 'select'"
          :field="field"
          :modelValue="formData[field.name]"
          :error="errors[field.name]"
          @update:modelValue="(value) => updateField(field.name, value)"
        />
      </template>
    </div>
    
    <!-- Кнопки действий -->
    <div class="form-generator__actions">
      <button
        v-if="showCancel"
        type="button"
        class="form-generator__button form-generator__button--cancel"
        @click="handleCancel"
      >
        {{ cancelText }}
      </button>
      
      <button
        type="submit"
        class="form-generator__button form-generator__button--submit"
        :disabled="loading"
      >
        <span v-if="loading" class="form-generator__loading-indicator"></span>
        {{ submitText }}
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, computed, useSlots } from 'vue';
import type { PropType } from 'vue';
import { useStore } from '../store';
import TextField from './fields/TextField.vue';
import TextareaField from './fields/TextareaField.vue';
import CheckboxField from './fields/CheckboxField.vue';
import SelectField from './fields/SelectField.vue';
import type { FormFieldConfig, FormGeneratorErrors, FormGeneratorProps } from '../types/form';

export default defineComponent({
  name: 'FormGenerator',
  components: {
    TextField,
    TextareaField,
    CheckboxField,
    SelectField,
  },
  props: {
    // Конфигурация полей формы
    fields: {
      type: Array as PropType<FormFieldConfig[]>,
      required: true,
    },
    // Значение формы (для v-model)
    modelValue: {
      type: Object as PropType<Record<string, any>>,
      default: () => ({}),
    },
    // Заголовок формы
    title: {
      type: String,
      default: '',
    },
    // Описание формы
    description: {
      type: String,
      default: '',
    },
    // Текст кнопки отправки
    submitText: {
      type: String,
      default: 'Сохранить',
    },
    // Текст кнопки отмены
    cancelText: {
      type: String,
      default: 'Отмена',
    },
    // Показывать ли кнопку отмены
    showCancel: {
      type: Boolean,
      default: true,
    },
    // Состояние загрузки
    loading: {
      type: Boolean,
      default: false,
    },
    // Ошибки валидации
    errors: {
      type: Object as PropType<FormGeneratorErrors>,
      default: () => ({}),
    },
  },
  emits: ['update:modelValue', 'submit', 'cancel'],
  setup(props, { emit }) {
    const store = useStore();
    const slots = useSlots();
    
    // Локальные данные формы
    const formData = computed({
      get: () => props.modelValue,
      set: (value) => {
        emit('update:modelValue', value);
        // Обновляем данные в хранилище
        store.dispatch('setFormData', value);
      },
    });
    
    // Обновление отдельного поля
    const updateField = (fieldName: string, value: any) => {
      const newFormData = {
        ...formData.value,
        [fieldName]: value,
      };
      emit('update:modelValue', newFormData);
      // Обновляем данные в хранилище
      store.dispatch('setFormData', newFormData);
    };
    
    // Проверка наличия именованного слота
    const hasSlot = (name: string) => !!slots[name];
    
    // Обработчик отправки формы
    const handleSubmit = () => {
      emit('submit', formData.value);
    };
    
    // Обработчик отмены
    const handleCancel = () => {
      emit('cancel');
    };
    
    return {
      formData,
      updateField,
      hasSlot,
      handleSubmit,
      handleCancel,
    };
  },
});
</script>

<style lang="scss" scoped>
.form-generator {
  max-width: 800px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  
  &__header {
    margin-bottom: 2rem;
  }
  
  &__title {
    font-size: 1.75rem;
    margin-bottom: 0.5rem;
    color: #333;
  }
  
  &__description {
    color: #666;
    font-size: 1rem;
    line-height: 1.5;
  }
  
  &__fields {
    margin-bottom: 2rem;
  }
  
  &__actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }
  
  &__button {
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.1s;
    border: none;
    
    &:active {
      transform: scale(0.98);
    }
    
    &--submit {
      background-color: #4caf50;
      color: white;
      
      &:hover {
        background-color: #45a049;
      }
      
      &:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
      }
    }
    
    &--cancel {
      background-color: transparent;
      color: #666;
      border: 1px solid #ccc;
      
      &:hover {
        background-color: #f5f5f5;
      }
    }
  }
  
  &__loading-indicator {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: #fff;
    animation: spin 1s ease-in-out infinite;
    margin-right: 0.5rem;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style> 