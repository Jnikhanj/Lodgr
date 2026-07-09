const STORAGE_KEY = "lodgr.v2.state";

const categories = ["All", "Education", "Equipment", "Subscription", "Registration", "Travel", "Uniform", "Other"];

const categoryStyle = {
  Education: ["blue", "workspaces"],
  Equipment: ["purple", "attach_file"],
  Subscription: ["green", "bolt"],
  Registration: ["amber", "shield"],
  Travel: ["rose", "swap_horiz"],
  Uniform: ["dark-orb", "workspaces"],
  Other: ["dark-orb", "folder"],
};

const initialState = {
  activeProfileId: "p1",
  activeCategory: "All",
  search: "",
  taxInputs: {
    grossIncome: 85000,
    taxWithheld: 18500,
    otherIncome: 0,
    includeMedicare: true,
  },
  profiles: [
    { id: "p1", name: "Jashan", preset: "Nurse / aged care" },
    { id: "p2", name: "Wife", preset: "General employee" },
  ],
  expenses: [
    {
      id: cryptoRandomId(),
      profileId: "p1",
      date: "2026-07-08",
      merchant: "Ausmed",
      category: "Education",
      amount: 200,
      workUse: 100,
      receiptName: "invoice.pdf",
      notes: "CPD subscription related to current role.",
      createdAt: Date.now() - 86400000 * 4,
    },
    {
      id: cryptoRandomId(),
      profileId: "p1",
      date: "2026-07-06",
      merchant: "NuPhy Keyboard",
      category: "Equipment",
      amount: 212,
      workUse: 80,
      receiptName: "upbank.png",
      notes: "Apportioned for work documentation and emails.",
      createdAt: Date.now() - 86400000 * 2,
    },
    {
      id: cryptoRandomId(),
      profileId: "p1",
      date: "2026-07-03",
      merchant: "ChatGPT",
      category: "Subscription",
      amount: 33,
      workUse: 60,
      receiptName: "",
      notes: "Work-use estimate required.",
      createdAt: Date.now() - 86400000,
    },
    {
      id: cryptoRandomId(),
      profileId: "p2",
      date: "2026-07-02",
      merchant: "Officeworks",
      category: "Equipment",
      amount: 49.95,
      workUse: 70,
      receiptName: "receipt.jpg",
      notes: "Stationery used for work records.",
      createdAt: Date.now() - 86400000 * 3,
    },
  ],
};

let state = loadState();

const els = {
  appShell: document.querySelector(".app-shell"),
  screens: [...document.querySelectorAll(".screen")],
  tabs: [...document.querySelectorAll(".tab")],
  jumpers: [...document.querySelectorAll("[data-jump]")],
  expenseSheet: document.getElementById("expenseSheet"),
  expenseForm: document.getElementById("expenseForm"),
  expenseProfile: document.getElementById("expenseProfile"),
  expenseDate: document.getElementById("expenseDate"),
  profileSheet: document.getElementById("profileSheet"),
  profileForm: document.getElementById("profileForm"),
  profileCarousel: document.getElementById("profileCarousel"),
  profileList: document.getElementById("profileList"),
  profileCount: document.getElementById("profileCount"),
  homeExpenseFeed: document.getElementById("homeExpenseFeed"),
  logExpenseFeed: document.getElementById("logExpenseFeed"),
  logCount: document.getElementById("logCount"),
  categoryChips: document.getElementById("categoryChips"),
  searchInput: document.getElementById("searchInput"),
  activeProfileLabel: document.getElementById("activeProfileLabel"),
  homeOutcome: document.getElementById("homeOutcome"),
  homeOutcomeCopy: document.getElementById("homeOutcomeCopy"),
  homeDeductions: document.getElementById("homeDeductions"),
  homeReceiptRatio: document.getElementById("homeReceiptRatio"),
  homeReviewCount: document.getElementById("homeReviewCount"),
  grossIncome: document.getElementById("grossIncome"),
  taxWithheld: document.getElementById("taxWithheld"),
  otherIncome: document.getElementById("otherIncome"),
  includeMedicare: document.getElementById("includeMedicare"),
  taxOutcome: document.getElementById("taxOutcome"),
  taxOutcomeBadge: document.getElementById("taxOutcomeBadge"),
  taxOutcomeHint: document.getElementById("taxOutcomeHint"),
  calcIncome: document.getElementById("calcIncome"),
  calcDeductions: document.getElementById("calcDeductions"),
  calcTaxable: document.getElementById("calcTaxable"),
  calcTaxBeforeOffsets: document.getElementById("calcTaxBeforeOffsets"),
  calcLito: document.getElementById("calcLito"),
  calcMedicare: document.getElementById("calcMedicare"),
  calcFinalTax: document.getElementById("calcFinalTax"),
  toast: document.getElementById("toast"),
};

