import Vue from 'vue'
import Vuex from 'vuex'
import { setToken, clearToken, getToken } from './utils/auth';
import { routeObj } from './router';

Vue.use(Vuex)

const filterRouterWithHide = (routes: any[]) => {
  routes.forEach(route => {
    if (!route.children) return false;
    route.children = route.children.filter(item => {
        return !item.hide;
    }).map(item => {
      item.path = route.path + '/' + item.path;
      return item;
    })
  })
  return routes.filter((route) => {
    if (route.hide) {
      return false;
    }
    return true;
  })
}

export default new Vuex.Store({
  state: {
    userInfo: null,
    menuList: null
  },
  mutations: {
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo;
      setToken(userInfo);
    },
    SET_MENU_LIST(state, menuList) {
      state.menuList = menuList;
    }
  },
  getters: {
    userInfo: (state) => {
      const token = getToken();
      if (token) {
        state.userInfo = JSON.parse(token);
      }
      return state.userInfo;
    },
  },
  actions: {
    logout() {
      return new Promise((resolve, reject) => {
        clearToken();
        resolve()
      })
    },
    getMenuList() {
      return new Promise((resolve, reject) => {
        const routes = [ ...routeObj.routes ];
        const result = filterRouterWithHide(routes);
        resolve(result);
      })
    }
  }
})
