/* Lodgr v5 tax workspace
 * Australian resident estimate for 2025–26.
 * This remains an estimate and intentionally exposes assumptions to the user.
 */

Object.assign(iconPaths, {
  'chevron-left':'<path d="m15 18-6-6 6-6"/>',
  banknote:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 9h.01"/><path d="M17 15h.01"/><circle cx="12" cy="12" r="2.5"/>',
  gift:'<path d="M20 12v8H4v-8"/><path d="M2 7h20v5H2z"/><path d="M12 7v13"/><path d="M12 7H7.5a2.5 2.5 0 1 1 2.2-3.7Z"/><path d="M12 7h4.5a2.5 2.5 0 1 0-2.2-3.7Z"/>',
  layers:'<path d="m12 2 9 5-9 5-9-5Z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/>',
  heart:'<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"/>',
  users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  star:'<path d="m12 2 3.1 6.3L22 9.3l-5 4.9 1.2 6.8L12 17.8 5.8 21 7 14.2 2 9.3l6.9-1Z"/>',
  sliders:'<path d="M4 7h7"/><path d="M15 7h5"/><circle cx="13" cy="7" r="2"/><path d="M4 12h3"/><path d="M11 12h9"/><circle cx="9" cy="12" r="2"/><path d="M4 17h10"/><path d="M18 17h2"/><circle cx="16" cy="17" r="2"/>',
  chart:'<path d="M4 19V9"/><path d="M10 19V5"/><path d="M16 19v-7"/><path d="M22 19V3"/><path d="M2 21h22"/>',
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 8h.01"/>',
  check:'<path d="m5 12 4 4L19 6"/>'
});

const TAX_V5_VERSION = '5.0.0';
const MEDICARE_SINGLE_LOWER = 27222;
const MEDICARE_SINGLE_UPPER = 34027;
const MEDICARE_FAMILY_LOWER = 45907;
const MEDICARE_CHILD_INCREMENT = 4338;
const MLS_SINGLE = [101000, 118000, 158000];
const MLS_FAMILY = [202000, 236000, 316000];

const taxV5Defaults = () => ({
  grossIncome: 0,
  taxWithheld: 0,
  otherIncome: 0,
  includeMedicare: true,
  hasHelpDebt: false,
  income: {
    salaryWages: 0,
    allowances: 0,
    otherEmploymentIncome: 0,
    paygWithheldSalary: 0,
    paygWithheldOther: 0,
    paygInstalments: 0,
    foreignTaxPaid: 0
  },
  packaging: {
    enabled: false,
    packageType: 'super',
    inputBasis: 'statement',
    amountSacrificed: 0,
    reportableEmployerSuper: 0,
    reportableFringeBenefits: 0
  },
  other: {
    bankInterest: 0,
    dividends: 0,
    frankingCredits: 0,
    governmentPayments: 0,
    rentalIncome: 0,
    capitalGains: 0,
    foreignIncome: 0,
    soleTraderIncome: 0,
    employeeShareSchemes: 0,
    otherAssessableIncome: 0
  },
  deductions: {
    personalSuperDeduction: 0,
    noticeOfIntent: false,
    otherDeductions: 0
  },
  medicare: {
    enabled: true,
    eligibleAllYear: true,
    fullExemptionDays: 0,
    halfExemptionDays: 0
  },
  privateHealth: {
    enabled: false,
    coveredFullYear: false,
    daysWithoutCover: 365,
    ageBand: 'under65',
    rebateMethod: 'insurer',
    rebateAdjustment: 0
  },
  studyLoan: {
    enabled: false,
    loanType: 'HELP',
    debtBalance: 0
  },
  family: {
    hasSpouse: false,
    linkedProfileId: '',
    spouseIncomeManual: 0,
    dependentChildren: 0
  },
  offsets: {
    spouseSuperOffset: 0,
    otherOffsets: 0
  },
  advanced: {
    netInvestmentLosses: 0,
    exemptForeignEmploymentIncome: 0
  }
});

let activeTaxSection = '';
const taxEls = {};

const baseNormalizeImportedV5 = normalizeImported;
normalizeImported = function normalizeImportedV5(payload) {
  const output = baseNormalizeImportedV5(payload);
  output.profiles.forEach(profile => ensureTaxV5(profile));
  output.version = TAX_V5_VERSION;
  return output;
};

const baseRenderAllV5 = renderAll;
renderAll = function renderAllV5() {
  ensureAllTaxV5();
  baseRenderAllV5();
  renderTaxWorkspace();
};

initTaxV5();