boot();

function boot() {
  bindEvents();
  renderAll();
  registerServiceWorker();
}

function bindEvents() {
  els.tabs.forEach((tab) => tab.addEventListener("click", () => showScreen(tab.dataset.tab)));
  els.jumpers.forEach((button) => button.addEventListener("click", () => showScreen(button.dataset.jump)));

  document.querySelectorAll("[data-open-expense]").forEach((button) => {
    button.addEventListener("click", () => openExpenseSheet());
  });
  document.querySelectorAll("[data-close-expense]").forEach((button) => {
    button.addEventListener("click", closeExpenseSheet);
  });
  els.expenseSheet.addEventListener("click", (event) => {
    if (event.target === els.expenseSheet) closeExpenseSheet();
  });

  document.querySelectorAll("[data-add-profile]").forEach((button) => {
    button.addEventListener("click", openProfileSheet);
  });
  document.querySelectorAll("[data-close-profile]").forEach((button) => {
    button.addEventListener("click", closeProfileSheet);
  });
  els.profileSheet.addEventListener("click", (event) => {
    if (event.target === els.profileSheet) closeProfileSheet();
  });

  els.expenseForm.addEventListener("submit", handleExpenseSubmit);
  els.profileForm.addEventListener("submit", handleProfileSubmit);

  [els.grossIncome, els.taxWithheld, els.otherIncome, els.includeMedicare].forEach((input) => {
    input.addEventListener("input", () => {
      state.taxInputs = {
        grossIncome: toNumber(els.grossIncome.value),
        taxWithheld: toNumber(els.taxWithheld.value),
        otherIncome: toNumber(els.otherIncome.value),
        includeMedicare: els.includeMedicare.checked,
      };
      persist();
      renderTax();
      renderHomeStats();
    });
  });

  els.searchInput.addEventListener("input", () => {
    state.search = els.searchInput.value.trim();
    renderExpenseFeeds();
  });

  document.querySelectorAll("[data-export-csv]").forEach((button) => button.addEventListener("click", exportCsv));

  document.getElementById("resetDemo").addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    state = structuredCloneSafe(initialState);
    persist();
    renderAll();
    toast("Demo data reset");
  });
}

function showScreen(name) {
  els.screens.forEach((screen) => screen.classList.toggle("is-active", screen.dataset.screen === name));
  els.tabs.forEach((tab) => tab.classList.toggle("is-active", tab.dataset.tab === name));
  els.appShell.classList.toggle("show-fab", name === "log");
}

