# Nail Salon Business Directory

This project generates a static website for a nail salon business directory using CSV data. The site includes individual pages for businesses, cities, states, and categories.

## Features

- Static HTML generation with Vite, React, and TypeScript
- Clean, SEO-friendly URLs
- Responsive design with modern styling
- Comprehensive business profiles with details, amenities, and service offerings
- City, state, and category browsing
- Add-a-listing functionality

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Place your data ZIP file in the `./data` directory as `data.zip`

3. Generate HTML files:
   ```
   npm run generate:html
   ```

4. Build the site:
   ```
   npm run build
   ```

5. Deploy the contents of the `dist` directory to your hosting provider (e.g., Netlify)

## Project Structure

- `/scripts`: Contains the TypeScript script for generating HTML
- `/public`: Output directory for generated HTML files
- `/src`: React components and styling
- `/tmp`: Temporary directory for extracted CSV data (not committed to git)

## Data Source

The site is built from CSV data contained in `./data/data.zip`. This includes:

- `beauty_salon.csv`: Core business information (renamed to nail salons/spas)
- `city.csv` & `state.csv`: Location data
- `category.csv`: Business categories
- Various relationship tables for amenities, payments, etc.

## Customization

- Modify the templates in the `generate-html.ts` script to change the site's appearance
- Adjust the CSS in the `generateCssStyle()` function for custom styling
- Edit the HTML structure in various generator functions to modify layout

## License

MIT