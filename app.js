const STORAGE_KEY = "lodgr.v3.state";
const LEGACY_KEY = "lodgr.v2.state";
const APP_VERSION = "3.0.0";

const iconPaths = {
  plus: '<path d="M12 5v14"/><path d="M5 12h14"/>',
  close: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  home: '<path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/>',
  receipt: '<path d="M7 3h10a2 2 0 0 1 2 2v16l-3-1.5-2 1.5-2-1.5-2 1.5-2-1.5L5 21V5a2 2 0 0 1 2-2Z"/><path d="M9 8h6"/><path d="M9 12h6"/><path d="M9 16h4"/>',
  calculator: '<rect x="4" y="3" width="16" height="18" rx="3"/><path d="M8 7h8"/><path d="M8 11h.01"/><path d="M12 11h.01"/><path d="M16 11h.01"/><path d="M8 15h.01"/><path d="M12 15h.01"/><path d="M16 15h.01"/>',
  person: '<circle cx="12" cy="8" r="4"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/>',
  settings: '<path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"/><path d="M19.4 15a1.8 1.8 0 0 0 .4 2l.1.1a2.2 2.2 0 0 1-3.1 3.1l-.1-.1a1.8 1.8 0 0 0-2-.4 1.8 1.8 0 0 0-1.1 1.6V21a2.2 2.2 0 0 1-4.4 0v-.2a1.8 1.8 0 0 0-1.1-1.6 1.8 1.8 0 0 0-2 .4l-.1.1a2.2 2.2 0 0 1-3.1-3.1l.1-.1a1.8 1.8 0 0 0 .4-2 1.8 1.8 0 0 0-1.6-1.1H3a2.2 2.2 0 0 1 0-4.4h.2a1.8 1.8 0 0 0 1.6-1.1 1.8 1.8 0 0 0-.4-2l-.1-.1a2.2 2.2 0 0 1 3.1-3.1l.1.1a1.8 1.8 0 0 0 2 .4A1.8 1.8 0 0 0 10.6 3a2.2 2.2 0 0 1 4.4 0 1.8 1.8 0 0 0 1.1 1.6 1.8 1.8 0 0 0 2-.4l.1-.1a2.2 2.2 0 0 1 3.1 3.1l-.1.1a1.8 1.8 0 0 0-.4 2 1.8 1.8 0 0 0 1.6 1.1H22a2.2 2.2 0 0 1 0 4.4h-.2a1.8 1.8 0 0 0-1.6 1.1Z"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  download: '<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>',
  edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
  trash: '<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 15H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/>',
  duplicate: '<rect x="8" y="8" width="11" height="11" rx="2"/><path d="M5 16H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
  palette: '<path d="M12 3a9 9 0 0 0 0 18h1.2a1.8 1.8 0 0 0 1.2-3.1 1.5 1.5 0 0 1 1-2.6H17a4 4 0 0 0 4-4.1C21 6.7 17 3 12 3Z"/><path d="M7.5 10h.01"/><path d="M10 7.5h.01"/><path d="M14 7.5h.01"/><path d="M16.5 10h.01"/>',
  category: '<path d="M4 4h7v7H4z"/><path d="M13 4h7v7h-7z"/><path d="M4 13h7v7H4z"/><path d="M13 13h7v7h-7z"/>',
  cloud: '<path d="M17.5 19H7a5 5 0 0 1-.8-9.9A7 7 0 0 1 19.8 11 4 4 0 0 1 17.5 19Z"/><path d="M12 12v6"/><path d="m9 15 3 3 3-3"/>',
  dashboard: '<path d="M4 13h7V4H4z"/><path d="M13 20h7V4h-7z"/><path d="M4 20h7v-5H4z"/>',
  graduation: '<path d="m2 8 10-5 10 5-10 5Z"/><path d="M6 10v5c2 2 10 2 12 0v-5"/><path d="M22 8v6"/>',
  laptop: '<path d="M5 5h14v10H5z"/><path d="M2 19h20"/><path d="M8 15h8"/>',
  shield: '<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/>',
  phone: '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
  car: '<path d="M5 16h14"/><path d="M7 16l1.5-5h7L17 16"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
  shirt: '<path d="M8 4 4 6l-2 5 4 2v7h12v-7l4-2-2-5-4-2a4 4 0 0 1-8 0Z"/>',
  folder: '<path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3Z"/>',
  coin: '<circle cx="12" cy="12" r="9"/><path d="M12 7v10"/><path d="M15.5 9.2A4.2 4.2 0 0 0 12 8c-2 0-3.2.9-3.2 2.2 0 3.3 6.4 1.4 6.4 4.7 0 1.3-1.3 2.1-3.4 2.1a5.4 5.4 0 0 1-3.6-1.2"/>',
  check: '<path d="m4 12 5 5L20 6"/>',
  warning: '<path d="M10.3 4.3 2.6 18a2 2 0 0 0 1.8 3h15.2a2 2 0 0 0 1.8-3L13.7 4.3a2 2 0 0 0-3.4 0Z"/><path d="M12 9v5"/><path d="M12 18h.01"/>',
};

const iconOptions = [
  ["graduation", "Education"], ["laptop", "Equipment"], ["coin", "Subscription"], ["shield", "Registration"],
  ["car", "Travel"], ["shirt", "Uniform"], ["phone", "Phone"], ["folder", "Other"]
];
const colorOptions = ["green", "blue", "purple", "amber", "rose", "navy"];

const defaultCategories = [
  { id: "cat-education", name: "Education", icon: "graduation", color: "blue", defaultWorkUse: 100, risk: "Strong", receiptRequired: true, hidden: false, system: true },
  { id: "cat-equipment", name: "Equipment", icon: "laptop", color: "purple", defaultWorkUse: 80, risk: "Review", receiptRequired: true, hidden: false, system: true },
  { id: "cat-subscription", name: "Subscription", icon: "coin", color: "green", defaultWorkUse: 60, risk: "Review", receiptRequired: true, hidden: false, system: true },
  { id: "cat-registration", name: "Registration", icon: "shield", color: "amber", defaultWorkUse: 100, risk: "Strong", receiptRequired: true, hidden: false, system: true },
  { id: "cat-travel", name: "Travel", icon: "car", color: "rose", defaultWorkUse: 100, risk: "Review", receiptRequired: true, hidden: false, system: true },
  { id: "cat-uniform", name: "Uniform", icon: "shirt", color: "navy", defaultWorkUse: 100, risk: "Review", receiptRequired: true, hidden: false, system: true },
  { id: "cat-other", name: "Other", icon: "folder", color: "navy", defaultWorkUse: 100, risk: "Risky", receiptRequired: true, hidden: false, system: true },
];

