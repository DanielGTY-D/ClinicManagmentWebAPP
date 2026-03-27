import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  ...prefix("dashboard", [
    layout("layouts/mainLayout/MainLayout.tsx", [
      index("routes/Dashboard.tsx"),
      route("roles", "routes/Roles.tsx")
    ]),
  ]),
] satisfies RouteConfig;
