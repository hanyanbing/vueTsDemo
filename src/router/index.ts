import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

/* Layout */
import Layout from '@/layout/index.vue';

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 * */
export const constantRoutes = [
  {
    path: '/',
    component: () => import('@/views/login/index.vue'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true, affix: true }
      }
    ]
  }
];

export const asyncRoutes = []

const createRouter = () => new Router({
  routes: constantRoutes
});

const router = createRouter();

// https://blog.csdn.net/suolong914/article/details/89432563
export function resetRouter() {
  const newRouter = createRouter();
  //重置路由
  //通过新建一个全新的 Router，然后将新的 Router.matcher 赋给当前页面的管理 Router，以达到更新路由配置的目的。
  (router as any).matcher = (newRouter as any).matcher; // reset router
  
};

export default router;