const defaultProfileTax = () => ({ grossIncome: 0, taxWithheld: 0, otherIncome: 0, includeMedicare: true, hasHelpDebt: false });

const defaultState = () => ({
  version: APP_VERSION,
  activeScreen: "home",
  activeProfileId: "p1",
  activeCategoryId: "all",
  search: "",
  profileFilter: "active",
  statusFilter: "all",
  settings: {
    theme: "system",
    accent: "green",
    taxYear: "2025–26",
    startScreen: "home",
    currencyDecimals: true,
    showOutcome: true,
    showProfiles: true,
    showCategories: true,
    showRecent: true,
    compactList: false,
  },
  profiles: [
    { id: "p1", name: "Jashan", initials: "J", preset: "Healthcare employee", color: "navy", defaultWorkUse: 100, tax: { grossIncome: 85000, taxWithheld: 18500, otherIncome: 0, includeMedicare: true, hasHelpDebt: false } },
    { id: "p2", name: "Wife", initials: "W", preset: "General employee", color: "purple", defaultWorkUse: 100, tax: defaultProfileTax() },
  ],
  categories: clone(defaultCategories),
  expenses: [
    { id: id(), profileId: "p1", date: "2026-07-08", merchant: "Ausmed", categoryId: "cat-education", amount: 200, workUse: 100, receiptName: "invoice.pdf", reimbursed: false, notes: "CPD subscription related to current role.", createdAt: Date.now() - 86400000 * 4, updatedAt: Date.now() - 86400000 * 4, sample: true },
    { id: id(), profileId: "p1", date: "2026-07-06", merchant: "NuPhy Keyboard", categoryId: "cat-equipment", amount: 212, workUse: 80, receiptName: "upbank.png", reimbursed: false, notes: "Apportioned for work documentation and emails.", createdAt: Date.now() - 86400000 * 2, updatedAt: Date.now() - 86400000 * 2, sample: true },
    { id: id(), profileId: "p1", date: "2026-07-03", merchant: "ChatGPT", categoryId: "cat-subscription", amount: 33, workUse: 60, receiptName: "", reimbursed: false, notes: "Work-use estimate required.", createdAt: Date.now() - 86400000, updatedAt: Date.now() - 86400000, sample: true },
    { id: id(), profileId: "p2", date: "2026-07-02", merchant: "Officeworks", categoryId: "cat-equipment", amount: 49.95, workUse: 70, receiptName: "receipt.jpg", reimbursed: false, notes: "Stationery used for work records.", createdAt: Date.now() - 86400000 * 3, updatedAt: Date.now() - 86400000 * 3, sample: true },
  ],
});

let state = loadState();
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const els = {
  shell: $("#appShell"),
  screens: $$(".screen"),
  tabs: $$(".tab"),
  toast: $("#toast"),
  claimSheet: $("#claimSheet"), claimForm: $("#claimForm"),
  claimId: $("#claimId"), claimProfileId: $("#claimProfileId"), claimDate: $("#claimDate"), claimMerchant: $("#claimMerchant"), claimCategoryId: $("#claimCategoryId"), claimAmount: $("#claimAmount"), claimWorkUse: $("#claimWorkUse"), claimReceiptName: $("#claimReceiptName"), claimReimbursed: $("#claimReimbursed"), claimNotes: $("#claimNotes"), claimPreview: $("#claimPreview"), claimSheetTitle: $("#claimSheetTitle"), duplicateClaimButton: $("#duplicateClaimButton"), deleteClaimButton: $("#deleteClaimButton"),
  profileSheet: $("#profileSheet"), profileForm: $("#profileForm"), profileId: $("#profileId"), profileName: $("#profileName"), profileInitials: $("#profileInitials"), profileColor: $("#profileColor"), profilePreset: $("#profilePreset"), profileDefaultWorkUse: $("#profileDefaultWorkUse"), profileSheetTitle: $("#profileSheetTitle"), deleteProfileButton: $("#deleteProfileButton"),
  categorySheet: $("#categorySheet"), categoryForm: $("#categoryForm"), categoryId: $("#categoryId"), categoryName: $("#categoryName"), categoryIcon: $("#categoryIcon"), categoryColor: $("#categoryColor"), categoryDefaultWorkUse: $("#categoryDefaultWorkUse"), categoryRisk: $("#categoryRisk"), categoryReceiptRequired: $("#categoryReceiptRequired"), categoryHidden: $("#categoryHidden"), categorySheetTitle: $("#categorySheetTitle"), deleteCategoryButton: $("#deleteCategoryButton"),
  settingsSheet: $("#settingsSheet"), settingsTabs: $("#settingsTabs"),
  settingTheme: $("#settingTheme"), settingAccent: $("#settingAccent"), settingTaxYear: $("#settingTaxYear"), settingStartScreen: $("#settingStartScreen"), settingCurrencyDecimals: $("#settingCurrencyDecimals"),
  settingShowOutcome: $("#settingShowOutcome"), settingShowProfiles: $("#settingShowProfiles"), settingShowCategories: $("#settingShowCategories"), settingShowRecent: $("#settingShowRecent"), settingCompactList: $("#settingCompactList"),
  homeTaxYear: $("#homeTaxYear"), activeProfileLabel: $("#activeProfileLabel"), homeOutcome: $("#homeOutcome"), homeOutcomeCopy: $("#homeOutcomeCopy"), homeDeductions: $("#homeDeductions"), homeReceiptRatio: $("#homeReceiptRatio"), homeReviewCount: $("#homeReviewCount"), heroEstimateType: $("#heroEstimateType"), homeProfileCard: $("#homeProfileCard"), homeCategoryCard: $("#homeCategoryCard"), homeRecentCard: $("#homeRecentCard"), profileCarousel: $("#profileCarousel"), categoryBars: $("#categoryBars"), homeExpenseFeed: $("#homeExpenseFeed"),
  searchInput: $("#searchInput"), profileFilter: $("#profileFilter"), statusFilter: $("#statusFilter"), categoryChips: $("#categoryChips"), logCount: $("#logCount"), logExpenseFeed: $("#logExpenseFeed"),
  taxProfileSwitch: $("#taxProfileSwitch"), taxYearChip: $("#taxYearChip"), grossIncome: $("#grossIncome"), taxWithheld: $("#taxWithheld"), otherIncome: $("#otherIncome"), includeMedicare: $("#includeMedicare"), hasHelpDebt: $("#hasHelpDebt"), taxOutcome: $("#taxOutcome"), taxOutcomeBadge: $("#taxOutcomeBadge"), taxOutcomeHint: $("#taxOutcomeHint"), calcIncome: $("#calcIncome"), calcDeductions: $("#calcDeductions"), calcTaxable: $("#calcTaxable"), calcTaxBeforeOffsets: $("#calcTaxBeforeOffsets"), calcLito: $("#calcLito"), calcMedicare: $("#calcMedicare"), calcFinalTax: $("#calcFinalTax"),
  profileList: $("#profileList"), profileCount: $("#profileCount"), categoryAdminList: $("#categoryAdminList"), importJsonInput: $("#importJsonInput"),
};

