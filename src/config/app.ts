export const SIDEBAR_EXPAND_WIDTH = 230;
export const SIDEBAR_COLLAPSED_WIDTH = 10;
export const NAV_HEIGHT = 64;
export const NAV_HEIGHT_COLLAPSED = 0;
export const APP_MENU = {
  main: {
    name: "Menu",
    routes: [
      {
        title: "partner",
        icon: "",
        path: "partner",
        permission: ["admin"],
        description: "",
      },
      {
        title: "resource",
        path: "resource",
        icon: "",
        permission: ["admin", "editor"],
        description: "",
      },
      {
        title: "ministry",
        path: "ministry",
        permission: ["admin"],
        icon: "",
        description: "",
      },
      {
        title: "banner",
        path: "banner",
        permission: ["editor", "admin"],
        icon: "",
        description: "",
      },
      {
        title: "modules",
        path: "modules",
        icon: "",
        permission: ["editor", "admin"],
        description: "",
      },
      {
        title: "contents",
        path: "contents",
        icon: "",
        permission: ["editor", "admin"],
        description: "",
      },
      {
        title: "structure",
        path: "structure",
        permission: ["admin"],
        icon: "",
        description: "",
      },
      {
        title: "options",
        path: "options",
        permission: ["admin", "editor"],
        icon: "",
        description: "",
      },
    ],
  },
};

export const globalSearch = {};