function initTaxV5() {
  Object.assign(taxEls, {
    taxDetailSheet: document.querySelector('#taxDetailSheet'),
    taxDetailForm: document.querySelector('#taxDetailForm'),
    taxDetailBody: document.querySelector('#taxDetailBody'),
    taxDetailTitle: document.querySelector('#taxDetailTitle'),
    taxDetailEyebrow: document.querySelector('#taxDetailEyebrow'),
    taxDetailMasterWrap: document.querySelector('#taxDetailMasterWrap'),
    taxDetailMaster: document.querySelector('#taxDetailMaster'),
    taxDetailActions: document.querySelector('#taxDetailActions')
  });

  ensureAllTaxV5();
  persist();

  document.addEventListener('click', event => {
    const sectionButton = event.target.closest('[data-tax-section]');
    if (sectionButton) {
      openTaxSection(sectionButton.dataset.taxSection);
      return;
    }
    if (event.target.closest('[data-close-tax-detail]')) {
      closeSheet(taxEls.taxDetailSheet);
    }
  });

  taxEls.taxDetailSheet.addEventListener('click', event => {
    if (event.target === taxEls.taxDetailSheet) closeSheet(taxEls.taxDetailSheet);
  });
  taxEls.taxDetailForm.addEventListener('submit', saveTaxSection);
  taxEls.taxDetailMaster.addEventListener('change', updateTaxMasterVisibility);
  taxEls.taxDetailBody.addEventListener('change', updateDynamicTaxFields);

  hydrateIcons();
  renderAll();
}

function ensureAllTaxV5() {
  state.version = TAX_V5_VERSION;
  state.profiles.forEach(profile => ensureTaxV5(profile));
}

function ensureTaxV5(profile) {
  const existing = profile.tax || {};
  const defaults = taxV5Defaults();
  const migrated = {
    ...defaults,
    ...existing,
    income: {...defaults.income, ...(existing.income || {})},
    packaging: {...defaults.packaging, ...(existing.packaging || {})},
    other: {...defaults.other, ...(existing.other || {})},
    deductions: {...defaults.deductions, ...(existing.deductions || {})},
    medicare: {...defaults.medicare, ...(existing.medicare || {})},
    privateHealth: {...defaults.privateHealth, ...(existing.privateHealth || {})},
    studyLoan: {...defaults.studyLoan, ...(existing.studyLoan || {})},
    family: {...defaults.family, ...(existing.family || {})},
    offsets: {...defaults.offsets, ...(existing.offsets || {})},
    advanced: {...defaults.advanced, ...(existing.advanced || {})}
  };

  if (!existing.income) {
    migrated.income.salaryWages = number(existing.grossIncome);
    migrated.income.paygWithheldSalary = number(existing.taxWithheld);
  }
  if (!existing.other) migrated.other.otherAssessableIncome = number(existing.otherIncome);
  if (!existing.medicare) migrated.medicare.enabled = existing.includeMedicare !== false;
  if (!existing.studyLoan) migrated.studyLoan.enabled = Boolean(existing.hasHelpDebt);

  profile.tax = migrated;
  syncLegacyTax(profile);
  return profile.tax;
}

function syncLegacyTax(profile) {
  const tax = profile.tax;
  tax.grossIncome = employmentIncomeBeforePackaging(tax);
  tax.taxWithheld = totalWithholding(tax);
  tax.otherIncome = otherAssessableIncome(tax);
  tax.includeMedicare = tax.medicare.enabled;
  tax.hasHelpDebt = tax.studyLoan.enabled;
}

function renderTaxWorkspace() {
  const profile = activeProfile();
  if (!profile) return;
  const tax = ensureTaxV5(profile);
  const result = calculateTaxV5(profile);

  setText('#taxProfileName', profile.name);
  const avatar = document.querySelector('#taxProfileInitial');
  if (avatar) {
    avatar.textContent = profile.initials || makeInitials(profile.name);
    avatar.className = `mini-avatar ${profile.color || 'navy'}`;
  }
  setText('#taxEstimateYear', `${state.settings.taxYear || '2025–26'} estimate`);
  setText('#taxHeroOutcome', money(Math.abs(result.refund)));
  setText('#taxHeroLabel', result.refund >= 0 ? 'Estimated refund' : 'Estimated payable');
  setText('#taxHeroTaxable', money(result.taxableIncome));
  setText('#taxHeroCredits', money(result.withholdingAndCredits));
  setText('#taxHeroLiability', money(result.totalLiability));

  setText('#taxRowIncome', money(result.employmentIncome));
  setText('#taxRowIncomeDetail', `${money(result.withholding)} withheld`);
  setText('#taxRowPackaging', tax.packaging.enabled ? money(tax.packaging.amountSacrificed) : 'Off');
  setText('#taxRowPackagingDetail', tax.packaging.enabled ? packagingTypeLabel(tax.packaging.packageType) : 'Not added');
  setText('#taxRowOtherIncome', money(result.otherIncome));
  setText('#taxRowDeductions', money(result.totalDeductions));
  setText('#taxRowMedicare', tax.medicare.enabled ? 'On' : 'Off');
  setText('#taxRowPrivateHealth', tax.privateHealth.enabled ? 'Yes' : 'No');
  setText('#taxRowStudyLoan', tax.studyLoan.enabled ? tax.studyLoan.loanType : 'Off');
  setText('#taxRowFamily', tax.family.hasSpouse ? linkedSpouseName(tax) : 'Not added');
  setText('#taxRowOffsets', money(result.taxOffsets));
  const advancedTotal = number(tax.advanced.netInvestmentLosses) + number(tax.advanced.exemptForeignEmploymentIncome);
  setText('#taxRowAdvanced', advancedTotal ? money(advancedTotal) : 'Optional');

  const hero = document.querySelector('.tax-estimate');
  hero?.classList.toggle('is-payable', result.refund < 0);
  hydrateIcons(document.querySelector('#screen-tax'));
}

