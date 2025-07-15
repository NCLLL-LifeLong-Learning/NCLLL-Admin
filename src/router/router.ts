import { createRouter, createWebHistory } from "vue-router";
import { getCookie, removeCookie } from "../scripts/cookie/cookie.ts";
import { checkMe } from "../scripts/handler/auth/AuthHandler.ts";
import { useMainStore } from "../stores/useMainStore.ts";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: () => import("@/layouts/Dashboard.vue"),
    redirect: "/resource",
    meta: { title: "Dashboard", auth: true, roles: ["admin", "editor"] },
    children: [
      {
        path: "/event",
        name: "Event",
        component: () => import("../views/event/Event.vue"),
        meta: { title: "Overview", auth: true, roles: ["admin"] },
      },
      {
        path: "/partner",
        name: "Partner",
        component: () => import("../views/partner/Partner.vue"),
        meta: { title: "Partner", auth: true, roles: ["admin"] },
      },
      {
        path: "/resource",
        name: "Resource",
        component: () => import("../views/resource/Resource.vue"),
        meta: { title: "Resource", auth: true, roles: ["admin", "editor"] },
      },
      {
        path: "/overview",
        name: "Overview",
        component: () => import("../views/overview/Overview.vue"),
        meta: { title: "Overview", auth: true, roles: ["admin"] },
      },
      {
        path: "/options",
        name: "Options",
        component: () => import("../views/options/Options.vue"),
        meta: { title: "Options", auth: true, roles: ["admin", "editor"] },
      },
      {
        path: "/modules",
        name: "Modules",
        component: () => import("../views/module/Module.vue"),
        meta: { title: "Modules", auth: true, roles: ["admin", "editor"] },
      },
      {
        path: "/contents",
        name: "Contents",
        component: () => import("../views/news/News.vue"),
        meta: { title: "Contents", auth: true, roles: ["admin", "editor"] },
      },
      {
        path: "/structure",
        name: "Member",
        component: () => import("../views/member/Member.vue"),
        meta: { title: "Member", auth: true, roles: ["admin"] },
      },
      {
        path: "/sglll",
        name: "SGLLL",
        component: () => import("../views/member/sglll/SGLLLTree.vue"),
        meta: { title: "SGLLL", auth: true, roles: ["admin"] },
      },
      {
        path: "/news",
        name: "News",
        component: () => import("@/views/news/News.vue"),
        meta: { title: "News", auth: true, roles: ["admin", "editor"] },
      },
      {
        path: "/ministry",
        name: "Ministry",
        component: () => import("@/views/resource/ministry/Ministry.vue"),
        meta: { title: "Ministry", auth: true, roles: ["admin"] },
      },
      {
        path: "/banner",
        name: "Banner",
        component: () => import("@/views/banner/Banner.vue"),
        meta: { title: "Banner", auth: true, roles: ["admin"] },
      },
      {
        path: "/setting",
        name: "Setting",
        component: () => import("@/views/setting/Setting.vue"),
        meta: { title: "Setting", auth: true, roles: ["admin"] },
      },
      {
        path: "/users",
        name: "Users  ",
        component: () => import("@/views/setting/user/Users.vue"),
        meta: { title: "Users", auth: true, roles: ["admin"] },
      },
    ],
  },
  {
    path: "/module_content",
    name: "ModuleContent",
    component: () => import("@/views/module/module_content/Content.vue"),
    meta: { title: "Module Content", auth: true },
  },
  {
    path: "/content",
    name: "Content",
    component: () => import("@/views/content/Content.vue"),
    meta: { title: "Content", auth: true },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/auth/Login.vue"),
    meta: { title: "Login" },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../views/Error404.vue"),
    meta: { title: "Page Not Found" },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
});

router.beforeEach(async (to, _from, next) => {
  const userToken = getCookie("userToken");
  const userRole = getCookie("userRole");

  if (userToken) {
    if (userRole && userRole !== "" && userRole !== null) {
      const { data } = await checkMe();
      const _useStore = useMainStore();
      if(data && data.name){
        _useStore.$state.user = {
          email: data.email as string,
          name: data.name as string,
          role: {
            id: data.role._id as string,
            name: data.role.name as string,
            code: data.role.code as string,
          },
        };
      }

      if (to.name === "Login") {
        return next({ name: "Dashboard" });
      }

      if (Array.isArray(to.meta.roles)) {
        if (to.meta.roles.includes(_useStore.$state.user.role.code)) {
          return next();
        } else {
          return next({ name: "NotFound" });
        }
      } else {
        return next();
      }
    } else {
      removeCookie("userToken");
      removeCookie("userRole");
      return next({ name: "Login" });
    }
  } else {
    if (to.meta.auth) {
      removeCookie("userToken");
      removeCookie("userRole");
      return next({ name: "Login" });
    } else {
      return next();
    }
  }
});

export default router;
