# Mutual Fund Scheme Details - React Native Application

A comprehensive mutual fund scheme details screen built with React Native (Expo) and TypeScript, featuring interactive charts, accordion sections, and full internationalization support.

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- Yarn or npm
- Expo CLI
- iOS Simulator (Mac) or Android Emulator

### Installation

1. **Clone the repository**

   ```bash
   cd xilligence-task
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```

3. **Start the development server**

   ```bash
   yarn  start
   or 
   yarn android
   ```

4. **Run on device/emulator**
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator
   - Scan QR code with Expo Go app on physical device

### Clear Cache (if needed)

```bash
yarn start --clear
```

## 📁 Project Architecture

### Folder Structure

```
xilligence-task/
├── app/                          # Expo Router screens
│   ├── _layout.tsx              # Root layout with navigation
│   ├── home/                    # Home screen module
│   │   ├── _layout.tsx         # Scheme details screen
│   │   └── components/         # Feature-specific components
│   │       ├── allocation-analysis.tsx
│   │       ├── analytics.tsx
│   │       ├── fund-managers.tsx
│   │       ├── holding-analysis.tsx
│   │       ├── mutual-fund-info.tsx
│   │       ├── return-analysis.tsx
│   │       ├── return-calculator.tsx
│   │       ├── returns.tsx
│   │       ├── riskometer.tsx
│   │       └── scheme-info.tsx
│   └── (tabs)/                 # Tab navigation structure
│
├── components/                  # Reusable UI components
│   ├── accordion.tsx           # Collapsible section component
│   ├── pie-chart.tsx           # Skia-based doughnut chart
│   ├── bar-chart.tsx           # Animated bar chart
│   ├── line-chart.tsx          # Skia-based line chart (NAV)
│   ├── button.tsx              # Themed button component
│   ├── app-bar.tsx             # Header component
│   └── ui/                     # Atomic UI components
│
├── config/                      # Configuration files
│   └── i18n.config.ts          # i18n initialization
│
├── constants/                   # App constants
│   ├── colors.ts               # Color palette
│   └── theme.ts                # Theme configuration
│
├── data/                        # Local data storage
│   └── data.json               # Mutual fund scheme data
│
├── helpers/                     # Utility functions
│   ├── date.ts                 # Date formatting utilities
│   └── name.ts                 # Name processing helpers
│
├── hooks/                       # Custom React hooks
│   ├── use-translation.ts      # i18n translation hook
│   ├── use-color-scheme.ts     # Theme management
│   └── use-theme-color.ts      # Dynamic theming
│
├── locales/                     # Internationalization
│   └── en.json                 # English translations
│
├── types/                       # TypeScript definitions
│   └── mutual-funds.ts         # Data type definitions
│
├── package.json
├── tsconfig.json
├── app.json                    # Expo configuration
└── README.md
```

### Component Architecture

#### 1. **Screen Level** (`app/home/_layout.tsx`)

- Main container for Scheme Details screen
- Manages data fetching and state
- Orchestrates all child components
- Handles scroll behavior

#### 2. **Feature Components** (`app/home/components/`)

Each component is self-contained with:

- Local state management
- Props-based data flow
- Localized text
- Responsive styling

#### 3. **Reusable Components** (`components/`)

- Generic, application-agnostic
- Highly configurable via props
- Reanimated-based animations
- Skia-powered charts

#### 4. **Data Flow**

```
data.json → Screen (_layout.tsx) → Feature Components → UI Components
              ↓
         Localization (i18n)
```

## 🛠 Technical Stack

### Core Technologies

- **React Native**: v0.78.4 (via Expo)
- **Expo SDK**: v54.0.33
- **TypeScript**: v5.9.2
- **Expo Router**: v6.0.23 (File-based routing)

### Supported Languages

- English (en) - Default
- Structure ready for Spanish (es) and French (fr)

## ⏱️ Development Timeline

**Total Development Time: ~12 hours**


### Development Build

```bash
npx expo start
```

### Production Build (EAS)

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure build
eas build:configure

# Create iOS build
eas build --platform ios

# Create Android build
eas build --platform android
```

## 🚢 Deployment

### Expo Updates (OTA)

```bash
eas update --branch production
```

**Built with ❤️ using React Native & Expo**
