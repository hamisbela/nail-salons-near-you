import path from 'path';
import { parseAllCsvData } from './utils/csv-parser.js';
import { processData } from './utils/data-processor.js';
import { generateSalonPage } from './utils/html-generators/salon-page.js';
import { generateCityPage } from './utils/html-generators/city-page.js';
import { generateStatePage } from './utils/html-generators/state-page.js';
import { generateCategoryPage } from './utils/html-generators/category-page.js';
import { generateIndexPage } from './utils/html-generators/index-page.js';
import { generateAllStatesPage } from './utils/html-generators/all-states-page.js';
import { generateAllCitiesPage } from './utils/html-generators/all-cities-page.js';
import { 
  getSalonPath, 
  getCityPath, 
  getStatePath, 
  getCategoryPath,
  getAllStatesPath,
  getAllCitiesPath
} from './utils/path-utils.js';
import { 
  writeToFile, 
  generateCssFile, 
  cleanPublicDirectory 
} from './utils/file-utils.js';
import {
  generateSitemaps,
  generateHtmlSitemap,
  generateRobotsTxt
} from './utils/sitemap-generator.js';

// Check if we're in development mode, and if so, prevent running this script
if (process.env.NODE_ENV !== 'production' && process.env.FORCE_GENERATE !== 'true') {
  console.warn('HTML generation is skipped in development mode. Use NODE_ENV=production or FORCE_GENERATE=true to override.');
  process.exit(0);
}

async function generateHTML() {
  try {
    console.log('Starting HTML generation...');
    console.log('Environment:', process.env.NODE_ENV);
    
    // Step 1: Clean the public directory
    console.log('Cleaning public directory...');
    cleanPublicDirectory();
    
    // Step 2: Parse all CSV data
    console.log('Parsing CSV data...');
    const rawData = await parseAllCsvData();
    
    // Step 3: Process and enrich the data
    console.log('Processing data...');
    const { 
      beautySalons, 
      cities, 
      states, 
      categories 
    } = processData(rawData);
    
    console.log(`Total salons after processing: ${beautySalons.length}`);
    console.log(`Total cities: ${cities.length}`);
    console.log(`Total states: ${states.length}`);
    
    // Step 4: Generate CSS file
    console.log('Generating CSS...');
    generateCssFile();
    
    // Step 5: Generate salon pages - process ALL salons regardless of city association
    console.log('Generating salon pages...');
    let processedSalonCount = 0;
    
    for (const salon of beautySalons) {
      try {
        // Revert to using the original slug only - don't try to manipulate _yf_slug
        const salonSlug = salon.slug;
        
        // Ensure we have a valid slug
        if (!salonSlug) {
          console.warn(`Skipping salon ${salon.id} - ${salon.title} due to missing slug`);
          continue;
        }
        
        const filePath = path.join('public', getSalonPath(salonSlug));
        const html = generateSalonPage(salon);
        writeToFile(filePath, html);
        processedSalonCount++;
      } catch (error) {
        console.error(`Error generating page for salon ${salon.id} - ${salon.title}:`, error);
      }
    }
    
    console.log(`Generated ${processedSalonCount} salon pages out of ${beautySalons.length}`);
    
    // Step 6: Generate city pages
    console.log('Generating city pages...');
    let cityCount = 0;
    for (const city of cities) {
      if (city.salons && city.salons.length > 0) {
        try {
          const filePath = path.join('public', getCityPath(city.slug));
          const html = generateCityPage(city);
          writeToFile(filePath, html);
          cityCount++;
        } catch (error) {
          console.error(`Error generating page for city ${city.id} - ${city.city}:`, error);
        }
      }
    }
    console.log(`Generated ${cityCount} city pages`);
    
    // Step 7: Generate state pages
    console.log('Generating state pages...');
    let stateCount = 0;
    for (const state of states) {
      if (state.cities && state.cities.length > 0) {
        try {
          const filePath = path.join('public', getStatePath(state.slug || ''));
          const html = generateStatePage(state);
          writeToFile(filePath, html);
          stateCount++;
        } catch (error) {
          console.error(`Error generating page for state ${state.id} - ${state.state}:`, error);
        }
      }
    }
    console.log(`Generated ${stateCount} state pages`);
    
    // Step 8: Generate category pages
    console.log('Generating category pages...');
    let categoryCount = 0;
    for (const category of categories) {
      if (category.salons && category.salons.length > 0) {
        try {
          const filePath = path.join('public', getCategoryPath(category.slug || ''));
          const html = generateCategoryPage(category);
          writeToFile(filePath, html);
          categoryCount++;
        } catch (error) {
          console.error(`Error generating page for category ${category.id} - ${category.category}:`, error);
        }
      }
    }
    console.log(`Generated ${categoryCount} category pages`);
    
    // Step 9: Generate all-states browse page
    console.log('Generating all states browse page...');
    const allStatesHtml = generateAllStatesPage(states);
    writeToFile(path.join('public', getAllStatesPath()), allStatesHtml);
    
    // Step 10: Generate all-cities browse page
    console.log('Generating all cities browse page...');
    const allCitiesHtml = generateAllCitiesPage(cities);
    writeToFile(path.join('public', getAllCitiesPath()), allCitiesHtml);
    
    // Home page will be handled by React
    console.log('Home page will be handled by React...');
    
    // Generate search-index.html for SEO purposes
    const indexHtml = generateIndexPage(states, categories, beautySalons.slice(0, 6));
    writeToFile(path.join('public', 'search-index.html'), indexHtml);
    
    // Step 11: Generate XML sitemaps
    console.log('Generating sitemaps...');
    const needMultipleSitemaps = beautySalons.length > 200;
    await generateSitemaps(beautySalons, cities, states, categories);
    
    // Step 12: Generate HTML sitemap
    console.log('Generating HTML sitemap...');
    await generateHtmlSitemap(beautySalons, cities, states, categories);
    
    // Step 13: Generate robots.txt
    console.log('Generating robots.txt...');
    await generateRobotsTxt(needMultipleSitemaps);
    
    console.log('HTML generation completed successfully!');
  } catch (error) {
    console.error('Error generating HTML:', error);
    process.exit(1);
  }
}

// Run the generator
generateHTML();