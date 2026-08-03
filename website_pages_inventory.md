# Website Pages Inventory

This document inventories the site’s user-facing pages and admin surfaces based on the current route definitions and Filament resource registry.

## 1) Public storefront / SPA pages

| Page path | Component | Primary functionality | Key features / data entry pattern |
|---|---|---|---|
| `/` | `Landing` | Main storefront landing page | Hero section, category exposure, product discovery, CTA blocks, promotional content. |
| `/category/:categorySlug` | `CategoryArchivePage` | Category archive view | Filters products by category slug; list of matching items and category content. |
| `/tag/:tagSlug` | `TagArchivePage` | Tag-based archive page | Lists posts/products tagged with a specific tag; archive of related content. |
| `/tools/gold-prices` | `GoldPrices` | Gold market price lookup page | Price table, chart/market reference, currency selection, related-tool links. |
| `/shop` | `Shop` | Product catalog landing page | Full shopping catalogue entry point with collection/category browsing. |
| `/shop/collection/:slug` | `ShopCollection` | Collection detail page | Dedicated collection landing with curated product grouping. |
| `/shop/category/:slug` | `ShopCategory` | Category product listing | Product list by category slug, category meta and display filters. |
| `/shop/collection/new-arrivals` | `NewArrivals` | New arrivals page | Curated recent-stock / trending products module for storefront. |
| `/about` | `About` | Brand / company story | Overview of business values, history, brand messaging, editorial content. |
| `/contact` | `Contact` | Contact-us page | Contact form with message fields, lead collection, support inquiry capture. |
| `/events` | `EventsPage` | Events listing page | Event filter/search and listing of upcoming events and promos. |
| `/events/:eventSlug` | `EventDetailPage` | Event detail page | Full event details, location, date, description, related content. |
| `/terms` | `Terms` | Terms & conditions | Legal policy page with editorial content. |
| `/privacy` | `Privacy` | Privacy policy | Cookie/privacy content and consent-related policy reference. |
| `/shipping` | `Shipping` | Shipping information page | Delivery policy, shipping methods, checkout guidance. |
| `/jewellery-studio` | `JewelleryStudioPage` | Studio content and design display | Editorial brand story page around studio craftsmanship and design. |
| `/videos` | `JewelleryVideosPage` | Video gallery page | Video content listing and media browsing. |
| `/blog` | `BlogHome` | Blog index page | Blog article listings, categories, latest journal posts. |
| `/blog/:slug` | `BlogPostPage` | Blog post detail | Single article page with post body and content blocks. |
| `/quality` | `Quality` | Quality assurance page | Brand quality promise, craftsmanship standards, materials and workmanship. |
| `/trends` | `Trends` | Trend and style page | Editorial/market trend content and product style context. |
| `/tools` | `Tools` | Tools hub page | Landing page for calculators and utility tools. |
| `/tools/virtual-try-on` | `VirtualTryOnPage` | AR / try-on experience | Customer-driven interactive tool used for visual product fitting ideas. |
| `/shop/advanced-search` | `AdvancedSearchPage` | Advanced storefront search | Search form with query/filter inputs to browse products more precisely. |
| `/tools/carat-converter` | `CaratConverter` | Carat conversion utility | User inputs a carat value and converts it into related units. |
| `/tools/ring-size-converter` | `RingSizeConverter` | Ring-size utility | User enters or selects ring size and converts to standard sizing systems. |
| `/tools/gold-resale-calculator` | `GoldResaleCalculator` | Gold resale pricing calculator | User enters weight, purity, etc. and computes resale valuation. |
| `/tools/diamond-estimator` | `DiamondEstimator` | Diamond value estimator | Inputs for diamond size/parameters and outputs approximate estimator. |
| `/tools/custom-cost-estimator` | `CustomCostEstimator` | Custom jewelry cost estimator | User enters design cost inputs and calculates custom quote. |
| `/tools/zakat-calculator` | `ZakatCalculator` | Zakat calculator | User enters valuation inputs and calculates zakat due. |
| `/tools/care-guide` | `JewelleryCareGuide` | Care and maintenance guide | Static/how-to page for jewelry maintenance and upkeep. |
| `/wonders-of-gold` | `WondersOfGold` | Editorial content page | Educational storytelling page about gold. |
| `/cosmic-origins` | `CosmicOrigins` | Editorial content page | Gold or jewelry origin/education story page. |
| `/modern-technology` | `ModernTechnology` | Editorial content page | Technology and production methods explanation page. |
| `/future-frontiers` | `FutureFrontiers` | Editorial content page | Forward-looking innovation/market page. |
| `/wishlist` | `Wishlist` | Wish list / saved items page | Wishlist for products that users want to revisit or save. |
| `/login` | `Login` | Customer login page | Auth form for email/password login; redirects if already authenticated. |
| `/register` | `Register` | New user registration page | Registration form, account creation flow. |
| `/forgot-password` | `ForgotPassword` | Password recovery page | Recovery request form to reset credentials. |
| `/dashboard` | `Dashboard` | Authenticated user dashboard page | User account overview and dashboard navigation. |
| `*` / fallback | `NotFound` | 404 fallback page | Catch-all page for missing or invalid routes. |