function openTaxSection(section) {
  activeTaxSection = section;
  const profile = activeProfile();
  const tax = ensureTaxV5(profile);
  const definitions = taxSectionDefinitions(profile, tax);
  const def = definitions[section] || definitions.income;

  taxEls.taxDetailEyebrow.textContent = def.eyebrow || 'Tax details';
  taxEls.taxDetailTitle.textContent = def.title;
  taxEls.taxDetailBody.innerHTML = def.body;
  taxEls.taxDetailForm.dataset.section = section;
  taxEls.taxDetailActions.hidden = section === 'breakdown';
  taxEls.taxDetailMasterWrap.hidden = !def.master;
  taxEls.taxDetailMaster.checked = def.master ? Boolean(def.enabled) : false;

  hydrateIcons(taxEls.taxDetailSheet);
  updateTaxMasterVisibility();
  updateDynamicTaxFields();
  openSheet(taxEls.taxDetailSheet);
}

function taxSectionDefinitions(profile, tax) {
  const result = calculateTaxV5(profile);
  const spouseOptions = state.profiles
    .filter(item => item.id !== profile.id)
    .map(item => `<option value="${item.id}" ${tax.family.linkedProfileId === item.id ? 'selected' : ''}>${esc(item.name)}</option>`)
    .join('');

  return {
    income: {
      title: 'Income & withholding',
      body: `
        ${infoBox('Use the taxable amounts shown on your income statement or payment summaries.')}
        ${groupTitle('Income')}
        ${moneyField('Salary & wages (taxable)', 'salaryWages', tax.income.salaryWages, 'From your income statement')}
        ${moneyField('Allowances (taxable)', 'allowances', tax.income.allowances)}
        ${moneyField('Other employment income', 'otherEmploymentIncome', tax.income.otherEmploymentIncome)}
        ${groupTitle('Tax already paid')}
        ${moneyField('PAYG withheld – salary', 'paygWithheldSalary', tax.income.paygWithheldSalary)}
        ${moneyField('PAYG withheld – other', 'paygWithheldOther', tax.income.paygWithheldOther)}
        ${moneyField('PAYG instalments', 'paygInstalments', tax.income.paygInstalments)}
        ${moneyField('Foreign tax paid', 'foreignTaxPaid', tax.income.foreignTaxPaid)}
        ${noteBox('Enter amounts exactly as shown on your income statement or payment summary.')}
      `
    },
    packaging: {
      title: 'Salary packaging',
      master: true,
      enabled: tax.packaging.enabled,
      body: `
        ${infoBox('Enter amounts from your payslip or income statement. These can affect taxable income, HELP repayment income and surcharge tests.')}
        <div class="master-content">
          ${selectField('Package type', 'packageType', tax.packaging.packageType, [
            ['super','Superannuation (salary sacrifice)'],
            ['fringe','Fringe benefits / living expenses'],
            ['novated','Novated lease'],
            ['multiple','Multiple arrangements']
          ])}
          ${moneyField('Amount sacrificed (pre-tax)', 'amountSacrificed', tax.packaging.amountSacrificed)}
          ${moneyField('Reportable employer super', 'reportableEmployerSuper', tax.packaging.reportableEmployerSuper, 'From your payslip or income statement')}
          ${moneyField('Reportable fringe benefits amount', 'reportableFringeBenefits', tax.packaging.reportableFringeBenefits, 'From your income statement')}
          ${groupTitle('Income entry basis')}
          ${selectField('How did you enter salary?', 'inputBasis', tax.packaging.inputBasis, [
            ['statement','Income statement taxable salary'],
            ['prepackage','Salary before packaging']
          ])}
          ${tax.packaging.inputBasis === 'statement' ? successBox('Recommended. Lodgr will not subtract the package again.') : noteBox('Advanced mode. Lodgr subtracts the sacrificed amount from the salary you entered.')}
        </div>
      `
    },
    otherIncome: {
      title: 'Other income',
      body: `
        ${moneyField('Bank interest', 'bankInterest', tax.other.bankInterest)}
        ${moneyField('Dividends (cash amount)', 'dividends', tax.other.dividends)}
        ${moneyField('Franking credits', 'frankingCredits', tax.other.frankingCredits, 'Included in taxable income and also applied as a credit')}
        ${moneyField('Government payments', 'governmentPayments', tax.other.governmentPayments)}
        ${moneyField('Rental income / loss', 'rentalIncome', tax.other.rentalIncome, 'Use a negative amount for a net loss')}
        ${moneyField('Capital gains', 'capitalGains', tax.other.capitalGains)}
        ${moneyField('Foreign income', 'foreignIncome', tax.other.foreignIncome)}
        ${moneyField('Sole trader / business income', 'soleTraderIncome', tax.other.soleTraderIncome)}
        ${moneyField('Employee share schemes', 'employeeShareSchemes', tax.other.employeeShareSchemes)}
        ${moneyField('Other assessable income', 'otherAssessableIncome', tax.other.otherAssessableIncome)}
      `
    },
    deductions: {
      title: 'Deductions',
      body: `
        ${readonlyRow('Work-related claims in Lodgr', money(totalDeductions(profile.id)))}
        ${moneyField('Personal super deduction', 'personalSuperDeduction', tax.deductions.personalSuperDeduction)}
        ${toggleField('Notice of intent acknowledged', 'noticeOfIntent', tax.deductions.noticeOfIntent, 'Required before claiming a personal super deduction')}
        ${moneyField('Other deductions', 'otherDeductions', tax.deductions.otherDeductions)}
        ${noteBox('Salary-sacrificed employer super is not entered as a personal super deduction.')}
      `
    },
    medicare: {
      title: 'Medicare',
      master: true,
      enabled: tax.medicare.enabled,
      body: `
        ${infoBox('Lodgr estimates the ordinary 2% levy, individual low-income reduction and exemption days.')}
        <div class="master-content">
          ${toggleField('Eligible for Medicare all year', 'eligibleAllYear', tax.medicare.eligibleAllYear)}
          ${numberField('Full exemption days', 'fullExemptionDays', tax.medicare.fullExemptionDays, 0, 365)}
          ${numberField('Half exemption days', 'halfExemptionDays', tax.medicare.halfExemptionDays, 0, 365)}
          ${readonlyRow('Estimated Medicare levy', money(result.medicareLevy), 'Calculated automatically')}
          ${noteBox('Family low-income reductions are estimated using the spouse and dependant details in Lodgr.')}
        </div>
      `
    },
    privateHealth: {
      title: 'Private health cover',
      master: true,
      enabled: tax.privateHealth.enabled,
      body: `
        ${infoBox('Used to estimate the Medicare levy surcharge. Only appropriate private hospital cover counts.')}
        <div class="master-content">
          ${toggleField('Covered for the full year', 'coveredFullYear', tax.privateHealth.coveredFullYear)}
          <div class="partial-cover-fields">
            ${numberField('Days without appropriate cover', 'daysWithoutCover', tax.privateHealth.daysWithoutCover, 0, 365)}
          </div>
          ${selectField('Policy holder age', 'ageBand', tax.privateHealth.ageBand, [['under65','Under 65'],['65to69','65–69'],['70plus','70 or older']])}
          ${selectField('Private health rebate', 'rebateMethod', tax.privateHealth.rebateMethod, [['insurer','Claimed through insurer'],['tax','Claim in tax return'],['none','Not claiming']])}
          ${moneyField('Rebate adjustment / credit', 'rebateAdjustment', tax.privateHealth.rebateAdjustment, 'Use a negative amount if repayable')}
          ${readonlyRow('Estimated Medicare levy surcharge', money(result.mls), 'Calculated automatically')}
        </div>
      `
    },
    studyLoan: {
      title: 'Study loan',
      master: true,
      enabled: tax.studyLoan.enabled,
      body: `
        ${infoBox('From 2025–26, compulsory repayments use marginal rates and only start once repayment income exceeds $67,000.')}
        <div class="master-content">
          ${selectField('Loan type', 'loanType', tax.studyLoan.loanType, [['HELP','HELP'],['VSL','VSL'],['SSL','SSL'],['ABSTUDY SSL','ABSTUDY SSL'],['TSL','TSL']])}
          ${moneyField('Outstanding balance (optional)', 'debtBalance', tax.studyLoan.debtBalance, 'Used to cap the estimate if entered')}
          ${readonlyRow('HELP repayment income', money(result.repaymentIncome))}
          ${readonlyRow('Estimated compulsory repayment', money(result.helpRepayment))}
          ${noteBox('Reportable employer super and reportable fringe benefits can increase repayment income even when taxable salary is lower.')}
        </div>
      `
    },
    family: {
      title: 'Spouse & dependants',
      master: true,
      enabled: tax.family.hasSpouse,
      body: `
        ${infoBox('Linking another Lodgr profile helps estimate family Medicare and surcharge thresholds.')}
        <div class="master-content">
          ${selectField('Linked Lodgr profile', 'linkedProfileId', tax.family.linkedProfileId, [['','Enter spouse income manually'], ...state.profiles.filter(item => item.id !== profile.id).map(item => [item.id,item.name])])}
          <div class="manual-spouse-field">
            ${moneyField('Spouse income (manual)', 'spouseIncomeManual', tax.family.spouseIncomeManual)}
          </div>
          ${numberField('Dependent children', 'dependentChildren', tax.family.dependentChildren, 0, 20)}
          ${readonlyRow('Family income used', money(result.familyIncome), tax.family.linkedProfileId ? `Linked to ${linkedSpouseName(tax)}` : 'Manual estimate')}
        </div>
      `
    },
    offsets: {
      title: 'Tax offsets & credits',
      body: `
        ${readonlyRow('Franking credits', money(tax.other.frankingCredits), 'Entered under Other income')}
        ${readonlyRow('Foreign tax paid', money(tax.income.foreignTaxPaid), 'Entered under Income & withholding')}
        ${moneyField('Spouse super contribution offset', 'spouseSuperOffset', tax.offsets.spouseSuperOffset)}
        ${moneyField('Other tax offsets / credits', 'otherOffsets', tax.offsets.otherOffsets)}
        ${readonlyRow('Private health adjustment', money(tax.privateHealth.rebateAdjustment), 'Entered under Private health cover')}
        ${readonlyRow('Total offsets & credits', money(result.taxOffsets))}
      `
    },
    advanced: {
      title: 'Income-test amounts',
      body: `
        ${infoBox('These amounts may not be ordinary taxable income, but can affect HELP and Medicare levy surcharge calculations.')}
        ${readonlyRow('Reportable employer super', money(tax.packaging.reportableEmployerSuper), 'Entered under Salary packaging')}
        ${readonlyRow('Reportable fringe benefits', money(tax.packaging.reportableFringeBenefits), 'Entered under Salary packaging')}
        ${moneyField('Net investment losses', 'netInvestmentLosses', tax.advanced.netInvestmentLosses)}
        ${moneyField('Exempt foreign employment income', 'exemptForeignEmploymentIncome', tax.advanced.exemptForeignEmploymentIncome)}
        ${readonlyRow('Income for surcharge purposes', money(result.incomeForSurcharge))}
        ${readonlyRow('Study-loan repayment income', money(result.repaymentIncome))}
      `
    },
    breakdown: {
      eyebrow: `${state.settings.taxYear || '2025–26'} estimate`,
      title: 'Estimate breakdown',
      body: breakdownMarkup(result)
    }
  };
}

