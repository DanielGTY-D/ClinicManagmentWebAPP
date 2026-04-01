import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Clinic Managment - Home" },
    { name: "description", content: "Clinic Management Dashboard" },
  ];
}

export default function Home() {
  return <>Hola home</>
}