## 2) Authenticated user dashboard area

The dashboard surface is protected through the SPA route wrapper and uses the `DashboardLayout` shell with a sidebar and account-aware navigation.

| Dashboard route | Purpose | Notes |
|---|---|---|
| `/dashboard` | Main authenticated user dashboard entry | Protected route; user account landing view. |

## 3) Filament admin pages (backend admin panel)

The backend admin is built with Filament. These resource pages are not standard SPA routes but are admin CRUD/management surfaces under `/admin`.

| Admin resource | Purpose | Typical actions |
|---|---|---|
| `AffiliateProductResource` | Manage affiliate product catalog entries | List, create, edit, view affiliate-linked products |
| `AiPricingToolResource` | Manage AI pricing tool configurations | Admin CRUD for AI pricing models/tools |
| `AnalyticsDashboardResource` | Analytics dashboard management | Analytics page and dashboard configuration |
| `AuditLogResource` | Audit trail records | Read-only or reviewable change history |
| `CategoryResource` | Blog/shop category management | Manage categories and SEO metadata |
| `ContactSubmissionResource` | Manage contact leads | View and act on incoming contact submissions |
| `ContentPlacementResource` | Manage content placements | Configure where content appears on theme/sections |
| `CookieConsentLogResource` | Review cookie consent logs | Track consent events and visitor preference history |
| `CookieConsentResource` | Consent settings | Manage cookie consent records and admin approvals |
| `CustomJewelryDesignResource` | Track custom design requests | Manage custom jewelry design inquiries |
| `DailyMetalPriceResource` | Daily metal price records | View/admin latest daily metal pricing records |
| `DiamondPricingResource` | Diamond price configuration | Manage diamond price datasets |
| `EventResource` | Event management | Create/edit events and event metadata |
| `GemstonePricingResource` | Manage gemstone pricing data | Admin CRUD for gemstone pricing records |
| `GoldPriceResource` | Gold price data management | Read/maintain tracked gold price records |
| `JewelryHoroscopeResource` | Horoscope-backed jewelry content | Manage horoscope-related content or records |
| `JewelryMatchResource` | Jewelry matching / style scoring records | Review match responses and outcomes |
| `JewelryMaterialResource` | Material definitions | Structure and maintain jewelry material catalog |
| `JewelryStyleQuizResource` | Style quiz management | Ask and manage quiz content / style answers |
| `MarketingAutomationToolResource` | Marketing automation tools/config | Admin setup for marketing tool content |
| `MarketRateResource` | Market rate data management | Admin pricing/rate reference records |
| `OrderResource` | Order management | Review order lifecycle and order details |
| `PostResource` | Blog post management | Create/edit/publish posts |
| `PredictiveAnalyticsToolResource` | Predictive analytics tooling | Admin control for predictive content or pricing tools |
| `SettingResource` | Site settings | Manage configurable app settings |
| `TagResource` | Tag taxonomy management | Create/edit search/filter tags |
| `TrendingLookResource` | Trending looks / style content admin | Manage trending look items |
| `UserResource` | User account administration | Manage staff/customer authorizations and profiles |
| `VideoResource` | Video gallery management | Create/edit/manage video assets |
| `VisitorPreferenceResource` | Visitor preference data | Track and review preference settings |
| `PermissionResource` and `RoleResource` | Roles and permission governance | Manage RBAC access control |

