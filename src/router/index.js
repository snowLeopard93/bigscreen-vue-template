import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

let defaultRoutes = [
  {
    path: "/",
    redirect: "/bigScreen",
  },
  {
    path: "/bigScreen",
    name: "bigScreen",
    meta: {
      title: "大屏",
    },
    component: () =>
      import(/* webpackChunkName: "bigScreen" */ "../views/bigscreen/index"),
  },
];

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes: [...defaultRoutes],
});

router.beforeEach((to, from, next) => {
  // 路由守卫 修改页面title
  document.title = to.meta.title;
  next();
});

export default router;
