# 💰 Finance Dashboard UI

A modern, responsive **Finance Dashboard** built as part of the Frontend Developer assignment for **Zorvyn**.

This project demonstrates strong fundamentals in **frontend architecture, UI design, state management, and user experience**, with a focus on building a clean and scalable dashboard interface.

---

## 🚀 Live Demo

👉 *[Live link](https://finance-dashboard-kappa-liard.vercel.app/)*

---

## 📌 Objective

The goal of this project is to design and build a **clean, intuitive, and interactive finance dashboard UI** that allows users to:

* View financial summaries
* Explore transactions
* Analyze spending patterns
* Interact with role-based UI behavior

---

## 🧱 Tech Stack

* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS (v3)
* **State Management:** Zustand
* **Charts:** Recharts
* **Animations:** Framer Motion

---

## 🧩 Features

### 📊 Dashboard Overview

* Summary cards:

  * Total Balance
  * Income
  * Expenses
* **Line Chart** → Balance trend over time
* **Pie Chart** → Category-wise spending breakdown

---

### 💳 Transactions Section

* Tabular transaction display with:

  * Date
  * Category
  * Type (Income / Expense)
  * Amount
* Functionalities:

  * 🔍 Search by category
  * 🧮 Filter (All / Income / Expense)
  * ↕️ Sorting (Date / Amount)
* UX Enhancements:

  * Hover states
  * Empty state handling

---

### 🔐 Role-Based UI (Simulated RBAC)

* Toggle between:

  * **Viewer** → Read-only access
  * **Admin** → Can add transactions
* Admin-only features:

  * ➕ Add Transaction modal

---

### 🧠 Insights Section

Basic financial insights derived from data:

* Highest spending category
* Monthly comparison indicators
* Simple spending observations

---

### 🌗 Dark Mode

* Implemented using **next-themes**
* Fully responsive to user toggle
* Consistent styling across components

---

### ✨ UI/UX Enhancements

* Clean spacing and layout hierarchy
* Responsive design (mobile-friendly)
* Smooth transitions using Framer Motion
* Graceful handling of edge cases (empty data)

---

## 🗂️ Project Structure

```
src/
├── app/
│   ├── dashboard/
│   ├── layout.tsx
│   └── providers.tsx
│
├── components/
│   ├── ui/
│   └── charts/
│
├── features/
│   ├── dashboard/
│   └── transactions/
│
├── store/
│   └── useFinanceStore.ts
│
├── lib/
│   └── mockData.ts
│
└── types/
```

---

## ⚙️ State Management

Global state handled using **Zustand**:

* Transactions data
* Filters & search
* Sorting logic
* Role management

This ensures a **clean and scalable state flow** without unnecessary complexity.

---

## 📦 Setup Instructions

```bash
# Clone repo
git clone https://github.com/lalman-dev/finance-dashboard.git

# Install dependencies
npm install

# Run development server
npm run dev
```

---

## 🧪 Assumptions

* Data is mocked (no backend integration required)
* Role-based access is simulated on frontend
* Financial calculations are simplified for demonstration

---

## 🚧 Future Improvements

* Backend integration (API + persistence)
* Authentication system
* Advanced analytics & charts
* Export functionality (CSV/JSON)
* Pagination for large datasets

---

## 🎯 Evaluation Focus (Aligned with Assignment)

This project emphasizes:

* ✔ Clean and intuitive UI design
* ✔ Component-based architecture
* ✔ Proper state management
* ✔ Responsive layout
* ✔ Role-based interaction
* ✔ Thoughtful UX decisions
* ✔ Code clarity and scalability

---

## 🙌 Final Note

This project reflects my approach to:

* Breaking down a problem
* Structuring frontend systems
* Building scalable and maintainable UI
* Paying attention to user experience details

---

**Thank you for the opportunity!**
