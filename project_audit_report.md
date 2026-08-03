# Project Audit Report

## Executive Summary

This repository is a dual-stack commerce platform with a Laravel API/backend and a React/Vite SPA frontend. The backend exposes product, pricing, auth, consent, contact, and analytics endpoints while the frontend renders a public storefront, tools, blog, events, advanced search, and authenticated dashboard experiences.

## Verified Baseline

### Backend evidence

The current Laravel suite already covers the critical product, auth, consent, and pricing service flows. The following verification command was run successfully:

- `Set-Location 'c:\wamp\www\lfjproj\backend'; php artisan test --testsuite=Feature --filter='ProductTest|AuthenticationTest|ConsentApiTest|MaterialPriceControllerTest|PricingEngineTest'`
- Result: 22 tests passed, 192 assertions.

### Frontend evidence

The frontend package declares a Vitest test runner, but it was not installed in the workspace until we enabled it. The runner then reported no test files found, which confirms the missing frontend coverage rather than a runtime failure in the app code.

## Route and Page Audit Table

| Route | Page component | Data entry mechanism | API / data source | Notes |
| --- | --- | --- | --- | --- |
| `/` | `Landing` | No direct form; CTA links and navigation | Static storefront content + product sections | Entry page with marketing content |
| `/category/:categorySlug` | `CategoryArchivePage` | Route parameter only | Category API + product collection | SEO-friendly archive view |
| `/tag/:tagSlug` | `TagArchivePage` | Route parameter only | Tag archive content + posts | Archive view by tag |
| `/tools/gold-prices` | `GoldPrices` | Filter/search interactions in page UI | `tools/gold-price`, `tools/gold-historical` | Tool page for live metal pricing |
| `/shop` | `Shop` | Filter/navigation actions | Product service and category service | Main shop browsing entry |
| `/shop/collection/:slug` | `ShopCollection` | Route parameter only | Product collection content | Collection-focused merchandising |
| `/shop/category/:slug` | `ShopCategory` | Route parameter only | Category-specific data | Category landing page |
| `/shop/collection/new-arrivals` | `NewArrivals` | Link-based selection | Shop product feed | New arrival collection |
| `/about` | `About` | Static content | No form submission | Corporate content page |
| `/contact` | `Contact` | `react-hook-form` + `zod` form: `name`, `email`, `subject`, `message` | `POST /api/contact-submissions` | Primary public contact form |
| `/events` | `EventsPage` | Query string and filters | Event service + pagination | Event discovery page |
| `/events/:eventSlug` | `EventDetailPage` | Route parameter only | Event details endpoint | Detailed event content |
| `/terms` | `Terms` | Static content | None | Policy page |
| `/privacy` | `Privacy` | Static content | Consent integration | Privacy and cookie guidance |
| `/shipping` | `Shipping` | Static content | None | Shipping policy page |
| `/jewellery-studio` | `JewelleryStudioPage` | Multi-image upload and try-on workflow | Local upload + studio service | Studio experience with image inputs |
| `/videos` | `JewelleryVideosPage` | Search/query params | Video service | Video discovery page |
| `/blog` | `BlogHome` | Query params and filter state | Blog service | Feed/list page |
| `/blog/:slug` | `BlogPost` | Route parameter only | Post detail endpoint | Article page |
| `/quality` | `Quality` | Static content | No form | Brand-quality explanation |
| `/trends` | `Trends` | Static content / cards | Content rails | Trend editorial page |
| `/tools` | `Tools` | Link-driven navigation | Tool catalog | Tool index page |
| `/tools/virtual-try-on` | `VirtualTryOn` | Camera / file upload and `WebcamCapture` UX | Local camera preview + studio service | Interactive try-on screen |
| `/shop/advanced-search` | `AdvancedSearchPage` | Search query + advanced filters | `GET /api/search/advanced`, suggestions endpoint | Search-heavy product discovery |
| `/tools/carat-converter` | `CaratConverter` | Input field numeric conversion | Client-side calculator | Utility page |
| `/tools/ring-size-converter` | `RingSizeConverter` | Numeric input + conversion | Client-side calculator | Utility page |
| `/tools/gold-resale-calculator` | `GoldResaleCalculator` | Numeric live inputs | Client-side pricing flow | Resale estimator |
| `/tools/diamond-estimator` | `DiamondEstimator` | Numeric slider/input form | Client-side estimator | Diamond value calculator |
| `/tools/custom-cost-estimator` | `CustomCostEstimator` | Multiple numeric inputs | Client-side estimator | Custom product pricing estimator |
| `/tools/zakat-calculator` | `ZakatCalculator` | Numeric form inputs | Pricing API + client-side math | Religious tax utility |
| `/tools/care-guide` | `JewelleryCareGuide` | Static content | None | Care guidance page |
| `/wonders-of-gold` | `WondersOfGold` | Static editorial content | None | Story/education page |
| `/cosmic-origins` | `CosmicOrigins` | Static editorial content | None | Story/education page |
| `/modern-technology` | `ModernTechnology` | Static editorial content | None | Story/education page |
| `/future-frontiers` | `FutureFrontiers` | Static editorial content | None | Story/education page |
| `/wishlist` | `Wishlist` | State-based additions/removals | Local storage / wishlist hook | Saved items page |
| `/login` | `Login` | `react-hook-form` + `zod`; email, password, remember me | `POST /api/login` | Auth entry page |
| `/register` | `Register` | `react-hook-form` + `zod`; name, email, password, confirmation | `POST /api/register` | User sign-up |
| `/forgot-password` | `ForgotPassword` | Email field | `POST /api/forgot-password` | Password reset request |
| `/dashboard` | `Dashboard` | Authenticated session; no direct creation form | Auth user + analytics hooks | Protected dashboard |

## Improvement Plan

1. Add frontend test execution to the repo by installing the declared `vitest` dependency and keeping the test folder in source control.
2. Add route-level smoke checks for the public pages using Playwright or Vitest + React Testing Library to catch broken navigation and fatal render states.
3. Expand backend API coverage for critical flows such as `pricing/metal`, `search/advanced`, `visitor preferences`, and role-based dashboard redirects.
4. Normalize SPA utility validation so form rules stay centralized and reusable across all pages.
5. Reduce client-side fragile patterns: avoid hardcoded chart values in the dashboard and replace them with API-backed analytics data.
6. Add a consistent error boundary and loading skeleton strategy on pages that fetch data from network calls.
7. Review the mixed use of `window.location.assign` and `navigate` for auth redirect behavior to ensure all user roles follow a single policy.

## Summary

The backend is comparatively stronger in coverage than the frontend. The most impactful productive step is to codify frontend form and route utility coverage, then gradually add route-level and page-level smoke tests to cover the richer public catalog and tools experience.
