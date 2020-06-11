import Cookies from 'js-cookie';

interface States {
  showSettings: boolean;
  tagsView: boolean;
  fixedHeader: boolean;
  sidebarLogo: boolean;
  siderbarOpen: boolean;
}

const stateModule: States = {
  showSettings: true,
  tagsView: true,
  fixedHeader: false,
  sidebarLogo: true,
  siderbarOpen: false
};

const mutations = {
  CHANGE_SETTING: (state: States, { key, value }) => {
    if (Object.prototype.hasOwnProperty.call(state, key)) {
      state[key] = value;
    }
  }
};

const actions = {
  changeSetting({ commit }, data: object) {
    commit('CHANGE_SETTING', data);
  }
};

export default {
  namespaced: true,
  state: stateModule,
  mutations,
  actions
};
