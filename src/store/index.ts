import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';

Vue.use(Vuex);

interface User {
  id: number;
  username: string;
  email: string;
}

interface RootState {
  user: User | null;
  isAuthenticated: boolean;
}

const store: StoreOptions<RootState> = {
  state: {
    user: null,
    isAuthenticated: false,
  },
  mutations: {
    setUser(state, user: User) {
      state.user = user;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  actions: {
    login({ commit }, user: User) {
      return new Promise<User>(resolve => {
        setTimeout(() => {
          commit('setUser', user);
          resolve(user);
        }, 1000);
      });
    },
    logout({ commit }) {
      commit('logout');
    },
  },
  getters: {
    isAuthenticated: state => state.isAuthenticated,
    currentUser: state => state.user,
  },
};

export default new Vuex.Store<RootState>(store);