function saveTaxSection(event) {
  event.preventDefault();
  const profile = activeProfile();
  const tax = ensureTaxV5(profile);
  const section = activeTaxSection;
  const get = name => taxEls.taxDetailForm.querySelector(`[name="${name}"]`);
  const amount = name => number(get(name)?.value);
  const checked = name => Boolean(get(name)?.checked);
  const text = name => get(name)?.value || '';

  switch (section) {
    case 'income':
      ['salaryWages','allowances','otherEmploymentIncome','paygWithheldSalary','paygWithheldOther','paygInstalments','foreignTaxPaid'].forEach(key => tax.income[key] = amount(key));
      break;
    case 'packaging':
      tax.packaging.enabled = taxEls.taxDetailMaster.checked;
      tax.packaging.packageType = text('packageType');
      tax.packaging.amountSacrificed = amount('amountSacrificed');
      tax.packaging.reportableEmployerSuper = amount('reportableEmployerSuper');
      tax.packaging.reportableFringeBenefits = amount('reportableFringeBenefits');
      tax.packaging.inputBasis = text('inputBasis');
      break;
    case 'otherIncome':
      Object.keys(tax.other).forEach(key => tax.other[key] = key === 'rentalIncome' ? signedNumber(get(key)?.value) : amount(key));
      break;
    case 'deductions':
      tax.deductions.personalSuperDeduction = amount('personalSuperDeduction');
      tax.deductions.noticeOfIntent = checked('noticeOfIntent');
      tax.deductions.otherDeductions = amount('otherDeductions');
      break;
    case 'medicare':
      tax.medicare.enabled = taxEls.taxDetailMaster.checked;
      tax.medicare.eligibleAllYear = checked('eligibleAllYear');
      tax.medicare.fullExemptionDays = clamp(amount('fullExemptionDays'),0,365);
      tax.medicare.halfExemptionDays = clamp(amount('halfExemptionDays'),0,365-tax.medicare.fullExemptionDays);
      break;
    case 'privateHealth':
      tax.privateHealth.enabled = taxEls.taxDetailMaster.checked;
      tax.privateHealth.coveredFullYear = checked('coveredFullYear');
      tax.privateHealth.daysWithoutCover = tax.privateHealth.coveredFullYear ? 0 : clamp(amount('daysWithoutCover'),0,365);
      tax.privateHealth.ageBand = text('ageBand');
      tax.privateHealth.rebateMethod = text('rebateMethod');
      tax.privateHealth.rebateAdjustment = signedNumber(get('rebateAdjustment')?.value);
      break;
    case 'studyLoan':
      tax.studyLoan.enabled = taxEls.taxDetailMaster.checked;
      tax.studyLoan.loanType = text('loanType');
      tax.studyLoan.debtBalance = amount('debtBalance');
      break;
    case 'family':
      tax.family.hasSpouse = taxEls.taxDetailMaster.checked;
      tax.family.linkedProfileId = text('linkedProfileId');
      tax.family.spouseIncomeManual = amount('spouseIncomeManual');
      tax.family.dependentChildren = clamp(amount('dependentChildren'),0,20);
      break;
    case 'offsets':
      tax.offsets.spouseSuperOffset = amount('spouseSuperOffset');
      tax.offsets.otherOffsets = signedNumber(get('otherOffsets')?.value);
      break;
    case 'advanced':
      tax.advanced.netInvestmentLosses = amount('netInvestmentLosses');
      tax.advanced.exemptForeignEmploymentIncome = amount('exemptForeignEmploymentIncome');
      break;
    case 'breakdown':
      closeSheet(taxEls.taxDetailSheet);
      return;
  }

  syncLegacyTax(profile);
  persist();
  closeSheet(taxEls.taxDetailSheet);
  renderAll();
  toast('Tax details saved');
}

