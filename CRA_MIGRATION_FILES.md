# Create React App Migration Files

## src/index.tsx
```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter basename={process.env.NODE_ENV === 'production' ? '/paw-plan' : ''}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

## src/App.tsx
```tsx
import { Routes, Route } from 'react-router-dom'
import ChatBot from './pages/ChatBot'
import Loading from './pages/Loading'
import Results from './pages/Results'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<ChatBot />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </div>
  )
}

export default App
```

## Copy These Files From Current Project:
1. Copy `src/index.css` (entire file)
2. Copy `src/components/Header.tsx` (entire file)
3. Copy `src/pages/ChatBot.tsx` (entire file)
4. Copy `src/pages/Loading.tsx` (entire file)
5. Copy `src/pages/Results.tsx` (entire file)
6. Copy `src/data/imageData.ts` (entire file)
7. Copy `public/header.jpg`
8. Copy `public/logo.png`

## .gitignore additions
Add to .gitignore:
```
# Image data with base64 content
src/data/imageData.ts
```

## .github/workflows/deploy.yml
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./build
```

## Key Differences from Vite:
1. Uses `react-scripts` instead of Vite
2. Build output goes to `build/` instead of `dist/`
3. Base path handled in BrowserRouter with `basename` prop
4. No vite.config.ts needed
5. Uses `react-scripts start` for development

## After Migration:
1. Test locally: `npm start`
2. Build: `npm run build`
3. Deploy: `npm run deploy`
```