# Requirements Document

## Introduction

This feature establishes the technical foundation and visual design system for the Nail Up website — a premium nail extension and nail art studio in Brampton, Ontario, Canada. The deliverable is a working, maintainable Next.js (App Router) application foundation that all subsequent feature specs build upon: a correctly configured project, a scalable architecture, the "Editorial Beauty Experience" design system expressed as reusable tokens, a global application shell (root layout, navigation, footer, CTAs, social shortcuts), engineering-quality guardrails, and minimum testing infrastructure.

This document covers the foundation only. It intentionally excludes feature behaviour that belongs to later specs. The application shell and footer must present only confirmed brand facts and must never fabricate unknown business details (address, hours, prices, durations, artist bio, testimonials); such values must be configurable and flagged "awaiting business confirmation".

### Out of Scope (deferred to their own specs)

- Appointment booking flow and booking rules
- Supabase database implementation, migrations, RLS policies, and runtime data access
- Admin dashboard and admin functionality
- Artwork upload ("Your Art") processing and moderation
- Public page content for `/services`, `/lookbook`, `/love-notes`, `/your-art`, `/about`, `/book`, `/contact`, `/privacy`, `/terms` (the foundation provides routing/shell only; page content arrives in later specs)
- End-to-end (Playwright) test suites (foundation provides unit/integration infrastructure via Vitest only)

## Glossary

- **Foundation**: The scope of this feature — project setup, architecture, design system, application shell, engineering quality guardrails, and test infrastructure.
- **Application_Shell**: The reusable root layout and its supporting structural components (announcement bar, navigation, wordmark, primary CTA, footer, WhatsApp shortcut, Instagram links, page containers).
- **Design_System**: The "Editorial Beauty Experience" token set — colours, typography, spacing, container widths, borders, shadows, radii, button styles, interactive states, and responsive breakpoints — exposed as CSS variables and Tailwind theme tokens.
- **Design_Token**: A single named design value (e.g. a colour, spacing step, radius) defined once and reused, with no hard-coded "magic" values in components.
- **Root_Layout**: The Next.js App Router root `layout` that wraps every public route with the Application_Shell.
- **Server_Component**: A React component rendered on the server by default, with no client-side JavaScript bundle.
- **Client_Component**: A React component marked `"use client"` that runs in the browser, used only where genuine interactivity is required.
- **Business_Config**: A single, typed source of confirmed Nail Up business facts (name, WhatsApp, Instagram, email, booking route, currency, timezone) and brand copy, consumed by the Application_Shell.
- **Unconfirmed_Fact**: A business detail that is unknown until the owner confirms it (street address, hours, prices, durations, artist bio, testimonials); must be configurable and flagged "awaiting business confirmation", never fabricated.
- **Build_System**: The Next.js production build and its associated typecheck, lint, and test tooling.
- **Viewport_Set**: The eight required mobile and desktop testing viewport widths that responsive layouts must be verified against: 375, 390, 430, 768, 1024, 1280, 1440, and 1920 px.
- **CSS_Breakpoint_System**: The mobile-first CSS breakpoint system whose declared breakpoints are 768, 1024, 1280, and 1440 px, with base/mobile styles applying below 768 px and progressive overrides at each declared breakpoint. The 375, 390, and 430 px widths are testing viewports within the Viewport_Set, not separate mandatory CSS breakpoints.

## Requirements

### Requirement 1: Project Initialisation

**User Story:** As a developer, I want a correctly initialised Next.js App Router project with strict TypeScript, Tailwind CSS, linting, and sensible conventions, so that I can build features on a reliable and consistent base.

#### Acceptance Criteria