function updateTaxMasterVisibility() {
  taxEls.taxDetailBody.querySelectorAll('.master-content').forEach(node => {
    node.hidden = !taxEls.taxDetailMaster.checked;
  });
}

function updateDynamicTaxFields() {
  const covered = taxEls.taxDetailBody.querySelector('[name="coveredFullYear"]');
  const partial = taxEls.taxDetailBody.querySelector('.partial-cover-fields');
  if (covered && partial) partial.hidden = covered.checked;

  const linked = taxEls.taxDetailBody.querySelector('[name="linkedProfileId"]');
  const manual = taxEls.taxDetailBody.querySelector('.manual-spouse-field');
  if (linked && manual) manual.hidden = Boolean(linked.value);
}

function calculateTaxV5(profile) {
  const tax = ensureTaxV5(profile);
  const employmentBefore = employmentIncomeBeforePackaging(tax);
  const packagingReduction = tax.packaging.enabled && tax.packaging.inputBasis === 'prepackage'
    ? number(tax.packaging.amountSacrificed)
    : 0;
  const employmentIncome = Math.max(0, employmentBefore - packagingReduction);
  const otherIncome = otherAssessableIncome(tax);
  const workClaims = totalDeductions(profile.id);
  const personalSuper = tax.deductions.noticeOfIntent ? number(tax.deductions.personalSuperDeduction) : 0;
  const otherDeductions = number(tax.deductions.otherDeductions);
  const totalDeductionsValue = workClaims + personalSuper + otherDeductions;
  const taxableIncome = Math.max(0, employmentIncome + otherIncome - totalDeductionsValue);

  const incomeTaxBeforeOffsets = residentTax(taxableIncome);
  const lito = lowIncomeTaxOffset(taxableIncome);
  const incomeTax = Math.max(0, incomeTaxBeforeOffsets - lito);

  const spouseIncome = spouseIncomeForTax(profile, tax);
  const familyIncome = taxableIncome + spouseIncome;
  const medicareLevy = calculateMedicareLevy(taxableIncome, familyIncome, tax);
  const incomeForSurcharge = Math.max(0,
    taxableIncome +
    number(tax.packaging.reportableEmployerSuper) +
    number(tax.packaging.reportableFringeBenefits) +
    number(tax.advanced.netInvestmentLosses)
  );
  const mls = calculateMls(incomeForSurcharge, tax, taxableIncome);
  const repaymentIncome = Math.max(0,
    incomeForSurcharge + number(tax.advanced.exemptForeignEmploymentIncome)
  );
  const helpRepayment = tax.studyLoan.enabled
    ? calculateHelpRepayment(repaymentIncome, number(tax.studyLoan.debtBalance))
    : 0;

  const withholding = totalWithholding(tax);
  const taxOffsets =
    number(tax.other.frankingCredits) +
    number(tax.income.foreignTaxPaid) +
    number(tax.offsets.spouseSuperOffset) +
    number(tax.offsets.otherOffsets) +
    signedNumber(tax.privateHealth.rebateAdjustment);
  const withholdingAndCredits = withholding + taxOffsets;
  const totalLiability = incomeTax + medicareLevy + mls + helpRepayment;
  const refund = withholdingAndCredits - totalLiability;

  return {
    employmentIncome,
    otherIncome,
    workClaims,
    personalSuper,
    otherDeductions,
    totalDeductions: totalDeductionsValue,
    taxableIncome,
    incomeTaxBeforeOffsets,
    lito,
    incomeTax,
    medicareLevy,
    incomeForSurcharge,
    mls,
    repaymentIncome,
    helpRepayment,
    withholding,
    taxOffsets,
    withholdingAndCredits,
    totalLiability,
    refund,
    familyIncome
  };
}

