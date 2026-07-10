const STORAGE_KEY = "lodgr.v3.state";
const APP_VERSION = "4.2.0";

const iconPaths = {
  plus:'<path d="M12 5v14"/><path d="M5 12h14"/>',
  close:'<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  home:'<path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/>',
  receipt:'<path d="M7 3h10a2 2 0 0 1 2 2v16l-3-1.5-2 1.5-2-1.5-2 1.5-2-1.5L5 21V5a2 2 0 0 1 2-2Z"/><path d="M9 8h6"/><path d="M9 12h6"/><path d="M9 16h4"/>',
  calculator:'<rect x="4" y="3" width="16" height="18" rx="3"/><path d="M8 7h8"/><path d="M8 11h.01"/><path d="M12 11h.01"/><path d="M16 11h.01"/><path d="M8 15h.01"/><path d="M12 15h.01"/><path d="M16 15h.01"/>',
  person:'<circle cx="12" cy="8" r="4"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/>',
  settings:'<path d="M4 7h7"/><path d="M15 7h5"/><circle cx="13" cy="7" r="2"/><path d="M4 12h3"/><path d="M11 12h9"/><circle cx="9" cy="12" r="2"/><path d="M4 17h10"/><path d="M18 17h2"/><circle cx="16" cy="17" r="2"/>',
  search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  download:'<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>',
  edit:'<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
  trash:'<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 15H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/>',
  warning:'<path d="M10.3 4.3 2.6 18a2 2 0 0 0 1.8 3h15.2a2 2 0 0 0 1.8-3L13.7 4.3a2 2 0 0 0-3.4 0Z"/><path d="M12 9v5"/><path d="M12 18h.01"/>',
  category:'<path d="M4 4h7v7H4z"/><path d="M13 4h7v7h-7z"/><path d="M4 13h7v7H4z"/><path d="M13 13h7v7h-7z"/>',
  palette:'<path d="M12 3a9 9 0 0 0 0 18h1.2a1.8 1.8 0 0 0 1.2-3.1 1.5 1.5 0 0 1 1-2.6H17a4 4 0 0 0 4-4.1C21 6.7 17 3 12 3Z"/><path d="M7.5 10h.01"/><path d="M10 7.5h.01"/><path d="M14 7.5h.01"/><path d="M16.5 10h.01"/>',
  cloud:'<path d="M17.5 19H7a5 5 0 0 1-.8-9.9A7 7 0 0 1 19.8 11 4 4 0 0 1 17.5 19Z"/><path d="M12 12v6"/><path d="m9 15 3 3 3-3"/>',
  dashboard:'<path d="M4 13h7V4H4z"/><path d="M13 20h7V4h-7z"/><path d="M4 20h7v-5H4z"/>',
  'plus-circle':'<circle cx="12" cy="12" r="9"/><path d="M12 8v8"/><path d="M8 12h8"/>',
  'chevron-right':'<path d="m9 18 6-6-6-6"/>',
  'chevron-down':'<path d="m6 9 6 6 6-6"/>',
  graduation:'<path d="m2 8 10-5 10 5-10 5Z"/><path d="M6 10v5c2 2 10 2 12 0v-5"/><path d="M22 8v6"/>',
  laptop:'<path d="M5 5h14v10H5z"/><path d="M2 19h20"/><path d="M8 15h8"/>',
  coin:'<circle cx="12" cy="12" r="9"/><path d="M12 7v10"/><path d="M15.5 9.2A4.2 4.2 0 0 0 12 8c-2 0-3.2.9-3.2 2.2 0 3.3 6.4 1.4 6.4 4.7 0 1.3-1.3 2.1-3.4 2.1a5.4 5.4 0 0 1-3.6-1.2"/>',
  shield:'<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/>',
  car:'<path d="M5 16h14"/><path d="M7 16l1.5-5h7L17 16"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
  shirt:'<path d="M8 4 4 6l-2 5 4 2v7h12v-7l4-2-2-5-4-2a4 4 0 0 1-8 0Z"/>',
  phone:'<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
  folder:'<path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3Z"/>',
  health:'<path d="M12 5v14"/><path d="M5 12h14"/>',
  cart:'<path d="M6 6h15l-2 8H8L6 3H3"/><circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/>',
  tool:'<path d="M14.7 6.3a4 4 0 0 0-5 5L4 17l3 3 5.7-5.7a4 4 0 0 0 5-5l-3 3-3-3Z"/>'
};

