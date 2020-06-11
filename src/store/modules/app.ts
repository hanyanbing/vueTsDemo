import Cookies from 'js-cookie';
import { getLanguage } from '@/lang/index';

interface SiderAttr {
  opened: any;
  withoutAnimation: boolean;
}
interface StateAttr {
  sidebar: SiderAttr;
  device: string;
  language: any;
  size: any;
}

const stateModule: StateAttr = {
  sidebar: {
    opened: Cookies.get('sidebarStatus')
      ? !!Cookies.get('sidebarStatus')
      : true,
    withoutAnimation: false
  },
  device: 'desktop',
  language: getLanguage(),
  size: Cookies.get('size') || 'medium'
};

const getters = {
  getToDo(state) {
    return state.language + state.size;
  }
};

const mutations = {
  TOGGLE_SIDEBAR(state: StateAttr): void {
    state.sidebar.opened = !state.sidebar.opened;
    state.sidebar.withoutAnimation = false;
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', '1');
    } else {
      Cookies.set('sidebarStatus', '0');
    }
  },
  CLOSE_SIDEBAR: (state: StateAttr, withoutAnimation: boolean) => {
    Cookies.set('sidebarStatus', '0');
    state.sidebar.opened = false;
    state.sidebar.withoutAnimation = withoutAnimation;
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