function calculateMedicareLevy(taxableIncome, familyIncome, tax) {
  if (!tax.medicare.enabled) return 0;
  let levy;
  if (taxableIncome <= MEDICARE_SINGLE_LOWER) levy = 0;
  else if (taxableIncome < MEDICARE_SINGLE_UPPER) levy = Math.min(taxableIncome * 0.02, (taxableIncome - MEDICARE_SINGLE_LOWER) * 0.10);
  else levy = taxableIncome * 0.02;

  if (tax.family.hasSpouse) {
    const familyLower = MEDICARE_FAMILY_LOWER + number(tax.family.dependentChildren) * MEDICARE_CHILD_INCREMENT;
    const familyUpper = familyLower / 0.8;
    if (familyIncome <= familyLower) levy = 0;
    else if (familyIncome < familyUpper && familyIncome > 0) {
      const familyCap = (familyIncome - familyLower) * 0.10;
      levy = Math.min(levy, familyCap * (taxableIncome / familyIncome));
    }
  }

  const fullDays = clamp(number(tax.medicare.fullExemptionDays),0,365);
  const halfDays = clamp(number(tax.medicare.halfExemptionDays),0,365-fullDays);
  const regularDays = 365 - fullDays - halfDays;
  return Math.max(0, levy * ((regularDays + halfDays * 0.5) / 365));
}

