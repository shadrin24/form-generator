<template>
  <BaseField :field="field" :error="error">
    <div class="form-field__checkbox-wrapper">
      <input
        type="checkbox"
        :checked="modelValue"
        :id="field.name"
        :name="field.name"
        :required="field.required"
        :disabled="field.disabled"
        class="form-field__checkbox"
        @change="updateValue($event)"
      />
      <span class="form-field__checkbox-label">{{ field.checkboxLabel || field.label }}</span>
    </div>
  </BaseField>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import BaseField from './BaseField.vue';
import type { FormFieldConfig } from '../../types/form';

export default defineComponent({
  name: 'CheckboxField',
  components: {
    BaseField,
  },
  props: {
    field: {
      type: Object as PropType<FormFieldConfig>,
      required: true,
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  setup(_, { emit }) {
    const updateValue = (event: Event) => {
      const target = event.target as HTMLInputElement;
      emit('update:modelValue', target.checked);
    };

    return {
      updateValue,
    };
  },
});
</script>

<style lang="scss" scoped>
.form-field__checkbox-wrapper {
  display: flex;
  align-items: center;
}

.form-field__checkbox {
  margin-right: 0.5rem;
}

.form-field__checkbox-label {
  font-size: 1rem;
}
</style> 