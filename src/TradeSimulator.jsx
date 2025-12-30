import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, BarChart3, Calculator, FileText, Save, Check } from 'lucide-react';

export default function TradeSimulator() {
  const [activeView, setActiveView] = useState('inputs'); // 'inputs' or 'simulation'
  
  // Auto-save indicator
  const [showSaved, setShowSaved] = useState(false);

  // Load saved values from localStorage
  const loadSavedValue = (key, defaultValue) => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tradeSimulator');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          return parsed[key] !== undefined ? parsed[key] : defaultValue;
        } catch (e) {
          return defaultValue;
        }
      }
    }
    return defaultValue;
  };

  // 1) Company & trade volume
  const [annualVolumeMM, setAnnualVolumeMM] = useState(() => loadSavedValue('annualVolumeMM', 200));
  const [digitisationPct, setDigitisationPct] = useState(() => loadSavedValue('digitisationPct', 100));
  
  // Convert millions to actual value for calculations
  const annualVolume = annualVolumeMM * 1000000;

  // 2) Early payment discounts & working capital
  const [currentPaymentTerms, setCurrentPaymentTerms] = useState(() => loadSavedValue('currentPaymentTerms', 60));
  const [termExtension, setTermExtension] = useState(() => loadSavedValue('termExtension', 30));
  const [supplierUptakePct, setSupplierUptakePct] = useState(() => loadSavedValue('supplierUptakePct', 65));
  const [earlyPaymentDiscount, setEarlyPaymentDiscount] = useState(() => loadSavedValue('earlyPaymentDiscount', 3.5));
  const [daysToPayment, setDaysToPayment] = useState(() => loadSavedValue('daysToPayment', 7));
  const [bankFundedPct, setBankFundedPct] = useState(() => loadSavedValue('bankFundedPct', 60));
  const [scfRate, setScfRate] = useState(() => loadSavedValue('scfRate', 6.5));
  const [internalCostOfFunds, setInternalCostOfFunds] = useState(() => loadSavedValue('internalCostOfFunds', 4.0));
  const [wcInterestRate, setWcInterestRate] = useState(() => loadSavedValue('wcInterestRate', 6.0));

  // 3) AP headcount efficiency
  const [apHeadcount, setApHeadcount] = useState(() => loadSavedValue('apHeadcount', 15));
  const [apCostPerFte, setApCostPerFte] = useState(() => loadSavedValue('apCostPerFte', 50000));
  const [apEfficiencyPct, setApEfficiencyPct] = useState(() => loadSavedValue('apEfficiencyPct', 40));

  // 4) Customs & trade compliance benefits
  const [customsFilings, setCustomsFilings] = useState(() => loadSavedValue('customsFilings', 1000));
  const [brokerFeePerFiling, setBrokerFeePerFiling] = useState(() => loadSavedValue('brokerFeePerFiling', 55));
  const [selfFilingPct, setSelfFilingPct] = useState(() => loadSavedValue('selfFilingPct', 90));
  const [shipmentsWithFees, setShipmentsWithFees] = useState(() => loadSavedValue('shipmentsWithFees', 3500));
  const [forwarderFeePerShipment, setForwarderFeePerShipment] = useState(() => loadSavedValue('forwarderFeePerShipment', 20));
  const [docFeesEliminatedPct, setDocFeesEliminatedPct] = useState(() => loadSavedValue('docFeesEliminatedPct', 35));
  const [tradeComplianceHeadcount, setTradeComplianceHeadcount] = useState(() => loadSavedValue('tradeComplianceHeadcount', 8));
  const [tradeCostPerFte, setTradeCostPerFte] = useState(() => loadSavedValue('tradeCostPerFte', 50000));
  const [tradeEfficiencyPct, setTradeEfficiencyPct] = useState(() => loadSavedValue('tradeEfficiencyPct', 40));

  // Simulation inputs (for historic values)
  const [turnover, setTurnover] = useState(() => loadSavedValue('turnover', 1000000000));
  const [costOfSales, setCostOfSales] = useState(() => loadSavedValue('costOfSales', 700000000));
  const [operatingProfit, setOperatingProfit] = useState(() => loadSavedValue('operatingProfit', 40000000));
  const [netInterest, setNetInterest] = useState(() => loadSavedValue('netInterest', 50000000));
  const [ebitda, setEbitda] = useState(() => loadSavedValue('ebitda', 120000000));
  const [tradePayables, setTradePayables] = useState(() => loadSavedValue('tradePayables', 100000000));
  const [netDebt, setNetDebt] = useState(() => loadSavedValue('netDebt', 500000000));
  const [equity, setEquity] = useState(() => loadSavedValue('equity', 200000000));
  const [freeCashFlow, setFreeCashFlow] = useState(() => loadSavedValue('freeCashFlow', 30000000));

  // Save all values to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const allValues = {
        annualVolumeMM, digitisationPct,
        currentPaymentTerms, termExtension, supplierUptakePct, earlyPaymentDiscount, 
        daysToPayment, bankFundedPct, scfRate, internalCostOfFunds, wcInterestRate,
        apHeadcount, apCostPerFte, apEfficiencyPct,
        customsFilings, brokerFeePerFiling, selfFilingPct, shipmentsWithFees, 
        forwarderFeePerShipment, docFeesEliminatedPct, tradeComplianceHeadcount, 
        tradeCostPerFte, tradeEfficiencyPct,
        turnover, costOfSales, operatingProfit, netInterest, ebitda,
        tradePayables, netDebt, equity, freeCashFlow
      };
      localStorage.setItem('tradeSimulator', JSON.stringify(allValues));
      
      setShowSaved(true);
      const timer = setTimeout(() => setShowSaved(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [annualVolumeMM, digitisationPct, currentPaymentTerms, termExtension, supplierUptakePct, 
      earlyPaymentDiscount, daysToPayment, bankFundedPct, scfRate, internalCostOfFunds, wcInterestRate,
      apHeadcount, apCostPerFte, apEfficiencyPct, customsFilings, brokerFeePerFiling, 
      selfFilingPct, shipmentsWithFees, forwarderFeePerShipment, docFeesEliminatedPct, 
      tradeComplianceHeadcount, tradeCostPerFte, tradeEfficiencyPct,
      turnover, costOfSales, operatingProfit, netInterest, ebitda, tradePayables, 
      netDebt, equity, freeCashFlow]);


  // ===== CALCULATIONS =====
  
  // Volume being digitised
  const digitisedVolume = annualVolume * (digitisationPct / 100);

  // Early payment calculations
  const daysAccelerated = currentPaymentTerms + termExtension - daysToPayment;
  const participatingSpend = digitisedVolume * (supplierUptakePct / 100);
  const discountValue = participatingSpend * (earlyPaymentDiscount / 100);
  
  // Funding costs
  const bankFundedAmount = participatingSpend * (bankFundedPct / 100);
  const internalFundedAmount = participatingSpend * (1 - bankFundedPct / 100);
  const bankFundingCost = bankFundedAmount * (scfRate / 100) * (daysAccelerated / 365);
  const internalFundingCost = internalFundedAmount * (internalCostOfFunds / 100) * (daysAccelerated / 365);
  
  // Net discount benefit
  const netDiscountBenefit = discountValue - bankFundingCost - internalFundingCost;

  // Working capital calculations
  const termExtensionDays = termExtension;
  const wcFromExtension = digitisedVolume * (termExtensionDays / 365);
  const wcUsedForEarlyPay = internalFundedAmount * (daysAccelerated / 365);
  const netWorkingCapital = wcFromExtension - wcUsedForEarlyPay;
  const wcAnnualValue = netWorkingCapital * (wcInterestRate / 100);

  // AP efficiency
  const apFteSaved = apHeadcount * (apEfficiencyPct / 100);
  const apSavings = apFteSaved * apCostPerFte;

  // Customs efficiency
  const brokerSavings = customsFilings * brokerFeePerFiling * (selfFilingPct / 100);
  const forwarderSavings = shipmentsWithFees * forwarderFeePerShipment * (docFeesEliminatedPct / 100);
  const tradeFteSaved = tradeComplianceHeadcount * (tradeEfficiencyPct / 100);
  const tradeHeadcountSavings = tradeFteSaved * tradeCostPerFte;
  const totalCustomsSavings = brokerSavings + forwarderSavings + tradeHeadcountSavings;

  // Total benefits
  const totalPLBenefit = netDiscountBenefit + apSavings + totalCustomsSavings;
  const plBenefitAfterCosts = totalPLBenefit; // Platform costs could be added here

  // Simulation calculations
  const adjustedCostOfSales = costOfSales - (bankFundedAmount * (earlyPaymentDiscount / 100));
  const adjustedOperatingProfit = operatingProfit + totalPLBenefit;
  const adjustedNetInterest = netInterest - (netWorkingCapital * (wcInterestRate / 100));
  const adjustedEbitda = ebitda + (bankFundedAmount * (earlyPaymentDiscount / 100)) + apSavings + totalCustomsSavings;
  const adjustedTradePayables = tradePayables + wcFromExtension;
  const adjustedNetDebt = netDebt - netWorkingCapital;
  const adjustedEquity = equity + totalPLBenefit;
  const adjustedFCF = freeCashFlow + netWorkingCapital;

  // Key ratios
  const ebitdaMargin = turnover > 0 ? ebitda / turnover : 0;
  const adjustedEbitdaMargin = turnover > 0 ? adjustedEbitda / turnover : 0;
  const operatingMargin = turnover > 0 ? operatingProfit / turnover : 0;
  const adjustedOperatingMargin = turnover > 0 ? adjustedOperatingProfit / turnover : 0;
  const leverage = ebitda > 0 ? netDebt / ebitda : 0;
  const adjustedLeverage = adjustedEbitda > 0 ? adjustedNetDebt / adjustedEbitda : 0;
  const solvency = equity > 0 ? netDebt / equity : 0;
  const adjustedSolvency = adjustedEquity > 0 ? adjustedNetDebt / adjustedEquity : 0;
  const fcfSales = turnover > 0 ? freeCashFlow / turnover : 0;
  const adjustedFcfSales = turnover > 0 ? adjustedFCF / turnover : 0;
  const interestCover = netInterest > 0 ? ebitda / netInterest : 0;
  const adjustedInterestCover = adjustedNetInterest > 0 ? adjustedEbitda / adjustedNetInterest : 0;

  // Formatting functions
  const formatCurrency = (value) => {
    if (Math.abs(value) >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`;
    } else if (Math.abs(value) >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value.toFixed(0)}`;
  };

  const formatNumber = (value, decimals = 1) => {
    return value.toFixed(decimals);
  };

  const formatPercent = (value) => {
    return `${(value * 100).toFixed(2)}%`;
  };

  const InputField = ({ label, value, onChange, unit = '', note = '', type = 'number', step = '1' }) => (
    <div className="border-b border-gray-200 py-2.5">
      <div className="flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <label className="text-xs font-medium text-gray-700 block mb-0.5">{label}</label>
          {note && <p className="text-xs text-gray-500 line-clamp-1">{note}</p>}
        </div>
        <div className="flex items-center gap-2 w-64">
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value)}
            step={step}
            className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
          />
          {unit && <span className="text-xs text-gray-600 whitespace-nowrap min-w-[60px]">{unit}</span>}
        </div>
      </div>
    </div>
  );

  const SliderField = ({ label, value, onChange, min, max, step, unit = '', note = '', formatValue }) => {
    const [localValue, setLocalValue] = React.useState(value);
    const [isChanging, setIsChanging] = React.useState(false);

    React.useEffect(() => {
      if (!isChanging) {
        setLocalValue(value);
      }
    }, [value, isChanging]);

    const handleChange = (newValue) => {
      setLocalValue(newValue);
      setIsChanging(true);
    };

    const handleMouseUp = () => {
      setIsChanging(false);
      onChange(localValue);
    };

    return (
      <div className="border-b border-gray-200 py-2.5">
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <label className="text-xs font-medium text-gray-700 block mb-0.5">{label}</label>
            {note && <p className="text-xs text-gray-500 line-clamp-1">{note}</p>}
          </div>
          <div className="flex items-center gap-2 w-64">
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={localValue}
              onChange={(e) => handleChange(parseFloat(e.target.value))}
              onMouseUp={handleMouseUp}
              onTouchEnd={handleMouseUp}
              className="flex-1 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((localValue - min) / (max - min)) * 100}%, #e5e7eb ${((localValue - min) / (max - min)) * 100}%, #e5e7eb 100%)`
              }}
            />
            <div className="text-right min-w-[60px]">
              <span className="text-sm font-semibold text-blue-700">
                {formatValue ? formatValue(localValue) : localValue}
              </span>
              {unit && <span className="text-xs text-gray-600 ml-1">{unit}</span>}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CalculatedField = ({ label, value, note = '' }) => (
    <div className="bg-blue-50 border-l-4 border-blue-500 py-2.5 px-3 mb-2">
      <div className="flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <label className="text-xs font-semibold text-gray-900 block mb-0.5">{label}</label>
          {note && <p className="text-xs text-gray-600 line-clamp-1">{note}</p>}
        </div>
        <div className="text-base font-bold text-blue-700 min-w-[120px] text-right">
          {value}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-[1800px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Trade Digitalisation Benefits Calculator</h1>
              <p className="text-sm text-gray-600 mt-1">Prima Trade - Cash Against Data Platform</p>
            </div>
            <div className="flex items-center gap-4">
              {showSaved && (
                <div className="flex items-center gap-2 text-green-600 text-sm">
                  <Check className="w-4 h-4" />
                  <span>Saved</span>
                </div>
              )}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setActiveView('inputs')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeView === 'inputs'
                      ? 'bg-white text-blue-700 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Calculator className="w-4 h-4 inline mr-2" />
                  Inputs & Results
                </button>
                <button
                  onClick={() => setActiveView('simulation')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeView === 'simulation'
                      ? 'bg-white text-blue-700 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <BarChart3 className="w-4 h-4 inline mr-2" />
                  Simulation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1800px] mx-auto px-6 py-6">
        {activeView === 'inputs' ? (
           <div className="grid lg:grid-cols-2 gap-6">
            {/* Left Panel - Inputs */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
                  <span className="text-blue-600">1)</span> Company & Trade Volume
                </h2>
                <div className="space-y-1">
                  <InputField
                    label="International supply chain: annual volume"
                    value={annualVolumeMM}
                    onChange={setAnnualVolumeMM}
                    unit="$ MM / year"
                    note="Total invoice face value in scope (imports/exports using digitised docs)."
                    step="1"
                  />
                  <SliderField
                    label="% of that spend eligible for shipment-level approval / early payment"
                    value={digitisationPct}
                    onChange={setDigitisationPct}
                    min={0}
                    max={100}
                    step={1}
                    unit="%"
                    note="Proportion of the international supply chain that digitises its paperwork"
                  />
                  <CalculatedField
                    label="International supply chain being digitised"
                    value={formatCurrency(digitisedVolume)}
                    note="Annual volume times percentage of suppliers digitising"
                  />
                </div>
              </div>
             <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
                  <span className="text-blue-600">2)</span> Early Payment Discounts & Working Capital
                </h2>
                <div className="space-y-1">
                  <SliderField
                    label="Current average payment terms (days from shipment to payment)"
                    value={currentPaymentTerms}
                    onChange={setCurrentPaymentTerms}
                    min={0}
                    max={120}
                    step={1}
                    unit="days"
                    note="E.g., 60 days = suppliers are paid 60 days after shipment."
                  />
                  <SliderField
                    label="Term extension for digitised invoices (all of them)"
                    value={termExtension}
                    onChange={setTermExtension}
                    min={0}
                    max={90}
                    step={1}
                    unit="days"
                    note="Days beyond current terms (suppliers can take early payment at shipment)."
                  />
                  <SliderField
                    label="Suppliers taking early payment (% of eligible spend participating)"
                    value={supplierUptakePct}
                    onChange={setSupplierUptakePct}
                    min={0}
                    max={100}
                    step={1}
                    unit="%"
                    note="Portion of eligible suppliers/invoices that participate."
                  />
                  <SliderField
                    label="Discount for paying at shipment (% of invoice face value)"
                    value={earlyPaymentDiscount}
                    onChange={setEarlyPaymentDiscount}
                    min={0}
                    max={10}
                    step={0.1}
                    unit="%"
                    note="Average discount negotiated for payment at shipment."
                  />
                  <div className="bg-gray-50 p-3 my-3 rounded">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Early payment process</h3>
                    <div>
                      <div className="text-indigo-200 mb-1">Customs</div>
                      <div className="text-sm font-bold">{formatCurrency(totalCustomsSavings)}</div>
                    </div>
                  </div>
                <SliderField
                    label="Days from shipment to payment under digitised process"
                    value={daysToPayment}
                    onChange={setDaysToPayment}
                    min={0}
                    max={30}
                    step={1}
                    unit="days"
                    note="Days between shipment and payment when documents are digitised"
                  />
                  <CalculatedField
                    label="Days accelerated (how much earlier the supplier is paid)"
                    value={`${formatNumber(daysAccelerated, 0)} days`}
                    note="This is the funding period for early payments"
                  />
                  <SliderField
                    label="Share of early payments funded by banks / SCF"
                    value={bankFundedPct}
                    onChange={setBankFundedPct}
                    min={0}
                    max={100}
                    step={1}
                    unit="%"
                    note="0% = internal funds only; 100% = bank (ie: SCF) only."
                  />
                  <SliderField
                    label="International supply chain finance cost (annual, bank interest rate)"
                    value={scfRate}
                    onChange={setScfRate}
                    min={0}
                    max={15}
                    step={0.1}
                    unit="%"
                    note="Annualised cost charged by the bank to fund early payments to suppliers."
                  />
                  <SliderField
                    label="Internal cost of funds (annual rate notionally applied to funds used)"
                    value={internalCostOfFunds}
                    onChange={setInternalCostOfFunds}
                    min={0}
                    max={15}
                    step={0.1}
                    unit="%"
                    note="Opportunity cost / WACC / borrowing rate for internal funding."
                  />
                  <SliderField
                    label="Interest rate to value working capital (annual, interest savings)"
                    value={wcInterestRate}
                    onChange={setWcInterestRate}
                    min={0}
                    max={15}
                    step={0.1}
                    unit="%"
                    note="Used to estimate annual value of cash released/used as borrowing is lower"
                  />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
                  <span className="text-blue-600">3)</span> Accounts Payable (AP) Headcount Efficiency
                </h2>
                <div className="space-y-1">
                  <SliderField
                    label="Current AP team headcount"
                    value={apHeadcount}
                    onChange={setApHeadcount}
                    min={0}
                    max={50}
                    step={1}
                    unit="FTE"
                    note="Number of FTE currently in AP."
                  />
                  <SliderField
                    label="Fully loaded cost per AP FTE"
                    value={apCostPerFte}
                    onChange={setApCostPerFte}
                    min={30000}
                    max={150000}
                    step={1000}
                    unit="$ / yr"
                    note="Salary + benefits + overhead."
                    formatValue={(v) => `$${(v/1000).toFixed(0)}K`}
                  />
                  <SliderField
                    label="% headcount reduction achievable at full adoption"
                    value={apEfficiencyPct}
                    onChange={setApEfficiencyPct}
                    min={0}
                    max={100}
                    step={1}
                    unit="%"
                    note="Headcount savings as a result of more efficient processing"
                  />
                  <CalculatedField
                    label="AP headcount efficiencies"
                    value={formatCurrency(apSavings)}
                    note="Paperwork digitised at source instead of at head office"
                  />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
                  <span className="text-blue-600">4)</span> Customs & Trade Compliance Benefits
                </h2>
                <div className="space-y-1">
                  <SliderField
                    label="Annual number of import customs filings"
                    value={customsFilings}
                    onChange={setCustomsFilings}
                    min={0}
                    max={5000}
                    step={50}
                    unit="filings / yr"
                    note="Declarations currently handled via broker/forwarder."
                  />
                  <SliderField
                    label="Customs broker fee per filing"
                    value={brokerFeePerFiling}
                    onChange={setBrokerFeePerFiling}
                    min={0}
                    max={200}
                    step={5}
                    unit="$ / filing"
                    note="Average broker fee per import entry/filing."
                  />
                  <SliderField
                    label="% of filings moved to direct digital self-filing"
                    value={selfFilingPct}
                    onChange={setSelfFilingPct}
                    min={0}
                    max={100}
                    step={1}
                    unit="%"
                    note="Share posted directly into customs systems."
                  />
                  <SliderField
                    label="Annual number of shipments incurring forwarder doc/admin fees"
                    value={shipmentsWithFees}
                    onChange={setShipmentsWithFees}
                    min={0}
                    max={10000}
                    step={100}
                    unit="shipments / yr"
                    note="Only include shipments where fees are avoidable via digital docs."
                  />
                  <SliderField
                    label="Forwarder/doc fee per shipment"
                    value={forwarderFeePerShipment}
                    onChange={setForwarderFeePerShipment}
                    min={0}
                    max={100}
                    step={1}
                    unit="$ / shipment"
                    note="Document handling, forwarding admin, etc."
                  />
                  <SliderField
                    label="% of forwarder/doc fees eliminated via digital trade docs"
                    value={docFeesEliminatedPct}
                    onChange={setDocFeesEliminatedPct}
                    min={0}
                    max={100}
                    step={1}
                    unit="%"
                    note="Often similar to % self-filing, but can differ."
                  />
                  <SliderField
                    label="Current trade compliance team headcount"
                    value={tradeComplianceHeadcount}
                    onChange={setTradeComplianceHeadcount}
                    min={0}
                    max={30}
                    step={1}
                    unit="FTE"
                    note="Number of FTE currently in trade compliance."
                  />
                  <SliderField
                    label="Fully loaded cost per FTE"
                    value={tradeCostPerFte}
                    onChange={setTradeCostPerFte}
                    min={30000}
                    max={150000}
                    step={1000}
                    unit="$ / yr"
                    note="Salary + benefits + overhead."
                    formatValue={(v) => `$${(v/1000).toFixed(0)}K`}
                  />
                  <SliderField
                    label="% headcount reduction achievable at full adoption"
                    value={tradeEfficiencyPct}
                    onChange={setTradeEfficiencyPct}
                    min={0}
                    max={100}
                    step={1}
                    unit="%"
                    note="Headcount savings as a result of more efficient processing"
                  />
                  <CalculatedField
                    label="Trade compliance efficiencies"
                    value={formatCurrency(totalCustomsSavings)}
                    note="Lower fees to third parties and more efficient internal processes"
                  />
                </div>
              </div>
            </div>

            {/* Right Panel - Results */}
            <div className="space-y-6">
              {/* Combined P&L and Working Capital Card */}
              <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 rounded-lg shadow-xl p-6 text-white">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* P&L Section */}
                  <div>
                    <h3 className="text-lg font-bold mb-1">Total Annual P&L Benefit</h3>
                    <p className="text-indigo-100 text-xs mb-3">Early payment discounts, headcount savings, customs processes</p>
                    <div className="text-4xl font-bold mb-4">{formatCurrency(totalPLBenefit)}</div>
                    
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <div className="text-indigo-200 mb-1">Discounts</div>
                        <div className="text-sm font-bold">{formatCurrency(netDiscountBenefit)}</div>
                      </div>
                      <div>
                        <div className="text-indigo-200 mb-1">AP Efficiency</div>
                        <div className="text-sm font-bold">{formatCurrency(apSavings)}</div>
                      </div>
                      <div>
                        <div className="text-indigo-200 mb-1">Customs</div>
                        <div className="text-sm font-bold">{formatCurrency(totalCustomsSavings)}</div>
                      </div>
                    </div>
                  </div>

                  {/* Working Capital Section */}
                  <div className="border-l border-white/30 pl-6">
                    <h3 className="text-lg font-bold mb-1">Net Working Capital Generated</h3>
                    <p className="text-blue-100 text-xs mb-3">Cash released via longer payment terms</p>
                    <div className="text-4xl font-bold mb-4">{formatCurrency(netWorkingCapital)}</div>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <div className="text-blue-200 mb-1">From extension:</div>
                        <div className="text-sm font-bold">{formatCurrency(wcFromExtension)}</div>
                      </div>
                      <div>
                        <div className="text-blue-200 mb-1">Used for early pay:</div>
                        <div className="text-sm font-bold">-{formatCurrency(wcUsedForEarlyPay)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
            {/* Working Capital Benefits - Aligns with Box 2 (Early Payment section) */}
              <div className="bg-white rounded-lg shadow-md p-6">          
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Working Capital Benefits</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cash from payment term extension:</span>
                    <span className="font-semibold text-green-700">{formatCurrency(wcFromExtension)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cash used for early payments:</span>
                    <span className="font-semibold text-red-700">-{formatCurrency(wcUsedForEarlyPay)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t font-bold">
                    <span className="text-gray-900">Net working capital:</span>
                    <span className="text-green-700">{formatCurrency(netWorkingCapital)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t">
                    <span className="text-gray-600">Annual value at {formatNumber(wcInterestRate, 1)}%:</span>
                    <span className="font-semibold text-blue-700">{formatCurrency(wcAnnualValue)}</span>
                  </div>
                </div>
              </div>

 {/* Early Payment Details - Below Working Capital Benefits */}
               <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Early Payment Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Participating spend:</span>
                    <span className="font-semibold">{formatCurrency(participatingSpend)}</span>
                  </div>
                  <div className="flex justify-between pl-4">
                    <span className="text-gray-600">• Bank funded ({formatNumber(bankFundedPct, 0)}%):</span>
                    <span className="font-semibold text-blue-700">{formatCurrency(bankFundedAmount)}</span>
                  </div>
                  <div className="flex justify-between pl-4">
                    <span className="text-gray-600">• Internally funded ({formatNumber(100 - bankFundedPct, 0)}%):</span>
                    <span className="font-semibold text-blue-700">{formatCurrency(internalFundedAmount)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t">
                    <span className="text-gray-600">Total discount value:</span>
                    <span className="font-semibold text-green-700">{formatCurrency(discountValue)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bank funding cost:</span>
                    <span className="font-semibold text-red-700">-{formatCurrency(bankFundingCost)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Internal funding cost:</span>
                    <span className="font-semibold text-red-700">-{formatCurrency(internalFundingCost)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t font-bold">
                    <span className="text-gray-900">Net discount benefit:</span>
                    <span className="text-green-700">{formatCurrency(netDiscountBenefit)}</span>
                  </div>
                </div>
              </div>
{/* Headcount Efficiency - Aligns with Box 3 (AP Headcount section) */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Headcount Efficiency</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">AP FTEs saved:</span>
                    <span className="font-semibold text-purple-700">{formatNumber(apFteSaved, 1)} FTEs</span></div>
                </div>  
             <div className="flex justify-between">
                    <span className="text-gray-600">AP annual savings:</span>
                    <span className="font-semibold text-green-700">{formatCurrency(apSavings)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t">
                    <span className="text-gray-600">Trade FTEs saved:</span>
                    <span className="font-semibold text-purple-700">{formatNumber(tradeFteSaved, 1)} FTEs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Trade headcount savings:</span>
                    <span className="font-semibold text-green-700">{formatCurrency(tradeHeadcountSavings)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t font-bold">
                    <span className="text-gray-900">Total FTEs saved:</span>
                    <span className="text-purple-700">{formatNumber(apFteSaved + tradeFteSaved, 1)} FTEs</span>
                  </div>
                </div>
              </div>
            </div>

 {/* P&L Benefits After Costs - Aligns with Box 4 (Customs section) at bottom */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">P&L Benefits After Costs</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm text-gray-600">Net discount benefit:</span>
                    <span className="font-semibold text-green-700">{formatCurrency(netDiscountBenefit)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm text-gray-600">AP headcount savings:</span>
                    <span className="font-semibold text-green-700">{formatCurrency(apSavings)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm text-gray-600">Customs broker savings:</span>
                    <span className="font-semibold text-green-700">{formatCurrency(brokerSavings)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm text-gray-600">Forwarder fee savings:</span>
                    <span className="font-semibold text-green-700">{formatCurrency(forwarderSavings)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm text-gray-600">Trade compliance savings:</span>
                    <span className="font-semibold text-green-700">{formatCurrency(tradeHeadcountSavings)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-3">
                    <span className="font-bold text-gray-900">Total P&L Benefit:</span>
                    <span className="text-2xl font-bold text-green-700">{formatCurrency(totalPLBenefit)}</span>
                  </div>
                 </div>
              </div>
            </div>
          </div>
        ) : (
          /* Simulation View */
          <div className="space-y-6">
            {/* Simulation Inputs */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Historic Financial Position (for comparison)</h2>
                   <p className="text-sm text-gray-600 mb-4">Enter your current financial figures to see the impact of digitalization</p>
              <div className="grid md:grid-cols-3 gap-4">
                <InputField
                  label="Turnover / Revenue"
                  value={turnover}
                  onChange={setTurnover}
                  unit="$"
                  step="1000000"
                />
                <InputField
                  label="Cost of Sales"
                  value={costOfSales}
                  onChange={setCostOfSales}
                  unit="$"
                  step="1000000"
                />
                <InputField
                  label="Operating Profit"
                  value={operatingProfit}
                  onChange={setOperatingProfit}
                  unit="$"
                  step="1000000"
                />
                <InputField
                  label="Net Interest Payable"
                  value={netInterest}
                  onChange={setNetInterest}
                  unit="$"
                  step="1000000"
                />
                <InputField
                  label="EBITDA"
                  value={ebitda}
                  onChange={setEbitda}
                  unit="$"
                  step="1000000"
                />
                <InputField
                  label="Trade Payables"
                  value={tradePayables}
                  onChange={setTradePayables}
                  unit="$"
                  step="1000000"
                />
                <InputField
                  label="Net Debt"
                  value={netDebt}
                  onChange={setNetDebt}
                  unit="$"
                  step="1000000"
                />
                <InputField
                  label="Equity"
                  value={equity}
                  onChange={setEquity}
                  unit="$"
                  step="1000000"
                />
                <InputField
                  label="Free Cash Flow"
                  value={freeCashFlow}
                  onChange={setFreeCashFlow}
                  unit="$"
                  step="1000000"
                />
              </div>
            </div>

            {/* P&L Comparison */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-blue-600" />
                P&L (Extract)
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Item</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Historic Value</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-blue-700">After PrimaTrade</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="py-3 px-4 text-sm">Turnover / revenue</td>
                      <td className="py-3 px-4 text-sm text-right font-medium">{formatCurrency(turnover)}</td>
                      <td className="py-3 px-4 text-sm text-right font-medium text-blue-700">{formatCurrency(turnover)}</td>
                      <td className="py-3 px-4 text-xs text-gray-600">Unchanged</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm">Cost of sales</td>
                      <td className="py-3 px-4 text-sm text-right font-medium">{formatCurrency(costOfSales)}</td>
                      <td className="py-3 px-4 text-sm text-right font-medium text-green-700">{formatCurrency(adjustedCostOfSales)}</td>
                      <td className="py-3 px-4 text-xs text-gray-600">Reduced by early payment discounts where funding is external</td>
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="py-3 px-4 text-sm font-semibold">Operating profit</td>
                      <td className="py-3 px-4 text-sm text-right font-bold">{formatCurrency(operatingProfit)}</td>
                      <td className="py-3 px-4 text-sm text-right font-bold text-green-700">{formatCurrency(adjustedOperatingProfit)}</td>
                      <td className="py-3 px-4 text-xs text-gray-600">Increased by the full P&L benefit</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm">Net interest payable</td>
                      <td className="py-3 px-4 text-sm text-right font-medium">{formatCurrency(netInterest)}</td>
                      <td className="py-3 px-4 text-sm text-right font-medium text-green-700">{formatCurrency(adjustedNetInterest)}</td>
                      <td className="py-3 px-4 text-xs text-gray-600">Reduced as lower borrowing because of working capital benefits</td>
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="py-3 px-4 text-sm font-semibold">EBITDA</td>
                      <td className="py-3 px-4 text-sm text-right font-bold">{formatCurrency(ebitda)}</td>
                      <td className="py-3 px-4 text-sm text-right font-bold text-green-700">{formatCurrency(adjustedEbitda)}</td>
                      <td className="py-3 px-4 text-xs text-gray-600">Increased by funded early payment discounts and operational wins</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Balance Sheet Comparison */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-blue-600" />
                Balance Sheet and Cash Flow (Extract)
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Item</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Historic Value</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-blue-700">After PrimaTrade</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="py-3 px-4 text-sm">Trade payables</td>
                      <td className="py-3 px-4 text-sm text-right font-medium">{formatCurrency(tradePayables)}</td>
                      <td className="py-3 px-4 text-sm text-right font-medium text-blue-700">{formatCurrency(adjustedTradePayables)}</td>
                      <td className="py-3 px-4 text-xs text-gray-600">Goes up as suppliers are providing more credit</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm">Net debt</td>
                      <td className="py-3 px-4 text-sm text-right font-medium">{formatCurrency(netDebt)}</td>
                      <td className="py-3 px-4 text-sm text-right font-medium text-green-700">{formatCurrency(adjustedNetDebt)}</td>
                      <td className="py-3 px-4 text-xs text-gray-600">Reduced as lower borrowing because of working capital benefits</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm">Equity</td>
                      <td className="py-3 px-4 text-sm text-right font-medium">{formatCurrency(equity)}</td>
                      <td className="py-3 px-4 text-sm text-right font-medium text-green-700">{formatCurrency(adjustedEquity)}</td>
                      <td className="py-3 px-4 text-xs text-gray-600">Increased as earnings are higher over the period</td>
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="py-3 px-4 text-sm font-semibold">Free cash flow</td>
                      <td className="py-3 px-4 text-sm text-right font-bold">{formatCurrency(freeCashFlow)}</td>
                      <td className="py-3 px-4 text-sm text-right font-bold text-green-700">{formatCurrency(adjustedFCF)}</td>
                      <td className="py-3 px-4 text-xs text-gray-600">Increased as working capital generated</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Key Ratios */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-blue-600" />
                Key Ratios
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Ratio</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Historic Value</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-blue-700">After PrimaTrade</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="py-3 px-4 text-sm">EBITDA margin</td>
                      <td className="py-3 px-4 text-sm text-right font-medium">{formatPercent(ebitdaMargin)}</td>
                      <td className="py-3 px-4 text-sm text-right font-medium text-green-700">{formatPercent(adjustedEbitdaMargin)}</td>
                      <td className="py-3 px-4 text-xs text-gray-600">Up because cost of sales is lower and operations more efficient</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm">Operating margin</td>
                      <td className="py-3 px-4 text-sm text-right font-medium">{formatPercent(operatingMargin)}</td>
                      <td className="py-3 px-4 text-sm text-right font-medium text-green-700">{formatPercent(adjustedOperatingMargin)}</td>
                      <td className="py-3 px-4 text-xs text-gray-600">Up because cost of sales is lower and operations more efficient</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm">Leverage (Net Debt / EBITDA)</td>
                      <td className="py-3 px-4 text-sm text-right font-medium">{formatNumber(leverage, 2)}x</td>
                      <td className="py-3 px-4 text-sm text-right font-medium text-green-700">{formatNumber(adjustedLeverage, 2)}x</td>
                      <td className="py-3 px-4 text-xs text-gray-600">Down because EBITDA is higher and net debt is lower</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm">Solvency (Debt / Equity)</td>
                      <td className="py-3 px-4 text-sm text-right font-medium">{formatNumber(solvency, 2)}x</td>
                      <td className="py-3 px-4 text-sm text-right font-medium text-green-700">{formatNumber(adjustedSolvency, 2)}x</td>
                      <td className="py-3 px-4 text-xs text-gray-600">Down because net debt is lower and equity is higher</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm">FCF / Sales</td>
                      <td className="py-3 px-4 text-sm text-right font-medium">{formatPercent(fcfSales)}</td>
                      <td className="py-3 px-4 text-sm text-right font-medium text-green-700">{formatPercent(adjustedFcfSales)}</td>
                      <td className="py-3 px-4 text-xs text-gray-600">Up because working capital is generated</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm">Interest cover</td>
                      <td className="py-3 px-4 text-sm text-right font-medium">{formatNumber(interestCover, 2)}x</td>
                      <td className="py-3 px-4 text-sm text-right font-medium text-green-700">{formatNumber(adjustedInterestCover, 2)}x</td>
                      <td className="py-3 px-4 text-xs text-gray-600">Up because interest costs reduce and earnings increase</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Summary Card */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg shadow-xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-6">Impact Summary</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="text-green-100 text-sm mb-2">P&L Improvement</div>
                  <div className="text-4xl font-bold mb-1">{formatCurrency(adjustedOperatingProfit - operatingProfit)}</div>
                  <div className="text-green-100 text-sm">Operating profit increase</div>
                </div>
                <div>
                  <div className="text-green-100 text-sm mb-2">Working Capital Released</div>
                  <div className="text-4xl font-bold mb-1">{formatCurrency(netWorkingCapital)}</div>
                  <div className="text-green-100 text-sm">Additional cash available</div>
                </div>
                <div>
                  <div className="text-green-100 text-sm mb-2">Leverage Improvement</div>
                  <div className="text-4xl font-bold mb-1">{formatNumber(leverage - adjustedLeverage, 2)}x</div>
                  <div className="text-green-100 text-sm">Net Debt / EBITDA reduction</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
