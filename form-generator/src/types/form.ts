export type FormFieldType = 'text' | 'email' | 'password' | 'textarea' | 'checkbox' | 'select';

export interface FormFieldOption {
  label: string;
  value: string | number;
}

export interface FormFieldConfig {
  type: FormFieldType;
  name: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  options?: Array<string | FormFieldOption>;
  hint?: string;
  checkboxLabel?: string;
}

export interface FormGeneratorErrors {
  [key: string]: string;
}

export interface FormGeneratorProps {
  fields: FormFieldConfig[];
  modelValue: Record<string, any>;
  title?: string;
  description?: string;
  submitText?: string;
  cancelText?: string;
  showCancel?: boolean;
  loading?: boolean;
  errors?: FormGeneratorErrors;
} 