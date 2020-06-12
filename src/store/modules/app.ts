import Cookies from 'js-cookie';
import { getLanguage } from '@/lang/index';
import store from '..';

interface StateAttr {
  sidebarCollapse: any;
  withoutAnimation: boolean;
  device: string;
  language: any;
  size: any;
}

const stateModule: StateAttr = {
  sidebarCollapse: false,
  withoutAnimation: false,
  device: 'desktop',
  language: getLanguage(),
  size: Cookies.get('size') || 'medium'
};

const getters = {
  getToDo(state: StateAttr) {
    return state.language + state.size;
  }
};

const mutations = {
  TOGGLE_SIDEBAR(state: StateAttr): void {
    state.sidebarCollapse = !state.sidebarCollapse;
    state.withoutAnimation = false;
  },
  CLOSE_SIDEBAR: (state: StateAttr, withoutAnimation: boolean) => {
    state.sidebarCollapse = false;
    state.withoutAnimation = withoutAnimation;
  },
  TOGGLE_DEVICE: (state: StateAttr, device: string) => {
    state.device = device;
  },
  SET_LANGUAGE: (state: StateAttr, language: string) => {
    state.language = language;
    Cookies.set('language', language);
  },
  SET_SIZE: (state: StateAttr, size: string) => {
    state.size = size;
    Cookies.set('size', size);
  }
};

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR');
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation);
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device);
  },
  setLanguage({ commit }, language) {
    commit('SET_LANGUAGE', language);
  },
  setSize({ commit }, size) {
    commit('SET_SIZE', size);
  }
};

export default {
  namespaced: true,
  state: stateModule,
  getters,
  mutations,
  actions
};
