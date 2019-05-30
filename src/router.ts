import Vue from 'vue'
import Router from 'vue-router'
import Layout from './layout/index.vue';
import CertificateUpload from './views/Certificate/upload.vue';

Vue.use(Router)

export const routeObj = {
  routes: [
    {
      path: '/',
      redirect: '/certificate/list',
      hide: true
    },
    {
      path: '/certificate',
      name: '存证管理',
      component: Layout,
      icon: 'el-icon-tickets',
      children: [
        {
          path: 'upload',
          name: '上传存证',
          icon: 'el-icon-upload2',
          component: CertificateUpload
        },
        {
          path: 'list',
          name: '存证列表',
          icon: 'el-icon-document',
          component: () => import('@/views/Certificate/list.vue')
        },
        {
          path: 'upload/record',
          name: '存证记录',
          icon: 'el-icon-document',
          hide: true,
          meta: {
            parent: {
              path: '/certificate/upload',
              name: '上传存证'
            },
          },
          component: () => import('@/views/Certificate/record.vue')
        },
      ]
    },
    {
      path: '/attribute',
      name: '属性管理',
      component: Layout,
      meta: {
        rules: ['admin']
      },
      icon: 'el-icon-set-up',
      children: [
        {
          path: 'category',
          name: '分类管理',
          icon: 'el-icon-copy-document',
          component: () => import('./views/Attribute/category.vue')
        },
        {
          path: 'category/new',
          name: '添加分类',
          icon: 'el-icon-copy-document',
          meta: {
            parent: {
              path: '/attribute/category',
              name: '分类管理'
            }
          },
          hide: true,
          component: () => import('./views/Attribute/category-new.vue')
        },
        {
          path: 'size',
          name: '规格管理',
          icon: 'el-icon-news',
          component: () => import('./views/Attribute/size.vue')
        },
        {
          path: 'size/new',
          name: '新增规格',
          icon: 'el-icon-copy-document',
          meta: {
            parent: {
              path: '/attribute/size',
              name: '分类管理'
            }
          },
          hide: true,
          component: () => import('./views/Attribute/size-new.vue')
        },
      ]
    },
    {
      path: '/passport/login',
      name: 'passport',
      component: () => import('./views/Passport/login.vue'),
      hide: true
    }
  ]
};

export default new Router(routeObj)
