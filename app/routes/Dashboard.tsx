import type { Route } from "./+types/Dashboard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Clinic Managment - Dashboard" },
    { name: "description", content: "Clinic Management Dashboard" },
  ];
}

export default function Home() {
}