boot();

function boot() {
  hydrateIcons();
  populateStaticOptions();
  bindEvents();
  applySettings();
  showScreen(state.settings.startScreen || "home", false);
  renderAll();
  registerServiceWorker();
}

function bindEvents() {
  els.tabs.forEach(tab => tab.addEventListener("click", () => showScreen(tab.dataset.tab)));
  $$('[data-jump]').forEach(btn => btn.addEventListener("click", () => showScreen(btn.dataset.jump)));
  $$('[data-new-claim]').forEach(btn => btn.addEventListener("click", () => openClaimSheet()));
  $$('[data-close-claim]').forEach(btn => btn.addEventListener("click", closeClaimSheet));
  els.claimSheet.addEventListener("click", e => { if (e.target === els.claimSheet) closeClaimSheet(); });
  els.claimForm.addEventListener("submit", saveClaim);
  [els.claimAmount, els.claimWorkUse, els.claimReimbursed, els.claimReceiptName, els.claimCategoryId].forEach(el => el.addEventListener("input", renderClaimPreview));
  els.claimCategoryId.addEventListener("change", () => {
    const cat = getCategory(els.claimCategoryId.value);
    if (!els.claimId.value && cat) els.claimWorkUse.value = cat.defaultWorkUse ?? 100;
    renderClaimPreview();
  });
  els.duplicateClaimButton.addEventListener("click", duplicateOpenClaim);
  els.deleteClaimButton.addEventListener("click", deleteOpenClaim);

  $$('[data-new-profile]').forEach(btn => btn.addEventListener("click", () => openProfileSheet()));
  $$('[data-close-profile]').forEach(btn => btn.addEventListener("click", closeProfileSheet));
  els.profileSheet.addEventListener("click", e => { if (e.target === els.profileSheet) closeProfileSheet(); });
  els.profileForm.addEventListener("submit", saveProfile);
  els.profileName.addEventListener("input", () => { if (!els.profileInitials.value.trim()) els.profileInitials.placeholder = makeInitials(els.profileName.value); });
  els.deleteProfileButton.addEventListener("click", deleteOpenProfile);

  $$('[data-close-category]').forEach(btn => btn.addEventListener("click", closeCategorySheet));
  els.categorySheet.addEventListener("click", e => { if (e.target === els.categorySheet) closeCategorySheet(); });
  els.categoryForm.addEventListener("submit", saveCategory);
  els.deleteCategoryButton.addEventListener("click", deleteOpenCategory);
  $("#newCategoryButton").addEventListener("click", () => openCategorySheet());

  $$('[data-open-settings]').forEach(btn => btn.addEventListener("click", () => openSettingsSheet(btn.dataset.settingsTarget)));
  $$('[data-close-settings]').forEach(btn => btn.addEventListener("click", closeSettingsSheet));
  els.settingsSheet.addEventListener("click", e => { if (e.target === els.settingsSheet) closeSettingsSheet(); });
  els.settingsTabs.addEventListener("click", e => { const btn = e.target.closest("button[data-settings-tab]"); if (btn) showSettingsPanel(btn.dataset.settingsTab); });
  $("#saveAppearanceSettings").addEventListener("click", saveAppearanceSettings);
  $("#saveDashboardSettings").addEventListener("click", saveDashboardSettings);

  els.searchInput.addEventListener("input", () => { state.search = els.searchInput.value.trim(); persist(); renderExpenseFeeds(); });
  els.profileFilter.addEventListener("change", () => { state.profileFilter = els.profileFilter.value; persist(); renderExpenseFeeds(); });
  els.statusFilter.addEventListener("change", () => { state.statusFilter = els.statusFilter.value; persist(); renderExpenseFeeds(); });

  [els.grossIncome, els.taxWithheld, els.otherIncome, els.includeMedicare, els.hasHelpDebt].forEach(input => {
    input.addEventListener("input", () => { updateActiveProfileTaxFromForm(); persist(); renderAllStats(); });
  });

  $$('[data-export-csv]').forEach(btn => btn.addEventListener("click", exportCsv));
  $("#exportJsonButton").addEventListener("click", exportJson);
  $("#importJsonButton").addEventListener("click", () => els.importJsonInput.click());
  els.importJsonInput.addEventListener("change", importJson);
  $("#clearAllClaimsButton").addEventListener("click", clearAllClaims);
  $("#clearSampleData").addEventListener("click", clearSampleData);
  $("#resetAllData").addEventListener("click", resetAllData);
}

function populateStaticOptions() {
  els.categoryIcon.innerHTML = iconOptions.map(([value, label]) => `<option value="${value}">${label}</option>`).join("");
  els.categoryColor.innerHTML = colorOptions.map(c => `<option value="${c}">${title(c)}</option>`).join("");
}

function renderAll() {
  normalizeState();
  applySettings();
  renderFilters();
  renderProfiles();
  renderCategories();
  renderExpenseFeeds();
  renderTaxForm();
  renderAllStats();
  hydrateIcons();
}

function renderAllStats() {
  renderHomeStats();
  renderTax();
  renderCategoryBars();
}

function applySettings() {
  const s = state.settings;
  document.documentElement.dataset.accent = s.accent || "green";
  document.documentElement.dataset.theme = effectiveTheme(s.theme);
  els.shell.classList.toggle("compact-list", !!s.compactList);
  els.homeTaxYear.textContent = `${s.taxYear || "2025–26"} tax year`;
  els.taxYearChip.textContent = s.taxYear || "2025–26";
  els.homeProfileCard.classList.toggle("hidden-by-setting", !s.showProfiles);
  els.homeCategoryCard.classList.toggle("hidden-by-setting", !s.showCategories);
  els.homeRecentCard.classList.toggle("hidden-by-setting", !s.showRecent);
  document.querySelector(".hero-card").classList.toggle("hidden-by-setting", !s.showOutcome);
}

