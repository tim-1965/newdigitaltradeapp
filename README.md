# Trade Digitalisation Benefits Calculator - Redesigned

## Overview
This application has been redesigned to match the Excel spreadsheet structure with a two-panel layout for Inputs & Results, plus a comprehensive Simulation view. All inputs (except the annual volume field) use interactive sliders with a compact horizontal layout for easy adjustment.

## Recent Updates

### Latest Changes (Dec 30, 2024)
- **Annual volume in millions** - Enter 200 for $200M instead of 200000000 (much easier!)
- **Unified results card** - Combined P&L and Working Capital into one compact split card
- **Natural scrolling** - Removed sticky positioning for smoother, more natural navigation
- **Smaller, cleaner design** - More compact result cards take up less vertical space
- **Side-by-side layout** - P&L and Working Capital shown together for easy comparison
- **Aligned results panel** - Results boxes now vertically align with their corresponding input sections:
  - Combined Results Card stays at the top
  - Working Capital Benefits aligns with Box 2 (Early Payment Discounts & Working Capital)
  - Early Payment Details appears below Working Capital Benefits
  - Headcount Efficiency aligns with Box 3 (AP Headcount Efficiency)
  - "Summary of the P&L benefits" aligns with Box 4 (Customs & Trade Compliance)
- **Improved visual hierarchy** - Spacing creates clear visual connection between inputs and results

## Key Features

### Interactive Slider Controls
- **All inputs use sliders** (except the International Supply Chain Annual Volume which remains a text input)
- **Compact horizontal layout** - Sliders positioned next to labels for better space efficiency
- **Debounced calculations** - Values update only when you release the slider (not during dragging)
- **Real-time value display** - Current value shown at the end of each slider
- **Smooth interaction** - No lag or performance issues while dragging
- **Color-coded progress** - Blue gradient fill shows current position
- **Smaller, refined design** - Takes up less vertical space

### Performance Optimizations
- Calculations only trigger when you **release** the slider (mouseup/touchend)
- Local state management prevents constant re-renders
- Smooth dragging experience without calculation lag
- Visual feedback shows you're adjusting before committing the change

### Structure
The app now has two main views accessible via tabs at the top:

1. **Inputs & Results** (Two-panel layout)
   - **Left Panel**: All input fields organized by section with compact sliders
   - **Right Panel**: Combined results card plus detailed breakdowns

2. **Simulation** (Full-width comparison)
   - Historic financial position inputs
   - Before/After comparison tables
   - P&L, Balance Sheet, and Key Ratios comparisons

### Input Sections (All with Compact Sliders)

#### 1) Company & Trade Volume
- International supply chain annual volume (text input in **millions**)
  - Example: Enter 200 for $200M annual volume
- % eligible for digitalization (slider: 0-100%)
- Calculated: Volume being digitised

#### 2) Early Payment Discounts & Working Capital
- Current payment terms (slider: 0-120 days)
- Term extensions (slider: 0-90 days)
- Supplier uptake percentage (slider: 0-100%)
- Early payment discounts (slider: 0-10%)
- Days to payment (slider: 0-30 days)
- Bank/SCF funding split (slider: 0-100%)
- SCF rate (slider: 0-15%)
- Internal cost of funds (slider: 0-15%)
- WC interest rate (slider: 0-15%)

#### 3) Accounts Payable (AP) Headcount Efficiency
- Current AP team size (slider: 0-50 FTE)
- Cost per FTE (slider: $30K-$150K)
- Efficiency gain percentage (slider: 0-100%)
- Calculated: Total AP savings

#### 4) Customs & Trade Compliance Benefits
- Customs filings (slider: 0-5000 filings/yr)
- Broker fees (slider: $0-$200/filing)
- Self-filing percentage (slider: 0-100%)
- Shipments with forwarder fees (slider: 0-10000 shipments)
- Forwarder fees (slider: $0-$100/shipment)
- Fee elimination percentage (slider: 0-100%)
- Trade compliance team (slider: 0-30 FTE)
- Cost per FTE (slider: $30K-$150K)
- Efficiency gains (slider: 0-100%)
- Calculated: Total customs savings

### Results Panel
Shows calculated results including:
- **Combined Results Card** (gradient background)
  - Total Annual P&L Benefit
  - Net Working Capital Generated
  - Breakdown of discount benefits, AP efficiency, customs savings
  - Working capital from term extension and early payment usage
- Detailed breakdowns:
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
All inputs are automatically saved to browser localStorage, with a visual indicator showing "Saved" when data is persisted.

### Responsive Design
- Desktop: Full two-panel layout with scrollable results
- Tablet/Mobile: Stacked layout with scrollable sections

### Data Persistence
Your inputs persist between sessions using browser localStorage. Clear your browser data to reset.

### Slider Enhancements
- Smooth dragging experience with no calculation lag
- Visual feedback with hover states
- Debounced updates (only recalculates on release)
- Color-coded progress fill (blue gradient)
- Current value prominently displayed
- Compact horizontal layout saves screen space

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

## Usage Tips
- **Enter annual volume in millions** - Just type 200 instead of 200000000
- **Drag smoothly** - The app won't recalculate until you release the slider
- **Quick adjustments** - Use the compact sliders to rapidly test different scenarios
- **Save time** - No need to click or type numbers for most fields
- **Present easily** - Show clients different scenarios by dragging sliders in real-time
- **Scroll naturally** - Everything scrolls together for easy navigation

## Notes
- Annual volume is in **millions of dollars** ($ MM)
- All other monetary values are displayed in millions (M) or thousands (K) for readability
- Percentages shown with appropriate precision
- FTE counts shown with 1 decimal place
- Calculations update only when you **release** the slider
- Compact layout allows viewing more inputs at once
- Results card combines P&L and Working Capital for efficient space usage
- No sticky positioning - natural scrolling throughout
- Slider ranges are set to sensible defaults but can be adjusted in the code if needed
