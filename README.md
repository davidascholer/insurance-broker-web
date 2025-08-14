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
