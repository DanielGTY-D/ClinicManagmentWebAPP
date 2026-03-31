# AGENTS.md - Development Guidelines

## Build & Development Commands

```bash
pnpm run dev        # Start development server with HMR (http://localhost:5173)
pnpm run build      # Create production build
pnpm run start      # Run production server
pnpm run typecheck  # Run TypeScript type checking
# Test command not configured - no test framework currently set up
```

**Note:** No test framework is currently configured. The project uses React Router v7 with SSR enabled.

## React Router v7 Specifics

- Uses React Router v7 with Server-Side Rendering (SSR) enabled by default
- Route configuration in `app/routes.ts` using the new routing API
- Route modules export `meta`, `links`, `headers` functions for route-specific data
- Uses `Outlet` for nested routing in layouts
- Error boundaries handled via `ErrorBoundary` component in `root.tsx`
- Data loading with TanStack Query integrated with route loaders
- Forms and mutations handled via React Router's `useActionData` and `useNavigator`

## Code Style Guidelines

### Imports
- Use absolute imports with `~/*` alias for app directory (e.g., `import { api } from "~/API"`)
- Group imports: React/external libs first, then internal imports, then CSS
- Use named exports for components and functions
- Default exports only for main components/hooks

### TypeScript
- Strict mode enabled in tsconfig.json
- Use `interface` for component props and object shapes
- Use `type` aliases for schema-derived types: `export type roleResponse = z.infer<typeof roleResponseSchema>`
- Schema-first approach: define Zod schemas in `~/schemas/`, then infer types in `~/types/`
- All function signatures should have explicit return types

### Naming Conventions
- Components: PascalCase (e.g., `CustomButton`, `MainLayout`)
- Hooks: camelCase with `use` prefix (e.g., `useRoleData`, `useAppStore`)
- Types/Interfaces: PascalCase (e.g., `CustomButtonProps`, `ModalCreateState`)
- Type aliases for API responses: lowercase PascalCase (e.g., `roleResponse`, `rolesType`)
- CSS modules: PascalCase matching component name (e.g., `CustomButton.module.css`)
- Files: match export name (e.g., `CustomButton.tsx`, `useRoleData.ts`)

### Component Structure
```tsx
import { NavLink } from "react-router";
import styles from "./Component.module.css";

export interface ComponentProps {
  prop: type;
}

export default function Component({ prop }: ComponentProps) {
  // implementation
}
```

### Error Handling
- Use try/catch blocks for async operations (API calls)
- Validate API responses with Zod's `safeParse()`
- Throw validation errors: `throw new Error(result.error.message)`
- Re-throw caught errors for React Query error boundaries to handle
- Use error boundaries in React Router for UI errors

### State Management
- Zustand for global state with `create()` and `devtools` middleware
- Slice pattern for store organization (e.g., `ModalCreateSlice`, `NotificationSlice`)
- TanStack Query for server state and data fetching

### API Layer
- Axios instance configured in `~/API/index.ts`
- Custom hooks for API operations (e.g., `useRoleData`)
- Schema validation on all API responses
- Base URL: `http://localhost:5221/api`

### Styling
- TailwindCSS v4 for utility classes
- CSS Modules for component-specific styles
- Combine Tailwind and CSS modules: `<div className={`${styles.container} mx-auto`}>`

### Directory Structure
```
app/
├── API/           # Axios configuration
├── schemas/       # Zod schemas
├── shared/        # Shared code
│   ├── components/
│   ├── hooks/
│   ├── slices/    # Zustand slices
│   ├── stores/    # Zustand stores
│   └── utils/
├── types/         # TypeScript types
├── layouts/       # Layout components
├── routes/        # Route components
├── root.tsx       # Root component with QueryClient
└── routes.ts      # Route configuration
```

### Formatting
- No semicolons (follow existing code style)
- 2-space indentation
- Single quotes for strings
- Trailing commas in multi-line objects/arrays

### Git & Commits
- Conventional commits encouraged
- Descriptive commit messages explaining "why" not just "what"
