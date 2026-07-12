# FitMart — System Architecture Plan

> **FitMart** is a fitness e-commerce platform for browsing, purchasing, and managing fitness products (equipment, supplements, apparel). This document defines the full architecture before implementation.

---

## 1. High-Level Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         CLIENT (Browser)                                 │
│  React 19 + Vite │ Redux Toolkit │ Material UI │ React Router │ Axios   │
└───────────────────────────────────┬─────────────────────────────────────┘
                                    │ HTTPS / REST (JSON)
                                    │ Authorization: Bearer <JWT>
┌───────────────────────────────────▼─────────────────────────────────────┐
│                    SPRING BOOT API (Port 8080)                           │
│  Controllers → Services → Repositories → MySQL                         │
│  Spring Security + JWT Filter                                            │
└───────────────────────────────────┬─────────────────────────────────────┘
                                    │ JDBC
┌───────────────────────────────────▼─────────────────────────────────────┐
│                         MySQL (fitmart_db)                               │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Domain Model (Core Entities)

| Entity       | Purpose |
|-------------|---------|
| **User**    | Registered customers and admins; credentials and profile |
| **Role**    | `ROLE_USER`, `ROLE_ADMIN` — drives authorization |
| **Category**| Product grouping (e.g. Equipment, Supplements, Apparel) |
| **Product** | Sellable item with price, stock, images, category |
| **Cart**    | Per-user shopping cart with line items |
| **CartItem**| Product + quantity inside a cart |
| **Order**   | Completed purchase with status lifecycle |
| **OrderItem**| Snapshot of product/price/qty at order time |
| **Review**  | User rating and comment on a product |
| **Address** | Shipping/billing addresses linked to user |

---

## 3. API Design (REST)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | Public | Create account |
| POST | `/api/auth/login` | Public | Returns JWT |
| GET | `/api/users/me` | User | Current profile |
| PUT | `/api/users/me` | User | Update profile |
| GET | `/api/products` | Public | List/search products |
| GET | `/api/products/{id}` | Public | Product detail |
| POST | `/api/products` | Admin | Create product |
| PUT | `/api/products/{id}` | Admin | Update product |
| DELETE | `/api/products/{id}` | Admin | Delete product |
| GET | `/api/categories` | Public | List categories |
| GET | `/api/cart` | User | Get cart |
| POST | `/api/cart/items` | User | Add to cart |
| PUT | `/api/cart/items/{id}` | User | Update quantity |
| DELETE | `/api/cart/items/{id}` | User | Remove item |
| POST | `/api/orders` | User | Checkout |
| GET | `/api/orders` | User | Order history |
| GET | `/api/orders/{id}` | User | Order detail |
| GET | `/api/admin/orders` | Admin | All orders |
| PUT | `/api/admin/orders/{id}/status` | Admin | Update status |
| POST | `/api/products/{id}/reviews` | User | Add review |
| GET | `/api/admin/dashboard/stats` | Admin | Sales analytics |

All responses use a consistent envelope:

```json
{
  "success": true,
  "message": "Optional message",
  "data": { }
}
```

Errors return appropriate HTTP status with `success: false` and a message.

---

## 4. Security Flow (JWT)

```
Login Request → AuthController → AuthService validates credentials
    → JwtService generates token → Client stores token (localStorage)
    
Subsequent Request → Axios interceptor adds Authorization header
    → JwtAuthenticationFilter validates token
    → SecurityContext populated → Controller executes
```

**Public routes:** product listing, product detail, categories, register, login  
**User routes:** cart, orders, profile, reviews  
**Admin routes:** product CRUD, order management, dashboard stats

---

## 5. Backend Module Structure

```
backend/src/main/java/com/fitmart/backend/
├── BackendApplication.java      # Spring Boot entry point
├── config/                      # Application configuration beans
├── controller/                  # REST layer (thin — no business logic)
├── dto/
│   ├── request/                 # Incoming payload validation
│   └── response/                # Outgoing shapes + ApiResponse wrapper
├── entity/                      # JPA entities (DB mapping)
├── enums/                       # OrderStatus, Role, etc.
├── exception/                   # Custom exceptions + @ControllerAdvice
├── repository/                  # Spring Data JPA interfaces
├── security/                    # JWT filter, UserDetails, entry points
├── service/                     # Business logic interfaces
│   └── impl/                    # Service implementations
└── util/                        # JwtUtil, mappers, helpers
```

### Module Responsibilities

| Module | Responsibility |
|--------|----------------|
| **config** | `SecurityConfig`, `CorsConfig`, `WebConfig` — wires Spring Security, CORS for frontend origin, password encoder bean |
| **controller** | Maps HTTP to service calls; validates `@Valid` DTOs; returns `ResponseEntity<ApiResponse<T>>` |
| **dto/request** | Register, Login, ProductCreate, CartItemAdd, OrderCreate, ReviewCreate — Jakarta validation annotations |
| **dto/response** | UserResponse, ProductResponse, CartResponse, OrderResponse, AuthResponse (token + user) |
| **entity** | JPA `@Entity` classes with relationships; no API exposure |
| **enums** | Type-safe constants for order status and roles |
| **exception** | `ResourceNotFoundException`, `BadRequestException`, `GlobalExceptionHandler` |
| **repository** | `JpaRepository` + custom queries (search, admin stats) |
| **security** | `JwtAuthenticationFilter`, `CustomUserDetailsService`, `JwtAuthenticationEntryPoint` |
| **service** | Transaction boundaries, business rules (stock check, cart merge, order placement) |
| **service/impl** | Concrete implementations injected into controllers |
| **util** | `JwtUtil` (generate/parse tokens), entity↔DTO mappers if needed |

