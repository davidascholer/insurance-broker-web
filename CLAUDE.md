# Paw MVP - Pet Insurance Comparison Site

## Project Overview
React TypeScript app for pet insurance comparison. 3-page SPA with LandBot chatbot integration.

**Target URL**: https://itsallmememe.github.io/paw-plan/

## Tech Stack
- React 18 + TypeScript + Vite
- React Router v6
- LandBot Container integration
- GitHub Pages deployment
- CSS custom properties + animations

## Page Structure
1. **ChatBot** (`/`) - Hero section + LandBot container
2. **Loading** (`/loading?name=X`) - Interstitial with paw animations
3. **Results** (`/results?name=X`) - Vertical insurance comparison cards

## Design System
- **Colors**: Coral (#FF6B6B), Teal (#4ECDC4), White/Gray
- **Fonts**: Nunito Sans (body), Sansita (headings)
- **Layout**: Mobile-first responsive, hero sections, card-based

## Completed Features

### ✅ Base Setup
- Vite + React + TypeScript scaffold
- React Router routing
- Basic component structure

### ✅ LandBot Integration
- Container mode (not Fullpage - positioning issues)
- Dynamic script loading with useEffect
- Config: `H-3001326-VOIA6ZH49TU1ZHEO`

### ✅ Hero Section
- `/header.jpg` background image
- Overlay + title text
- Responsive design

### ✅ Results Page Redesign
- Vertical list layout (inspired by results.png)
- Expandable cards with useState management
- Insurance comparison data:
  - PIPA Pet Insurance
  - Petplan
  - Budget Direct
  - RSPCA Pet Insurance
- Disclosure buttons between white/gray sections

### ✅ Personalization Flow
- Name query param: Loading → Results
- Dynamic titles: "Find the best insurance for {name}"
- URL encoding/decoding

### ✅ GitHub Pages Deployment
- GitHub Actions workflow (`.github/workflows/static.yml`)
- Automated build + deploy on push to main
- Dist folder deployment

### ✅ Vite Config Fix
- Conditional base path: dev=`/`, build=`/paw-plan/`
- Fixes local dev + production deployment

## Key Files

### Core Components
- `src/pages/ChatBot.tsx` - Main landing with hero + LandBot
- `src/pages/Loading.tsx` - Interstitial with name param handling
- `src/pages/Results.tsx` - Insurance comparison cards
- `src/components/Header.tsx` - Navigation header

### Config
- `vite.config.ts` - Conditional base path config
- `package.json` - Homepage URL + scripts
- `.github/workflows/static.yml` - Deployment pipeline

### Styling
- `src/index.css` - Complete styling system
  - CSS custom properties
  - Expandable card animations
  - Responsive breakpoints
  - Color theme variables

## Technical Decisions

### LandBot Integration Issues Solved
- **Problem**: Fullpage mode overlapped header
- **Solution**: Container mode with proper CSS positioning
- **Implementation**: Dynamic script loading, global Window interface

### Results Page UX
- **Requirement**: Vertical list like results.png
- **Implementation**: Expandable cards with Set<number> state
- **Animation**: CSS transitions for smooth expand/collapse

### Routing & State
- **Query Params**: URLSearchParams for name passing
- **Navigation**: Programmatic routing with navigate()
- **State Management**: useState for card expansion

### Deployment Architecture
- **Local Dev**: Base path `/` for normal development
- **Production**: Base path `/paw-plan/` for GitHub Pages
- **CI/CD**: GitHub Actions auto-deploy on main branch push

## Current Status
- ✅ Fully functional 3-page app
- ✅ LandBot integration working
- ✅ PIPA-inspired design implemented
- ✅ GitHub Pages deployment active
- ✅ Local development environment fixed

## Assets Required
- `/header.jpg` - Hero background image
- Google Fonts: Nunito Sans, Sansita
- LandBot config: H-3001326-VOIA6ZH49TU1ZHEO

## Development Commands
```bash
npm run dev      # Local development (base: /)
npm run build    # Production build (base: /paw-plan/)
npm run preview  # Preview production build
npm run deploy   # Manual gh-pages deploy (backup)
```

## Known Issues & Solutions
- **Base path issue**: Fixed with conditional Vite config
- **LandBot positioning**: Fixed with Container mode
- **TypeScript warnings**: Fixed unused variable declarations
- **Branch confusion**: Confirmed main branch is correct

## Future Considerations
- Add actual insurance API integration
- Implement form validation on LandBot responses
- Add loading states and error handling
- Consider adding comparison feature between selected insurances
- Add more responsive breakpoints for tablet sizes

## Emergency Rollback
If deployment breaks:
1. Check GitHub Pages settings (source: GitHub Actions)
2. Verify workflow runs in Actions tab
3. Check build logs for asset path issues
4. Confirm main branch has latest changes

## Context for Future Sessions
This project is a complete pet insurance comparison site built for GitHub Pages deployment. The main complexity was LandBot integration and getting the conditional base path working for both local dev and production. All core functionality is complete and working.