# Prop

# Simple Expense Calculator — PRD (Frontend + Backend)

## 1) Summary

Build a minimal expense tracker with a tiny **frontend** and a **backend API**. No auth, no analytics, no exports—just CRUD and basic totals.

## 2) Goals

* Add, edit, delete expenses.
* View list and simple totals for a date range.
* Keep code and UI very small.

### Non-Goals

* Auth, users, roles
* Budgets/charts/exports
* Multi-currency, bank sync, OCR

## 3) Architecture

* **Frontend:** React (Vite) or plain HTML+JS; talks to backend via REST.
* **Backend:** Node.js + Express; **SQLite** (file DB) via a lightweight ORM/Query (e.g., better-sqlite3/knex).
* **Deployment:** Single server; CORS enabled for local dev.

## 4) Data Model

**Expense**

* `id` (uuid)
* `amount` (decimal(12,2), required, >0)
* `category` (string, required; e.g., Food, Transport, Bills, Shopping, Health, Other)
* `date` (ISO date string; defaults to today)
* `note` (string, optional)
* `createdAt`, `updatedAt` (ISO strings)

## 5) API Spec (v1)

Base: `/api/v1`

* `POST /expenses`
  Body: `{ amount, category, date?, note? }` → `201 { expense }`
  Validations: amount>0, category non-empty; date ISO or default today.

* `GET /expenses`
  Query: `start?=YYYY-MM-DD&end?=YYYY-MM-DD&category?=string`
  Returns: `{ items: Expense[], totalCount: number }` (sorted desc by date)

* `GET /expenses/:id` → `{ expense }`

* `PATCH /expenses/:id`
  Body: any of `{ amount, category, date, note }` → `{ expense }`

* `DELETE /expenses/:id` → `204`

* `GET /summary`
  Query: `start&end` (required)
  Returns: `{ total: number, byCategory: { [category]: number } }`

**Errors (JSON)**

* `400 { error: "validation_error", details: {...} }`
* `404 { error: "not_found" }`
* `500 { error: "server_error" }`

## 6) Frontend (MVP)

* **Views**

  * Header with app title.
  * Controls: Date range (Today / This Week / This Month / Custom), Category filter, “Add Expense” button.
  * **Summary Bar:** `Total` and chips by category.
  * **List:** rows with `date • category • note • amount` + edit/delete actions.
  * **Modal (Add/Edit):** amount, category (dropdown), date (picker), note; Save/Cancel.

* **Interactions**

  * Add → POST → refresh list + summary
  * Edit → PATCH → refresh
  * Delete → DELETE → refresh
  * Change range/filter → GET `/expenses` + `/summary`

## 7) Validation Rules

* `amount`: numeric, >0, max 2 decimals
* `category`: non-empty
* `date`: valid ISO (frontend defaults to today)

## 8) Non-Functional

* **Perf:** 1k rows fast (<100ms typical reads).
* **Resilience:** Graceful 500 handler; basic input validation.
* **Security (minimal):** CORS allowlist (dev), limit body size (e.g., 100KB).
* **i18n:** Out of scope.

## 9) Acceptance Criteria (sample)

* Posting `{ amount: 100.5, category: "Food" }` creates a row with today’s date and shows in list top.
* Changing range to “This Month” shows only in-month items and correct total.
* Editing an expense amount updates the summary immediately after PATCH.
* Deleting an expense removes it from list; total decreases accordingly.
* `/summary?start=2025-09-01&end=2025-09-30` returns total and category sums for only that window.

## 10) Release Plan

* **v0.1:** Backend CRUD + summary; simple React UI; date/category filters.
* **v0.2:** Small UX polish (inline edit or keyboard support).
* **Later (optional):** CSV export, charts, auth.

## 11) Open Questions

* Fix currency to one (e.g., “INR”) or store per expense? *(MVP: fixed.)*
* Week start locale? *(MVP: Mon–Sun.)*
