import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home/Home.tsx"),

  ...prefix("auth", [
    route("login", "routes/auth/login/Login.tsx"),
    route("register", "routes/auth/register/Register.tsx")
  ]),

  ...prefix("dashboard", [
    layout("layouts/mainLayout/MainLayout.tsx", [
      index("routes/dashboard/Dashboard.tsx"),
      route("roles", "routes/dashboard/roles/Roles.tsx")
    ]),
  ]),
] satisfies RouteConfig;