function calculateMls(incomeForSurcharge, tax, taxableIncome) {
  if (taxableIncome <= MEDICARE_SINGLE_LOWER) return 0;
  const family = tax.family.hasSpouse;
  const childrenAfterFirst = Math.max(0, number(tax.family.dependentChildren) - 1);
  const thresholds = (family ? MLS_FAMILY : MLS_SINGLE).map(value => value + (family ? childrenAfterFirst * 1500 : 0));
  let rate = 0;
  if (incomeForSurcharge > thresholds[2]) rate = 0.015;
  else if (incomeForSurcharge > thresholds[1]) rate = 0.0125;
  else if (incomeForSurcharge > thresholds[0]) rate = 0.01;
  if (!rate) return 0;

  let uncoveredDays = 365;
  if (tax.privateHealth.enabled) uncoveredDays = tax.privateHealth.coveredFullYear ? 0 : clamp(number(tax.privateHealth.daysWithoutCover),0,365);
  return incomeForSurcharge * rate * (uncoveredDays / 365);
}

function calculateHelpRepayment(repaymentIncome, debtBalance = 0) {
  let repayment = 0;
  if (repaymentIncome <= 67000) repayment = 0;
  else if (repaymentIncome <= 125000) repayment = (repaymentIncome - 67000) * 0.15;
  else if (repaymentIncome <= 179285) repayment = 8700 + (repaymentIncome - 125000) * 0.17;
  else repayment = repaymentIncome * 0.10;
  if (debtBalance > 0) repayment = Math.min(repayment, debtBalance);
  return Math.max(0, repayment);
}

function employmentIncomeBeforePackaging(tax) {
  return number(tax.income.salaryWages) + number(tax.income.allowances) + number(tax.income.otherEmploymentIncome);
}

function otherAssessableIncome(tax) {
  return Object.values(tax.other).reduce((sum, value) => sum + signedNumber(value), 0);
}

function totalWithholding(tax) {
  return number(tax.income.paygWithheldSalary) + number(tax.income.paygWithheldOther) + number(tax.income.paygInstalments);
}

function spouseIncomeForTax(profile, tax) {
  if (!tax.family.hasSpouse) return 0;
  if (tax.family.linkedProfileId) {
    const spouse = getProfile(tax.family.linkedProfileId);
    if (spouse && spouse.id !== profile.id) return baseTaxableIncome(spouse);
  }
  return number(tax.family.spouseIncomeManual);
}

function baseTaxableIncome(profile) {
  const tax = ensureTaxV5(profile);
  const packagingReduction = tax.packaging.enabled && tax.packaging.inputBasis === 'prepackage' ? number(tax.packaging.amountSacrificed) : 0;
  const employment = Math.max(0, employmentIncomeBeforePackaging(tax) - packagingReduction);
  const deductions = totalDeductions(profile.id) + (tax.deductions.noticeOfIntent ? number(tax.deductions.personalSuperDeduction) : 0) + number(tax.deductions.otherDeductions);
  return Math.max(0, employment + otherAssessableIncome(tax) - deductions);
}

