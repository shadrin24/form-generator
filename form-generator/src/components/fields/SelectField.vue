<template>
  <BaseField :field="field" :error="error">
    <select
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
  </BaseField>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import BaseField from './BaseField.vue';
import type { FormFieldConfig } from '../../types/form';

export default defineComponent({
  name: 'SelectField',
  components: {
    BaseField,
  },
  props: {
    field: {
      type: Object as PropType<FormFieldConfig>,
      required: true,
    },
    modelValue: {
      type: [String, Number],
      default: '',
    },
    error: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  setup(_, { emit }) {
    const updateValue = (event: Event) => {
      const target = event.target as HTMLSelectElement;
      emit('update:modelValue', target.value);
    };

    return {
      updateValue,
    };
  },
});
</script>

<style lang="scss" scoped>
.form-field__select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;
  transition: border-color 0.3s, box-shadow 0.3s;
  
  &:focus {
    outline: none;
    border-color: #4caf50;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.2);
  }
}
</style> 