const iconOptions = [["graduation","Education"],["laptop","Equipment"],["coin","Subscription"],["shield","Registration"],["car","Travel"],["shirt","Uniform"],["phone","Phone"],["health","Health"],["cart","Supplies"],["folder","Other"]];
const colors = ["green","blue","purple","amber","rose","navy"];
const defaultCategories = [
  {id:"cat-education",name:"Education",icon:"graduation",color:"blue",defaultWorkUse:100,risk:"Strong",receiptRequired:true,hidden:false,system:true},
  {id:"cat-equipment",name:"Equipment",icon:"laptop",color:"purple",defaultWorkUse:80,risk:"Review",receiptRequired:true,hidden:false,system:true},
  {id:"cat-subscription",name:"Subscription",icon:"coin",color:"green",defaultWorkUse:60,risk:"Review",receiptRequired:true,hidden:false,system:true},
  {id:"cat-registration",name:"Registration",icon:"shield",color:"amber",defaultWorkUse:100,risk:"Strong",receiptRequired:true,hidden:false,system:true},
  {id:"cat-travel",name:"Travel",icon:"car",color:"rose",defaultWorkUse:100,risk:"Review",receiptRequired:true,hidden:false,system:true},
  {id:"cat-uniform",name:"Uniform",icon:"shirt",color:"navy",defaultWorkUse:100,risk:"Review",receiptRequired:true,hidden:false,system:true},
  {id:"cat-other",name:"Other",icon:"folder",color:"navy",defaultWorkUse:100,risk:"Risky",receiptRequired:true,hidden:false,system:true},
];
const taxDefaults = () => ({grossIncome:0,taxWithheld:0,otherIncome:0,includeMedicare:true,hasHelpDebt:false});
const defaultState = () => ({
  version:APP_VERSION,activeScreen:"home",activeProfileId:"p1",statusFilter:"all",categoryFilter:"all",profileFilter:"all",search:"",
  settings:{theme:"system",accent:"green",taxYear:"2025–26",startScreen:"home",currencyDecimals:true,showProfiles:true,showCategories:true,showRecent:true},
  profiles:[
    {id:"p1",name:"Jashan",initials:"J",preset:"Nurse / aged care",color:"navy",defaultWorkUse:100,tax:{grossIncome:85000,taxWithheld:18500,otherIncome:0,includeMedicare:true,hasHelpDebt:false}},
    {id:"p2",name:"Srishti",initials:"S",preset:"General employee",color:"purple",defaultWorkUse:70,tax:taxDefaults()}
  ],
  categories:clone(defaultCategories),
  expenses:[
    {id:id(),profileId:"p2",date:"2026-07-02",merchant:"Officeworks",categoryId:"cat-equipment",amount:49.95,workUse:70,receiptName:"receipt.jpg",reimbursed:false,notes:"Stationery used for work.",sample:true,createdAt:Date.now()-5e6,updatedAt:Date.now()-5e6},
    {id:id(),profileId:"p1",date:"2026-07-01",merchant:"Uber",categoryId:"cat-travel",amount:36.84,workUse:50,receiptName:"uber.pdf",reimbursed:false,notes:"Work travel.",sample:true,createdAt:Date.now()-4e6,updatedAt:Date.now()-4e6},
    {id:id(),profileId:"p1",date:"2026-07-01",merchant:"Cafe Lunch",categoryId:"cat-other",amount:12.5,workUse:100,receiptName:"",reimbursed:false,notes:"Review if deductible.",sample:true,createdAt:Date.now()-3e6,updatedAt:Date.now()-3e6},
    {id:id(),profileId:"p1",date:"2026-06-30",merchant:"Flight to SYD",categoryId:"cat-travel",amount:156.8,workUse:100,receiptName:"flight.pdf",reimbursed:false,notes:"Work-related travel.",sample:true,createdAt:Date.now()-2e6,updatedAt:Date.now()-2e6}
  ]
});

let state = loadState();
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const els = {};

