const DB_NAME = "lodgr-db";
const DB_VERSION = 1;
const STORE_NAME = "state";
const STATE_KEY = "lodgr-state-v1";

const currencyFormatter = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
});

const dateFormatter = new Intl.DateTimeFormat("en-AU", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

const categoryMeta = {
  education: { label: "Education / CPD", icon: "school", tone: "icon-blue" },
  equipment: { label: "Equipment", icon: "work", tone: "icon-purple" },
  subscription: { label: "Subscription / software", icon: "calculate", tone: "icon-green" },
  registration: { label: "Registration / membership", icon: "check_circle", tone: "icon-blue" },
  travel: { label: "Work travel", icon: "calendar_month", tone: "icon-amber" },
  clothing: { label: "Uniform / protective clothing", icon: "person", tone: "icon-pink" },
  other: { label: "Other", icon: "receipt_long", tone: "icon-amber" },
};

const defaultState = {
  selectedProfileId: "profile-you",
  profiles: [
    {
      id: "profile-you",
      name: "You",
      taxInputs: {
        grossIncome: "",
        taxWithheld: "",
        otherIncome: "",
        includeMedicare: true,
      },
    },
    {
      id: "profile-partner",
      name: "Partner",
      taxInputs: {
        grossIncome: "",
        taxWithheld: "",
        otherIncome: "",
        includeMedicare: true,
      },
    },
  ],
  expenses: [],
};

let state = structuredClone(defaultState);
let db;
let toastTimeout;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const elements = {
  profileStrip: $("#profileStrip"),
  expenseList: $("#expenseList"),
  expenseCount: $("#expenseCount"),
  expenseModal: $("#expenseModal"),
  expenseForm: $("#expenseForm"),
  expenseProfile: $("#expenseProfile"),
  expenseDate: $("#expenseDate"),
  categoryFilter: $("#categoryFilter"),
  taxForm: $("#taxForm"),
  grossIncome: $("#grossIncome"),
  taxWithheld: $("#taxWithheld"),
  otherIncome: $("#otherIncome"),
  includeMedicare: $("#includeMedicare"),
  deductionTotal: $("#deductionTotal"),
  taxableIncome: $("#taxableIncome"),
  incomeTax: $("#incomeTax"),
  estimatedTax: $("#estimatedTax"),
  refundBox: $("#refundBox"),
  refundLabel: $("#refundLabel"),
  refundAmount: $("#refundAmount"),
  receiptStatus: $("#receiptStatus"),
  reviewStatus: $("#reviewStatus"),
  activeProfileName: $("#activeProfileName"),
  activeProfileTotal: $("#activeProfileTotal"),
  settingsModal: $("#settingsModal"),
  settingsForm: $("#settingsForm"),
  profileNameInput: $("#profileNameInput"),
  toast: $("#toast"),
};

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = () => {
      const upgradeDb = request.result;
      if (!upgradeDb.objectStoreNames.contains(STORE_NAME)) {
        upgradeDb.createObjectStore(STORE_NAME);
      }
    };
  });
}

