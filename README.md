# FinanceOS

A production-grade personal finance dashboard built with Next.js, TypeScript, and Tailwind CSS. Track income and expenses, manage monthly budgets, visualize spending trends, and export reports — all with a clean role-aware interface that works across light and dark themes.

**Live demo:** [finance-dashboard-kappa-liard.vercel.app](https://finance-dashboard-kappa-liard.vercel.app/)

---

## Features

**Overview**

- Summary cards showing net balance, income, expenses, and savings rate — each with month-over-month trend indicators
- Balance trend line chart (income / expenses / net balance over time)
- Spending breakdown donut chart by category
- Smart insights panel: savings rate health, top expense category, MoM change alerts

**Transactions**

- Full transaction log with search, filter (all / income / expense), and sort (date, amount, category)
- Add, edit, and delete transactions (admin role)
- Notes and recurring transaction flags
- Paginated at 10 rows — handles large datasets without layout collapse
- Export visible transactions as PDF or CSV

**Budgets**

- Per-category monthly budget limits
- Animated progress bars — green below 80%, amber approaching limit, red when over
- Overspend summary at a glance
- Admin can add, edit, and delete budgets

**Analytics**

- Monthly income vs expense bar chart
- Category breakdown with relative percentage bars
- Month-by-month summary table (income, expenses, net saved)

**Settings**

- Data summary (transaction count, budget count, storage layer)
- Admin-only: reset to sample data or clear all data, both gated behind a confirmation step

**General**

- Collapsible sidebar with animated transitions and active route highlighting
- Light / dark theme via `next-themes`
- Viewer / admin role toggle (simulated RBAC — see [DECISIONS.md](./DECISIONS.md))
- Data persisted to `localStorage` across sessions

---

## Tech Stack

| Layer      | Choice                            |
| ---------- | --------------------------------- |
| Framework  | Next.js 16 (App Router)           |
| Language   | TypeScript                        |
| Styling    | Tailwind CSS v3                   |
| State      | Zustand with `persist` middleware |
| Charts     | Recharts                          |
| Animations | Framer Motion                     |
| Icons      | Lucide React                      |
| PDF Export | jsPDF + jspdf-autotable           |

---

## Project Structure

```
src/
├── app/
│   └── dashboard/
│       ├── analytics/
│       ├── budgets/
│       ├── settings/
│       ├── transactions/
│       ├── layout.tsx       # DashboardShell wrapper
│       └── page.tsx         # Overview
│
├── components/
│   ├── charts/              # BalanceLineChart, SpendingPieChart
│   ├── layout/              # DashboardShell, Sidebar, Header
│   └── ui/                  # Card, ThemeToggle, RoleToggle
│
├── features/
│   ├── analytics/
│   ├── budgets/
│   ├── dashboard/           # SummaryCards, ChartsSection, InsightsPanel
│   ├── settings/
│   └── transactions/        # TransactionsTable, AddTransactionModal, Filters
│
├── lib/
│   ├── finance.ts           # Pure computation helpers
│   ├── insights.ts          # Derived insight generation
│   ├── mockData.ts          # Seed data (3 months, 30 transactions)
│   ├── exportCsv.ts
│   └── exportPdf.ts
│
├── store/
│   └── useFinanceStore.ts   # Zustand store with persist
│
└── types/
    └── index.ts             # Domain types and constants
```

---

## Getting Started

```bash
git clone https://github.com/lalman-dev/finance-dashboard.git
cd finance-dashboard
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app redirects to `/dashboard` by default.

To explore admin features (add/edit/delete transactions, manage budgets, clear data), toggle the role switch in the top-right corner to **Admin**.

---

## Architecture Notes

Non-obvious decisions — why the store only persists data and not UI state, why budgets compute against calendar month rather than a rolling window, why there's no component library — are documented in [DECISIONS.md](./DECISIONS.md).
