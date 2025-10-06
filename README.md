# Pipa Web

## DevOps

### Front end

- S3 and Cloudfront

### Back end

- Heroku (for now)

### DNS

- Route 53

### Nameserver

- GoDaddy

### Email

- GoDaddy for rx/tx
- AWS SES for submitting emails from the site

### Static resources

- cached
  - Static assets such as images and SVGs are located in the `public/` directory.
- migrate to S3 when applicable

## Available Scripts

- In the project directory, you can run:

### `npm dev`

- Toggle dev mode to true in src/lib/constants.ts
- Default port 5173
- Run pipa-server on [http://localhost:3000](http://localhost:3000) to view it in your browser.
- The page will reload if you make edits. You will also see any lint errors in the console.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

- Builds the app for production to the `build` folder.
- It correctly bundles React in production mode and optimizes the build for the best performance.
- Build then deploy the `dist` folder to S3

### `npm run lint`

Runs ESLint to analyze code for potential errors and code style issues.

## Configuration

- **TypeScript:** Configured via `tsconfig.json` and related files.
- **Vite:** Fast development server and build tool, configured in `vite.config.mjs`.
- **ESLint:** Linting rules are defined in `eslint.config.js`.

## Adding a page to the project

- Create the new page
  - Copy and paste the SamplePage.tsx file located at `src/pages/SamplePage.tsx`
  - Rename `SamplePage copy.tsx` to a name you desire e.g. `YourNewPage.tsx`
  - Not required but recommended, change the name inside SamplePage.tsx to YourNewPage i.e. `export default function YourNewPage() {...`
  - Edit the contents of MyNewPage.tsx to whatever you want.
- Add the new page to the router
  - locate and open the file at `src/AppRouter.tsx`
  - add `import YourPageName from "./pages/YourPageName";` to the top of the file with the other imports
  - add `<Route path="/your-route-page" element={<YourPageName />} />` inside of the `<Routes>`
- Your new page will now be accessible at `/your-new-page` e.g. `http://localhost:5173/sample-page` or `https://pipabroker.com/sample-page` when live on dev/production
- For a complete list of tailwind class selectors, see the tailwind docs: e.g. *https://tailwindcss.com/docs/font-size*

# Pipa Dev
- Specifically for the dev branch
# # About 
- The dev repo automatically deploys and can be accessed at dev.pipabroker.com
- It is necessary to have it's own repo so the marketing team can deploy code
- Merge pipa-dev/main into pipa-web/dev then merge pipa-web/dev to main and deploy for production
- Push the pipa-dev repo to the dev branch of the pipa-web repo with: `git push pipa-web main:dev`
