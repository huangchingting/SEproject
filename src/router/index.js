import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: "百分百文具網"
    }
  },
  {
    path: '/product',
    name: 'productView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "product" */ '../views/ProductView.vue'),
    meta: {
      title: "百分百文具網 | 商品"
    }
  },
  {
    path: '/login',
    name: 'loginView',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue'),
    meta: {
      title: "百分百文具網 | 管理者登入"
    }
  },
  {
    path: '/cart',
    name: 'shoppingCartView',
    component: () => import(/* webpackChunkName: "cart" */ '../views/CartView.vue'),
    meta: {
      title: "百分百文具網 | 購物車"
    }
  },
  {
    path: '/transaction',
    name: 'transactionView',
    component: () => import(/* webpackChunkName: "txn" */ '../views/TxnView.vue'),
    meta: {
      title: "百分百文具網 | 交易明細"
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.afterEach(to => {
  Vue.nextTick(() => {
    document.title = to.meta.title
  })
})

export default router