boot();
function boot(){
  Object.assign(els,{
    shell:$("#appShell"), screens:$$(".screen"), tabs:$$(".tab"), toast:$("#toast"),
    topProfileInitial:$("#topProfileInitial"), topProfileName:$("#topProfileName"), homeYearTitle:$("#homeYearTitle"), homeDeductions:$("#homeDeductions"), homeReceiptRatio:$("#homeReceiptRatio"), homeReceiptProgress:$("#homeReceiptProgress"), homeReviewCount:$("#homeReviewCount"), homeClaimList:$("#homeClaimList"), categoryBars:$("#categoryBars"), homeCategoriesSection:$("#homeCategoriesSection"), homeRecentSection:$("#homeRecentSection"),
    searchInput:$("#searchInput"), profileFilter:$("#profileFilter"), categoryFilter:$("#categoryFilter"), allClaimList:$("#allClaimList"), reviewFilterCount:$("#reviewFilterCount"), filterChips:$("#filterChips"),
    taxYearRow:$("#taxYearRow"), taxProfileLabel:$("#taxProfileLabel"), calcDeductions:$("#calcDeductions"), calcReimbursements:$("#calcReimbursements"), calcTaxableDeductions:$("#calcTaxableDeductions"), calcSaving:$("#calcSaving"), taxOutcome:$("#taxOutcome"), taxOutcomeLabel:$("#taxOutcomeLabel"), grossIncome:$("#grossIncome"), taxWithheld:$("#taxWithheld"), otherIncome:$("#otherIncome"), includeMedicare:$("#includeMedicare"), hasHelpDebt:$("#hasHelpDebt"), checklistScore:$("#checklistScore"), receiptCheck:$("#receiptCheck"), workUseCheck:$("#workUseCheck"), reimbursedCheck:$("#reimbursedCheck"),
    profileList:$("#profileList"),
    claimSheet:$("#claimSheet"), claimForm:$("#claimForm"), claimId:$("#claimId"), claimMode:$("#claimMode"), claimSheetTitle:$("#claimSheetTitle"), claimProfileId:$("#claimProfileId"), claimDate:$("#claimDate"), claimMerchant:$("#claimMerchant"), claimCategoryId:$("#claimCategoryId"), claimAmount:$("#claimAmount"), claimWorkUse:$("#claimWorkUse"), claimReceiptName:$("#claimReceiptName"), claimReimbursed:$("#claimReimbursed"), claimNotes:$("#claimNotes"), claimPreview:$("#claimPreview"), duplicateClaimButton:$("#duplicateClaimButton"), deleteClaimButton:$("#deleteClaimButton"),
    profileSheet:$("#profileSheet"), profileForm:$("#profileForm"), profileId:$("#profileId"), profileName:$("#profileName"), profileInitials:$("#profileInitials"), profileColor:$("#profileColor"), profilePreset:$("#profilePreset"), profileDefaultWorkUse:$("#profileDefaultWorkUse"), profileSheetTitle:$("#profileSheetTitle"), deleteProfileButton:$("#deleteProfileButton"),
    categorySheet:$("#categorySheet"), categoryForm:$("#categoryForm"), categoryId:$("#categoryId"), categoryName:$("#categoryName"), categoryIcon:$("#categoryIcon"), categoryColor:$("#categoryColor"), categoryDefaultWorkUse:$("#categoryDefaultWorkUse"), categoryRisk:$("#categoryRisk"), categoryReceiptRequired:$("#categoryReceiptRequired"), categoryHidden:$("#categoryHidden"), categorySheetTitle:$("#categorySheetTitle"), deleteCategoryButton:$("#deleteCategoryButton"),
    panelSheet:$("#panelSheet"), panelTitle:$("#panelTitle"), panelBody:$("#panelBody"), importJsonInput:$("#importJsonInput"),
    profileSwitchSheet:$("#profileSwitchSheet"), profileSwitchList:$("#profileSwitchList")
  });
  bindEvents(); normalizeState(); hydrateIcons(); populateOptions(); applySettings(); showScreen(state.activeScreen||state.settings.startScreen||"home", false); renderAll(); registerServiceWorker();
}
function bindEvents(){
  els.tabs.forEach(t=>t.addEventListener("click",()=>showScreen(t.dataset.tab)));
  document.addEventListener("click", e=>{
    if(e.target.closest("[data-open-profile-switch]")){openProfileSwitch();return;}
    if(e.target.closest("[data-close-profile-switch]")){closeSheet(els.profileSwitchSheet);return;}
    const profileChoice=e.target.closest("[data-profile-choice]"); if(profileChoice){switchProfile(profileChoice.dataset.profileChoice,true);return;}
    if(e.target.closest("[data-add-profile-switch]")){closeSheet(els.profileSwitchSheet);openProfileSheet();return;}
    const jump=e.target.closest("[data-jump]"); if(jump){showScreen(jump.dataset.jump);return;}
    if(e.target.closest("[data-new-claim]")){openClaimSheet();return;}
    if(e.target.closest("[data-new-profile]")){openProfileSheet();return;}
    const panel=e.target.closest("[data-open-panel]"); if(panel){openPanel(panel.dataset.openPanel);return;}
    if(e.target.closest("[data-close-panel]")){closeSheet(els.panelSheet);return;}
    if(e.target.closest("[data-close-claim]")){closeSheet(els.claimSheet);return;}
    if(e.target.closest("[data-close-profile]")){closeSheet(els.profileSheet);return;}
    if(e.target.closest("[data-close-category]")){closeSheet(els.categorySheet);return;}
    if(e.target.closest("[data-export-csv]")){exportCsv();return;}
    if(e.target.closest("[data-clear-sample]")){clearSampleData();return;}
    if(e.target.closest("[data-reset-all]")){resetAllData();return;}
  });
  [els.claimSheet,els.profileSheet,els.categorySheet,els.panelSheet,els.profileSwitchSheet].forEach(sheet=>sheet.addEventListener("click",e=>{if(e.target===sheet)closeSheet(sheet)}));
  els.claimForm.addEventListener("submit",saveClaim); els.profileForm.addEventListener("submit",saveProfile); els.categoryForm.addEventListener("submit",saveCategory);
  [els.claimAmount,els.claimWorkUse,els.claimReimbursed].forEach(el=>el.addEventListener("input",renderClaimPreview));
  els.claimCategoryId.addEventListener("change",()=>{const c=getCategory(els.claimCategoryId.value); if(!els.claimId.value && c) els.claimWorkUse.value=c.defaultWorkUse??100; renderClaimPreview();});
  els.duplicateClaimButton.addEventListener("click",duplicateOpenClaim); els.deleteClaimButton.addEventListener("click",deleteOpenClaim); els.deleteProfileButton.addEventListener("click",deleteOpenProfile); els.deleteCategoryButton.addEventListener("click",deleteOpenCategory);
  els.searchInput.addEventListener("input",()=>{state.search=els.searchInput.value.trim();persist();renderClaims();});
  els.profileFilter.addEventListener("change",()=>{state.profileFilter=els.profileFilter.value;persist();renderClaims();});
  els.categoryFilter.addEventListener("change",()=>{state.categoryFilter=els.categoryFilter.value;persist();renderClaims();});
  els.filterChips.addEventListener("click",e=>{const b=e.target.closest("button[data-status]"); if(!b)return; state.statusFilter=b.dataset.status;persist();renderClaims();});
  [els.grossIncome,els.taxWithheld,els.otherIncome,els.includeMedicare,els.hasHelpDebt].forEach(el=>el.addEventListener("input",()=>{updateTaxFromForm();persist();renderStats();}));
  els.importJsonInput.addEventListener("change",importJson);
  els.panelBody.addEventListener("click", panelClick);
}
function populateOptions(){
  els.categoryIcon.innerHTML=iconOptions.map(([v,l])=>`<option value="${v}">${l}</option>`).join("");
}
function renderAll(){applySettings();renderFilters();renderProfiles();renderCategories();renderClaims();renderTaxForm();renderStats();hydrateIcons();}
function applySettings(){
  const s=state.settings||{}; document.documentElement.dataset.accent=s.accent||"green"; document.documentElement.dataset.theme=s.theme||"system";
  els.homeCategoriesSection.classList.toggle("hidden",s.showCategories===false); els.homeRecentSection.classList.toggle("hidden",s.showRecent===false);
  els.taxYearRow.textContent=`FY ${s.taxYear||"2025–26"}`;
  if(els.homeYearTitle) els.homeYearTitle.textContent=`${s.taxYear||"2025–26"} overview`;
}
function showScreen(name,save=true){
  if(!["home","log","tax","profile"].includes(name)) name="home"; els.screens.forEach(s=>s.classList.toggle("is-active",s.dataset.screen===name)); els.tabs.forEach(t=>t.classList.toggle("is-active",t.dataset.tab===name)); if(save){state.activeScreen=name;persist();} window.scrollTo({top:0,behavior:"smooth"});
}
function renderStats(){
  const active=activeProfile(); if(!active)return; const deductions=totalDeductions(active.id); const activeClaims=state.expenses.filter(e=>e.profileId===active.id); const withReceipts=activeClaims.filter(e=>e.receiptName).length; const review=activeClaims.filter(e=>statusFor(e)!=="strong"&&!e.reimbursed).length;
  els.topProfileInitial.textContent=active.initials||makeInitials(active.name); els.topProfileName.textContent=active.name; els.topProfileInitial.className=`mini-avatar ${active.color||"navy"}`;
  els.homeDeductions.textContent=money(deductions); els.homeReceiptRatio.textContent=`${withReceipts} of ${activeClaims.length}`; els.homeReviewCount.textContent=review;
  if(els.homeReceiptProgress) els.homeReceiptProgress.style.width=`${activeClaims.length?Math.round(withReceipts/activeClaims.length*100):0}%`;
  els.reviewFilterCount.textContent=state.expenses.filter(e=>statusFor(e)==="review"||statusFor(e)==="risky").length;
  const reimb=state.expenses.filter(e=>e.profileId===active.id&&e.reimbursed).reduce((a,e)=>a+claimable(e,true),0); const taxableDed=Math.max(0,deductions-reimb); const tax=calculateTax(active,taxableDed); const saving=estimateSaving(active,taxableDed);
  els.taxProfileLabel.textContent=active.name; els.calcDeductions.textContent=money(deductions); els.calcReimbursements.textContent=`− ${money(reimb)}`; els.calcTaxableDeductions.textContent=money(taxableDed); els.calcSaving.textContent=money(saving);
  const outcome=tax.refund; els.taxOutcome.textContent=money(Math.abs(outcome)); els.taxOutcomeLabel.textContent=outcome>=0?"Estimated refund":"Estimated payable";
  const receiptsOk=activeClaims.length===0 || withReceipts===activeClaims.length; const workOk=activeClaims.every(e=>Number(e.workUse)>=0&&Number(e.workUse)<=100); const reimbOk=activeClaims.every(e=>!e.reimbursed || claimable(e)===0); const okCount=[receiptsOk,workOk,reimbOk].filter(Boolean).length;
  els.receiptCheck.className=`status-dot ${receiptsOk?"ok":"warn"}`; els.workUseCheck.className=`status-dot ${workOk?"ok":"warn"}`; els.reimbursedCheck.className=`status-dot ${reimbOk?"ok":"warn"}`; els.checklistScore.textContent=`${okCount}/3`;
}
function renderProfiles(){
  els.profileList.innerHTML=state.profiles.map(p=>`<button class="profile-line ${p.id===state.activeProfileId?"is-active":""}" type="button" data-edit-profile="${p.id}"><span class="avatar ${p.color||"navy"}">${esc(p.initials||makeInitials(p.name))}</span><span><strong>${esc(p.name)}</strong><small>${esc(p.preset||"General employee")}</small></span><span class="amount">${money(totalDeductions(p.id))}<br><small>Deductions</small></span></button>`).join("");
  els.profileList.querySelectorAll("[data-edit-profile]").forEach(b=>b.addEventListener("click",()=>openProfileSheet(b.dataset.editProfile)));
  if(els.profileSwitchList){
    els.profileSwitchList.innerHTML=state.profiles.map(p=>`<button class="profile-switch-row ${p.id===state.activeProfileId?"is-active":""}" type="button" data-profile-choice="${p.id}"><span class="avatar ${p.color||"navy"}">${esc(p.initials||makeInitials(p.name))}</span><span class="profile-switch-copy"><strong>${esc(p.name)}</strong><small>${esc(p.preset||"General employee")}</small></span><span class="profile-switch-amount">${money(totalDeductions(p.id))}</span>${p.id===state.activeProfileId?'<span class="profile-check">✓</span>':'<span class="svg-icon tiny" data-icon="chevron-right"></span>'}</button>`).join("")+`<button class="profile-switch-row add-profile-row" type="button" data-add-profile-switch><span class="avatar add-avatar">+</span><span class="profile-switch-copy"><strong>Add another profile</strong><small>Create a separate taxpayer record</small></span><span class="svg-icon tiny" data-icon="chevron-right"></span></button>`;
    hydrateIcons(els.profileSwitchList);
  }
}
function renderFilters(){
  els.profileFilter.innerHTML=`<option value="all">All profiles</option><option value="active">Active profile</option>`+state.profiles.map(p=>`<option value="${p.id}">${esc(p.name)}</option>`).join(""); els.profileFilter.value=state.profileFilter||"all";
  els.categoryFilter.innerHTML=`<option value="all">All categories</option>`+visibleCategories().map(c=>`<option value="${c.id}">${esc(c.name)}</option>`).join(""); els.categoryFilter.value=state.categoryFilter||"all";
  els.claimProfileId.innerHTML=state.profiles.map(p=>`<option value="${p.id}">${esc(p.name)}</option>`).join("");
  els.claimCategoryId.innerHTML=visibleCategories().map(c=>`<option value="${c.id}">${esc(c.name)}</option>`).join("");
  els.filterChips.querySelectorAll("button[data-status]").forEach(b=>b.classList.toggle("is-active",b.dataset.status===(state.statusFilter||"all")));
}
function renderClaims(){
  const all=filteredClaims(); const recent=state.expenses.filter(e=>e.profileId===state.activeProfileId).sort(byDate).slice(0,5);
  els.homeClaimList.innerHTML=recent.length?recent.map(homeClaimRow).join(""):`<div class="empty">No claims yet. Add one to start your register.</div>`;
  els.allClaimList.innerHTML=all.length?all.map(e=>claimRow(e,true)).join(""):`<div class="empty">No matching claims.</div>`;
  [...els.homeClaimList.querySelectorAll("[data-edit-claim]"),...els.allClaimList.querySelectorAll("[data-edit-claim]")].forEach(b=>b.addEventListener("click",()=>openClaimSheet(b.dataset.editClaim)));
  renderStats(); hydrateIcons();
}
function homeClaimRow(e){
  const c=getCategory(e.categoryId)||{}; const p=getProfile(e.profileId)||{}; const st=statusFor(e); const statusText=e.reimbursed?"Excluded":st==="strong"?"Approved":st==="risky"?"Risky":"Review"; const color=c.color||"navy";
  const active=activeProfile(); const profileSuffix=p.id!==active?.id?` · ${esc(p.name||"")}`:"";
  return `<button class="home-claim-row" type="button" data-edit-claim="${e.id}"><span class="claim-icon accent-${color}"><span class="svg-icon" data-icon="${c.icon||"folder"}"></span></span><span class="claim-main"><strong>${esc(e.merchant)}</strong><small>${esc(c.name||"Other")} · ${formatDay(e.date)} · ${num(e.workUse)}%${profileSuffix}</small></span><span class="claim-amount"><strong>${money(claimable(e))}</strong><small class="status ${st}">${statusText}</small></span><span class="svg-icon tiny chev" data-icon="chevron-right"></span></button>`;
}
function claimRow(e,full=false){
  const c=getCategory(e.categoryId)||{}; const p=getProfile(e.profileId)||{}; const st=statusFor(e); const statusText=e.reimbursed?"Excluded":st==="strong"?"Approved":st==="risky"?"Risky":"Review"; const color=c.color||"navy";
  if(full){return `<button class="claim-row" type="button" data-edit-claim="${e.id}"><span class="claim-icon accent-${color}"><span class="svg-icon" data-icon="${c.icon||"folder"}"></span></span><span class="date-cell">${formatDay(e.date)}<br>${formatYear(e.date)}</span><span class="claim-main"><strong>${esc(e.merchant)}</strong><small>${esc(c.name||"Other")} · ${num(e.workUse)}% · ${esc(p.name||"")}</small></span><span class="claim-amount"><strong>${money(claimable(e))}</strong><small class="status ${st}">${statusText}</small></span><span class="svg-icon tiny chev" data-icon="chevron-right"></span></button>`}
  return homeClaimRow(e);
}
function renderCategories(){
  const totals={}; state.expenses.filter(e=>e.profileId===state.activeProfileId && !e.reimbursed).forEach(e=>{totals[e.categoryId]=(totals[e.categoryId]||0)+claimable(e)}); const entries=Object.entries(totals).sort((a,b)=>b[1]-a[1]).slice(0,4); const max=Math.max(1,...entries.map(e=>e[1]));
  els.categoryBars.innerHTML=entries.length?entries.map(([cid,total])=>{const c=getCategory(cid)||{};return `<div class="category-bar-row"><div><span>${esc(c.name||"Other")}</span><strong>${money(total)}</strong></div><div class="bar-track"><i class="accent-${c.color||"navy"}" style="width:${Math.max(8,total/max*100)}%"></i></div></div>`}).join(""):`<div class="empty">No category data yet.</div>`;
}
function renderTaxForm(){const p=activeProfile(); if(!p)return; p.tax=p.tax||taxDefaults(); els.grossIncome.value=cleanZero(p.tax.grossIncome); els.taxWithheld.value=cleanZero(p.tax.taxWithheld); els.otherIncome.value=cleanZero(p.tax.otherIncome); els.includeMedicare.checked=!!p.tax.includeMedicare; els.hasHelpDebt.checked=!!p.tax.hasHelpDebt;}
function updateTaxFromForm(){const p=activeProfile(); if(!p)return; p.tax={grossIncome:val(els.grossIncome),taxWithheld:val(els.taxWithheld),otherIncome:val(els.otherIncome),includeMedicare:els.includeMedicare.checked,hasHelpDebt:els.hasHelpDebt.checked};}
function openClaimSheet(claimId=""){
  populateOptions(); const e=claimId?state.expenses.find(x=>x.id===claimId):null; els.claimId.value=e?.id||""; els.claimMode.textContent=e?"Edit claim":"New claim"; els.claimSheetTitle.textContent=e?"Edit claim":"Add claim"; els.duplicateClaimButton.style.display=e?"":"none"; els.deleteClaimButton.style.display=e?"":"none";
  els.claimProfileId.value=e?.profileId||state.activeProfileId; els.claimDate.value=e?.date||new Date().toISOString().slice(0,10); els.claimMerchant.value=e?.merchant||""; els.claimCategoryId.value=e?.categoryId||visibleCategories()[0]?.id||"cat-other"; els.claimAmount.value=e?.amount??""; els.claimWorkUse.value=e?.workUse??(getCategory(els.claimCategoryId.value)?.defaultWorkUse??100); els.claimReceiptName.value=e?.receiptName||""; els.claimReimbursed.checked=!!e?.reimbursed; els.claimNotes.value=e?.notes||""; renderClaimPreview(); openSheet(els.claimSheet);
}
function saveClaim(ev){ev.preventDefault(); const existing=els.claimId.value?state.expenses.find(e=>e.id===els.claimId.value):null; const data={id:existing?.id||id(),profileId:els.claimProfileId.value,date:els.claimDate.value,merchant:els.claimMerchant.value.trim(),categoryId:els.claimCategoryId.value,amount:val(els.claimAmount),workUse:Math.min(100,Math.max(0,val(els.claimWorkUse))),receiptName:els.claimReceiptName.value.trim(),reimbursed:els.claimReimbursed.checked,notes:els.claimNotes.value.trim(),createdAt:existing?.createdAt||Date.now(),updatedAt:Date.now(),sample:false}; if(existing) Object.assign(existing,data); else state.expenses.unshift(data); state.activeProfileId=data.profileId; persist(); closeSheet(els.claimSheet); renderAll(); toast("Claim saved");}
function renderClaimPreview(){const tmp={amount:val(els.claimAmount),workUse:val(els.claimWorkUse),reimbursed:els.claimReimbursed.checked}; els.claimPreview.textContent=`Claimable: ${money(claimable(tmp))}`;}
function duplicateOpenClaim(){const e=state.expenses.find(x=>x.id===els.claimId.value); if(!e)return; const copy={...e,id:id(),merchant:e.merchant+" copy",date:new Date().toISOString().slice(0,10),createdAt:Date.now(),updatedAt:Date.now(),sample:false}; state.expenses.unshift(copy); persist(); closeSheet(els.claimSheet); renderAll(); toast("Claim duplicated");}
function deleteOpenClaim(){const idv=els.claimId.value;if(!idv)return;if(confirm("Delete this claim?")){state.expenses=state.expenses.filter(e=>e.id!==idv);persist();closeSheet(els.claimSheet);renderAll();toast("Claim deleted");}}
function openProfileSheet(profileId=""){
  const p=profileId?getProfile(profileId):null; els.profileId.value=p?.id||""; els.profileSheetTitle.textContent=p?"Edit profile":"Add profile"; els.profileName.value=p?.name||""; els.profileInitials.value=p?.initials||""; els.profileColor.value=p?.color||"navy"; els.profilePreset.value=p?.preset||"General employee"; els.profileDefaultWorkUse.value=p?.defaultWorkUse??100; els.deleteProfileButton.style.display=p?"":"none"; openSheet(els.profileSheet);
}
function saveProfile(ev){ev.preventDefault(); const existing=els.profileId.value?getProfile(els.profileId.value):null; const data={id:existing?.id||id(),name:els.profileName.value.trim(),initials:(els.profileInitials.value.trim()||makeInitials(els.profileName.value)).toUpperCase(),color:els.profileColor.value,preset:els.profilePreset.value,defaultWorkUse:val(els.profileDefaultWorkUse)||100,tax:existing?.tax||taxDefaults()}; if(existing) Object.assign(existing,data); else state.profiles.push(data); state.activeProfileId=data.id; persist(); closeSheet(els.profileSheet); renderAll(); toast("Profile saved");}
function deleteOpenProfile(){const idv=els.profileId.value;if(state.profiles.length<2){toast("Keep at least one profile");return} if(confirm("Delete this profile and its claims?")){state.profiles=state.profiles.filter(p=>p.id!==idv);state.expenses=state.expenses.filter(e=>e.profileId!==idv);state.activeProfileId=state.profiles[0].id;persist();closeSheet(els.profileSheet);renderAll();}}
function openCategorySheet(categoryId=""){
  const c=categoryId?getCategory(categoryId):null; els.categoryId.value=c?.id||""; els.categorySheetTitle.textContent=c?"Edit category":"Add category"; els.categoryName.value=c?.name||""; els.categoryIcon.value=c?.icon||"folder"; els.categoryColor.value=c?.color||"navy"; els.categoryDefaultWorkUse.value=c?.defaultWorkUse??100; els.categoryRisk.value=c?.risk||"Review"; els.categoryReceiptRequired.checked=c?.receiptRequired!==false; els.categoryHidden.checked=!!c?.hidden; els.deleteCategoryButton.style.display=c?"":"none"; openSheet(els.categorySheet);
}
function saveCategory(ev){ev.preventDefault(); const existing=els.categoryId.value?getCategory(els.categoryId.value):null; const data={id:existing?.id||id(),name:els.categoryName.value.trim(),icon:els.categoryIcon.value,color:els.categoryColor.value,defaultWorkUse:val(els.categoryDefaultWorkUse)||100,risk:els.categoryRisk.value,receiptRequired:els.categoryReceiptRequired.checked,hidden:els.categoryHidden.checked,system:existing?.system||false}; if(existing) Object.assign(existing,data); else state.categories.push(data); persist(); closeSheet(els.categorySheet); renderAll(); toast("Category saved");}
function deleteOpenCategory(){const idv=els.categoryId.value;if(state.expenses.some(e=>e.categoryId===idv)){toast("Category is used by claims");return} if(confirm("Delete this category?")){state.categories=state.categories.filter(c=>c.id!==idv);persist();closeSheet(els.categorySheet);renderAll();}}
function openPanel(kind){
  const s=state.settings; const catList=()=>`<div class="panel-body-list">${state.categories.map(c=>`<button type="button" class="category-admin-line" data-edit-category="${c.id}"><span class="claim-icon accent-${c.color}"><span class="svg-icon" data-icon="${c.icon}"></span></span><span><strong>${esc(c.name)}</strong><small>${c.risk} · ${c.defaultWorkUse}% default${c.hidden?" · hidden":""}</small></span><span class="svg-icon tiny" data-icon="chevron-right"></span></button>`).join("")}</div><div class="panel-actions"><button type="button" class="primary" data-add-category>Add category</button></div>`;
  const panels={
    appearance:["Appearance",`<div class="panel-body-list"><label class="panel-row"><span>Theme</span><select id="pTheme"><option value="system">System</option><option value="light">Light</option><option value="dark">Dark</option></select></label><label class="panel-row"><span>Accent</span><select id="pAccent">${colors.map(c=>`<option value="${c}">${title(c)}</option>`).join("")}</select></label><label class="panel-row"><span>Financial year</span><input id="pTaxYear" value="${esc(s.taxYear||"2025–26")}" /></label><label class="panel-row"><span>Start screen</span><select id="pStart"><option value="home">Home</option><option value="log">Claims</option><option value="tax">Tax</option><option value="profile">Profile</option></select></label><label class="panel-row"><span>Currency decimals</span><input id="pDecimals" type="checkbox" ${s.currencyDecimals!==false?"checked":""}/></label></div><div class="panel-actions"><button class="primary" type="button" data-save-appearance>Save</button></div>`],
    dashboard:["Dashboard",`<div class="panel-body-list"><label class="panel-row"><span>Show categories</span><input id="pShowCategories" type="checkbox" ${s.showCategories!==false?"checked":""}/></label><label class="panel-row"><span>Show recent claims</span><input id="pShowRecent" type="checkbox" ${s.showRecent!==false?"checked":""}/></label></div><div class="panel-actions"><button class="primary" type="button" data-save-dashboard>Save</button></div>`],
    categories:["Categories",catList()],
    backup:["Backup",`<div class="panel-actions"><button class="primary" type="button" data-export-json>Export JSON</button><button class="ghost" type="button" data-import-json>Import JSON</button><button class="ghost" type="button" data-export-csv>Export CSV</button></div><p class="microcopy">JSON backup keeps profiles, settings, categories and claims.</p>`]
  };
  const [titleText,body]=panels[kind]||panels.appearance; els.panelTitle.textContent=titleText; els.panelBody.innerHTML=body; hydrateIcons(els.panelBody); openSheet(els.panelSheet);
  if(kind==="appearance"){ $("#pTheme").value=s.theme||"system"; $("#pAccent").value=s.accent||"green"; $("#pStart").value=s.startScreen||"home";}
}
function panelClick(e){
  const edit=e.target.closest("[data-edit-category]"); if(edit){closeSheet(els.panelSheet);openCategorySheet(edit.dataset.editCategory);return;}
  if(e.target.closest("[data-add-category]")){closeSheet(els.panelSheet);openCategorySheet();return;}
  if(e.target.closest("[data-save-appearance]")){state.settings.theme=$("#pTheme").value;state.settings.accent=$("#pAccent").value;state.settings.taxYear=$("#pTaxYear").value.trim()||"2025–26";state.settings.startScreen=$("#pStart").value;state.settings.currencyDecimals=$("#pDecimals").checked;persist();closeSheet(els.panelSheet);renderAll();toast("Appearance saved");return;}
  if(e.target.closest("[data-save-dashboard]")){state.settings.showCategories=$("#pShowCategories").checked;state.settings.showRecent=$("#pShowRecent").checked;persist();closeSheet(els.panelSheet);renderAll();toast("Dashboard saved");return;}
  if(e.target.closest("[data-export-json]")){exportJson();return;} if(e.target.closest("[data-import-json]")){els.importJsonInput.click();return;} if(e.target.closest("[data-export-csv]")){exportCsv();return;}
}
function openSheet(sheet){sheet.hidden=false;document.body.style.overflow="hidden";} function closeSheet(sheet){sheet.hidden=true;document.body.style.overflow="";}
function openProfileSwitch(){renderProfiles();openSheet(els.profileSwitchSheet);}
function switchProfile(idv,closeSelector=false){if(!getProfile(idv))return;if(idv===state.activeProfileId){if(closeSelector)closeSheet(els.profileSwitchSheet);return;} const home=$("#screen-home");home?.classList.add("profile-refreshing");state.activeProfileId=idv;state.profileFilter="active";persist();renderAll();if(closeSelector)closeSheet(els.profileSwitchSheet);requestAnimationFrame(()=>requestAnimationFrame(()=>home?.classList.remove("profile-refreshing")));toast(`Switched to ${getProfile(idv)?.name||"profile"}`);}
function filteredClaims(){let list=[...state.expenses]; const q=(state.search||"").toLowerCase(); if(state.profileFilter==="active") list=list.filter(e=>e.profileId===state.activeProfileId); else if(state.profileFilter&&state.profileFilter!=="all") list=list.filter(e=>e.profileId===state.profileFilter); if(state.categoryFilter&&state.categoryFilter!=="all") list=list.filter(e=>e.categoryId===state.categoryFilter); if(state.statusFilter&&state.statusFilter!=="all") list=list.filter(e=>statusFor(e)===state.statusFilter); if(q) list=list.filter(e=>[e.merchant,e.notes,getCategory(e.categoryId)?.name,getProfile(e.profileId)?.name].join(" ").toLowerCase().includes(q)); return list.sort(byDate);}
function statusFor(e){if(e.reimbursed)return"excluded"; const c=getCategory(e.categoryId)||{}; if(c.risk==="Risky")return"risky"; if(!e.receiptName && c.receiptRequired)return"review"; if(Number(e.workUse)<100 && ["Review","Risky"].includes(c.risk))return"review"; return"strong";}
function claimable(e,ignoreReimb=false){if(e.reimbursed&&!ignoreReimb)return 0; return round2(Number(e.amount||0)*Number(e.workUse||0)/100);}
function totalDeductions(profileId){return state.expenses.filter(e=>e.profileId===profileId&&!e.reimbursed).reduce((a,e)=>a+claimable(e),0)}
function calculateTax(profile,taxableDed){const t=profile.tax||taxDefaults(); const taxable=Math.max(0,Number(t.grossIncome||0)+Number(t.otherIncome||0)-taxableDed); let tax=residentTax(taxable); const lito=lowIncomeTaxOffset(taxable); tax=Math.max(0,tax-lito); const med=t.includeMedicare?taxable*.02:0; const finalTax=tax+med; return {taxable,finalTax,refund:Number(t.taxWithheld||0)-finalTax};}
function estimateSaving(profile,ded){const before=calculateTax(profile,0).finalTax; const after=calculateTax(profile,ded).finalTax; return Math.max(0,before-after);}
function residentTax(x){if(x<=18200)return 0;if(x<=45000)return (x-18200)*.16;if(x<=135000)return 4288+(x-45000)*.30;if(x<=190000)return 31288+(x-135000)*.37;return 51638+(x-190000)*.45;}
function lowIncomeTaxOffset(x){if(x<=37500)return 700;if(x<=45000)return Math.max(0,700-(x-37500)*.05);if(x<=66667)return Math.max(0,325-(x-45000)*.015);return 0;}
function clearSampleData(){const count=state.expenses.filter(e=>e.sample).length;if(!count){toast("No demo claims");return} if(confirm(`Remove ${count} demo claims?`)){state.expenses=state.expenses.filter(e=>!e.sample);persist();renderAll();toast("Demo claims removed");}}
function resetAllData(){if(confirm("Reset Lodgr and clear all local data?")){state=defaultState();persist();renderAll();toast("Lodgr reset");}}
function exportJson(){downloadFile(`lodgr-backup-${dateStamp()}.json`,JSON.stringify(state,null,2),"application/json");}
function importJson(ev){const file=ev.target.files?.[0]; if(!file)return; const reader=new FileReader(); reader.onload=()=>{try{const parsed=JSON.parse(reader.result); state=normalizeImported(parsed); persist(); closeSheet(els.panelSheet); renderAll(); toast("Backup imported");}catch{toast("Import failed");} ev.target.value=""}; reader.readAsText(file);}
function exportCsv(){const rows=[["Date","Profile","Merchant","Category","Amount","Work use %","Claimable","Receipt","Status","Reimbursed","Notes"]]; state.expenses.sort(byDate).forEach(e=>rows.push([e.date,getProfile(e.profileId)?.name||"",e.merchant,getCategory(e.categoryId)?.name||"",e.amount,e.workUse,claimable(e),e.receiptName,statusFor(e),e.reimbursed?"Yes":"No",e.notes||""])); downloadFile(`lodgr-claims-${dateStamp()}.csv`,rows.map(r=>r.map(csv).join(",")).join("\n"),"text/csv");}
function loadState(){try{const raw=localStorage.getItem(STORAGE_KEY); return raw?normalizeImported(JSON.parse(raw)):defaultState();}catch{return defaultState();}}
function normalizeImported(s){const d=defaultState(); const out={...d,...s}; out.settings={...d.settings,...(s.settings||{})}; out.profiles=(s.profiles?.length?s.profiles:d.profiles).map(p=>({...p,tax:{...taxDefaults(),...(p.tax||{})},initials:p.initials||makeInitials(p.name),color:p.color||"navy",defaultWorkUse:p.defaultWorkUse??100})); out.categories=s.categories?.length?s.categories:d.categories; out.expenses=s.expenses||[]; out.activeProfileId=out.profiles.some(p=>p.id===out.activeProfileId)?out.activeProfileId:out.profiles[0].id; out.profileFilter=out.profileFilter||"all"; out.categoryFilter=out.categoryFilter||"all"; out.statusFilter=out.statusFilter||"all"; return out;}
function normalizeState(){state=normalizeImported(state)} function persist(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state));}
function getProfile(idv){return state.profiles.find(p=>p.id===idv)} function activeProfile(){return getProfile(state.activeProfileId)||state.profiles[0]} function getCategory(idv){return state.categories.find(c=>c.id===idv)} function visibleCategories(){return state.categories.filter(c=>!c.hidden)}
function hydrateIcons(root=document){root.querySelectorAll(".svg-icon[data-icon]").forEach(el=>{const name=el.dataset.icon;if(!iconPaths[name])return;el.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true">${iconPaths[name]}</svg>`;});}
function toast(msg){els.toast.textContent=msg;els.toast.classList.add("show");clearTimeout(toast._t);toast._t=setTimeout(()=>els.toast.classList.remove("show"),1800)}
function downloadFile(name,content,type){const blob=new Blob([content],{type});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(a.href)}
function money(n){const decimals=state.settings?.currencyDecimals!==false?2:0;return new Intl.NumberFormat("en-AU",{style:"currency",currency:"AUD",minimumFractionDigits:decimals,maximumFractionDigits:decimals}).format(Number(n||0))} function num(n){return Math.round(Number(n||0))} function val(el){return Number(el.value||0)} function round2(n){return Math.round((n+Number.EPSILON)*100)/100} function clone(x){return JSON.parse(JSON.stringify(x))} function id(){return (crypto?.randomUUID?.()||`id-${Date.now()}-${Math.random().toString(36).slice(2)}`)} function esc(s){return String(s??"").replace(/[&<>'"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]))} function csv(v){const s=String(v??"");return /[",\n]/.test(s)?`"${s.replace(/"/g,'""')}"`:s} function title(s){return String(s).charAt(0).toUpperCase()+String(s).slice(1)} function makeInitials(name){return String(name||"?").trim().split(/\s+/).slice(0,2).map(x=>x[0]).join("").toUpperCase()||"?"} function cleanZero(v){return Number(v||0)===0?"":String(v)} function byDate(a,b){return String(b.date).localeCompare(String(a.date))||Number(b.createdAt||0)-Number(a.createdAt||0)} function formatDate(d){return new Date(`${d}T00:00:00`).toLocaleDateString("en-AU",{day:"numeric",month:"short",year:"numeric"})} function formatDay(d){return new Date(`${d}T00:00:00`).toLocaleDateString("en-AU",{day:"numeric",month:"short"})} function formatYear(d){return new Date(`${d}T00:00:00`).getFullYear()} function dateStamp(){return new Date().toISOString().slice(0,10)}
function registerServiceWorker(){if("serviceWorker" in navigator){navigator.serviceWorker.register("sw.js?v=4.2.0").catch(()=>{});}}