function effectiveTheme(theme) {
  if (theme === "dark" || theme === "light") return theme;
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function showScreen(name, save = true) {
  if (!["home", "log", "tax", "profile"].includes(name)) name = "home";
  els.screens.forEach(screen => screen.classList.toggle("is-active", screen.dataset.screen === name));
  els.tabs.forEach(tab => tab.classList.toggle("is-active", tab.dataset.tab === name));
  els.shell.classList.toggle("show-fab", name === "log");
  if (save) { state.activeScreen = name; persist(); }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderProfiles() {
  const profileTotals = Object.fromEntries(state.profiles.map(p => [p.id, totalDeductions(p.id)]));
  els.profileCarousel.innerHTML = state.profiles.map(profile => `
    <button class="profile-card ${profile.id === state.activeProfileId ? "is-active" : ""}" type="button" data-profile-id="${profile.id}">
      <span class="avatar ${profile.color || "navy"}">${escapeHtml(profile.initials || makeInitials(profile.name))}</span>
      <strong>${escapeHtml(profile.name)}</strong>
      <small>${money(profileTotals[profile.id], 0)} logged</small>
    </button>
  `).join("");

  els.profileCarousel.querySelectorAll("[data-profile-id]").forEach(btn => btn.addEventListener("click", () => switchProfile(btn.dataset.profileId)));

  els.profileList.innerHTML = state.profiles.map(profile => `
    <div class="profile-row">
      <span class="avatar ${profile.color || "navy"}">${escapeHtml(profile.initials || makeInitials(profile.name))}</span>
      <div>
        <h3>${escapeHtml(profile.name)}</h3>
        <small>${escapeHtml(profile.preset || "General employee")} · ${money(profileTotals[profile.id], 2)} deductions</small>
      </div>
      <div class="row-actions">
        <button class="mini-icon-button" type="button" data-profile-edit="${profile.id}" aria-label="Edit ${escapeHtml(profile.name)}"><span class="svg-icon" data-icon="edit"></span></button>
        <button class="mini-icon-button" type="button" data-profile-switch="${profile.id}" aria-label="Switch to ${escapeHtml(profile.name)}"><span class="svg-icon" data-icon="check"></span></button>
      </div>
    </div>
  `).join("");

  els.profileList.querySelectorAll("[data-profile-edit]").forEach(btn => btn.addEventListener("click", () => openProfileSheet(btn.dataset.profileEdit)));
  els.profileList.querySelectorAll("[data-profile-switch]").forEach(btn => btn.addEventListener("click", () => switchProfile(btn.dataset.profileSwitch)));
  els.profileCount.textContent = state.profiles.length;
  els.activeProfileLabel.textContent = activeProfile()?.name || "Profile";
  renderTaxProfileSwitch();
  hydrateIcons(els.profileList);
}

function switchProfile(profileId) {
  if (!getProfile(profileId)) return;
  state.activeProfileId = profileId;
  persist();
  renderAll();
  toast(`Switched to ${getProfile(profileId).name}`);
}

function renderFilters() {
  els.profileFilter.innerHTML = `<option value="active">Active profile</option><option value="all">All profiles</option>` + state.profiles.map(p => `<option value="${p.id}">${escapeHtml(p.name)}</option>`).join("");
  els.profileFilter.value = state.profileFilter || "active";
  els.statusFilter.value = state.statusFilter || "all";
  els.searchInput.value = state.search || "";
  renderCategoryChips();
}

function renderCategoryChips() {
  const chips = [{ id: "all", name: "All" }, ...state.categories.filter(c => !c.hidden)];
  els.categoryChips.innerHTML = chips.map(cat => `<button class="chip ${state.activeCategoryId === cat.id ? "is-active" : ""}" type="button" data-category-filter="${cat.id}">${escapeHtml(cat.name)}</button>`).join("");
  els.categoryChips.querySelectorAll("[data-category-filter]").forEach(btn => btn.addEventListener("click", () => { state.activeCategoryId = btn.dataset.categoryFilter; persist(); renderCategoryChips(); renderExpenseFeeds(); }));
}

function renderCategories() {
  renderCategoryOptions();
  renderCategoryAdminList();
  renderCategoryChips();
}

function renderCategoryOptions() {
  const options = state.categories.filter(c => !c.hidden).map(c => `<option value="${c.id}">${escapeHtml(c.name)}</option>`).join("");
  els.claimCategoryId.innerHTML = options;
}

function renderCategoryAdminList() {
  els.categoryAdminList.innerHTML = state.categories.map(cat => `
    <button class="category-admin-row" type="button" data-category-edit="${cat.id}">
      <span class="icon-orb ${cat.color || "navy"}"><span class="svg-icon" data-icon="${cat.icon || "folder"}"></span></span>
      <span><strong>${escapeHtml(cat.name)}</strong><br><small>${cat.risk} · ${cat.defaultWorkUse}% default${cat.hidden ? " · hidden" : ""}</small></span>
      <span class="svg-icon" data-icon="edit"></span>
    </button>
  `).join("");
  els.categoryAdminList.querySelectorAll("[data-category-edit]").forEach(btn => btn.addEventListener("click", () => openCategorySheet(btn.dataset.categoryEdit)));
  hydrateIcons(els.categoryAdminList);
}

function renderExpenseFeeds() {
  const activeExpenses = filteredExpenses();
  els.logCount.textContent = activeExpenses.length;
  els.logExpenseFeed.innerHTML = expenseListHtml(activeExpenses, "No claims match your filters.");
  const homeExpenses = state.expenses.filter(e => e.profileId === state.activeProfileId).sort(sortByDate).slice(0, 4);
  els.homeExpenseFeed.innerHTML = expenseListHtml(homeExpenses, "No claims yet. Add your first claim.");
  [...els.logExpenseFeed.querySelectorAll("[data-expense-id]"), ...els.homeExpenseFeed.querySelectorAll("[data-expense-id]")].forEach(row => row.addEventListener("click", () => openClaimSheet(row.dataset.expenseId)));
  hydrateIcons(els.logExpenseFeed);
  hydrateIcons(els.homeExpenseFeed);
}

function expenseListHtml(items, emptyMessage) {
  if (!items.length) return `<div class="empty-state">${emptyMessage}</div>`;
  return items.sort(sortByDate).map(exp => {
    const cat = getCategory(exp.categoryId);
    const status = claimStatus(exp);
    const amount = claimableAmount(exp);
    const prof = getProfile(exp.profileId);
    return `
      <button class="expense-row" type="button" data-expense-id="${exp.id}">
        <span class="expense-icon ${cat?.color || "navy"}"><span class="svg-icon" data-icon="${cat?.icon || "folder"}"></span></span>
        <span class="expense-main">
          <strong>${escapeHtml(exp.merchant || "Untitled claim")}</strong>
          <small>${escapeHtml(cat?.name || "Other")} · ${formatDate(exp.date)} · ${toNumber(exp.workUse)}% work use${prof ? " · " + escapeHtml(prof.name) : ""}</small>
        </span>
        <span class="expense-amount">
          <strong>${money(amount, 2)}</strong>
          <span class="status-dot ${status.key}">${status.label}</span>
        </span>
      </button>`;
  }).join("");
}

function filteredExpenses() {
  const query = (state.search || "").toLowerCase();
  return state.expenses.filter(exp => {
    if (state.profileFilter === "active" && exp.profileId !== state.activeProfileId) return false;
    if (state.profileFilter && !["all", "active"].includes(state.profileFilter) && exp.profileId !== state.profileFilter) return false;
    if (state.activeCategoryId && state.activeCategoryId !== "all" && exp.categoryId !== state.activeCategoryId) return false;
    if (state.statusFilter && state.statusFilter !== "all" && claimStatus(exp).key !== state.statusFilter) return false;
    if (query) {
      const cat = getCategory(exp.categoryId)?.name || "";
      const prof = getProfile(exp.profileId)?.name || "";
      const haystack = [exp.merchant, exp.notes, cat, prof, exp.receiptName].join(" ").toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    return true;
  });
}

function renderHomeStats() {
  const profile = activeProfile();
  const expenses = state.expenses.filter(e => e.profileId === state.activeProfileId);
  const total = totalDeductions(state.activeProfileId);
  const receipts = expenses.filter(e => !!e.receiptName).length;
  const review = expenses.filter(e => ["review", "risky"].includes(claimStatus(e).key)).length;
  const tax = calculateTax(profile);
  els.homeDeductions.textContent = money(total, 0);
  els.homeReceiptRatio.textContent = `${receipts}/${expenses.length}`;
  els.homeReviewCount.textContent = review;
  els.homeOutcome.textContent = money(Math.abs(tax.outcome), 0);
  els.homeOutcomeCopy.textContent = tax.outcome >= 0 ? "Estimated refund based on current profile inputs." : "Estimated payable based on current profile inputs.";
  els.heroEstimateType.textContent = tax.outcome >= 0 ? "Refund" : "Payable";
}

function renderCategoryBars() {
  const totals = state.categories.map(cat => ({ cat, total: state.expenses.filter(e => e.profileId === state.activeProfileId && e.categoryId === cat.id).reduce((sum, e) => sum + claimableAmount(e), 0) })).filter(x => x.total > 0).sort((a, b) => b.total - a.total).slice(0, 4);
  if (!totals.length) { els.categoryBars.innerHTML = `<div class="empty-state">Category totals will appear here once you add claims.</div>`; return; }
  const max = Math.max(...totals.map(x => x.total));
  els.categoryBars.innerHTML = totals.map(({ cat, total }) => `
    <div class="category-bar">
      <div class="category-bar-top"><span>${escapeHtml(cat.name)}</span><strong>${money(total, 0)}</strong></div>
      <div class="category-bar-track"><div class="category-bar-fill" style="width:${Math.max(5, (total / max) * 100)}%"></div></div>
    </div>
  `).join("");
}

function renderTaxProfileSwitch() {
  els.taxProfileSwitch.innerHTML = state.profiles.map(p => `<button type="button" class="${p.id === state.activeProfileId ? "is-active" : ""}" data-tax-profile="${p.id}">${escapeHtml(p.name)}</button>`).join("");
  els.taxProfileSwitch.querySelectorAll("[data-tax-profile]").forEach(btn => btn.addEventListener("click", () => switchProfile(btn.dataset.taxProfile)));
}

function renderTaxForm() {
  const tax = activeProfile()?.tax || defaultProfileTax();
  els.grossIncome.value = tax.grossIncome || "";
  els.taxWithheld.value = tax.taxWithheld || "";
  els.otherIncome.value = tax.otherIncome || "";
  els.includeMedicare.checked = tax.includeMedicare !== false;
  els.hasHelpDebt.checked = !!tax.hasHelpDebt;
}

function updateActiveProfileTaxFromForm() {
  const profile = activeProfile();
  if (!profile) return;
  profile.tax = {
    grossIncome: toNumber(els.grossIncome.value),
    taxWithheld: toNumber(els.taxWithheld.value),
    otherIncome: toNumber(els.otherIncome.value),
    includeMedicare: els.includeMedicare.checked,
    hasHelpDebt: els.hasHelpDebt.checked,
  };
}

function renderTax() {
  const profile = activeProfile();
  const calc = calculateTax(profile);
  const isRefund = calc.outcome >= 0;
  els.taxOutcome.textContent = money(Math.abs(calc.outcome), 0);
  els.taxOutcomeBadge.textContent = isRefund ? "Refund" : "Payable";
  els.taxOutcomeHint.textContent = isRefund ? "Estimated refund after deductions, LITO and simplified Medicare levy." : "Estimated amount payable after deductions, LITO and simplified Medicare levy.";
  els.calcIncome.textContent = money(calc.income, 2);
  els.calcDeductions.textContent = money(calc.deductions, 2);
  els.calcTaxable.textContent = money(calc.taxable, 2);
  els.calcTaxBeforeOffsets.textContent = money(calc.taxBeforeOffsets, 2);
  els.calcLito.textContent = money(calc.lito, 2);
  els.calcMedicare.textContent = money(calc.medicare, 2);
  els.calcFinalTax.textContent = money(calc.finalTax, 2);
}

function calculateTax(profile) {
  const tax = profile?.tax || defaultProfileTax();
  const income = toNumber(tax.grossIncome) + toNumber(tax.otherIncome);
  const deductions = totalDeductions(profile?.id || state.activeProfileId);
  const taxable = Math.max(0, income - deductions);
  const taxBeforeOffsets = residentTax2026(taxable);
  const lito = lowIncomeTaxOffset(taxable);
  const medicare = tax.includeMedicare === false ? 0 : taxable * 0.02;
  const finalTax = Math.max(0, taxBeforeOffsets - lito) + medicare;
  const withheld = toNumber(tax.taxWithheld);
  return { income, deductions, taxable, taxBeforeOffsets, lito, medicare, finalTax, withheld, outcome: withheld - finalTax };
}

function residentTax2026(taxable) {
  const t = toNumber(taxable);
  if (t <= 18200) return 0;
  if (t <= 45000) return (t - 18200) * 0.16;
  if (t <= 135000) return 4288 + (t - 45000) * 0.30;
  if (t <= 190000) return 31288 + (t - 135000) * 0.37;
  return 51638 + (t - 190000) * 0.45;
}

function lowIncomeTaxOffset(taxable) {
  const t = toNumber(taxable);
  if (t <= 37500) return Math.min(700, residentTax2026(t));
  if (t <= 45000) return Math.max(0, 700 - (t - 37500) * 0.05);
  if (t <= 66667) return Math.max(0, 325 - (t - 45000) * 0.015);
  return 0;
}

function openClaimSheet(expenseId = null) {
  renderProfileOptions();
  renderCategoryOptions();
  const expense = expenseId ? state.expenses.find(e => e.id === expenseId) : null;
  els.claimForm.reset();
  els.claimId.value = expense?.id || "";
  els.claimSheetTitle.textContent = expense ? "Edit claim" : "Add claim";
  els.claimProfileId.value = expense?.profileId || state.activeProfileId;
  els.claimDate.value = expense?.date || new Date().toISOString().slice(0, 10);
  els.claimMerchant.value = expense?.merchant || "";
  els.claimCategoryId.value = expense?.categoryId || firstVisibleCategory()?.id || "cat-other";
  els.claimAmount.value = expense?.amount ?? "";
  els.claimWorkUse.value = expense?.workUse ?? getCategory(els.claimCategoryId.value)?.defaultWorkUse ?? activeProfile()?.defaultWorkUse ?? 100;
  els.claimReceiptName.value = expense?.receiptName || "";
  els.claimReimbursed.checked = !!expense?.reimbursed;
  els.claimNotes.value = expense?.notes || "";
  els.duplicateClaimButton.hidden = !expense;
  els.deleteClaimButton.hidden = !expense;
  renderClaimPreview();
  openSheet(els.claimSheet);
  setTimeout(() => els.claimMerchant.focus(), 100);
}

function closeClaimSheet() { closeSheet(els.claimSheet); }

function saveClaim(event) {
  event.preventDefault();
  const payload = {
    id: els.claimId.value || id(),
    profileId: els.claimProfileId.value,
    date: els.claimDate.value,
    merchant: els.claimMerchant.value.trim(),
    categoryId: els.claimCategoryId.value,
    amount: toNumber(els.claimAmount.value),
    workUse: clamp(toNumber(els.claimWorkUse.value), 0, 100),
    receiptName: els.claimReceiptName.value.trim(),
    reimbursed: els.claimReimbursed.checked,
    notes: els.claimNotes.value.trim(),
    updatedAt: Date.now(),
  };
  if (!payload.merchant || !payload.date) return toast("Complete required fields");
  const idx = state.expenses.findIndex(e => e.id === payload.id);
  if (idx >= 0) state.expenses[idx] = { ...state.expenses[idx], ...payload };
  else state.expenses.unshift({ ...payload, createdAt: Date.now() });
  state.activeProfileId = payload.profileId;
  persist();
  closeClaimSheet();
  renderAll();
  toast(idx >= 0 ? "Claim updated" : "Claim added");
}

function duplicateOpenClaim() {
  const exp = state.expenses.find(e => e.id === els.claimId.value);
  if (!exp) return;
  const duplicate = { ...exp, id: id(), merchant: `${exp.merchant} copy`, date: new Date().toISOString().slice(0, 10), receiptName: "", createdAt: Date.now(), updatedAt: Date.now(), sample: false };
  state.expenses.unshift(duplicate);
  persist();
  closeClaimSheet();
  renderAll();
  toast("Claim duplicated");
}

function deleteOpenClaim() {
  const exp = state.expenses.find(e => e.id === els.claimId.value);
  if (!exp) return;
  if (!confirm(`Delete claim: ${exp.merchant}?`)) return;
  state.expenses = state.expenses.filter(e => e.id !== exp.id);
  persist();
  closeClaimSheet();
  renderAll();
  toast("Claim deleted");
}

function renderClaimPreview() {
  const amount = toNumber(els.claimAmount.value);
  const workUse = clamp(toNumber(els.claimWorkUse.value), 0, 100);
  const reimbursed = els.claimReimbursed.checked;
  const temp = { categoryId: els.claimCategoryId.value, amount, workUse, receiptName: els.claimReceiptName.value.trim(), reimbursed };
  const status = claimStatus(temp);
  els.claimPreview.innerHTML = `Claimable amount: <strong>${money(reimbursed ? 0 : amount * workUse / 100, 2)}</strong> · Status: <strong>${status.label}</strong>`;
}

function openProfileSheet(profileId = null) {
  const profile = profileId ? getProfile(profileId) : null;
  els.profileForm.reset();
  els.profileId.value = profile?.id || "";
  els.profileSheetTitle.textContent = profile ? "Edit profile" : "Add profile";
  els.profileName.value = profile?.name || "";
  els.profileInitials.value = profile?.initials || "";
  els.profileColor.value = profile?.color || "navy";
  els.profilePreset.value = profile?.preset || "General employee";
  els.profileDefaultWorkUse.value = profile?.defaultWorkUse ?? 100;
  els.deleteProfileButton.hidden = !profile || state.profiles.length <= 1;
  openSheet(els.profileSheet);
  setTimeout(() => els.profileName.focus(), 100);
}

function closeProfileSheet() { closeSheet(els.profileSheet); }

function saveProfile(event) {
  event.preventDefault();
  const name = els.profileName.value.trim();
  if (!name) return toast("Enter profile name");
  const payload = {
    id: els.profileId.value || id(),
    name,
    initials: (els.profileInitials.value.trim() || makeInitials(name)).slice(0, 3).toUpperCase(),
    color: els.profileColor.value,
    preset: els.profilePreset.value,
    defaultWorkUse: clamp(toNumber(els.profileDefaultWorkUse.value || 100), 0, 100),
  };
  const idx = state.profiles.findIndex(p => p.id === payload.id);
  if (idx >= 0) state.profiles[idx] = { ...state.profiles[idx], ...payload };
  else state.profiles.push({ ...payload, tax: defaultProfileTax() });
  state.activeProfileId = payload.id;
  persist();
  closeProfileSheet();
  renderAll();
  toast(idx >= 0 ? "Profile updated" : "Profile added");
}

function deleteOpenProfile() {
  const profile = getProfile(els.profileId.value);
  if (!profile || state.profiles.length <= 1) return;
  const linked = state.expenses.filter(e => e.profileId === profile.id).length;
  if (!confirm(`Delete ${profile.name}? ${linked} linked claim(s) will also be deleted.`)) return;
  state.profiles = state.profiles.filter(p => p.id !== profile.id);
  state.expenses = state.expenses.filter(e => e.profileId !== profile.id);
  state.activeProfileId = state.profiles[0].id;
  persist();
  closeProfileSheet();
  renderAll();
  toast("Profile deleted");
}

function openCategorySheet(categoryId = null) {
  const cat = categoryId ? getCategory(categoryId) : null;
  els.categoryForm.reset();
  els.categoryId.value = cat?.id || "";
  els.categorySheetTitle.textContent = cat ? "Edit category" : "Add category";
  els.categoryName.value = cat?.name || "";
  els.categoryIcon.value = cat?.icon || "folder";
  els.categoryColor.value = cat?.color || "navy";
  els.categoryDefaultWorkUse.value = cat?.defaultWorkUse ?? 100;
  els.categoryRisk.value = cat?.risk || "Review";
  els.categoryReceiptRequired.checked = cat?.receiptRequired !== false;
  els.categoryHidden.checked = !!cat?.hidden;
  els.deleteCategoryButton.hidden = !cat || state.expenses.some(e => e.categoryId === cat.id) || state.categories.length <= 1;
  openSheet(els.categorySheet);
}

function closeCategorySheet() { closeSheet(els.categorySheet); }

function saveCategory(event) {
  event.preventDefault();
  const name = els.categoryName.value.trim();
  if (!name) return toast("Enter category name");
  const payload = {
    id: els.categoryId.value || id("cat"),
    name,
    icon: els.categoryIcon.value,
    color: els.categoryColor.value,
    defaultWorkUse: clamp(toNumber(els.categoryDefaultWorkUse.value || 100), 0, 100),
    risk: els.categoryRisk.value,
    receiptRequired: els.categoryReceiptRequired.checked,
    hidden: els.categoryHidden.checked,
    system: false,
  };
  const idx = state.categories.findIndex(c => c.id === payload.id);
  if (idx >= 0) state.categories[idx] = { ...state.categories[idx], ...payload };
  else state.categories.push(payload);
  persist();
  closeCategorySheet();
  renderAll();
  openSettingsSheet("categories");
  toast(idx >= 0 ? "Category updated" : "Category added");
}

function deleteOpenCategory() {
  const cat = getCategory(els.categoryId.value);
  if (!cat || state.expenses.some(e => e.categoryId === cat.id)) return toast("Category is used by claims");
  if (!confirm(`Delete category: ${cat.name}?`)) return;
  state.categories = state.categories.filter(c => c.id !== cat.id);
  if (state.activeCategoryId === cat.id) state.activeCategoryId = "all";
  persist();
  closeCategorySheet();
  renderAll();
  openSettingsSheet("categories");
  toast("Category deleted");
}

function openSettingsSheet(panel = "appearance") {
  syncSettingsInputs();
  showSettingsPanel(panel || "appearance");
  openSheet(els.settingsSheet);
}

function closeSettingsSheet() { closeSheet(els.settingsSheet); }

function showSettingsPanel(name) {
  els.settingsTabs.querySelectorAll("button").forEach(b => b.classList.toggle("is-active", b.dataset.settingsTab === name));
  $$(".settings-panel").forEach(p => p.classList.toggle("is-active", p.dataset.settingsPanel === name));
}

function syncSettingsInputs() {
  const s = state.settings;
  els.settingTheme.value = s.theme || "system";
  els.settingAccent.value = s.accent || "green";
  els.settingTaxYear.value = s.taxYear || "2025–26";
  els.settingStartScreen.value = s.startScreen || "home";
  els.settingCurrencyDecimals.checked = !!s.currencyDecimals;
  els.settingShowOutcome.checked = s.showOutcome !== false;
  els.settingShowProfiles.checked = s.showProfiles !== false;
  els.settingShowCategories.checked = s.showCategories !== false;
  els.settingShowRecent.checked = s.showRecent !== false;
  els.settingCompactList.checked = !!s.compactList;
}

function saveAppearanceSettings() {
  state.settings.theme = els.settingTheme.value;
  state.settings.accent = els.settingAccent.value;
  state.settings.taxYear = els.settingTaxYear.value.trim() || "2025–26";
  state.settings.startScreen = els.settingStartScreen.value;
  state.settings.currencyDecimals = els.settingCurrencyDecimals.checked;
  persist();
  renderAll();
  toast("Appearance saved");
}

function saveDashboardSettings() {
  state.settings.showOutcome = els.settingShowOutcome.checked;
  state.settings.showProfiles = els.settingShowProfiles.checked;
  state.settings.showCategories = els.settingShowCategories.checked;
  state.settings.showRecent = els.settingShowRecent.checked;
  state.settings.compactList = els.settingCompactList.checked;
  persist();
  renderAll();
  toast("Dashboard saved");
}

function exportCsv() {
  const rows = [["Profile", "Date", "Merchant", "Category", "Amount", "Work use %", "Claimable", "Receipt", "Reimbursed", "Status", "Notes"]];
  state.expenses.sort(sortByDate).forEach(e => rows.push([
    getProfile(e.profileId)?.name || "", e.date, e.merchant, getCategory(e.categoryId)?.name || "", e.amount, e.workUse, claimableAmount(e), e.receiptName || "", e.reimbursed ? "Yes" : "No", claimStatus(e).label, e.notes || ""
  ]));
  downloadFile(`lodgr-claims-${today()}.csv`, rows.map(row => row.map(csvEscape).join(",")).join("\n"), "text/csv");
  toast("CSV exported");
}

function exportJson() {
  downloadFile(`lodgr-backup-${today()}.json`, JSON.stringify(state, null, 2), "application/json");
  toast("Backup exported");
}

function importJson(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const imported = JSON.parse(reader.result);
      state = normalizeImportedState(imported);
      persist();
      closeSettingsSheet();
      renderAll();
      toast("Backup imported");
    } catch (error) {
      toast("Import failed");
    } finally {
      event.target.value = "";
    }
  };
  reader.readAsText(file);
}

function clearAllClaims() {
  if (!confirm("Clear all claims? Profiles and categories will remain.")) return;
  state.expenses = [];
  persist();
  renderAll();
  toast("All claims cleared");
}

function clearSampleData() {
  const before = state.expenses.length;
  state.expenses = state.expenses.filter(e => !e.sample);
  persist();
  renderAll();
  toast(before === state.expenses.length ? "No demo claims found" : "Demo claims removed");
}

function resetAllData() {
  if (!confirm("Reset Lodgr completely? This removes profiles, categories, claims and settings.")) return;
  localStorage.removeItem(STORAGE_KEY);
  state = defaultState();
  persist();
  renderAll();
  toast("Lodgr reset");
}

function renderProfileOptions() {
  els.claimProfileId.innerHTML = state.profiles.map(p => `<option value="${p.id}">${escapeHtml(p.name)}</option>`).join("");
}

function openSheet(sheet) { sheet.hidden = false; document.body.style.overflow = "hidden"; hydrateIcons(sheet); }
function closeSheet(sheet) { sheet.hidden = true; document.body.style.overflow = ""; }

function claimStatus(exp) {
  if (exp.reimbursed) return { key: "excluded", label: "Excluded" };
  const cat = getCategory(exp.categoryId);
  if (cat?.risk === "Risky") return { key: "risky", label: "Risky" };
  if ((cat?.receiptRequired ?? true) && !exp.receiptName) return { key: "review", label: "Review" };
  if (toNumber(exp.workUse) < 100 || cat?.risk === "Review") return { key: "review", label: "Review" };
  return { key: "strong", label: "Strong" };
}

function claimableAmount(exp) { return exp.reimbursed ? 0 : toNumber(exp.amount) * clamp(toNumber(exp.workUse), 0, 100) / 100; }
function totalDeductions(profileId) { return state.expenses.filter(e => e.profileId === profileId).reduce((sum, e) => sum + claimableAmount(e), 0); }
function activeProfile() { return getProfile(state.activeProfileId) || state.profiles[0]; }
function getProfile(id) { return state.profiles.find(p => p.id === id); }
function getCategory(id) { return state.categories.find(c => c.id === id); }
function firstVisibleCategory() { return state.categories.find(c => !c.hidden) || state.categories[0]; }
function sortByDate(a, b) { return String(b.date || "").localeCompare(String(a.date || "")) || (b.createdAt || 0) - (a.createdAt || 0); }

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return normalizeImportedState(JSON.parse(raw));
    const legacyRaw = localStorage.getItem(LEGACY_KEY);
    if (legacyRaw) return migrateLegacyState(JSON.parse(legacyRaw));
  } catch (error) {}
  return defaultState();
}

