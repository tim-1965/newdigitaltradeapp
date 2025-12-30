# Trade Digitalisation Benefits Calculator - Redesigned

## Overview
This application has been redesigned to match the Excel spreadsheet structure with a two-panel layout for Inputs & Results, plus a comprehensive Simulation view.

## Key Changes

### Structure
The app now has two main views accessible via tabs at the top:

1. **Inputs & Results** (Two-panel layout)
   - **Left Panel**: All input fields organized by section
   - **Right Panel**: Real-time calculated results and breakdowns

2. **Simulation** (Full-width comparison)
   - Historic financial position inputs
   - Before/After comparison tables
   - P&L, Balance Sheet, and Key Ratios comparisons

### Input Sections
The inputs are now organized exactly as in the spreadsheet:

#### 1) Company & Trade Volume
- International supply chain annual volume
- % eligible for digitalization
- Calculated: Volume being digitised

#### 2) Early Payment Discounts & Working Capital
- Current payment terms
- Term extensions
- Supplier uptake percentage
- Early payment discounts
- Days to payment
- Bank/SCF funding split
- Interest rates (SCF, internal cost of funds, working capital valuation)

#### 3) Accounts Payable (AP) Headcount Efficiency
- Current AP team size
- Cost per FTE
- Efficiency gain percentage
- Calculated: Total AP savings

#### 4) Customs & Trade Compliance Benefits
- Customs filings and broker fees
- Self-filing percentage
- Forwarder fees and elimination percentage
- Trade compliance team size and efficiency gains
- Calculated: Total customs savings

### Results Panel
Shows real-time calculations including:
- **Total Annual P&L Benefit** (highlighted in purple gradient)
- **Net Working Capital Generated** (highlighted in blue gradient)
- Detailed breakdowns of:
  - P&L benefits after costs
  - Working capital benefits
  - Early payment details
  - Headcount efficiency metrics

### Simulation View
Provides a comprehensive before/after comparison:
- P&L Extract (Turnover, Cost of Sales, Operating Profit, etc.)
- Balance Sheet Extract (Payables, Debt, Equity, FCF)
- Key Financial Ratios (Margins, Leverage, Solvency, etc.)
- Impact Summary card with key improvements

## Features

### Auto-Save
All inputs are automatically saved to browser localStorage as you type, with a visual indicator showing "Saved" when data is persisted.

### Responsive Design
- Desktop: Full two-panel layout with sticky results
- Tablet/Mobile: Stacked layout with scrollable sections

### Data Persistence
Your inputs persist between sessions using browser localStorage. Clear your browser data to reset.

## Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Deploy to Netlify
npm run deploy
```

## Calculations

All calculations match the Excel spreadsheet formulas:

### Working Capital
- WC from term extension = Volume × (Term extension days / 365)
- WC used for early pay = Internal funded amount × (Days accelerated / 365)
- Net WC = WC from extension - WC used for early pay

### Early Payment Benefits
- Discount value = Participating spend × Discount %
- Bank funding cost = Bank funded × SCF rate × (Days accelerated / 365)
- Internal funding cost = Internal funded × Internal rate × (Days accelerated / 365)
- Net benefit = Discount - Bank cost - Internal cost

### Operational Efficiency
- AP savings = AP FTEs saved × Cost per FTE
- Trade savings = Trade FTEs saved × Cost per FTE
- Customs savings = Broker savings + Forwarder savings + Trade headcount savings

### Total Benefits
- Total P&L Benefit = Net discount benefit + AP savings + Customs savings
- Working capital value = Net WC × WC interest rate

## Technology Stack
- React 18
- Tailwind CSS
- Vite
- Lucide React (icons)
- Netlify (deployment)

## Notes
- All monetary values are displayed in millions (M) or thousands (K) for readability
- Percentages shown with 2 decimal places
- FTE counts shown with 1 decimal place
- Calculations update in real-time as you adjust inputs
