import router, { asyncRoutes, constantRoutes } from '@/router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles: string[], route: object) {
  if ((route as any).meta && (route as any).meta.roles) {
    return roles.some(role => (route as any).meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes: object[], roles: string[]) {
  const res: object[] = []
  routes.forEach(route => {
    const tmp: object = { ...route }
    if (hasPermission(roles, tmp)) {
      if ((tmp as any).children) {
        (tmp as any).children = filterAsyncRoutes((tmp as any).children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

// 设置数据类型
interface State {
  routes: object[],
  addRoutes: object[]
}

// state
const state: State = {
  routes: [],
  addRoutes: []
}

// mutations
const mutations: any = {
  SET_ROUTES: (states: State , routes: object[]) => {
    states.addRoutes = routes
    states.routes =[...constantRoutes,...routes];
  }
}

// actions
const actions: any = {
  generateRoutes({ commit }, roles: string[]) {
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