function migrateLegacyState(legacy) {
  const next = defaultState();
  if (Array.isArray(legacy.profiles)) {
    next.profiles = legacy.profiles.map((p, index) => ({
      id: p.id || id("p"), name: p.name || `Profile ${index + 1}`, initials: makeInitials(p.name || `P${index + 1}`), preset: p.preset || "General employee", color: index === 0 ? "navy" : "purple", defaultWorkUse: 100, tax: index === 0 ? { ...next.profiles[0].tax, ...(legacy.taxInputs || {}) } : defaultProfileTax(),
    }));
  }
  if (legacy.activeProfileId && next.profiles.some(p => p.id === legacy.activeProfileId)) next.activeProfileId = legacy.activeProfileId;
  const categoryByName = new Map(next.categories.map(c => [c.name.toLowerCase(), c.id]));
  if (Array.isArray(legacy.expenses)) {
    next.expenses = legacy.expenses.map(e => ({
      id: e.id || id(), profileId: e.profileId || next.activeProfileId, date: e.date || today(), merchant: e.merchant || "Untitled claim", categoryId: categoryByName.get(String(e.category || "other").toLowerCase()) || "cat-other", amount: toNumber(e.amount), workUse: toNumber(e.workUse || 100), receiptName: e.receiptName || "", reimbursed: false, notes: e.notes || "", createdAt: e.createdAt || Date.now(), updatedAt: e.updatedAt || Date.now(),
    }));
  }
  persist(next);
  return next;
}

