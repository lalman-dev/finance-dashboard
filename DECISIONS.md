# Architecture & Design Decisions

A running log of the non-obvious choices made in this codebase — the kind of things
that aren't obvious from reading the code but matter when someone has to change it.

---

## Type system first

**Decision:** Before touching any feature, expand and harden `src/types/index.ts`.

**Why:** The assignment had `category` typed as a union of four string literals and
those same four strings duplicated in a `<select>` in the modal. Any new category
meant editing both places and hoping you remembered the second. By exporting
`TRANSACTION_CATEGORIES as const`, the runtime dropdown and the TypeScript type derive
from the same source — adding a category is a one-line change.

The same principle applies to `Role`, `FilterType`, `SortField`, `SortOrder` — they
used to be redeclared inside the store file, invisible to the rest of the app. Promoting
them to top-level exports gives autocomplete to every consumer.

---

## Computation goes in `lib/finance.ts`, not in components

**Decision:** All derived calculations (monthly summaries, category totals, budget
status, MoM comparison, savings rate) live in pure functions in `src/lib/finance.ts`.
Components only call these functions and render the result.

**Why:** The original code had income/expense sums computed inline in `SummaryCards`,
hardcoded arrays in both chart components, and duplicate insight logic between
`insights.ts` and the dashboard page. When the data changes (or you add a chart),
you have to hunt for the right place to update.

Pure functions are trivially testable, easy to find, and composable. When the
analytics page needed a monthly bar chart, `getMonthlySummaries()` was already there.

---

## Zustand `persist` with intentional partialisation

**Decision:** Use `persist` middleware but only serialise `transactions` and `budgets`,
not UI state.

**Why:** Persisting everything means that if a bug sets `filter: "expense"` and you
close the tab, you come back to a "broken" state where half your data seems missing.
UI state should always start clean — it's ephemeral intent, not data.

The data layer (transactions, budgets) is the opposite — it absolutely should survive
a refresh, otherwise the app is a toy.

---

## Route-based feature isolation

**Decision:** Each dashboard section gets its own route (`/dashboard/transactions`,
`/dashboard/budgets`, etc.) rather than piling everything onto one scrolling page.

**Why:** Single long scrolling dashboard pages made sense for the assignment scope
(four transactions, two charts). With 30+ transactions, a budgets grid, analytics
charts, and insights, one page becomes cognitively expensive. Route separation gives
users a clear mental model of where things live and makes each section independently
linkable and loadable.

The shared `DashboardShell` layout with `layout.tsx` means the sidebar and header
are rendered once and never flicker during navigation — Next.js's layout system handles
this for free.

---

## Sidebar collapse is local state, not persisted

**Decision:** Sidebar collapsed/expanded state is `useState` in `DashboardShell`, not
in the Zustand store.

**Why:** It's pure UI preference for the current session. Persisting it adds complexity
(hydration mismatch on SSR, localStorage read before first paint) for no real user
benefit. If this ever needed persistence across sessions, it'd be a one-line change —
the right decision is to not optimise prematurely.

---

## Role toggle is a simulation, not auth

**Decision:** The viewer/admin role is a client-side toggle in Zustand, not real
authentication.

**Why:** This is a frontend portfolio project. Wiring up NextAuth or a backend would
obscure the actual frontend work. The role toggle demonstrates the _intent_ of
role-based access control — admin actions (add, edit, delete transactions; manage
budgets) are hidden from viewers — which is the meaningful part for code review.

In a production app this would be a JWT claim decoded server-side, and `role` would
come from session context, not a toggle.

---

## Export respects active filters

**Decision:** The export (PDF/CSV) operates on the currently filtered set, not all
transactions.

**Why:** If a user has searched for "food" and filtered to "expense", they almost
certainly want to export that slice, not the full 200-row dataset. This is the
principle of least surprise — the exported file should match what's on screen.
The `visibleTransactions` variable in `TransactionsSection` makes this explicit.

---

## `formatCurrency` uses `Intl.NumberFormat` with `en-IN` locale

**Decision:** Centralise currency formatting in `lib/finance.ts` rather than
interpolating `₹${amount}` inline.

**Why:** `Intl.NumberFormat` handles lakh/crore grouping (`₹1,23,456` not `₹123,456`),
which matters for Indian users. Inline interpolation gets this wrong silently and is
scattered across the codebase. One function, one place to fix.

---

## Budget status computes against the current calendar month

**Decision:** `getBudgetStatus()` defaults to the current calendar month
(derived from `new Date()`), not a rolling 30-day window.

**Why:** People mentally budget by calendar month — "did I spend too much on food in
April?" not "in the last 30 days". A rolling window would make the progress bar update
continuously as old transactions age out of the window, which would feel unpredictable.
Calendar month resets cleanly on the 1st.

---

## Confirmation dialogs for destructive actions

**Decision:** Reset and clear actions in Settings require an explicit confirmation step.

**Why:** Both actions are irreversible in their current form (no undo stack). A
single misclick without a guard would silently wipe all user data. The cost of the
extra dialog is one extra click on the happy path; the cost of skipping it could be
all your data. Not a hard tradeoff.

---

## Chart theming via `useTheme` + explicit color values

**Decision:** Chart components read `resolvedTheme` from `next-themes` and pass explicit
colour strings to Recharts rather than using CSS variables.

**Why:** Recharts renders to SVG and doesn't participate in the Tailwind/CSS variable
system. Trying to pass `var(--gray-800)` to `stroke` on an SVG element doesn't work
reliably across browsers. Explicit values keyed on `isDark` are verbose but correct
and obvious.

---

## No UI component library

**Decision:** Build components directly with Tailwind rather than pulling in shadcn/ui,
Radix, or Chakra.

**Why:** For a project this size, an external component library adds bundle weight and
introduces a third-party abstraction layer between you and the DOM. Every component
here is small enough that building it takes less time than learning an unfamiliar
component API. The components are also trivially customisable because they're just
Tailwind classes — no CSS-in-JS specificity battles.

If this grew to 20+ pages with complex form requirements, that calculus would change.
