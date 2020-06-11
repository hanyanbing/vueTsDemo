import { Commit } from 'vuex';
import { login, logout, getInfo } from '@/api/user';
import { getToken, setToken, removeToken } from '@/utils/auth';
import router, { resetRouter } from '@/router';

interface StateAttr {
  token: any;
  name: string;
  avatar: string;
  introduction: string;
  roles: string[];
}

const initState: StateAttr = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
};

const mutations = {
  SET_TOKEN: (state: StateAttr, token: string) => {
    state.token = token;
  },
  SET_INTRODUCTION: (state: StateAttr, introduction: string) => {
    state.introduction = introduction;
  },
  SET_NAME: (state: StateAttr, name: string) => {
    state.name = name;
  },
  SET_AVATAR: (state: StateAttr, avatar: string) => {
    state.avatar = avatar;
  },
  SET_ROLES: (state: StateAttr, roles: string[]) => {
    state.roles = roles;
  }
};

const actions = {
  // user login
  login({ commit }, userInfo: any) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password })
        .then(response => {
          const { data } = response;
          commit('SET_TOKEN', data.token);
          setToken(data.token);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // get user info
  getInfo(context: { commit: Commit, state: StateAttr}) {
    return new Promise((resolve, reject) => {
      getInfo(context.state.token)
        .then(response => {
          const { data } = response;
          if (!data) {
            reject('Verification failed, please Login again.');
          }
          const { roles, name, avatar, introduction } = data;

          // roles must be a non-empty array
          if (!roles || roles.length <= 0) {
            reject('getInfo: roles must be a non-null array!');
          }

          context.commit('SET_ROLES', roles);
          context.commit('SET_NAME', name);
          context.commit('SET_AVATAR', avatar);
          context.commit('SET_INTRODUCTION', introduction);
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      logout()
        .then(() => {
          commit('SET_TOKEN', '');
          commit('SET_ROLES', []);
          removeToken();
          resetRouter();
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '');
      commit('SET_ROLES', []);
      removeToken();
      resolve();
    });
  },

  // Dynamically modify permissions

  async changeRoles({ commit, dispatch }, role) {
    // return new Promise(async resolve => {
    const token = role + '-token';

    commit('SET_TOKEN', token);
    setToken(token);

    const { roles } = await dispatch('getInfo');

    resetRouter();

    // generate accessible routes map based on roles   调用红其他模块中的actions
    const accessRoutes = await dispatch('permission/generateRoutes', roles, {
      root: true
    });

    // dynamically add accessible routes
    router.addRoutes(accessRoutes);

    // resolve()
    // })
  }
};

export default {
  namespaced: true,
  state: initState,
  mutations,
  actions
};