## 4) API-backed data entry patterns observed

These are the main entry/collection patterns used across the site:

- Public forms:
  - Contact inquiry form (`/contact`)
  - Auth forms (`/login`, `/register`, `/forgot-password`)
  - Utility calculators and estimator forms (`/tools/*`)
  - Advanced search filters (`/shop/advanced-search`)
  - User wishlist interactions and saved selection activity
- Read-heavy collection pages:
  - `/shop`, `/blog`, `/events`, `/videos`, `/tools`, category/tag archive pages
- Protected personal surface:
  - `/dashboard` for authenticated user management and account navigation
- Admin surface:
  - Filament-backed CRUD views for product, pricing, content, contact, events, users, and audit resources

## 5) Improvement notes

- The storefront route tree is broad and mostly content-driven; most pages are route-based static or archive pages.
- The calculator and pricing tools are the most data-input-heavy public pages.
- The `Contact` page and `/tools/*` calculators are the most important user-entry surfaces for business value.
- Admin surfaces should be treated as separate management pages rather than normal public website pages.

## 6) Page-by-page functional audit

This section provides a practical audit view across the public site, identifying how a visitor enters data, where the main business risk sits, and which improvements should be prioritized next.

| Page / route | Data entry pattern | Functional notes | Gap / risk | Improvement plan |
|---|---|---|---|---|
| `/` | Mostly CTA-driven browsing; no heavy form submission in the landing shell | Good entry page for brand awareness and discovery | Conversion may stay shallow if no strong lead capture or recommendation modules | Add a stronger lead CTA, featured product blocks, and user-intent recommendations above the fold |
| `/shop` | Browse/catalog navigation; filter/search entry | Core product discovery path | Users can get lost in catalogue depth | Add faceted search, “best sellers” and “recommended for you” sections, and persistent saved-state controls |
| `/shop/collection/:slug` | Route-based collection entry with curated grouping | Good top-of-funnel merchandising page | Might not personalize by visitor history | Add collection-level relevance and cross-link to related articles/events |
| `/shop/category/:slug` | Filtered product list by category | Good product taxonomy surface | Category pages may lack stronger merchandising logic | Add recommended sorting, trending badges, and category-level CTA to contact/quote flows |
| `/shop/collection/new-arrivals` | Listing-based entry for new inventory | Useful discovery and urgency page | Light on personalization | Add “new” context, urgency messaging, and wishlist save persistence |
| `/about` | Mostly editorial read-only content | Brand trust page | Low direct conversion unless paired with CTA | Add a short contact/quote CTA, reviews/trust proof, and a value proposition block |
| `/contact` | Public form submission (`name`, `email`, `subject`, `message`) | Most important lead capture path | Must protect against spam and align backend response contract | Keep honeypot validation, show a stronger success message, and add lead-source metadata |
| `/events` | Event listing and browsing | Traffic builder for cultural/community content | Event page discovery may not lead to booking or follow-up | Add event registration CTA, recurring event reminders, and stronger cross-links to related products |
| `/events/:eventSlug` | Detail page with event content and linked metadata | Content-rich product/brand engagement page | Visitor continuation is not yet globally unified | Record event visits into a shared continuation history and surface them in dashboard recommendations |
| `/blog` | Blog index with editorial routing | Great for SEO and trust-building | Low direct revenue conversion unless surfaced well | Add recommended content blocks and sticky CTA to shop/contact flows |
| `/blog/:slug` | Single article reading path | Good educational content entry | Content engagement is not fully connected to commerce behavior | Record reading history and personalize “continue reading” suggestions on dashboard |
| `/tools` | Tools hub overview | Entry to calculators and utilities | Different tools vary in validation quality | Standardize CTA placement, trust language, and a shared tool discovery layout |
| `/tools/gold-prices` | Market lookups / reference browsing | Informational utility page | Data is useful, but little retention or personalization | Add saved-price watchlists, compare context, and recommendation links |
| `/tools/virtual-try-on` | Interactive visual tooling | High-experience value | Fragile if the experience is not guided | Improve onboarding text, fallback states, and clear next-step CTA |
| `/shop/advanced-search` | Search form + filters + result browsing | Strong discovery and intent signal | Search ranking and result relevance need attention | Continue ranking improvements and surface exact-match product prominence |
| `/tools/carat-converter` | Numeric utility form | Simple utility input | Likely low business impact unless paired with product suggestions | Add contextual product anchor links after conversion results |
| `/tools/ring-size-converter` | Numeric/selection conversion | Useful customer-support utility | May not connect to product purchase intent | Add “find matching ring styles” CTA after conversion |
| `/tools/gold-resale-calculator` | Inputs for weight/purity/market data | High-value quote and trust page | Valid public payload handling must stay stable | Preserve normalization, show assumptions clearly, and add a “contact for best offer” path |
| `/tools/diamond-estimator` | Parameterized estimate flow | Good basket-intent lead surface | May need stronger trust and explanation copy | Improve disclosure notes and a clear next-step action for purchase or consultation |
| `/tools/custom-cost-estimator` | Custom quotation workflow | Strongest lead generation opportunity | Needs clear conversion funnel and error-proofing | Use a guided form, preserve multi-step state, and route into contact or order intent |
| `/tools/zakat-calculator` | Utility form for a specific user segment | Audience-specific and value-adding | Limited reach if not promoted | Add contextual storytelling and product tie-ins for relevant audience segments |
| `/tools/care-guide` | Educational static page | High trust / retention value | Could be better linked to product care offers | Add wishlist or shop CTA blocks and related product suggestions |
| `/wonders-of-gold` | Editorial / educational content | Useful content hub | Could be converted into a stronger merchandising surface | Add related product or event CTA modules |
| `/cosmic-origins` | Story-led editorial page | Brand narrative and trust builder | Mostly static and discovery-only | Add content continuation and newsletter-style CTAs |
| `/modern-technology` | Educational brand proof page | Supports quality and trust | Low commercial action density | Add “see our collections” anchors |
| `/future-frontiers` | Forward-looking editorial page | Brand innovation proof | Underused as a commercial bridge | Add lead or discovery CTAs around innovation stories |
| `/wishlist` | Saved item state / revisit surface | High retention and purchase intent | Persistence must be durable across pages | Keep storage standardized and surface “saved items” in the dashboard and shop UI |
| `/login` | Authentication entry | Access to authenticated surface | UI should be friction-free | Simplify reset/help paths and maintain redirect continuity |
| `/register` | New-customer sign-up entry | Potential conversion lift if smooth | Usually friction-heavy | Improve validation clarity and show value proposition before form completion |
| `/forgot-password` | Recovery entry | Support path | Often overlooked in UX polish | Add clear recovery status messaging and fast path back to login |
| `/dashboard` | Personal account / recommendations hub | Highest retention and personalization value | Needs richer “returning visitor” logic | Use visit history, wishlist state, and content preferences to render actionable recommendations |
| `*` | Not-found / broken-route fallback | Essential safety surface | Too generic | Add branded guidance, quick links to shop/blog/tools, and a “search or contact us” path |

## 7) Recommended optimization order

1. Revenue / lead generation
   - Strengthen `/contact`, `/tools/gold-resale-calculator`, `/tools/custom-cost-estimator`, and `/shop/advanced-search` with clearer trust, proof, and conversion paths.
2. Retention / personalization
   - Standardize persistence across `/wishlist`, `/dashboard`, blog, events, and product interactions.
3. Content continuation
   - Make the “continue where you left off” story consistent between `/blog`, `/events`, and shop product pages.
4. UX polish / completeness
   - Improve not-found guidance, auth handoff, and general consistency across calculators and editorial pages.