function linkedSpouseName(tax) {
  if (!tax.family.hasSpouse) return 'Not added';
  return getProfile(tax.family.linkedProfileId)?.name || 'Manual';
}

function packagingTypeLabel(value) {
  return ({super:'Superannuation',fringe:'Fringe benefits',novated:'Novated lease',multiple:'Multiple arrangements'})[value] || 'Salary packaging';
}

function breakdownMarkup(result) {
  const outcomeClass = result.refund >= 0 ? 'positive' : 'negative';
  return `
    <div class="breakdown-list">
      ${breakdownRow('Employment income', result.employmentIncome)}
      ${breakdownRow('Other assessable income', result.otherIncome)}
      ${breakdownRow('Less: deductions', -result.totalDeductions)}
      ${breakdownRow('Taxable income', result.taxableIncome, true)}
      ${breakdownRow('Income tax after LITO', result.incomeTax)}
      ${breakdownRow('Medicare levy', result.medicareLevy)}
      ${breakdownRow('Medicare levy surcharge', result.mls)}
      ${breakdownRow('Study-loan repayment', result.helpRepayment)}
      ${breakdownRow('Total tax & levies', result.totalLiability, true)}
      ${breakdownRow('Less: withholding & credits', -result.withholdingAndCredits)}
      <div class="breakdown-outcome ${outcomeClass}"><span>${result.refund >= 0 ? 'Estimated refund' : 'Estimated payable'}</span><strong>${money(Math.abs(result.refund))}</strong></div>
    </div>
    <div class="income-test-summary">
      <div><span>Income for surcharge purposes</span><strong>${money(result.incomeForSurcharge)}</strong></div>
      <div><span>Study-loan repayment income</span><strong>${money(result.repaymentIncome)}</strong></div>
    </div>
    ${noteBox('This is an estimate, not a lodged tax return. Some offsets, private health adjustments and special circumstances require additional ATO calculations.')}
  `;
}

function breakdownRow(label, value, strong = false) {
  return `<div class="breakdown-row ${strong ? 'strong' : ''}"><span>${label}</span><b>${value < 0 ? '− ' : ''}${money(Math.abs(value))}</b></div>`;
}

function groupTitle(label) {
  return `<p class="tax-form-group">${label}</p>`;
}

function moneyField(label, name, value, hint = '') {
  return `<label class="tax-form-row"><span><strong>${label}</strong>${hint ? `<small>${hint}</small>` : ''}</span><span class="money-input"><i>$</i><input name="${name}" type="number" inputmode="decimal" step="0.01" value="${inputNumber(value)}" /></span></label>`;
}

function numberField(label, name, value, min = 0, max = '') {
  return `<label class="tax-form-row"><span><strong>${label}</strong></span><input class="small-input" name="${name}" type="number" inputmode="numeric" min="${min}" ${max !== '' ? `max="${max}"` : ''} step="1" value="${inputNumber(value)}" /></label>`;
}

function selectField(label, name, value, options) {
  return `<label class="tax-form-row"><span><strong>${label}</strong></span><select name="${name}">${options.map(([optionValue, optionLabel]) => `<option value="${optionValue}" ${String(value) === String(optionValue) ? 'selected' : ''}>${optionLabel}</option>`).join('')}</select></label>`;
}

function toggleField(label, name, value, hint = '') {
  return `<label class="tax-form-row"><span><strong>${label}</strong>${hint ? `<small>${hint}</small>` : ''}</span><span class="mini-switch inline"><input name="${name}" type="checkbox" ${value ? 'checked' : ''}/><span></span></span></label>`;
}

function readonlyRow(label, value, hint = '') {
  return `<div class="tax-form-row readonly"><span><strong>${label}</strong>${hint ? `<small>${hint}</small>` : ''}</span><b>${value}</b></div>`;
}

function infoBox(text) {
  return `<div class="tax-info-box"><span class="svg-icon" data-icon="info"></span><p>${text}</p></div>`;
}

function noteBox(text) {
  return `<div class="tax-note-box"><span class="svg-icon" data-icon="info"></span><p>${text}</p></div>`;
}

function successBox(text) {
  return `<div class="tax-success-box"><span class="svg-icon" data-icon="check"></span><p>${text}</p></div>`;
}

function setText(selector, value) {
  const element = document.querySelector(selector);
  if (element) element.textContent = value;
}

function inputNumber(value) {
  const parsed = Number(value || 0);
  return Number.isFinite(parsed) && parsed !== 0 ? String(parsed) : '';
}

function number(value) {
  const parsed = Number(value || 0);
  return Number.isFinite(parsed) ? Math.max(0, parsed) : 0;
}

function signedNumber(value) {
  const parsed = Number(value || 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, number(value)));
}
