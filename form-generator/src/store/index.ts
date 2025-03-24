import { createStore } from "vuex";
import type { InjectionKey } from "vue";

// Опрелеление типа состояния хранилища
export interface State {
  formData: Record<string, any>;
}

// Определение ключа инъекции для типизации хранилища
export const key: InjectionKey<ReturnType<typeof createStore>> = Symbol();

export default createStore<State>({
  state: {
    formData: {}
  },
  mutations: {
    updateForm(state: State, payload: Record<string, any>) {
      state.formData = { ...state.formData, ...payload };
    },
    resetForm(state: State) {
      state.formData = {};
    }
  },
  actions: {
    setFormData({ commit }: { commit: any }, payload: Record<string, any>) {
      commit("updateForm", payload);
    },
    clearFormData({ commit }: { commit: any }) {
      commit("resetForm");
    }
  },
  getters: {
    getFormData: (state: State) => state.formData
  }
}); 