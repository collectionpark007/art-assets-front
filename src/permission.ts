import router from './router'
import store from './store'
import NProgress from 'nprogress';
import { getToken } from '@/utils/auth';
NProgress.configure({ showSpinner: false });

const whiteList = [
  '/passport'
]
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (Boolean(getToken())) {
    if (to.path.includes('/passport')) {
      NProgress.done();
      next('/');
    } else if (store.state.menuList === null) {
      store.dispatch('getMenuList').then((menuList) => {
        store.commit('SET_MENU_LIST', menuList);
        NProgress.done();
        next({ ...to });
      })
    } else {
      next();
    }
  } else if (whiteList.findIndex(item => to.path.includes(item)) > -1) {
    next()
  } else {
    next(`/passport/login?redirect=${to.path}`);
    NProgress.done();
  }
})

router.afterEach(() => {
  NProgress.done();
})