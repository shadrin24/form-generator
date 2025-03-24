<template>
  <div class="example-form">
    <h1>Пример использования генератора форм</h1>
    <div class="form-container">
      <FormGenerator
        v-model="formData"
        :fields="formConfig"
        :errors="errors"
        title="Регистрационная форма"
        description="Пожалуйста, заполните все необходимые поля для регистрации"
        @submit="handleSubmit"
        @cancel="handleCancel"
      >
        <!-- Пример использования слота для кастомного поля -->
        <template #terms="{ field, modelValue, updateField }">
          <div class="custom-checkbox">
            <h3>{{ field.label }}</h3>
            <div class="terms-wrapper">
              <p class="terms-text">
                Принимая эти условия, вы соглашаетесь с нашей политикой 
                конфиденциальности и условиями использования сервиса.
              </p>
              <div class="checkbox-control">
                <input
                  type="checkbox"
                  :id="field.name"
                  :checked="modelValue"
                  @change="e => updateField(e.target.checked)"
                />
                <label :for="field.name">Я согласен с условиями</label>
              </div>
            </div>
          </div>
        </template>
      </FormGenerator>
    </div>
    <div v-if="showResult" class="result">
      <h2>Результат отправки формы:</h2>
      <pre>{{ JSON.stringify(formData, null, 2) }}</pre>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import FormGenerator from '../components/FormGenerator.vue';
import { FormFieldConfig } from '../components/FormField.vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'ExampleForm',
  components: {
    FormGenerator,
  },
  setup() {
    const store = useStore();
    
    // Данные формы
    const formData = ref({
      name: '',
      email: '',
      password: '',
      city: '',
      message: '',
      terms: false,
    });
    
    // Конфигурация полей формы
    const formConfig: FormFieldConfig[] = [
      { 
        type: 'text', 
        label: 'Имя', 
        name: 'name', 
        required: true,
        placeholder: 'Введите ваше имя' 
      },
      { 
        type: 'email', 
        label: 'E-mail', 
        name: 'email', 
        required: true,
        placeholder: 'example@email.com' 
      },
      { 
        type: 'password', 
        label: 'Пароль', 
        name: 'password', 
        required: true,
        placeholder: 'Введите пароль' 
      },
      { 
        type: 'select', 
        label: 'Город', 
        name: 'city', 
        required: true,
        options: ['Москва', 'Санкт-Петербург', 'Казань', 'Новосибирск', 'Екатеринбург'],
        placeholder: 'Выберите город' 
      },
      { 
        type: 'textarea', 
        label: 'Сообщение', 
        name: 'message', 
        placeholder: 'Введите дополнительную информацию',
        hint: 'Необязательное поле' 
      },
      { 
        type: 'checkbox', 
        label: 'Условия использования', 
        name: 'terms',
        required: true
      },
    ];
    
    // Состояние ошибок
    const errors = reactive<Record<string, string>>({});
    
    // Показывать результат или нет
    const showResult = ref(false);
    
    // Обработчик отправки формы
    const handleSubmit = (data: Record<string, any>) => {
      // Сброс ошибок
      Object.keys(errors).forEach(key => {
        delete errors[key];
      });
      
      // Проверка обязательных полей
      let hasError = false;
      
      formConfig.forEach(field => {
        if (field.required && !data[field.name]) {
          errors[field.name] = `Поле "${field.label}" обязательно для заполнения`;
          hasError = true;
        }
      });
      
      // Если все в порядке, показываем результат
      if (!hasError) {
        // Сохраняем данные в хранилище
        store.dispatch('setFormData', data);
        showResult.value = true;
        
        // Имитация отправки на сервер
        setTimeout(() => {
          alert('Форма успешно отправлена!');
        }, 500);
      }
    };
    
    // Обработчик отмены
    const handleCancel = () => {
      // Очищаем форму
      Object.keys(formData.value).forEach(key => {
        formData.value[key] = typeof formData.value[key] === 'boolean' ? false : '';
      });
      
      // Очищаем ошибки
      Object.keys(errors).forEach(key => {
        delete errors[key];
      });
      
      // Скрываем результат
      showResult.value = false;
      
      // Очищаем хранилище
      store.dispatch('clearFormData');
    };
    
    return {
      formData,
      formConfig,
      errors,
      showResult,
      handleSubmit,
      handleCancel,
    };
  },
});
</script>

<style lang="scss" scoped>
.example-form {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  
  h1 {
    font-size: 2rem;
    margin-bottom: 2rem;
    color: #333;
    text-align: center;
  }
  
  .form-container {
    margin-bottom: 2rem;
  }
  
  .result {
    background-color: #f9f9f9;
    padding: 1.5rem;
    border-radius: 8px;
    margin-top: 2rem;
    
    h2 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: #333;
    }
    
    pre {
      background-color: #f1f1f1;
      padding: 1rem;
      border-radius: 4px;
      overflow-x: auto;
    }
  }
  
  .custom-checkbox {
    margin-bottom: 1.5rem;
    
    h3 {
      margin-bottom: 0.5rem;
      font-weight: 600;
      font-size: 1rem;
    }
    
    .terms-wrapper {
      background-color: #f5f5f5;
      padding: 1rem;
      border-radius: 4px;
      
      .terms-text {
        margin-bottom: 1rem;
        line-height: 1.6;
        font-size: 0.9rem;
      }
      
      .checkbox-control {
        display: flex;
        align-items: center;
        
        input {
          margin-right: 0.5rem;
        }
        
        label {
          font-weight: 600;
        }
      }
    }
  }
}
</style> 