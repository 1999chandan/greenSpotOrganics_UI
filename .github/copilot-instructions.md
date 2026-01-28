# Green Spot Organics UI - Copilot Instructions

## Project Overview
React + Redux e-commerce frontend for organic products. Uses Vite (build), React Router (routing), Redux Toolkit (state), Tailwind CSS (styling).

## Architecture Patterns

### 1. Redux State Management
- **Store**: [src/app/store.js](../src/app/store.js) configures Redux with `rootReducer`
- **Slices**: Feature-based slices in `src/features/{feature}/` (e.g., [authSlice.js](../src/features/auth/authSlice.js))
- **Pattern**: Use Redux Toolkit `createSlice()` with separate actions/reducers for async operations (loginStart → loginSuccess/loginFailure)
- **Example**: Auth slice shows standard pattern: loading state, error handling, user data

### 2. Custom Hooks for Redux Integration
- **Location**: [src/hooks/](../src/hooks/)
- **Pattern**: Hooks wrap Redux dispatch/selector logic (see [useAuth.js](../src/hooks/useAuth.js))
- **Usage**: Components import hooks instead of directly accessing Redux
- **Key hooks**: `useAuth`, `useCart`, `useDebounce`

### 3. Routing & Protected Routes
- **Router setup**: [src/routes/AppRoutes.jsx](../src/routes/AppRoutes.jsx) defines all routes
- **Protection**: [ProtectedRoute.jsx](../src/features/auth/ProtectedRoute.jsx) wraps protected pages (Cart, Checkout, Orders, Profile)
- **Guard pattern**: Check `state.auth.isAuthenticated` before allowing access
- **TODO**: Admin routes structure exists but is incomplete

### 4. Service Layer Organization
- **Location**: [src/services/](../src/services/)
- **Pattern**: Separate API service files per feature (authService, orderService, productService, paymentService)
- **Note**: Most services are currently empty stubs; `axiosInstance.js` exists but needs Axios configuration
- **Expected pattern**: Services handle HTTP calls, slices handle state transformation

### 5. Component Hierarchy
- **Common**: [src/components/common/](../src/components/common/) - reusable UI (Button, Input, Modal, Toast, Loader)
- **Layout**: [src/components/layout/](../src/components/layout/) - page structure (Navbar, Sidebar, Footer, HeroSection)
- **Product**: [src/components/product/](../src/components/product/) - product-specific (ProductCard, ProductGrid, ProductBadge, ProductPrice)
- **Styling**: Inline Tailwind classes; see [ProductCard.jsx](../src/components/product/ProductCard.jsx) for example

### 6. Features Directory Structure
Each feature has its own folder with API, slice, and components:
```
features/{feature}/
  ├── {feature}API.js or {feature}Service.js
  ├── {feature}Slice.js
  └── Component files
```
Examples: auth, cart, checkout, orders, products, admin

## Development Workflows

### Build & Run
```bash
npm run dev          # Start Vite dev server (localhost:5173)
npm run build        # Production build → dist/
npm run lint         # ESLint check
npm run preview      # Preview production build
```

### Adding a New Feature
1. Create feature folder in [src/features/](../src/features/){feature}/
2. Create slice with Redux Toolkit in {feature}Slice.js
3. Create API/service file in {feature}Service.js
4. Create custom hook in [src/hooks/](../src/hooks/) if needed
5. Add route in [AppRoutes.jsx](../src/routes/AppRoutes.jsx)
6. Import slice reducer in [rootReducer.js](../src/app/rootReducer.js)

### Adding Components
- **Reusable UI**: Place in [src/components/common/](../src/components/common/)
- **Feature-specific**: Place in feature folder or [src/components/{type}/](../src/components/)
- **Props**: Keep PropTypes/TypeScript for documentation (currently using JSDoc comments)

## Key Files & Patterns

| File | Purpose |
|------|---------|
| [src/App.jsx](../src/App.jsx) | Redux Provider + BrowserRouter wrapper |
| [src/app/store.js](../src/app/store.js) | Redux store with configureStore |
| [src/app/rootReducer.js](../src/app/rootReducer.js) | Combines all feature slices |
| [src/routes/AppRoutes.jsx](../src/routes/AppRoutes.jsx) | Route definitions with ProtectedRoute |
| [src/features/auth/](../src/features/auth/) | Auth state, login flow, ProtectedRoute |

## Current Implementation Status
- **Complete**: Auth framework (slice + ProtectedRoute), routing structure, component hierarchy
- **Stub/Empty**: Most service files, many component implementations, productSlice, admin guards
- **In Progress**: Form validation, payment integration, admin dashboard

## Important Notes
- Tailwind CSS via `@tailwindcss/vite` (v4); no PostCSS config needed
- ESLint configured; no strict TypeScript enforcement (JSX files)
- No unit tests setup (consider adding Vitest + React Testing Library)
- Axios instance prepared but not initialized—complete axiosInstance.js with base URL before making API calls