function openExpenseSheet() {
  renderProfileOptions();
  els.expenseForm.reset();
  els.expenseProfile.value = state.activeProfileId;
  els.expenseDate.value = new Date().toISOString().slice(0, 10);
  els.expenseSheet.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeExpenseSheet() {
  els.expenseSheet.hidden = true;
  document.body.style.overflow = "";
}

function openProfileSheet() {
  els.profileForm.reset();
  els.profileSheet.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeProfileSheet() {
  els.profileSheet.hidden = true;
  document.body.style.overflow = "";
}

function handleExpenseSubmit(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const receipt = form.get("receipt");
  const expense = {
    id: cryptoRandomId(),
    profileId: form.get("profileId"),
    date: form.get("date"),
    merchant: String(form.get("merchant") || "").trim(),
    category: form.get("category"),
    amount: toNumber(form.get("amount")),
    workUse: clamp(toNumber(form.get("workUse")), 0, 100),
    receiptName: receipt && receipt.name ? receipt.name : "",
    notes: String(form.get("notes") || "").trim(),
    createdAt: Date.now(),
  };

  state.expenses.unshift(expense);
  persist();
  closeExpenseSheet();
  renderAll();
  toast("Claim saved to Lodgr");
}

function handleProfileSubmit(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const profile = {
    id: cryptoRandomId(),
    name: String(form.get("name") || "").trim(),
    preset: form.get("preset"),
  };
  if (!profile.name) return;
  state.profiles.push(profile);
  state.activeProfileId = profile.id;
  persist();
  closeProfileSheet();
  renderAll();
  toast("Profile created");
}

function renderAll() {
  syncTaxInputs();
  renderCategoryChips();
  renderProfiles();
  renderProfileOptions();
  renderExpenseFeeds();
  renderTax();
  renderHomeStats();
}

function renderProfiles() {
  const profiles = state.profiles;
  els.profileCount.textContent = profiles.length;

  els.profileCarousel.innerHTML = profiles.map((profile) => {
    const totals = profileTotals(profile.id);
    return `
      <button class="profile-pill ${profile.id === state.activeProfileId ? "is-active" : ""}" type="button" data-profile-id="${escapeHtml(profile.id)}">
        <span class="avatar">${initials(profile.name)}</span>
        <strong>${escapeHtml(profile.name)}</strong>
        <small>${money(totals.claimable, 0)} logged</small>
      </button>
    `;
  }).join("");

  els.profileList.innerHTML = profiles.map((profile) => {
    const totals = profileTotals(profile.id);
    return `
      <button class="profile-row profile-pill-wide" type="button" data-profile-id="${escapeHtml(profile.id)}">
        <span class="avatar">${initials(profile.name)}</span>
        <span><strong>${escapeHtml(profile.name)}</strong><small>${escapeHtml(profile.preset)} · ${money(totals.claimable)} deductions</small></span>
        <span class="material-symbols-rounded">arrow_forward</span>
      </button>
    `;
  }).join("");

  [...document.querySelectorAll("[data-profile-id]")].forEach((button) => {
    button.addEventListener("click", () => {
      state.activeProfileId = button.dataset.profileId;
      persist();
      renderAll();
      toast(`Switched to ${activeProfile().name}`);
    });
  });
}

function renderProfileOptions() {
  els.expenseProfile.innerHTML = state.profiles.map((profile) => {
    return `<option value="${escapeHtml(profile.id)}">${escapeHtml(profile.name)}</option>`;
  }).join("");
}

function renderCategoryChips() {
  els.categoryChips.innerHTML = categories.map((category) => {
    return `<button type="button" class="category-chip ${category === state.activeCategory ? "is-active" : ""}" data-category="${category}">${category}</button>`;
  }).join("");

  [...els.categoryChips.querySelectorAll("button")].forEach((chip) => {
    chip.addEventListener("click", () => {
      state.activeCategory = chip.dataset.category;
      persist();
      renderCategoryChips();
      renderExpenseFeeds();
    });
  });
}

function renderExpenseFeeds() {
  const allForActive = state.expenses
    .filter((expense) => expense.profileId === state.activeProfileId)
    .sort((a, b) => new Date(b.date) - new Date(a.date) || b.createdAt - a.createdAt);

  const filtered = allForActive.filter((expense) => {
    const matchesCategory = state.activeCategory === "All" || expense.category === state.activeCategory;
    const haystack = `${expense.merchant} ${expense.category} ${expense.notes}`.toLowerCase();
    const matchesSearch = !state.search || haystack.includes(state.search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  els.homeExpenseFeed.innerHTML = renderExpenseRows(allForActive.slice(0, 4));
  els.logExpenseFeed.innerHTML = renderExpenseRows(filtered, true);
  els.logCount.textContent = filtered.length;
}

function renderExpenseRows(expenses, showEmpty = false) {
  if (!expenses.length) {
    return `
      <div class="empty-state">
        <div>
          <span class="icon-orb blue"><span class="material-symbols-rounded">receipt_long</span></span>
          <strong>No claims yet</strong>
          <p>Add an expense and Lodgr will calculate the claimable amount.</p>
        </div>
      </div>
    `;
  }

  return expenses.map((expense) => {
    const [colour, icon] = categoryStyle[expense.category] || categoryStyle.Other;
    const claimable = claimableAmount(expense);
    const status = evidenceStatus(expense);
    return `
      <article class="expense-row">
        <span class="icon-orb mini ${colour}"><span class="material-symbols-rounded">${icon}</span></span>
        <div class="expense-main">
          <strong>${escapeHtml(expense.merchant)}</strong>
          <small>${escapeHtml(expense.category)} · ${formatDate(expense.date)} · ${expense.workUse}% work use</small>
        </div>
        <div class="amount-block">
          <strong>${money(claimable)}</strong>
          <small><span class="tiny-dot ${status.className}"></span>${status.label}</small>
        </div>
      </article>
    `;
  }).join("");
}

function renderHomeStats() {
  const profile = activeProfile();
  const totals = profileTotals(profile.id);
  const estimate = calculateEstimate();

  els.activeProfileLabel.textContent = profile.name;
  els.homeDeductions.textContent = money(totals.claimable, 0);
  els.homeReceiptRatio.textContent = `${totals.withReceipts}/${totals.count}`;
  els.homeReviewCount.textContent = totals.needsReview;

  if (estimate.outcome >= 0) {
    els.homeOutcome.textContent = money(estimate.outcome, 0);
    els.homeOutcomeCopy.textContent = "Potential refund based on current inputs and logged deductions.";
  } else {
    els.homeOutcome.textContent = money(Math.abs(estimate.outcome), 0);
    els.homeOutcomeCopy.textContent = "Estimated amount payable based on current inputs.";
  }
}

function syncTaxInputs() {
  els.grossIncome.value = state.taxInputs.grossIncome || "";
  els.taxWithheld.value = state.taxInputs.taxWithheld || "";
  els.otherIncome.value = state.taxInputs.otherIncome || "";
  els.includeMedicare.checked = Boolean(state.taxInputs.includeMedicare);
  els.searchInput.value = state.search || "";
}

function renderTax() {
  const result = calculateEstimate();
  const outcomeIsRefund = result.outcome >= 0;

  els.taxOutcome.textContent = money(Math.abs(result.outcome), 0);
  els.taxOutcomeBadge.textContent = outcomeIsRefund ? "Refund" : "Payable";
  els.taxOutcomeHint.textContent = outcomeIsRefund
    ? "This is the amount PAYG withheld may exceed estimated final tax."
    : "This is the amount estimated final tax may exceed PAYG withheld.";

  els.calcIncome.textContent = money(result.totalIncome);
  els.calcDeductions.textContent = money(result.deductions);
  els.calcTaxable.textContent = money(result.taxableIncome);
  els.calcTaxBeforeOffsets.textContent = money(result.taxBeforeOffsets);
  els.calcLito.textContent = money(result.lito);
  els.calcMedicare.textContent = money(result.medicare);
  els.calcFinalTax.textContent = money(result.finalTax);
}

function calculateEstimate() {
  const gross = toNumber(state.taxInputs.grossIncome);
  const withheld = toNumber(state.taxInputs.taxWithheld);
  const other = toNumber(state.taxInputs.otherIncome);
  const deductions = profileTotals(state.activeProfileId).claimable;
  const totalIncome = gross + other;
  const taxableIncome = Math.max(0, totalIncome - deductions);
  const taxBeforeOffsets = residentTax2025(taxableIncome);
  const lito = lowIncomeTaxOffset(taxableIncome);
  const medicare = state.taxInputs.includeMedicare ? taxableIncome * 0.02 : 0;
  const finalTax = Math.max(0, taxBeforeOffsets - lito) + medicare;
  return {
    totalIncome,
    deductions,
    taxableIncome,
    taxBeforeOffsets,
    lito,
    medicare,
    finalTax,
    outcome: withheld - finalTax,
  };
}

function residentTax2025(income) {
  if (income <= 18200) return 0;
  if (income <= 45000) return (income - 18200) * 0.16;
  if (income <= 135000) return 4288 + (income - 45000) * 0.30;
  if (income <= 190000) return 31288 + (income - 135000) * 0.37;
  return 51638 + (income - 190000) * 0.45;
}

function lowIncomeTaxOffset(income) {
  if (income <= 37500) return Math.min(700, residentTax2025(income));
  if (income <= 45000) return Math.max(0, 700 - (income - 37500) * 0.05);
  if (income <= 66667) return Math.max(0, 325 - (income - 45000) * 0.015);
  return 0;
}

function profileTotals(profileId) {
  const expenses = state.expenses.filter((expense) => expense.profileId === profileId);
  return expenses.reduce((acc, expense) => {
    acc.count += 1;
    acc.claimable += claimableAmount(expense);
    if (expense.receiptName) acc.withReceipts += 1;
    if (evidenceStatus(expense).label !== "Strong") acc.needsReview += 1;
    return acc;
  }, { count: 0, claimable: 0, withReceipts: 0, needsReview: 0 });
}

function evidenceStatus(expense) {
  if (!expense.receiptName) return { label: "Review", className: "amber" };
  if (expense.workUse < 100 || ["Subscription", "Equipment", "Other"].includes(expense.category)) {
    return { label: "Review", className: "amber" };
  }
  return { label: "Strong", className: "green" };
}

function claimableAmount(expense) {
  return toNumber(expense.amount) * clamp(toNumber(expense.workUse), 0, 100) / 100;
}

function exportCsv() {
  const active = activeProfile();
  const rows = state.expenses
    .filter((expense) => expense.profileId === state.activeProfileId)
    .map((expense) => ({
      profile: active.name,
      date: expense.date,
      merchant: expense.merchant,
      category: expense.category,
      amount: fixed(expense.amount),
      work_use_percent: expense.workUse,
      claimable_amount: fixed(claimableAmount(expense)),
      receipt: expense.receiptName ? "Yes" : "No",
      receipt_name: expense.receiptName,
      notes: expense.notes,
    }));

  if (!rows.length) {
    toast("No expenses to export");
    return;
  }

  const headers = Object.keys(rows[0]);
  const csv = [headers.join(","), ...rows.map((row) => headers.map((header) => csvEscape(row[header])).join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `lodgr-${slug(active.name)}-expenses.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  toast("CSV exported");
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredCloneSafe(initialState);
    const parsed = JSON.parse(raw);
    return {
      ...structuredCloneSafe(initialState),
      ...parsed,
      taxInputs: { ...initialState.taxInputs, ...(parsed.taxInputs || {}) },
      profiles: Array.isArray(parsed.profiles) && parsed.profiles.length ? parsed.profiles : structuredCloneSafe(initialState.profiles),
      expenses: Array.isArray(parsed.expenses) ? parsed.expenses : [],
    };
  } catch {
    return structuredCloneSafe(initialState);
  }
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function activeProfile() {
  return state.profiles.find((profile) => profile.id === state.activeProfileId) || state.profiles[0];
}

function money(value, decimals = 2) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(toNumber(value));
}

function formatDate(dateString) {
  if (!dateString) return "No date";
  return new Intl.DateTimeFormat("en-AU", { day: "numeric", month: "short", year: "numeric" }).format(new Date(`${dateString}T00:00:00`));
}

function initials(name) {
  return String(name || "?")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

function toNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function fixed(value) {
  return toNumber(value).toFixed(2);
}

function csvEscape(value) {
  const str = String(value ?? "");
  if (/[",\n]/.test(str)) return `"${str.replace(/"/g, '""')}"`;
  return str;
}

function slug(value) {
  return String(value || "profile").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function cryptoRandomId() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function structuredCloneSafe(value) {
  return JSON.parse(JSON.stringify(value));
}

function toast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => els.toast.classList.remove("show"), 1900);
}


function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;

  let refreshing = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (refreshing) return;
    refreshing = true;
    window.location.reload();
  });

  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./sw.js?v=2.1.0", { updateViaCache: "none" })
      .then((registration) => {
        registration.update().catch(() => {});

        if (registration.waiting) {
          registration.waiting.postMessage({ type: "SKIP_WAITING" });
        }

        registration.addEventListener("updatefound", () => {
          const worker = registration.installing;
          if (!worker) return;

          worker.addEventListener("statechange", () => {
            if (worker.state === "installed" && navigator.serviceWorker.controller) {
              worker.postMessage({ type: "SKIP_WAITING" });
            }
          });
        });
      })
      .catch(() => {});
  });
}
