// Поскольку Vuex не имеет прямых декларативных файлов в экспорте package.json,
// используем следующий обходной путь с принудительным импортом
// @ts-ignore
import { createStore, Store, useStore as baseUseStore, CommitOptions, DispatchOptions } from "vuex";
import type { InjectionKey } from "vue";

// Определение типа состояния хранилища
export interface State {
  formData: Record<string, any>;
}

// Определение типа для действий и мутаций
type MyMutations = {
  updateForm(state: State, payload: Record<string, any>): void;
  resetForm(state: State): void;
}

type MyActions = {
  setFormData(context: { commit: (type: string, payload: any) => void }, payload: Record<string, any>): void;
  clearFormData(context: { commit: (type: string) => void }): void;
}

// Определение типов для хранилища
export type MyStore = Omit<Store<State>, 'commit' | 'dispatch'> & {
  commit<K extends keyof MyMutations, P extends Parameters<MyMutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<MyMutations[K]>;
  dispatch<K extends keyof MyActions>(
    key: K,
    payload?: Parameters<MyActions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<MyActions[K]>;
}

// Определение ключа инъекции для типизации хранилища
export const key: InjectionKey<MyStore> = Symbol();

// Типизированный useStore
export function useStore(): MyStore {
  return baseUseStore(key) as MyStore;
}

// Определение типа для контекста в действиях Vuex
type ActionContext = {
  commit: (type: string, payload?: any) => void;
}

// Создание хранилища
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
    setFormData({ commit }: ActionContext, payload: Record<string, any>) {
      commit("updateForm", payload);
    },
    clearFormData({ commit }: ActionContext) {
      commit("resetForm");
    }
  },
  getters: {
    getFormData: (state: State) => state.formData
  }
}); 