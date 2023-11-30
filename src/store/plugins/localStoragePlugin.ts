import { Store } from 'vuex';
import { State } from "@/store"

export const localStoragePlugin = (store: Store<State>) => {
  store.subscribe((_, state) => {
    localStorage.setItem('favorites', JSON.stringify(state.favorites));
  });
};