function normalizeImportedState(input) {
  const base = defaultState();
  const next = { ...base, ...input };
  next.settings = { ...base.settings, ...(input.settings || {}) };
  next.profiles = Array.isArray(input.profiles) && input.profiles.length ? input.profiles.map((p, index) => ({ ...base.profiles[index] || {}, ...p, id: p.id || id("p"), name: p.name || `Profile ${index + 1}`, initials: p.initials || makeInitials(p.name || `P${index + 1}`), tax: { ...defaultProfileTax(), ...(p.tax || {}) } })) : base.profiles;
  next.categories = Array.isArray(input.categories) && input.categories.length ? input.categories.map(c => ({ ...defaultCategories.find(d => d.id === c.id) || {}, ...c, id: c.id || id("cat"), name: c.name || "Category" })) : clone(defaultCategories);
  next.expenses = Array.isArray(input.expenses) ? input.expenses.map(e => ({ id: e.id || id(), profileId: e.profileId || next.profiles[0].id, date: e.date || today(), merchant: e.merchant || "Untitled claim", categoryId: e.categoryId || "cat-other", amount: toNumber(e.amount), workUse: clamp(toNumber(e.workUse || 100), 0, 100), receiptName: e.receiptName || "", reimbursed: !!e.reimbursed, notes: e.notes || "", createdAt: e.createdAt || Date.now(), updatedAt: e.updatedAt || Date.now(), sample: !!e.sample })) : [];
  if (!next.profiles.some(p => p.id === next.activeProfileId)) next.activeProfileId = next.profiles[0].id;
  return next;
}