---

## 6. Frontend Module Structure

```
frontend/src/
├── app/                         # App shell & global state setup
├── assets/                      # Static images, icons, fonts
├── components/
│   ├── common/                  # Reusable dumb components
│   ├── layout/                  # Page chrome (nav, footer)
│   └── features/                # Feature-scoped UI building blocks
├── features/                    # Redux slices (domain state)
├── hooks/                       # Custom React hooks
├── pages/                       # Route-level page components
│   ├── admin/                   # Admin-only pages
│   └── auth/                    # Login, register
├── routes/                      # Router config & guards
├── services/                    # Axios API clients
├── theme/                       # MUI theme & global styles
└── utils/                       # Constants, formatters, token helpers
```

### Module Responsibilities

| Module | Responsibility |
|--------|----------------|
| **app** | Redux `store.js`, `AppProviders.jsx` (Redux + Theme + Router), root `App.jsx` composition |
| **assets** | Product placeholders, logos, hero images |
| **components/common** | `LoadingSpinner`, `ErrorAlert`, `ProductCard`, `SearchBar`, `ProtectedRoute` wrapper UI |
| **components/layout** | `Navbar`, `Footer`, `AdminLayout`, `MainLayout` — responsive MUI AppBar/Drawer |
| **components/features** | `CartDrawer`, `ProductGrid`, `ReviewList`, `CheckoutForm`, `OrderSummary` |
| **features/auth** | `authSlice` — user, token, login/logout/register async thunks |
| **features/products** | `productSlice` — catalog, filters, pagination, selected product |
| **features/cart** | `cartSlice` — items, totals, add/remove/update |
| **features/orders** | `orderSlice` — checkout, order history |
| **features/admin** | `adminSlice` — dashboard stats, product management state |
| **hooks** | `useAuth`, `useCart`, `useDebounce` — encapsulate Redux + side effects |
| **pages** | One component per route; composes layout + feature components |
| **pages/admin** | Dashboard, ProductManagement, OrderManagement |
| **pages/auth** | LoginPage, RegisterPage |
| **routes** | `AppRoutes.jsx`, `PrivateRoute`, `AdminRoute` — role-based access |
| **services** | `api.js` (Axios instance + interceptors), `authService`, `productService`, etc. |
| **theme** | MUI `createTheme` — brand colors, typography, component overrides |
| **utils** | `constants.js` (API URL), `storage.js` (token), `formatCurrency.js` |

---

## 7. Data Flow Examples

### Add to Cart
```
ProductDetailPage → dispatch(addToCart) → cartSlice thunk
  → cartService.addItem() → POST /api/cart/items
  → Backend CartController → CartService (validate stock)
  → CartRepository.save → Response → Redux state updated → Cart badge updates
```

### Checkout
```
CheckoutPage → dispatch(placeOrder) → orderService.checkout()
  → POST /api/orders → OrderService creates Order + OrderItems, clears cart, decrements stock
  → Navigate to OrderConfirmationPage
```

---

## 8. Database Schema (MySQL)

Key tables: `users`, `roles`, `user_roles`, `categories`, `products`, `carts`, `cart_items`, `orders`, `order_items`, `reviews`, `addresses`.

See `docs/database/schema.sql` for the reference DDL (to be applied manually or via JPA `ddl-auto=update` during development).

---

## 9. Cross-Cutting Concerns

| Concern | Backend | Frontend |
|---------|---------|----------|
| Validation | `@Valid` + `@NotBlank`, `@Email`, etc. | Formik + Yup |
| Error handling | `GlobalExceptionHandler` | Axios response interceptor + toast/alert |
| Loading states | N/A | Redux `status: idle \| loading \| succeeded \| failed` |
| Pagination | `Pageable` + Spring Data | MUI Pagination + query params |
| CORS | `CorsConfig` allows `http://localhost:5173` | Vite dev server |
| Responsive UI | N/A | MUI breakpoints, Grid, Drawer for mobile nav |

---

## 10. Implementation Order (Recommended)

1. **Backend:** Security + JWT + User entity + Auth endpoints  
2. **Frontend:** Theme, Router, Auth pages, token storage, protected routes  
3. **Backend:** Category + Product CRUD  
4. **Frontend:** Product listing, detail, search  
5. **Backend:** Cart + Order flow  
6. **Frontend:** Cart drawer, checkout, order history  
7. **Backend:** Reviews + Admin endpoints  
8. **Frontend:** Admin dashboard (Chart.js), product/order management  

---

## 11. Environment & Ports

| Service | URL |
|---------|-----|
| Frontend (Vite) | `http://localhost:5173` |
| Backend API | `http://localhost:8080` |
| MySQL | `localhost:3306/fitmart_db` |

Frontend `.env`:
```
VITE_API_BASE_URL=http://localhost:8080/api
```

---

## 12. Current Project State

- **Backend:** Spring Boot 4 scaffold with JPA, Security, JWT, MySQL configured; only `BackendApplication.java` exists  
- **Frontend:** Vite + React 19 boilerplate; MUI, Redux Toolkit, Axios, React Router installed but not integrated  
- **Next step:** Populate modules per this plan, starting with authentication