1. WHEN a developer clones the repository, installs dependencies, and runs the development command on a clean checkout, THE Foundation SHALL complete installation and start the development server without reporting errors.
2. THE Foundation SHALL provide a Next.js project configured with the App Router, React, and TypeScript.
3. THE Foundation SHALL enable TypeScript strict mode in the TypeScript configuration.
4. WHEN the typecheck command is run on a clean project with no source errors, THE Foundation SHALL complete type checking with zero reported type errors.
5. IF the typecheck command encounters one or more type errors, THEN THE Foundation SHALL report each type error and terminate the command with a non-zero result.
6. WHEN the lint command is run on a clean project with no lint violations, THE Foundation SHALL complete linting with zero reported violations.
7. IF the lint command encounters one or more lint violations, THEN THE Foundation SHALL report each violation and terminate the command with a non-zero result.
8. WHERE package versions are selected, THE Foundation SHALL pin exact dependency versions, verified against the latest stable release at install time, with no range specifiers such as `^` or `~` on any dependency entry.
9. THE Foundation SHALL configure Tailwind CSS using the setup supported by the installed Tailwind version so that Tailwind utility classes apply to the rendered output.
10. THE Foundation SHALL configure ESLint for the project.
11. THE Foundation SHALL define TypeScript path aliases that resolve for internal imports.
12. THE Foundation SHALL provide a `.env.example` file containing placeholder environment-variable keys with no real secret values.
13. THE Foundation SHALL provide a `.gitignore` configuration that excludes build artefacts, dependencies, and the `.env` and `.env.local` files from version control while retaining `.env.example`.
14. THE Foundation SHALL provide a README documenting the project purpose, prerequisites, setup steps, and runnable development, build, lint, typecheck, and test commands.
15. THE Foundation SHALL document project-wide conventions, including English Canadian spelling in user-facing copy and the Server-Components-by-default approach.

### Requirement 2: Application Architecture

**User Story:** As a developer, I want an organised and scalable project structure with clear separation of concerns, so that features remain maintainable and responsibilities stay well-defined without unnecessary abstraction.

#### Acceptance Criteria

1. THE Foundation SHALL organise App Router routes under an `app/` directory that contains a `(public)` route group for marketing and booking pages.
2. THE Foundation SHALL provide a `components/` directory for reusable UI components that includes a `ui/` subdirectory for shadcn/ui primitives.
3. THE Foundation SHALL provide a dedicated location for shared layout components.
4. THE Foundation SHALL provide a `lib/` directory that separates data-access modules, Zod validation schemas, and business-logic service modules into distinct subdirectories.
5. THE Foundation SHALL provide a dedicated, separate directory for shared TypeScript type definitions.
6. THE Foundation SHALL provide a `public/` directory for static assets that includes an images subdirectory.
7. THE Foundation SHALL provide a single top-level directory for tests.
8. THE Foundation SHALL include only directories that serve a documented responsibility within the Foundation scope, with no empty, purposeless, or speculative directories.
9. THE Foundation SHALL document, in the README or an architecture note, the intended responsibility of each top-level directory.
10. IF a directory is present in the project but its responsibility is not documented in the README or architecture note, THEN THE Foundation SHALL be treated as non-compliant.
11. THE Foundation SHALL structure the App Router routes so that future admin routes can live outside the `(public)` route group, under their own layout boundary, so that the announcement bar, navigation, and footer do not automatically render within an admin dashboard, while implementing no admin functionality within the Foundation scope.

### Requirement 3: Nail Up Design System

**User Story:** As a developer, I want the "Editorial Beauty Experience" expressed as reusable design tokens, so that every component renders a consistent, premium, editorial visual identity without magic values.

#### Acceptance Criteria