function normalizeState() {
  if (!state.profiles.length) state.profiles = defaultState().profiles;
  if (!state.categories.length) state.categories = clone(defaultCategories);
  if (!getProfile(state.activeProfileId)) state.activeProfileId = state.profiles[0].id;
  state.expenses.forEach(e => { if (!getCategory(e.categoryId)) e.categoryId = "cat-other"; if (!getProfile(e.profileId)) e.profileId = state.activeProfileId; });
}

function persist(customState = state) { localStorage.setItem(STORAGE_KEY, JSON.stringify(customState)); }

function hydrateIcons(container = document) {
  container.querySelectorAll(".svg-icon").forEach(node => {
    const name = node.dataset.icon;
    if (!name) return;
    node.innerHTML = `<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">${iconPaths[name] || iconPaths.folder}</svg>`;
  });
}

function downloadFile(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) window.addEventListener("load", () => navigator.serviceWorker.register("sw.js?v=3.0.0").catch(() => {}));
}

function money(value, forcedDecimals = null) {
  const decimals = forcedDecimals === null ? (state.settings.currencyDecimals ? 2 : 0) : forcedDecimals;
  return new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: decimals, minimumFractionDigits: decimals }).format(toNumber(value));
}
function formatDate(date) { if (!date) return "No date"; const d = new Date(`${date}T00:00:00`); return d.toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" }); }
function today() { return new Date().toISOString().slice(0, 10); }
function toNumber(value) { const n = Number(value); return Number.isFinite(n) ? n : 0; }
function clamp(value, min, max) { return Math.min(max, Math.max(min, value)); }
function title(value) { return String(value).charAt(0).toUpperCase() + String(value).slice(1); }
function clone(value) { return JSON.parse(JSON.stringify(value)); }
function id(prefix = "id") { if (crypto?.randomUUID) return `${prefix}-${crypto.randomUUID()}`; return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`; }
function makeInitials(name) { return String(name || "P").split(/\s+/).filter(Boolean).map(part => part[0]).slice(0, 2).join("").toUpperCase() || "P"; }
function csvEscape(value) { const text = String(value ?? ""); return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text; }
function escapeHtml(value) { return String(value ?? "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char])); }
function toast(message) { els.toast.textContent = message; els.toast.classList.add("show"); clearTimeout(toast.timer); toast.timer = setTimeout(() => els.toast.classList.remove("show"), 2200); }
