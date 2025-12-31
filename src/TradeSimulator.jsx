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
  const [currencySymbol, setCurrencySymbol] = useState(() => loadSavedValue('currencySymbol', '$'));
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
  const [customsFilings, setCustomsFilings] = useState(() => loadSavedValue('customsFilings', 100));
  const [brokerFeePerFiling, setBrokerFeePerFiling] = useState(() => loadSavedValue('brokerFeePerFiling', 55));
  const [selfFilingPct, setSelfFilingPct] = useState(() => loadSavedValue('selfFilingPct', 90));
  const [shipmentsWithFees, setShipmentsWithFees] = useState(() => loadSavedValue('shipmentsWithFees', 300));
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
        currencySymbol, annualVolumeMM, digitisationPct,
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
  }, [currencySymbol, annualVolumeMM, digitisationPct, currentPaymentTerms, termExtension, supplierUptakePct, 
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
  const brokerSavings = customsFilings * 12 * brokerFeePerFiling * (selfFilingPct / 100);
  const forwarderSavings = shipmentsWithFees * 12 * forwarderFeePerShipment * (docFeesEliminatedPct / 100);
  const tradeFteSaved = tradeComplianceHeadcount * (tradeEfficiencyPct / 100);
  const tradeHeadcountSavings = tradeFteSaved * tradeCostPerFte;
  const totalCustomsSavings = brokerSavings + forwarderSavings + tradeHeadcountSavings;

  // Total benefits
  const totalOperationalSavings = apSavings + totalCustomsSavings;
  const totalPLBenefit = netDiscountBenefit + totalOperationalSavings;
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
      return `${currencySymbol}${(value / 1000000).toFixed(2)}M`;
    } else if (Math.abs(value) >= 1000) {
      return `${currencySymbol}${(value / 1000).toFixed(0)}K`;
    }
    return `${currencySymbol}${value.toFixed(0)}`;
  };

  const formatNumber = (value, decimals = 1) => {
    return value.toFixed(decimals);
  };

  const formatPercent = (value) => {
    return `${(value * 100).toFixed(2)}%`;
  };

  const InputField = ({ label, value, onChange, unit = '', note = '', compact = false }) => {
    const [localValue, setLocalValue] = React.useState(value);
    const [isEditing, setIsEditing] = React.useState(false);

    React.useEffect(() => {
      if (!isEditing) {
        setLocalValue(value);
      }
    }, [value, isEditing]);

    const handleFocus = () => {
      setIsEditing(true);
    };

    const handleBlur = () => {
      setIsEditing(false);
      const parsed = parseFloat(localValue);
      if (!isNaN(parsed)) {
        onChange(parsed);
      } else {
        setLocalValue(value);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        e.target.blur();
      }
    };

    return (
      <div className="border-b border-gray-200 py-2.5">
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <label className="text-xs font-medium text-gray-700 block mb-0.5">{label}</label>
            {note && <p className="text-xs text-gray-500 line-clamp-1">{note}</p>}
          </div>
          <div className={`flex items-center gap-2 ${compact ? 'w-40' : 'w-64'}`}>
            <input
              type="text"
              value={localValue}
              onChange={(e) => setLocalValue(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F08070] text-right"
            />
            {unit && <span className="text-xs text-gray-600 whitespace-nowrap min-w-[60px]">{unit}</span>}
          </div>
        </div>
      </div>
    );
  };

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
                background: `linear-gradient(to right, #F08070 0%, #F08070 ${((localValue - min) / (max - min)) * 100}%, #e5e7eb ${((localValue - min) / (max - min)) * 100}%, #e5e7eb 100%)`
              }}
            />
            <div className="text-right min-w-[60px]">
              <span className="text-sm font-semibold text-[#D64933]">
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
    <div className="bg-[#F08070]/10 border-l-4 border-[#F08070] py-2.5 px-3 mb-2">
      <div className="flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <label className="text-xs font-semibold text-gray-900 block mb-0.5">{label}</label>
          {note && <p className="text-xs text-gray-600 line-clamp-1">{note}</p>}
        </div>
        <div className="text-base font-bold text-[#D64933] min-w-[120px] text-right">
          {value}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#BAC1B8]/10 to-[#F08070]/5">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-[1800px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img 
                src="/240417_PTS_red_logo.png" 
                alt="Prima Trade" 
                className="h-8 w-auto"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Trade Digitalisation Benefits Calculator</h1>
                <p className="text-sm text-gray-600 mt-1">Cash Against Data Platform</p>
              </div>
            </div>
            {showSaved && (
              <div className="flex items-center gap-2 text-[#D64933] text-sm">
                <Check className="w-4 h-4" />
                <span>Saved</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Tab Navigation */}
        <div className="border-t border-gray-200">
          <div className="max-w-[1800px] mx-auto px-6">
            <div className="flex gap-1">
              <button
                onClick={() => setActiveView('inputs')}
                className={`relative px-8 py-4 text-left transition-all ${
                  activeView === 'inputs'
                    ? 'bg-gradient-to-br from-[#D64933] to-[#F08070] text-white'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-3 mb-1">
                  <Calculator className="w-5 h-5" />
                  <span className="text-lg font-bold">Panel 1: Inputs & Results</span>
                </div>
                <p className={`text-xs ${activeView === 'inputs' ? 'text-white/80' : 'text-gray-500'}`}>
                  Enter your company data and see immediate benefit calculations
                </p>
                {activeView === 'inputs' && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white"></div>
                )}
              </button>
              
              <button
                onClick={() => setActiveView('simulation')}
                className={`relative px-8 py-4 text-left transition-all ${
                  activeView === 'simulation'
                    ? 'bg-gradient-to-br from-[#D64933] to-[#F08070] text-white'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-3 mb-1">
                  <BarChart3 className="w-5 h-5" />
                  <span className="text-lg font-bold">Panel 2: Before & After Simulation</span>
                </div>
                <p className={`text-xs ${activeView === 'simulation' ? 'text-white/80' : 'text-gray-500'}`}>
                  Compare your historic financials with projected improvements
                </p>
                {activeView === 'simulation' && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white"></div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1800px] mx-auto px-6 py-6">
        {activeView === 'inputs' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-6">
              {/* 1) Company & Trade Volume */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900">
                    <span className="text-[#F08070]">1)</span> Company & Trade Volume
                  </h2>
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700">Currency:</label>
                    <select
                      value={currencySymbol}
                      onChange={(e) => setCurrencySymbol(e.target.value)}
                      className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F08070] bg-white"
                    >
                      <option value="£">£ (GBP)</option>
                      <option value="$">$ (USD)</option>
                      <option value="€">€ (EUR)</option>
                      <option value="¥">¥ (JPY/CNY)</option>
                      <option value="₹">₹ (INR)</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-1">
                  <InputField
                    label="Import supply chain: annual volume"
                    value={annualVolumeMM}
                    onChange={setAnnualVolumeMM}
                    unit={`${currencySymbol} MM / year`}
                    note="Total invoice face value of imports."
                  />
                  <SliderField
                    label="Proportion of import supply chain digitising paperwork"
                    value={digitisationPct}
                    onChange={setDigitisationPct}
                    min={0}
                    max={100}
                    step={1}
                    unit="%"
                    note=""
                  />
                </div>
              </div>

              {/* 2) Early Payment Discounts & Working Capital */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
                  <span className="text-[#F08070]">2)</span> Early Payment Discounts & Working Capital
                </h2>
                <div className="space-y-1">
                  <SliderField
                    label="Average payment term after shipment"
                    value={currentPaymentTerms}
                    onChange={setCurrentPaymentTerms}
                    min={0}
                    max={120}
                    step={1}
                    unit="days"
                    note="60 days = suppliers paid 60 days after shipment."
                  />
                  <SliderField
                    label="Additional payment term for suppliers"
                    value={termExtension}
                    onChange={setTermExtension}
                    min={0}
                    max={90}
                    step={1}
                    unit="days"
                    note="Additional days beyond the current term."
                  />
                  <SliderField
                    label="% of suppliers taking early payment option"
                    value={supplierUptakePct}
                    onChange={setSupplierUptakePct}
                    min={0}
                    max={100}
                    step={1}
                    unit="%"
                    note="% of invoices paid at shipment."
                  />
                  <SliderField
                    label="Early payment discount for payment at shipment"
                    value={earlyPaymentDiscount}
                    onChange={setEarlyPaymentDiscount}
                    min={0}
                    max={10}
                    step={0.1}
                    unit="%"
                    note="Percent. reduction in the invoice amount."
                  />
                  <SliderField
                    label="Days after shipment until early payment"
                    value={daysToPayment}
                    onChange={setDaysToPayment}
                    min={0}
                    max={30}
                    step={1}
                    unit="days"
                    note="Time period for processing and payments"
                  />
                  <SliderField
                    label="Share of early payments funded by banks / SCF"
                    value={bankFundedPct}
                    onChange={setBankFundedPct}
                    min={0}
                    max={100}
                    step={1}
                    unit="%"
                    note="Portion of early payments funded externally"
                  />
                  <SliderField
                    label="Supply chain finance rate / cost of funds (annual)"
                    value={scfRate}
                    onChange={setScfRate}
                    min={0}
                    max={15}
                    step={0.1}
                    unit="%"
                    note="Rate charged by the bank to fund early payments."
                  />
                  <SliderField
                    label="Internal cost of funds"
                    value={internalCostOfFunds}
                    onChange={setInternalCostOfFunds}
                    min={0}
                    max={15}
                    step={0.1}
                    unit="%"
                    note="Notional borrowing rate for internal funding."
                  />
                  <SliderField
                    label="Rate for savings from working capital generated"
                    value={wcInterestRate}
                    onChange={setWcInterestRate}
                    min={0}
                    max={15}
                    step={0.1}
                    unit="%"
                    note="Used to estimate annual value of lower borrowings"
                  />
                </div>
              </div>

              {/* 3) Accounts Payable (AP) Headcount Efficiency */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
                  <span className="text-[#F08070]">3)</span> Accounts Payable (AP) Headcount Efficiency
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
                    unit={`${currencySymbol} / yr`}
                    note="Salary + benefits + overhead."
                    formatValue={(v) => `${currencySymbol}${(v/1000).toFixed(0)}K`}
                  />
                  <SliderField
                    label="% headcount reduction achievable"
                    value={apEfficiencyPct}
                    onChange={setApEfficiencyPct}
                    min={0}
                    max={100}
                    step={1}
                    unit="%"
                    note="Headcount savings from more efficient processing"
                  />
                </div>
              </div>

              {/* 4) Customs & Trade Compliance Benefits */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
                  <span className="text-[#F08070]">4)</span> Customs & Trade Compliance Benefits
                </h2>
                <div className="space-y-1">
                  <SliderField
                    label="Monthly number of import customs filings"
                    value={customsFilings}
                    onChange={setCustomsFilings}
                    min={0}
                    max={5000}
                    step={50}
                    unit="filings / month"
                    note="Declarations currently handled via broker/forwarder."
                  />
                  <SliderField
                    label="Customs broker fee per filing"
                    value={brokerFeePerFiling}
                    onChange={setBrokerFeePerFiling}
                    min={0}
                    max={200}
                    step={1}
                    unit={`${currencySymbol} / filing`}
                    note="Total fee per filing charged by broker."
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
                    label="Monthly # of shipments with forwarder doc fees"
                    value={shipmentsWithFees}
                    onChange={setShipmentsWithFees}
                    min={0}
                    max={5000}
                    step={50}
                    unit="shipments / month"
                    note="Only include shipments where fees are avoided via digitisation."
                  />
                  <SliderField
                    label="Forwarder/doc fee per shipment"
                    value={forwarderFeePerShipment}
                    onChange={setForwarderFeePerShipment}
                    min={0}
                    max={100}
                    step={1}
                    unit={`${currencySymbol} / shipment`}
                    note="Document handling, forwarding admin, etc."
                  />
                  <SliderField
                    label="% of forwarder/doc fees eliminated"
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
                    unit={`${currencySymbol} / yr`}
                    note="Salary + benefits + overhead."
                    formatValue={(v) => `${currencySymbol}${(v/1000).toFixed(0)}K`}
                  />
                  <SliderField
                    label="% headcount reduction achievable"
                    value={tradeEfficiencyPct}
                    onChange={setTradeEfficiencyPct}
                    min={0}
                    max={100}
                    step={1}
                    unit="%"
                    note="Headcount savings from more efficient processing"
                  />
                </div>
              </div>
            </div>
                            
            <div className="space-y-6">
              {/* Summary card aligned with top of panel */}
              <div className="bg-gradient-to-br from-[#D64933] via-[#F08070] to-[#F08070] rounded-lg shadow-xl p-6 text-white">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* P&L Section */}
                  <div>
                    <h3 className="text-lg font-bold mb-1">Total Annual P&L Benefit</h3>
                    <p className="text-white/80 text-xs mb-3">Early payment discounts, operational savings</p>
                    <div className="text-4xl font-bold mb-4">{formatCurrency(totalPLBenefit)}</div>

                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <div className="text-white/70 mb-1">Discounts</div>
                        <div className="text-sm font-bold">{formatCurrency(netDiscountBenefit)}</div>
                      </div>
                      <div>
                        <div className="text-white/70 mb-1">AP Efficiency</div>
                        <div className="text-sm font-bold">{formatCurrency(apSavings)}</div>
                      </div>
                      <div>
                        <div className="text-white/70 mb-1">Customs</div>
                        <div className="text-sm font-bold">{formatCurrency(totalCustomsSavings)}</div>
                      </div>
                    </div>
                     </div>

                  {/* Working Capital Section */}
                  <div className="border-l border-white/30 pl-6">
                    <h3 className="text-lg font-bold mb-1">Net Working Capital Win</h3>
                    <p className="text-white/80 text-xs mb-3">Cash released via longer supplier payment terms</p>
                    <div className="text-4xl font-bold mb-4">{formatCurrency(netWorkingCapital)}</div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <div className="text-white/70 mb-1">From extension:</div>
                        <div className="text-sm font-bold">{formatCurrency(wcFromExtension)}</div>
                      </div>
                      <div>
                        <div className="text-white/70 mb-1">Used for early pay:</div>
                        <div className="text-sm font-bold">-{formatCurrency(wcUsedForEarlyPay)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* How Trade Digitalisation Works - Informational Box */}
              <div className="bg-gradient-to-br from-white to-[#F08070]/5 rounded-lg shadow-md p-6 border-l-4 border-[#D64933]">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#D64933]" />
                  How Trade Digitalisation Works
                </h3>
                
                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                  Trade digitalisation means digitising trade documents and then using the resulting data to deliver working capital, P&L and operational wins.
                </p>
                
                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                  The most efficient system is one where exporting suppliers are able to upload their paperwork as they ship to a secure portal like PrimaTrade. Each document is converted to useful data by the platform as it is uploaded and then checked and warranted by the exporter.
                </p>
                
                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                  With the shipping documents (invoices, certificates, packing lists, transport documents) converted into structured data, exporters can be asked to select and match which purchase orders are being fulfilled, confirming price and quantity.
                </p>
                
                <div className="bg-white/60 rounded-md p-4 mt-4">
                  <p className="text-sm font-semibold text-gray-900 mb-3">This process enables:</p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex gap-3">
                      <span className="text-[#D64933] font-bold mt-0.5">•</span>
                      <span className="leading-relaxed">Invoices to be immediately approved for payment via a 3-way match between invoices, POs and shipping documents.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-[#D64933] font-bold mt-0.5">•</span>
                      <span className="leading-relaxed">Cash to be accelerated to suppliers in return for discount on the invoice (often 2%, 3% or more), and this can be organised using finance to preserve the importer's working capital.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-[#D64933] font-bold mt-0.5">•</span>
                      <span className="leading-relaxed">Matched invoices to be posted directly to the importer's ERP, reducing work for AP teams.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-[#D64933] font-bold mt-0.5">•</span>
                      <span className="leading-relaxed">The data provided by exporters can be used to drive internal systems dealing with receiving the goods being shipped, to create and post customs filings and to reduce headcount in trade processing and compliance teams.</span>
                    </li>
                  </ul>
                </div>
              </div>

                   {/* Early payment + working capital benefits aligned with box 2 */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Working capital and early payment benefits</h3>
                <div className="grid md:grid-cols-2 gap-6 text-sm">
                  <div className="space-y-3">
                    <div className="font-semibold text-gray-800">Early payment details</div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Imports paid early:</span>
                      <span className="font-semibold">{formatCurrency(participatingSpend)}</span>
                    </div>
                    <div className="flex justify-between pl-4">
                      <span className="text-gray-600">• Bank funded ({formatNumber(bankFundedPct, 0)}%):</span>
                      <span className="font-semibold text-[#D64933]">{formatCurrency(bankFundedAmount)}</span>
                    </div>
                    <div className="flex justify-between pl-4">
                      <span className="text-gray-600">• Internally funded ({formatNumber(100 - bankFundedPct, 0)}%):</span>
                      <span className="font-semibold text-[#D64933]">{formatCurrency(internalFundedAmount)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t">
                      <span className="text-gray-600">Total discount value:</span>
                      <span className="font-semibold text-red-700">{formatCurrency(discountValue)}</span>
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
                      <span className="text-red-700">{formatCurrency(netDiscountBenefit)}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="font-semibold text-gray-800">Working capital benefits</div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">From longer payment terms:</span>
                      <span className="font-semibold text-red-700">{formatCurrency(wcFromExtension)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Own cash used to pay early:</span>
                      <span className="font-semibold text-red-700">-{formatCurrency(wcUsedForEarlyPay)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t font-bold">
                      <span className="text-gray-900">Net working capital:</span>
                      <span className="text-red-700">{formatCurrency(netWorkingCapital)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t">
                      <span className="text-gray-600">Annual value at {formatNumber(wcInterestRate, 1)}%:</span>
                      <span className="font-semibold text-[#D64933]">{formatCurrency(wcAnnualValue)}</span>
                    </div>
                   </div>
                </div>
              </div>
            
             {/* Headcount savings and other benefits aligned with box 3 */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Headcount savings and other benefits</h3>
                  <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm text-gray-600">AP FTEs saved:</span>
                    <span className="font-semibold text-purple-700">{formatNumber(apFteSaved, 1)} FTEs</span> 
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm text-gray-600">AP headcount savings:</span>
                    <span className="font-semibold text-red-700">{formatCurrency(apSavings)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm text-gray-600">Customs broker savings:</span>
                    <span className="font-semibold text-red-700">{formatCurrency(brokerSavings)}</span>
                  </div>
                   <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm text-gray-600">Forwarder fee savings:</span>
                    <span className="font-semibold text-red-700">{formatCurrency(forwarderSavings)}</span>
                  </div>
                   <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm text-gray-600">Trade FTEs saved:</span>
                    <span className="font-semibold text-purple-700">{formatNumber(tradeFteSaved, 1)} FTEs</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm text-gray-600">Trade headcount savings:</span>
                    <span className="font-semibold text-red-700">{formatCurrency(tradeHeadcountSavings)}</span>
                  </div>
                <div className="flex justify-between items-center pt-3">
                    <span className="font-bold text-gray-900">Total benefit from operational savings:</span>
                    <span className="text-2xl font-bold text-red-700">{formatCurrency(totalOperationalSavings)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
          {/* Simulation View */}
          <div className="space-y-6">
            {/* Simulation Inputs */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Historic Financial Position (for comparison)</h2>
              <p className="text-sm text-gray-600 mb-6">Enter your current financial figures in millions to see the impact of digitalization</p>
              
              <div className="flex gap-8">
                {/* Input Fields - Two Columns */}
                <div className="flex-1 max-w-3xl">
                  <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                    {/* Left Column - P&L Items */}
                    <div className="space-y-4">
                      <h3 className="text-base font-bold text-gray-900 mb-3 pb-2 border-b-2 border-gray-300">Key figures: P&L</h3>
                      
                      <div className="flex items-center justify-between gap-3">
                        <label className="text-sm text-gray-700 flex-1">Turnover / Revenue</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={turnover / 1000000}
                            onChange={(e) => setTurnover(parseFloat(e.target.value || 0) * 1000000)}
                            className="w-28 px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F08070] text-right"
                          />
                          <span className="text-xs text-gray-600 w-10">{currencySymbol} MM</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between gap-3">
                        <label className="text-sm text-gray-700 flex-1">Cost of Sales</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={costOfSales / 1000000}
                            onChange={(e) => setCostOfSales(parseFloat(e.target.value || 0) * 1000000)}
                            className="w-28 px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F08070] text-right"
                          />
                          <span className="text-xs text-gray-600 w-10">{currencySymbol} MM</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between gap-3">
                        <label className="text-sm text-gray-700 flex-1">Operating Profit</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={operatingProfit / 1000000}
                            onChange={(e) => setOperatingProfit(parseFloat(e.target.value || 0) * 1000000)}
                            className="w-28 px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F08070] text-right"
                          />
                          <span className="text-xs text-gray-600 w-10">{currencySymbol} MM</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between gap-3">
                        <label className="text-sm text-gray-700 flex-1">Net Interest Payable</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={netInterest / 1000000}
                            onChange={(e) => setNetInterest(parseFloat(e.target.value || 0) * 1000000)}
                            className="w-28 px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F08070] text-right"
                          />
                          <span className="text-xs text-gray-600 w-10">{currencySymbol} MM</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between gap-3">
                        <label className="text-sm text-gray-700 flex-1">EBITDA</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={ebitda / 1000000}
                            onChange={(e) => setEbitda(parseFloat(e.target.value || 0) * 1000000)}
                            className="w-28 px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F08070] text-right"
                          />
                          <span className="text-xs text-gray-600 w-10">{currencySymbol} MM</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Balance Sheet Items */}
                    <div className="space-y-4">
                      <h3 className="text-base font-bold text-gray-900 mb-3 pb-2 border-b-2 border-gray-300">Key figures: balance sheet and cash flow</h3>
                      
                      <div className="flex items-center justify-between gap-3">
                        <label className="text-sm text-gray-700 flex-1">Trade Payables</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={tradePayables / 1000000}
                            onChange={(e) => setTradePayables(parseFloat(e.target.value || 0) * 1000000)}
                            className="w-28 px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F08070] text-right"
                          />
                          <span className="text-xs text-gray-600 w-10">{currencySymbol} MM</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between gap-3">
                        <label className="text-sm text-gray-700 flex-1">Net Debt</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={netDebt / 1000000}
                            onChange={(e) => setNetDebt(parseFloat(e.target.value || 0) * 1000000)}
                            className="w-28 px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F08070] text-right"
                          />
                          <span className="text-xs text-gray-600 w-10">{currencySymbol} MM</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between gap-3">
                        <label className="text-sm text-gray-700 flex-1">Equity</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={equity / 1000000}
                            onChange={(e) => setEquity(parseFloat(e.target.value || 0) * 1000000)}
                            className="w-28 px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F08070] text-right"
                          />
                          <span className="text-xs text-gray-600 w-10">{currencySymbol} MM</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between gap-3">
                        <label className="text-sm text-gray-700 flex-1">Free Cash Flow</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={freeCashFlow / 1000000}
                            onChange={(e) => setFreeCashFlow(parseFloat(e.target.value || 0) * 1000000)}
                            className="w-28 px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F08070] text-right"
                          />
                          <span className="text-xs text-gray-600 w-10">{currencySymbol} MM</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Right Side - Explanatory Text Box */}
                <div className="flex-1 min-w-[300px]">
                  <div className="bg-gradient-to-br from-white to-[#F08070]/5 rounded-lg border-2 border-[#F08070]/30 p-6 h-full">
                    <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-[#D64933]" />
                      Enterprise-Wide Impact
                    </h3>
                    
                    <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                      <p>
                        Trade digitalisation can make a difference to the whole of your enterprise. In this tab, you can enter some key financial numbers from your P&L, balance sheet and cash flow - and we simulate the impact of trade digitalisation on those numbers and your ratios.
                      </p>
                      
                      <p>
                        Most clients can deliver a material improvement in their key ratios (eg: interest cover, leverage, margins) as a result of the efficiencies which digitalisation brings.
                      </p>
                      
                      <p>
                        This is not an accounting trick - these efficiencies are real. It is simply more efficient to have suppliers digitise their trade documents so that payments can be made more quickly, work in head office can be reduced, and the re-processing of paperwork by third parties (customs brokers, forwarders) can be stopped. PrimaTrade's platform surfaces these benefits and enables the importer to receive them without significant changes to processes or systems.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* P&L Comparison */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-[#F08070]" />
                P&L (Extract)
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 w-64">Item</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 w-40">Historic Value</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-[#D64933] w-40">After PrimaTrade</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="py-3 px-4 text-sm">Turnover / revenue</td>
                      <td className="py-3 px-4 text-sm text-right font-medium">{formatCurrency(turnover)}</td>
                      <td className="py-3 px-4 text-sm text-right font-medium text-[#D64933]">{formatCurrency(turnover)}</td>
                      <td className="py-3 px-4 text-xs text-gray-600">Unchanged</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm">Cost of sales</td>
                      <td className="py-3 px-4 text-sm text-right font-medium">{formatCurrency(costOfSales)}</td>
                      <td className="py-3 px-4 text-sm text-right font-medium text-red-700">{formatCurrency(adjustedCostOfSales)}</td>
                      <td className="py-3 px-4 text-xs text-gray-600">Reduced by early payment discounts where funding is external</td>
                    </tr>
                    <tr className="bg-[#F08070]/10">
                      <td className="py-3 px-4 text-sm font-semibold">Operating profit</td>
                      <td className="py-3 px-4 text-sm text-right font-bold">{formatCurrency(operatingProfit)}</td>
                      <td className="py-3 px-4 text-sm text-right font-bold text-red-700">{formatCurrency(adjustedOperatingProfit)}</td>
                      <td className="py-3 px-4 text-xs text-gray-600">Increased by the full P&L benefit</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm">Net interest payable</td>
                      <td className="py-3 px-4 text-sm text-right font-medium">{formatCurrency(netInterest)}</td>
                      <td className="py-3 px-4 text-sm text-right font-medium text-red-700">{formatCurrency(adjustedNetInterest)}</td>
                      <td className="py-3 px-4 text-xs text-gray-600">Reduced as lower borrowing because of working capital benefits</td>
                    </tr>
                    <tr className="bg-[#F08070]/10">
                      <td className="py-3 px-4 text-sm font-semibold">EBITDA</td>
                      <td className="py-3 px-4 text-sm text-right font-bold">{formatCurrency(ebitda)}</td>
                      <td className="py-3 px-4 text-sm text-right font-bold text-red-700">{formatCurrency(adjustedEbitda)}</td>
                      <td className="py-3 px-4 text-xs text-gray-600">Increased by funded early payment discounts and operational wins</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Balance Sheet Comparison */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-[#F08070]" />
                Balance Sheet and Cash Flow (Extract)
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 w-64">Item</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 w-40">Historic Value</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-[#D64933] w-40">After PrimaTrade</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="py-3 px-4 text-sm">Trade payables</td>
                      <td className="py-3 px-4 text-sm text-right font-medium">{formatCurrency(tradePayables)}</td>
                      <td className="py-3 px-4 text-sm text-right font-medium text-[#D64933]">{formatCurrency(adjustedTradePayables)}</td>
                      <td className="py-3 px-4 text-xs text-gray-600">Goes up as suppliers are providing more credit</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm">Net debt</td>
                      <td className="py-3 px-4 text-sm text-right font-medium">{formatCurrency(netDebt)}</td>
                      <td className="py-3 px-4 text-sm text-right font-medium text-red-700">{formatCurrency(adjustedNetDebt)}</td>
                      <td className="py-3 px-4 text-xs text-gray-600">Reduced as lower borrowing because of working capital benefits</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm">Equity</td>
                      <td className="py-3 px-4 text-sm text-right font-medium">{formatCurrency(equity)}</td>
                      <td className="py-3 px-4 text-sm text-right font-medium text-red-700">{formatCurrency(adjustedEquity)}</td>
                      <td className="py-3 px-4 text-xs text-gray-600">Increased as earnings are higher over the period</td>
                    </tr>
                    <tr className="bg-[#F08070]/10">
                      <td className="py-3 px-4 text-sm font-semibold">Free cash flow</td>
                      <td className="py-3 px-4 text-sm text-right font-bold">{formatCurrency(freeCashFlow)}</td>
                      <td className="py-3 px-4 text-sm text-right font-bold text-red-700">{formatCurrency(adjustedFCF)}</td>
                      <td className="py-3 px-4 text-xs text-gray-600">Increased as working capital generated</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Key Ratios */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-[#F08070]" />
                Key Ratios
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 w-64">Ratio</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 w-40">Historic Value</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-[#D64933] w-40">After PrimaTrade</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="py-3 px-4 text-sm">EBITDA margin</td>
                      <td className="py-3 px-4 text-sm text-right font-medium">{formatPercent(ebitdaMargin)}</td>
                      <td className="py-3 px-4 text-sm text-right font-medium text-red-700">{formatPercent(adjustedEbitdaMargin)}</td>
                      <td className="py-3 px-4 text-xs text-gray-600">Up because cost of sales is lower and operations more efficient</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm">Operating margin</td>
                      <td className="py-3 px-4 text-sm text-right font-medium">{formatPercent(operatingMargin)}</td>
                      <td className="py-3 px-4 text-sm text-right font-medium text-red-700">{formatPercent(adjustedOperatingMargin)}</td>
                      <td className="py-3 px-4 text-xs text-gray-600">Up because cost of sales is lower and operations more efficient</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm">Leverage (Net Debt / EBITDA)</td>
                      <td className="py-3 px-4 text-sm text-right font-medium">{formatNumber(leverage, 2)}x</td>
                      <td className="py-3 px-4 text-sm text-right font-medium text-red-700">{formatNumber(adjustedLeverage, 2)}x</td>
                      <td className="py-3 px-4 text-xs text-gray-600">Down because EBITDA is higher and net debt is lower</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm">Solvency (Debt / Equity)</td>
                      <td className="py-3 px-4 text-sm text-right font-medium">{formatNumber(solvency, 2)}x</td>
                      <td className="py-3 px-4 text-sm text-right font-medium text-red-700">{formatNumber(adjustedSolvency, 2)}x</td>
                      <td className="py-3 px-4 text-xs text-gray-600">Down because net debt is lower and equity is higher</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm">FCF / Sales</td>
                      <td className="py-3 px-4 text-sm text-right font-medium">{formatPercent(fcfSales)}</td>
                      <td className="py-3 px-4 text-sm text-right font-medium text-red-700">{formatPercent(adjustedFcfSales)}</td>
                      <td className="py-3 px-4 text-xs text-gray-600">Up because working capital is generated</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm">Interest cover</td>
                      <td className="py-3 px-4 text-sm text-right font-medium">{formatNumber(interestCover, 2)}x</td>
                      <td className="py-3 px-4 text-sm text-right font-medium text-red-700">{formatNumber(adjustedInterestCover, 2)}x</td>
                      <td className="py-3 px-4 text-xs text-gray-600">Up because interest costs reduce and earnings increase</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Summary Card */}
            <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-lg shadow-xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-6">Impact Summary</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="text-red-100 text-sm mb-2">P&L Improvement</div>
                  <div className="text-4xl font-bold mb-1">{formatCurrency(adjustedOperatingProfit - operatingProfit)}</div>
                  <div className="text-red-100 text-sm">Operating profit increase</div>
                </div>
                <div>
                  <div className="text-red-100 text-sm mb-2">Working Capital Released</div>
                  <div className="text-4xl font-bold mb-1">{formatCurrency(netWorkingCapital)}</div>
                  <div className="text-red-100 text-sm">Additional cash available</div>
                </div>
                <div>
                  <div className="text-red-100 text-sm mb-2">Leverage Improvement</div>
                  <div className="text-4xl font-bold mb-1">{formatNumber(leverage - adjustedLeverage, 2)}x</div>
                  <div className="text-red-100 text-sm">Net Debt / EBITDA reduction</div>
                </div>
              </div>
            </div>
          </div>
          </>
        )}
      </div>
    </div>
  );
}