1. THE Design_System SHALL define exactly eight named colour Design_Tokens: warm ivory, milky cream, dusty rose, muted blush, deep espresso, soft plum, champagne, and a chrome/silver highlight.
2. THE Design_System SHALL expose each colour Design_Token as both a CSS variable and a Tailwind theme token that resolve to the same value.
3. THE Design_System SHALL define typography Design_Tokens pairing a serif headline family that is distinct from the sans-serif body family.
4. THE Design_System SHALL define an uppercase editorial label Design_Token that applies an uppercase text transform and positive letter-spacing.
5. THE Design_System SHALL define spacing Design_Tokens as a scale of at least five strictly increasing steps.
6. THE Design_System SHALL define at least one container-width Design_Token for page content.
7. THE Design_System SHALL define at least one border Design_Token, at least one shadow Design_Token, and at least one radius Design_Token.
8. THE Design_System SHALL define a primary button Design_Token and a secondary button Design_Token that are visually distinct from each other.
9. THE Design_System SHALL define interactive-state Design_Tokens for a hover state and a visible keyboard-focus indicator that is distinguishable from both the default state and the hover state.
10. THE Design_System SHALL define responsive-breakpoint Design_Tokens for the CSS_Breakpoint_System values 768, 1024, 1280, and 1440 px, applied mobile-first with base styles below 768 px and progressive overrides at each declared breakpoint, while responsive layouts SHALL be verified across all eight Viewport_Set widths 375, 390, 430, 768, 1024, 1280, 1440, and 1920 px.
11. THE Design_System SHALL permit additional semantic Design_Tokens for success, error, warning, and accessibility/focus states, and these semantic Design_Tokens SHALL NOT count as additional brand palette colours and SHALL NOT alter the rule that the brand palette contains exactly eight colour Design_Tokens.
12. THE Foundation SHALL require a reusable Design_Token for every meaningful design-system value, namely colours, spacing, typography, radii, borders, shadows, and breakpoints.
13. WHERE a CSS value is a necessary structural or primitive value, such as `0`, `100%`, or a basic border width of `1px`, THE Foundation SHALL permit that literal value without creating a Design_Token for it.
14. IF a component uses a meaningful design-system value — a colour, spacing, radius, border, shadow, typography, or breakpoint value — hard-coded as a literal instead of sourced from a Design_Token, THEN THE Foundation SHALL be treated as non-compliant, except for the structural or primitive values permitted in acceptance criterion 13.

### Requirement 4: Global Application Shell

**User Story:** As a site visitor, I want a consistent header, navigation, and footer with easy ways to book and reach Nail Up, so that I can move through the site and contact the studio from any page.

#### Acceptance Criteria

1. THE Application_Shell SHALL provide a Root_Layout that wraps every public route so that the announcement bar, header, navigation, primary call-to-action, and footer are present on each public route, and THE Application_Shell SHALL apply to public routes only and SHALL NOT be automatically applied to future admin routes.
2. THE Application_Shell SHALL render an announcement bar displaying the announcement copy sourced from Business_Config, defaulting to the exact text "Brampton, your next nail obsession starts here. ✦ Book your set."
3. THE Application_Shell SHALL render a Nail Up wordmark that links to the home route `/`.
4. THE Application_Shell SHALL render a navigation component that provides one link to each of the public routes `/`, `/services`, `/lookbook`, `/love-notes`, `/your-art`, `/about`, `/book`, and `/contact`, in that order.
5. THE Application_Shell SHALL indicate which navigation link corresponds to the currently active public route.
6. WHILE the viewport width is below the 768 px CSS_Breakpoint_System value, THE Application_Shell SHALL hide the inline navigation links and render a single visible navigation toggle control that exposes all public-route links when activated.
7. WHILE the viewport width is at or above the 768 px CSS_Breakpoint_System value, THE Application_Shell SHALL render the public-route navigation links inline without requiring a toggle control.
8. THE Application_Shell SHALL render a primary booking call-to-action labelled exactly "BOOK YOUR SET" that links to the booking route `/book`.
9. THE Application_Shell SHALL render a footer containing one link to each public route, including `/privacy` and `/terms`.
10. THE Application_Shell SHALL render a WhatsApp shortcut linking to exactly `https://wa.me/16473347600`, opening in a new browsing context, with an accessible label identifying it as the WhatsApp contact.
11. THE Application_Shell SHALL render an Instagram link to exactly `https://www.instagram.com/nailup_/`, with no query string or tracking parameters appended, opening in a new browsing context, with an accessible label identifying it as the Instagram profile.
12. THE Application_Shell SHALL render the business email `prabhvirdi3011@gmail.com` as a contact link that initiates a message to that address.
13. THE Application_Shell SHALL source all business facts and brand copy (announcement copy, wordmark label, route paths, call-to-action label, WhatsApp URL, Instagram URL, and email) from Business_Config, with no duplicated hard-coded literal of those values in shell components.
14. THE Application_Shell SHALL provide a reusable page-container component that applies the container-width Design_Tokens and sources every width, spacing, and layout value from Design_Tokens rather than hard-coded literals.
15. IF an Unconfirmed_Fact (street address, opening hours, prices, durations, artist bio, or testimonials) would otherwise be displayed anywhere in the Application_Shell, THEN THE Application_Shell SHALL either omit the value entirely or render a placeholder whose visible text contains "awaiting business confirmation", and SHALL NOT display a fabricated substitute value.
16. WHEN any public route referenced by the navigation or footer — `/`, `/services`, `/lookbook`, `/love-notes`, `/your-art`, `/about`, `/book`, `/contact`, `/privacy`, and `/terms` — is requested, THE Foundation SHALL resolve that route to a rendered page without returning a 404 response.
17. WHERE a public route's full functionality is deferred to a later spec, THE Foundation SHALL provide a minimal placeholder page whose visible content clearly indicates that the page is a placeholder or coming soon, without implementing the actual business functionality of that page.

