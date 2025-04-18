<template>
  <div class="form-field" :class="{ 'form-field--required': field.required }">
    <label :for="field.name" class="form-field__label">
      {{ field.label }}
      <span v-if="field.required" class="form-field__required">*</span>
    </label>
    
    <div class="form-field__input-wrapper">
      <slot></slot>
    </div>
    
    <div v-if="error" class="form-field__error">
      {{ error }}
    </div>
    
    <div v-if="field.hint" class="form-field__hint">
      {{ field.hint }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import type { FormFieldConfig } from '../../types/form';

export default defineComponent({
  name: 'BaseField',
  props: {
    field: {
      type: Object as PropType<FormFieldConfig>,
      required: true,
    },
    error: {
      type: String,
      default: '',
    },
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