# Paw MVP - Pet Insurance Comparison Site

## Project Overview
React TypeScript app for pet insurance comparison. 3-page SPA with LandBot chatbot integration.

**Target URL**: https://itsallmememe.github.io/paw-plan/

## Tech Stack
- React 18 + TypeScript + Create React App (CRA)
- React Router v7 with HashRouter
- LandBot Container integration
- GitHub Pages deployment
- CSS custom properties + animations
- Google Fonts (Nunito Sans, Sansita)

## Page Structure
1. **ChatBot** (`/#/`) - Hero section + LandBot container
2. **Loading** (`/#/loading?name=X`) - Interstitial with paw animations
3. **Results** (`/#/results?name=X`) - Vertical insurance comparison cards

**Note**: Using HashRouter for GitHub Pages compatibility

## Design System
- **Colors**: Coral (#FF6B6B), Teal (#4ECDC4), White/Gray
- **Fonts**: Nunito Sans (body), Sansita (headings)
- **Layout**: Mobile-first responsive, hero sections, card-based

## Completed Features

### ✅ Base Setup
- Create React App + React + TypeScript scaffold
- React Router v7 with HashRouter
- Basic component structure

### ✅ LandBot Integration
- Container mode (not Fullpage - positioning issues)
- Dynamic script loading with useEffect
- Config: `H-3001326-VOIA6ZH49TU1ZHEO`
- CSS injection to hide branding (`.Branding__Container { display: none !important; }`)
- Custom image injection from base64 data

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
- Build folder deployment

### ✅ Asset Path Fixes
- Image paths updated for `/paw-plan` base path
- Google Fonts integration in HTML head
- HashRouter implementation for GitHub Pages compatibility

## Key Files

### Core Components
- `src/pages/ChatBot.tsx` - Main landing with hero + LandBot
- `src/pages/Loading.tsx` - Interstitial with name param handling
- `src/pages/Results.tsx` - Insurance comparison cards
- `src/components/Header.tsx` - Navigation header

### Config
- `package.json` - Homepage URL + CRA scripts
- `.github/workflows/static.yml` - Deployment pipeline
- `public/index.html` - Google Fonts integration

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
- **Router**: HashRouter (no basename needed)
- **Query Params**: URLSearchParams for name passing
- **Navigation**: Programmatic routing with navigate()
- **State Management**: useState for card expansion

### Deployment Architecture
- **Local Dev**: HashRouter with `/paw-plan` base path
- **Production**: GitHub Pages with hash-based routing
- **CI/CD**: GitHub Actions auto-deploy on main branch push
- **Asset Paths**: Prefixed with `/paw-plan/` for images

## Current Status
- ✅ Fully functional 3-page app
- ✅ LandBot integration working
- ✅ PIPA-inspired design implemented
- ✅ GitHub Pages deployment active
- ✅ Local development environment fixed

## Assets Required
- `/paw-plan/header.jpg` - Hero background image
- `/paw-plan/logo.png` - Main logo image
- Google Fonts: Nunito Sans, Sansita (loaded via HTML)
- LandBot config: H-3001326-VOIA6ZH49TU1ZHEO

## Development Commands
```bash
npm start        # Local development server
npm run build    # Production build
npm test         # Run tests
npm run deploy   # Manual gh-pages deploy (backup)
```

## Known Issues & Solutions
- **Router errors**: Fixed by switching to HashRouter and removing conflicting entry files
- **Asset loading**: Fixed image paths with `/paw-plan/` prefix
- **Font loading**: Fixed by adding Google Fonts to HTML head
- **LandBot positioning**: Fixed with Container mode
- **LandBot branding**: Hidden with injected CSS
- **LandBot redirects**: Need to be updated in LandBot config to use hash URLs (e.g., `/paw-plan/#/loading?name={name}`)
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
This project is a complete pet insurance comparison site built with Create React App for GitHub Pages deployment. Key technical details:

- **Architecture**: CRA + HashRouter for GitHub Pages compatibility
- **Entry Point**: `src/index.tsx` (removed conflicting main.tsx and index.js)
- **Routing**: Hash-based URLs (e.g., `/#/loading?name=X`)
- **Assets**: Images prefixed with `/paw-plan/` base path
- **LandBot**: Container mode with CSS injection to hide branding and add custom image
- **Fonts**: Google Fonts loaded via HTML head links

**Critical LandBot Issue**: Redirects in LandBot config need to use hash URLs format: `/paw-plan/#/loading?name={name}` instead of `/loading?name={name}`

All core functionality is complete and working locally. The main remaining issue is updating the LandBot configuration for proper hash-based navigation.