function readStateFromDb() {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(STATE_KEY);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

function writeStateToDb() {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put(state, STATE_KEY);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

async function saveState() {
  await writeStateToDb();
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.remove("hidden");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => elements.toast.classList.add("hidden"), 2600);
}

function uid(prefix = "id") {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function parseMoney(value) {
  const number = Number.parseFloat(value);
  return Number.isFinite(number) ? number : 0;
}

function formatCurrency(value) {
  return currencyFormatter.format(Number.isFinite(value) ? value : 0);
}

function safeDate(value) {
  if (!value) return "No date";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return dateFormatter.format(date);
}

function getActiveProfile() {
  return state.profiles.find((profile) => profile.id === state.selectedProfileId) || state.profiles[0];
}

function getExpensesForProfile(profileId = state.selectedProfileId) {
  return state.expenses.filter((expense) => expense.profileId === profileId);
}

function getFilteredExpenses() {
  const filter = elements.categoryFilter.value;
  const profileExpenses = getExpensesForProfile();
  const filtered = filter === "all"
    ? profileExpenses
    : profileExpenses.filter((expense) => expense.category === filter);

  return filtered.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
}

function claimableAmount(expense) {
  return parseMoney(expense.amount) * Math.min(Math.max(parseMoney(expense.workUse), 0), 100) / 100;
}

function profileClaimTotal(profileId) {
  return getExpensesForProfile(profileId).reduce((total, expense) => total + claimableAmount(expense), 0);
}

function evidenceStatus(expense) {
  const workUse = parseMoney(expense.workUse);
  const hasReceipt = Boolean(expense.receipt?.dataUrl || expense.receipt?.name);

  if (!hasReceipt || workUse < 100 || expense.category === "other" || expense.category === "clothing") {
    return { label: "Review", className: "badge-review" };
  }
  return { label: "Strong", className: "badge-strong" };
}

function renderProfiles() {
  elements.profileStrip.innerHTML = "";

  state.profiles.forEach((profile) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `profile-card ${profile.id === state.selectedProfileId ? "active" : ""}`;
    button.dataset.profileId = profile.id;

    const initials = profile.name
      .trim()
      .split(/\s+/)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "?";

    button.innerHTML = `
      <span class="avatar">${escapeHtml(initials)}</span>
      <strong>${escapeHtml(profile.name)}</strong>
      <small>${formatCurrency(profileClaimTotal(profile.id))}</small>
    `;

    button.addEventListener("click", async () => {
      state.selectedProfileId = profile.id;
      await saveState();
      render();
    });

    elements.profileStrip.appendChild(button);
  });
}

function renderProfileOptions() {
  elements.expenseProfile.innerHTML = state.profiles
    .map((profile) => `<option value="${profile.id}">${escapeHtml(profile.name)}</option>`)
    .join("");
  elements.expenseProfile.value = state.selectedProfileId;
}

function renderExpenses() {
  const expenses = getFilteredExpenses();
  const allProfileExpenses = getExpensesForProfile();
  const profile = getActiveProfile();

  elements.expenseCount.textContent = `${allProfileExpenses.length} ${allProfileExpenses.length === 1 ? "item" : "items"}`;
  elements.activeProfileName.textContent = profile.name;
  elements.activeProfileTotal.textContent = formatCurrency(profileClaimTotal(profile.id));

  if (expenses.length === 0) {
    elements.expenseList.innerHTML = `
      <div class="empty-state">
        No expenses yet for this profile. Add a receipt or work-related expense to start.
      </div>
    `;
    return;
  }

  elements.expenseList.innerHTML = "";

  expenses.slice(0, 10).forEach((expense) => {
    const meta = categoryMeta[expense.category] || categoryMeta.other;
    const status = evidenceStatus(expense);
    const row = document.createElement("article");
    row.className = "expense-row";

    row.innerHTML = `
      <span class="icon-pill ${meta.tone}">
        <span class="material-symbols-outlined">${meta.icon}</span>
      </span>
      <div class="expense-main">
        <strong>${escapeHtml(expense.merchant)}</strong>
        <small>${escapeHtml(meta.label)} · ${safeDate(expense.date)}</small>
        <small>Work use: ${Number(expense.workUse || 0)}% · ${expense.receipt?.name ? "Receipt attached" : "No receipt"}</small>
        <div class="row-actions">
          ${expense.receipt?.dataUrl ? `<button class="row-action-button" type="button" data-view-receipt="${expense.id}">View receipt</button>` : ""}
          <button class="row-action-button" type="button" data-delete-expense="${expense.id}">Delete</button>
        </div>
      </div>
      <div class="expense-amount">
        <strong>${formatCurrency(claimableAmount(expense))}</strong>
        <small class="badge ${status.className}">${status.label}</small>
      </div>
    `;

    elements.expenseList.appendChild(row);
  });
}

function renderReview() {
  const expenses = getExpensesForProfile();
  const withReceipts = expenses.filter((expense) => expense.receipt?.dataUrl || expense.receipt?.name).length;
  const reviewNeeded = expenses.filter((expense) => evidenceStatus(expense).label !== "Strong").length;

  elements.receiptStatus.textContent = String(withReceipts);
  elements.reviewStatus.textContent = String(reviewNeeded);
}

function calculateIncomeTax2025Resident(taxableIncome) {
  const income = Math.max(0, taxableIncome);

  if (income <= 18_200) return 0;
  if (income <= 45_000) return (income - 18_200) * 0.16;
  if (income <= 135_000) return 4_288 + (income - 45_000) * 0.30;
  if (income <= 190_000) return 31_288 + (income - 135_000) * 0.37;
  return 51_638 + (income - 190_000) * 0.45;
}

function calculateLito(taxableIncome) {
  const income = Math.max(0, taxableIncome);

  if (income <= 37_500) return 700;
  if (income <= 45_000) return Math.max(0, 700 - (income - 37_500) * 0.05);
  if (income <= 66_667) return Math.max(0, 325 - (income - 45_000) * 0.015);
  return 0;
}

function calculateEstimate() {
  const profile = getActiveProfile();
  const inputs = profile.taxInputs;

  const grossIncome = parseMoney(inputs.grossIncome);
  const taxWithheld = parseMoney(inputs.taxWithheld);
  const otherIncome = parseMoney(inputs.otherIncome);
  const deductions = profileClaimTotal(profile.id);
  const taxableIncome = Math.max(0, grossIncome + otherIncome - deductions);

  const incomeTaxBeforeOffset = calculateIncomeTax2025Resident(taxableIncome);
  const lito = Math.min(incomeTaxBeforeOffset, calculateLito(taxableIncome));
  const incomeTaxAfterOffset = Math.max(0, incomeTaxBeforeOffset - lito);
  const medicare = inputs.includeMedicare ? taxableIncome * 0.02 : 0;
  const totalTax = incomeTaxAfterOffset + medicare;
  const outcome = taxWithheld - totalTax;

  return {
    deductions,
    taxableIncome,
    incomeTaxAfterOffset,
    medicare,
    totalTax,
    outcome,
  };
}

function renderTaxForm() {
  const profile = getActiveProfile();
  elements.grossIncome.value = profile.taxInputs.grossIncome || "";
  elements.taxWithheld.value = profile.taxInputs.taxWithheld || "";
  elements.otherIncome.value = profile.taxInputs.otherIncome || "";
  elements.includeMedicare.checked = Boolean(profile.taxInputs.includeMedicare);

  const estimate = calculateEstimate();
  elements.deductionTotal.textContent = formatCurrency(estimate.deductions);
  elements.taxableIncome.textContent = formatCurrency(estimate.taxableIncome);
  elements.incomeTax.textContent = formatCurrency(estimate.incomeTaxAfterOffset);
  elements.estimatedTax.textContent = formatCurrency(estimate.totalTax);

  const isRefund = estimate.outcome >= 0;
  elements.refundBox.classList.toggle("payable", !isRefund);
  elements.refundLabel.textContent = isRefund ? "Estimated refund" : "Estimated payable";
  elements.refundAmount.textContent = formatCurrency(Math.abs(estimate.outcome));
}

function render() {
  renderProfiles();
  renderProfileOptions();
  renderExpenses();
  renderTaxForm();
  renderReview();
}

function openExpenseModal() {
  elements.expenseForm.reset();
  elements.expenseProfile.value = state.selectedProfileId;
  elements.expenseDate.value = new Date().toISOString().slice(0, 10);
  elements.expenseModal.classList.remove("hidden");
}

function closeExpenseModal() {
  elements.expenseModal.classList.add("hidden");
}

function openSettingsModal() {
  const profile = getActiveProfile();
  elements.profileNameInput.value = profile.name;
  elements.settingsModal.classList.remove("hidden");
}

function closeSettingsModal() {
  elements.settingsModal.classList.add("hidden");
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve(null);
      return;
    }

    if (file.size > 4_000_000) {
      reject(new Error("Please use a receipt smaller than 4 MB for this prototype."));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
}

async function handleExpenseSubmit(event) {
  event.preventDefault();
  const formData = new FormData(elements.expenseForm);
  const receiptFile = formData.get("receipt");

  try {
    const receiptDataUrl = receiptFile && receiptFile.size > 0
      ? await fileToDataUrl(receiptFile)
      : null;

    const expense = {
      id: uid("expense"),
      profileId: formData.get("profileId"),
      date: formData.get("date"),
      merchant: String(formData.get("merchant") || "Untitled expense").trim(),
      category: formData.get("category"),
      amount: parseMoney(formData.get("amount")),
      workUse: Math.min(Math.max(parseMoney(formData.get("workUse")), 0), 100),
      notes: String(formData.get("notes") || "").trim(),
      receipt: receiptDataUrl
        ? {
            name: receiptFile.name,
            type: receiptFile.type,
            size: receiptFile.size,
            dataUrl: receiptDataUrl,
          }
        : null,
      createdAt: new Date().toISOString(),
    };

    state.expenses.unshift(expense);
    state.selectedProfileId = expense.profileId;
    await saveState();
    closeExpenseModal();
    render();
    showToast("Expense saved");
  } catch (error) {
    showToast(error.message || "Could not save expense");
  }
}

async function handleTaxInputChange() {
  const profile = getActiveProfile();
  profile.taxInputs = {
    grossIncome: elements.grossIncome.value,
    taxWithheld: elements.taxWithheld.value,
    otherIncome: elements.otherIncome.value,
    includeMedicare: elements.includeMedicare.checked,
  };
  await saveState();
  renderTaxForm();
}

async function addProfile() {
  const name = prompt("Profile name", "Partner");
  if (!name || !name.trim()) return;

  const profile = {
    id: uid("profile"),
    name: name.trim().slice(0, 40),
    taxInputs: {
      grossIncome: "",
      taxWithheld: "",
      otherIncome: "",
      includeMedicare: true,
    },
  };

  state.profiles.push(profile);
  state.selectedProfileId = profile.id;
  await saveState();
  render();
  showToast("Profile added");
}

async function saveProfileSettings(event) {
  event.preventDefault();
  const profile = getActiveProfile();
  profile.name = elements.profileNameInput.value.trim() || profile.name;
  await saveState();
  closeSettingsModal();
  render();
  showToast("Profile updated");
}

async function deleteActiveProfile() {
  if (state.profiles.length <= 1) {
    showToast("At least one profile is required");
    return;
  }

  const profile = getActiveProfile();
  const confirmed = confirm(`Delete ${profile.name} and all linked expenses?`);
  if (!confirmed) return;

  state.expenses = state.expenses.filter((expense) => expense.profileId !== profile.id);
  state.profiles = state.profiles.filter((item) => item.id !== profile.id);
  state.selectedProfileId = state.profiles[0].id;
  await saveState();
  closeSettingsModal();
  render();
  showToast("Profile deleted");
}

function exportCsv() {
  const profile = getActiveProfile();
  const rows = getExpensesForProfile(profile.id);

  if (rows.length === 0) {
    showToast("No expenses to export");
    return;
  }

  const header = [
    "Profile",
    "Date",
    "Supplier or item",
    "Category",
    "Amount",
    "Work use %",
    "Claimable amount",
    "Receipt attached",
    "Notes",
  ];

  const csvRows = rows.map((expense) => [
    profile.name,
    expense.date,
    expense.merchant,
    categoryMeta[expense.category]?.label || expense.category,
    expense.amount,
    expense.workUse,
    claimableAmount(expense).toFixed(2),
    expense.receipt?.name ? "Yes" : "No",
    expense.notes || "",
  ]);

  const csv = [header, ...csvRows]
    .map((row) => row.map(csvEscape).join(","))
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const safeName = profile.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "profile";
  link.href = url;
  link.download = `lodgr-${safeName}-expenses.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  showToast("CSV exported");
}

function csvEscape(value) {
  const text = String(value ?? "");
  if (/[,"\n]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function deleteExpense(id) {
  const expense = state.expenses.find((item) => item.id === id);
  if (!expense) return;
  const confirmed = confirm(`Delete ${expense.merchant}?`);
  if (!confirmed) return;

  state.expenses = state.expenses.filter((item) => item.id !== id);
  await saveState();
  render();
  showToast("Expense deleted");
}

function viewReceipt(id) {
  const expense = state.expenses.find((item) => item.id === id);
  if (!expense?.receipt?.dataUrl) {
    showToast("No receipt available");
    return;
  }

  const receiptWindow = window.open();
  if (!receiptWindow) {
    showToast("Popup blocked. Allow popups to view receipt.");
    return;
  }

  const isPdf = expense.receipt.type === "application/pdf";
  receiptWindow.document.write(`
    <!doctype html>
    <html>
      <head>
        <title>${escapeHtml(expense.receipt.name)}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>
          body { margin: 0; background: #111; min-height: 100vh; display: grid; place-items: center; }
          img { max-width: 100%; max-height: 100vh; object-fit: contain; }
          iframe { width: 100vw; height: 100vh; border: 0; background: #fff; }
        </style>
      </head>
      <body>
        ${isPdf
          ? `<iframe src="${expense.receipt.dataUrl}" title="Receipt"></iframe>`
          : `<img src="${expense.receipt.dataUrl}" alt="Receipt" />`}
      </body>
    </html>
  `);
  receiptWindow.document.close();
}

function scrollToTarget(id) {
  const target = id === "home" ? document.body : document.getElementById(id);
  if (!target) return;
  target.scrollIntoView({ behavior: "smooth", block: "start" });

  $$(".nav-item").forEach((item) => {
    item.classList.toggle("active", item.dataset.scrollTarget === id);
  });
}

function bindEvents() {
  $("#openExpenseModal").addEventListener("click", openExpenseModal);
  $("#closeExpenseModal").addEventListener("click", closeExpenseModal);
  elements.expenseModal.addEventListener("click", (event) => {
    if (event.target === elements.expenseModal) closeExpenseModal();
  });
  elements.expenseForm.addEventListener("submit", handleExpenseSubmit);

  $("#addProfile").addEventListener("click", addProfile);
  $("#exportCsv").addEventListener("click", exportCsv);
  $("#openSettings").addEventListener("click", openSettingsModal);
  $("#closeSettings").addEventListener("click", closeSettingsModal);
  elements.settingsModal.addEventListener("click", (event) => {
    if (event.target === elements.settingsModal) closeSettingsModal();
  });
  elements.settingsForm.addEventListener("submit", saveProfileSettings);
  $("#deleteProfile").addEventListener("click", deleteActiveProfile);

  elements.categoryFilter.addEventListener("change", renderExpenses);

  [elements.grossIncome, elements.taxWithheld, elements.otherIncome, elements.includeMedicare]
    .forEach((input) => input.addEventListener("input", handleTaxInputChange));

  $$('[data-scroll-target]').forEach((button) => {
    button.addEventListener("click", () => scrollToTarget(button.dataset.scrollTarget));
  });

  $("#scanReceipt").addEventListener("click", () => {
    openExpenseModal();
    showToast("Attach the receipt when adding the expense");
  });

  elements.expenseList.addEventListener("click", (event) => {
    const deleteButton = event.target.closest("[data-delete-expense]");
    const receiptButton = event.target.closest("[data-view-receipt]");

    if (deleteButton) {
      deleteExpense(deleteButton.dataset.deleteExpense);
    }

    if (receiptButton) {
      viewReceipt(receiptButton.dataset.viewReceipt);
    }
  });
}

async function init() {
  db = await openDatabase();
  const savedState = await readStateFromDb();

  if (savedState) {
    state = {
      ...structuredClone(defaultState),
      ...savedState,
      profiles: savedState.profiles?.length ? savedState.profiles : structuredClone(defaultState.profiles),
      expenses: savedState.expenses || [],
    };
  } else {
    await saveState();
  }

  bindEvents();
  render();

  if ("serviceWorker" in navigator && ["https:", "http:"].includes(location.protocol)) {
    navigator.serviceWorker.register("sw.js").catch(() => {
      // The app remains usable if service worker registration is unavailable.
    });
  }
}

init().catch((error) => {
  console.error(error);
  document.body.innerHTML = `
    <main style="max-width: 430px; margin: 40px auto; padding: 24px; font-family: system-ui, sans-serif;">
      <h1>Lodgr</h1>
      <p>Could not start the app. Safari private browsing or blocked storage may prevent Lodgr from saving data.</p>
    </main>
  `;
});
