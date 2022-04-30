import Vue from "vue";
import VueRouter from "vue-router";

// 路由懒加载
const Login = () =>
  import(
    /* webpackChunkName: "Login_Home_Welcome" */ "../components/HelloWorld.vue"
  );

const Upload = () =>
  import(/* webpackChunkName: "LogReport" */ '../components/Upload.vue')

Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/Upload', component: Upload },
]

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  // 访问登录页，放行
  if (to.path === "/login") return next();
  // 获取token
  const tokenStr = window.sessionStorage.getItem("token");
  // 没有token, 强制跳转到登录页
  if (!tokenStr) return next("/login");
  next();
});

export default router;
