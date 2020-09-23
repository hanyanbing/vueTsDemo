import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';

Vue.use(Router);

// /* Layout */
import Layout from '@/layout/index.vue';
import nestedRouter from './modules/nested';
import tableRouter from './modules/table';

//  constantRoutes
//  a base page that does not have permission requirements
//  all roles can be accessed
// export const constantRoutes: RouteConfig[] = [
export const constantRoutes: any = [
  {
    path: '/login',
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
        meta: {
          title: 'dashboard',
          icon: 'dashboard',
          noCache: true,
          affix: true
        }
      }
    ]
  },
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/guide/index.vue'),
        name: 'Guide',
        meta: { title: 'guide', icon: 'guide', noCache: true }
      }
    ]
  },
  {
    path: '/tab',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/tab/index.vue'),
        name: 'Tab',
        meta: { title: 'Tab', icon: 'tab' }
      }
    ]
  }
];

export const asyncRoutes = [
  {
    path: '/icon',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () =>
          import(/* webpackChunkName: "icons" */ '@/views/icons/index.vue'),
        name: 'Icons',
        meta: {
          title: 'icons',
          icon: 'icon',
          noCache: true
        }
      }
    ]
  },
  tableRouter,
  nestedRouter,
  {
    path: '/theme',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'index',
        component: () =>
          import(/* webpackChunkName: "theme" */ '@/views/theme/index.vue'),
        name: 'Theme',
        meta: {
          title: 'theme',
          icon: 'theme'
        }
      }
    ]
  },
  {
    path: '/form',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'index',
        component: () =>
          import(/* webpackChunkName: "theme" */ '@/views/form/index.vue'),
        name: 'Form',
        meta: {
          title: 'form',
          icon: 'form'
        }
      }
    ]
  },
  {
    path: '/slot',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'index',
        component: () =>
          import(/* webpackChunkName: "theme" */ '@/views/slot/index.vue'),
        name: 'Slot',
        meta: {
          title: 'slot',
          icon: 'form'
        }
      }
    ]
  },
  {
    path: '/i18n',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () =>
          import(
            /* webpackChunkName: "i18n-demo" */ '@/views/i18n-demo/index.vue'
          ),
        name: 'I18n',
        meta: {
          title: 'i18n',
          icon: 'international'
        }
      }
    ]
  }
];

const createRouter = () =>
  new Router({
    // mode: 'history',  // Disabled due to Github Pages doesn't support this, enable this if you need.
    scrollBehavior: (to, from, savedPosition) => {
      if (savedPosition) {
        return savedPosition;
      } else {
        return { x: 0, y: 0 };
      }
    },
    base: process.env.BASE_URL,
    routes: constantRoutes
  });

const router = createRouter();

// https://blog.csdn.net/suolong914/article/details/89432563
export function resetRouter() {
  const newRouter = createRouter();
  // 重置路由
  // 通过新建一个全新的 Router，然后将新的 Router.matcher 赋给当前页面的管理 Router，以达到更新路由配置的目的。
  (router as any).matcher = (newRouter as any).matcher; // reset router
}

export default router;