### Requirement 5: Engineering Quality

**User Story:** As a developer, I want enforced engineering-quality conventions around rendering, typing, accessibility, responsiveness, and secrets, so that the foundation is accessible, performant, secure, and consistent.

#### Acceptance Criteria

1. THE Foundation SHALL render components as Server_Components by default.
2. THE Foundation SHALL NOT mark a non-interactive component as a Client_Component.
3. WHERE a component requires genuine browser interactivity, THE Foundation SHALL mark that component as a Client_Component and keep its scope minimal.
4. WHEN the typecheck command is run, THE Foundation SHALL complete with zero reported type errors.
5. IF a value is typed as `any`, THEN THE Foundation SHALL accompany that use with a justifying comment.
6. THE Application_Shell SHALL use exactly one each of the header, navigation, main content region, and footer semantic landmarks.
7. WHEN the Application_Shell is rendered at each of the eight Viewport_Set widths 375, 390, 430, 768, 1024, 1280, 1440, and 1920 px, THE Application_Shell SHALL display without horizontal scrolling and without overlapping or clipped interactive elements.
8. WHILE the user has `prefers-reduced-motion` enabled, THE Foundation SHALL disable all non-essential motion.
9. THE Foundation SHALL expose only genuinely public environment values using the `NEXT_PUBLIC_` prefix.
10. THE Foundation SHALL keep privileged environment values server-side without the `NEXT_PUBLIC_` prefix and SHALL NOT expose them to a Client_Component.
11. THE Foundation SHALL commit only placeholder or example environment values and SHALL NOT commit real secret values to the repository.
12. THE Foundation SHALL apply one consistent, descriptive component and file naming convention across the repository.
13. WHEN a reusable interactive element within the Foundation scope has no content to display, THE Foundation SHALL render an explicit empty state.
14. IF a reusable interactive element within the Foundation scope enters an error state, THEN THE Foundation SHALL render a state that indicates the error while preserving any valid content.
15. THE Application_Shell SHALL provide a visible keyboard focus indicator for each focused interactive element.

### Requirement 6: Testing Infrastructure

**User Story:** As a developer, I want minimum testing and verification infrastructure for the foundation, so that type correctness, lint compliance, basic component/utility behaviour, and production build integrity can be checked repeatedly.

#### Acceptance Criteria

1. WHEN the typecheck command is run on an error-free Foundation, THE Build_System SHALL complete type checking with zero reported type errors and a clean exit.
2. IF the typecheck command encounters one or more type errors, THEN THE Build_System SHALL report each type error and terminate the command unsuccessfully.
3. WHEN the lint command is run on an error-free Foundation, THE Build_System SHALL complete linting with zero reported violations and a clean exit.
4. IF the lint command encounters one or more lint violations, THEN THE Build_System SHALL report each violation and terminate the command unsuccessfully.
5. THE Foundation SHALL configure Vitest as the unit-testing framework.
6. THE Foundation SHALL include at least one initial unit test that passes on the unmodified Foundation.
7. WHERE Vitest is invoked for verification, THE Foundation SHALL support single-execution `--run` mode rather than watch mode.
8. WHEN the production build command is run on an error-free Foundation, THE Build_System SHALL produce a successful production build.
9. IF the production build fails, THEN THE Build_System SHALL report the failure and terminate the command unsuccessfully.
10. WHEN the typecheck, lint, Vitest, and production-build commands are all run on an error-free Foundation, THE Build_System SHALL complete each command without reporting errors.
