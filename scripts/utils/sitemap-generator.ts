import fs from 'fs-extra';
import path from 'path';
import { BeautySalon, City, State, Category } from './models.js';
import { 
  getSalonUrl, 
  getCityUrl, 
  getStateUrl, 
  getCategoryUrl,
  getAllStatesUrl,
  getAllCitiesUrl
} from './path-utils.js';

// Base URL of the website
const BASE_URL = 'https://nailsalonnearyou.com';

// Maximum number of URLs per sitemap
const MAX_URLS_PER_SITEMAP = 200;

// Date formatting for the lastmod element in sitemap
function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

// Current date for sitemap lastmod
const currentDate = formatDate(new Date());

/**
 * Generate XML sitemaps for the website
 */
export async function generateSitemaps(
  beautySalons: BeautySalon[],
  cities: City[],
  states: State[],
  categories: Category[]
): Promise<void> {
  console.log('Generating XML sitemaps...');
  
  // Create sitemap directory if it doesn't exist
  const sitemapDir = path.join('public', 'sitemaps');
  fs.ensureDirSync(sitemapDir);
  
  // Collect all URLs
  const urls: { loc: string; lastmod: string; priority: string; changefreq: string }[] = [];
  
  // Add static pages
  urls.push({
    loc: `${BASE_URL}/`,
    lastmod: currentDate,
    priority: '1.0',
    changefreq: 'weekly'
  });
  
  urls.push({
    loc: `${BASE_URL}/about/`,
    lastmod: currentDate,
    priority: '0.8',
    changefreq: 'monthly'
  });
  
  urls.push({
    loc: `${BASE_URL}/contact/`,
    lastmod: currentDate,
    priority: '0.8',
    changefreq: 'monthly'
  });
  
  urls.push({
    loc: `${BASE_URL}/add-a-listing/`,
    lastmod: currentDate,
    priority: '0.8',
    changefreq: 'monthly'
  });
  
  // Add states index
  urls.push({
    loc: `${BASE_URL}${getAllStatesUrl()}`,
    lastmod: currentDate,
    priority: '0.9',
    changefreq: 'weekly'
  });
  
  // Add cities index
  urls.push({
    loc: `${BASE_URL}${getAllCitiesUrl()}`,
    lastmod: currentDate,
    priority: '0.9',
    changefreq: 'weekly'
  });
  
  // Add state pages
  states.forEach(state => {
    if (state.slug && state.cities && state.cities.length > 0) {
      urls.push({
        loc: `${BASE_URL}${getStateUrl(state.slug)}`,
        lastmod: currentDate,
        priority: '0.8',
        changefreq: 'weekly'
      });
    }
  });
  
  // Add city pages
  cities.forEach(city => {
    if (city.slug && city.salons && city.salons.length > 0) {
      urls.push({
        loc: `${BASE_URL}${getCityUrl(city.slug)}`,
        lastmod: currentDate,
        priority: '0.7',
        changefreq: 'weekly'
      });
    }
  });
  
  // Add category pages
  categories.forEach(category => {
    if (category.slug && category.salons && category.salons.length > 0) {
      urls.push({
        loc: `${BASE_URL}${getCategoryUrl(category.slug)}`,
        lastmod: currentDate,
        priority: '0.7',
        changefreq: 'weekly'
      });
    }
  });
  
  // Add salon pages
  beautySalons.forEach(salon => {
    if (salon.slug) {
      urls.push({
        loc: `${BASE_URL}${getSalonUrl(salon.slug)}`,
        lastmod: currentDate,
        priority: '0.6',
        changefreq: 'monthly'
      });
    }
  });
  
  console.log(`Total URLs collected: ${urls.length}`);
  
  // Split URLs into chunks of MAX_URLS_PER_SITEMAP
  const urlChunks = [];
  for (let i = 0; i < urls.length; i += MAX_URLS_PER_SITEMAP) {
    urlChunks.push(urls.slice(i, i + MAX_URLS_PER_SITEMAP));
  }
  
  console.log(`Creating ${urlChunks.length} sitemap${urlChunks.length !== 1 ? 's' : ''}`);
  
  // Generate individual sitemaps
  const sitemapFilenames: string[] = [];
  
  for (let i = 0; i < urlChunks.length; i++) {
    const chunkUrls = urlChunks[i];
    const sitemapFilename = urlChunks.length === 1 ? 'sitemap.xml' : `sitemap-${i + 1}.xml`;
    const sitemapPath = path.join(sitemapDir, sitemapFilename);
    sitemapFilenames.push(sitemapFilename);
    
    let sitemapXml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemapXml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    chunkUrls.forEach(url => {
      sitemapXml += '  <url>\n';
      sitemapXml += `    <loc>${url.loc}</loc>\n`;
      sitemapXml += `    <lastmod>${url.lastmod}</lastmod>\n`;
      sitemapXml += `    <changefreq>${url.changefreq}</changefreq>\n`;
      sitemapXml += `    <priority>${url.priority}</priority>\n`;
      sitemapXml += '  </url>\n';
    });
    
    sitemapXml += '</urlset>';
    
    fs.writeFileSync(sitemapPath, sitemapXml);
    console.log(`Generated ${sitemapPath}`);
  }
  
  // Generate sitemap index if there are multiple sitemaps
  if (urlChunks.length > 1) {
    const sitemapIndexPath = path.join('public', 'sitemap-index.xml');
    let sitemapIndexXml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemapIndexXml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    sitemapFilenames.forEach(filename => {
      sitemapIndexXml += '  <sitemap>\n';
      sitemapIndexXml += `    <loc>${BASE_URL}/sitemaps/${filename}</loc>\n`;
      sitemapIndexXml += `    <lastmod>${currentDate}</lastmod>\n`;
      sitemapIndexXml += '  </sitemap>\n';
    });
    
    sitemapIndexXml += '</sitemapindex>';
    
    fs.writeFileSync(sitemapIndexPath, sitemapIndexXml);
    console.log(`Generated sitemap index at ${sitemapIndexPath}`);
  } else if (sitemapFilenames.length === 1) {
    // Copy the single sitemap to the root for easier discovery
    fs.copyFileSync(
      path.join(sitemapDir, sitemapFilenames[0]), 
      path.join('public', 'sitemap.xml')
    );
  }
  
  console.log('XML sitemaps generated successfully');
}

/**
 * Generate HTML sitemap for the website
 */
export async function generateHtmlSitemap(
  beautySalons: BeautySalon[],
  cities: City[],
  states: State[],
  categories: Category[]
): Promise<void> {
  console.log('Generating HTML sitemap...');
  
  // Filter entities to only include those with slugs and content
  const filteredStates = states.filter(state => state.slug && state.cities && state.cities.length > 0);
  const filteredCities = cities.filter(city => city.slug && city.salons && city.salons.length > 0);
  const filteredCategories = categories.filter(
    category => category.slug && category.salons && category.salons.length > 0
  );
  const filteredSalons = beautySalons.filter(salon => salon.slug);
  
  // Sort alphabetically
  filteredStates.sort((a, b) => a.state.localeCompare(b.state));
  filteredCities.sort((a, b) => a.city.localeCompare(b.city));
  filteredCategories.sort((a, b) => a.category.localeCompare(b.category));
  filteredSalons.sort((a, b) => a.title.localeCompare(b.title));
  
  // Generate the HTML content
  let htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sitemap - Nail Salon Near You</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  <link rel="stylesheet" href="/assets/css/styles.css">
  <meta name="robots" content="noindex, follow">
</head>
<body class="bg-gray-50">
  <header class="bg-pink-900 text-white py-6">
    <div class="container mx-auto px-4">
      <h1 class="text-3xl font-bold">Sitemap</h1>
      <p class="mt-2">A complete index of all pages on NailSalonNearYou.com</p>
    </div>
  </header>
  
  <main class="container mx-auto px-4 py-8">
    <div class="mb-10">
      <h2 class="text-2xl font-bold text-pink-800 mb-4">Main Pages</h2>
      <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <li><a href="/" class="text-pink-600 hover:text-pink-800">Home</a></li>
        <li><a href="/about/" class="text-pink-600 hover:text-pink-800">About</a></li>
        <li><a href="/contact/" class="text-pink-600 hover:text-pink-800">Contact</a></li>
        <li><a href="/add-a-listing/" class="text-pink-600 hover:text-pink-800">Add a Listing</a></li>
        <li><a href="${getAllStatesUrl()}" class="text-pink-600 hover:text-pink-800">All States</a></li>
        <li><a href="${getAllCitiesUrl()}" class="text-pink-600 hover:text-pink-800">All Cities</a></li>
      </ul>
    </div>
    
    <div class="mb-10">
      <h2 class="text-2xl font-bold text-pink-800 mb-4">States (${filteredStates.length})</h2>
      <ul class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
        ${filteredStates.map(state => `
          <li><a href="${getStateUrl(state.slug || '')}" class="text-pink-600 hover:text-pink-800">${state.state}</a></li>
        `).join('')}
      </ul>
    </div>
    
    <div class="mb-10">
      <h2 class="text-2xl font-bold text-pink-800 mb-4">Categories (${filteredCategories.length})</h2>
      <ul class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
        ${filteredCategories.map(category => `
          <li><a href="${getCategoryUrl(category.slug || '')}" class="text-pink-600 hover:text-pink-800">${category.category}</a></li>
        `).join('')}
      </ul>
    </div>
    
    <div class="mb-10">
      <h2 class="text-2xl font-bold text-pink-800 mb-4">Cities (${filteredCities.length})</h2>
      <div class="bg-white p-5 rounded-lg shadow-md">
        <div class="mb-4">
          <input type="text" id="citySearch" placeholder="Search cities..." 
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500">
        </div>
        <ul id="cityList" class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-96 overflow-y-auto">
          ${filteredCities.map(city => `
            <li data-name="${city.city.toLowerCase()}"><a href="${getCityUrl(city.slug || '')}" class="text-pink-600 hover:text-pink-800">${city.city}, ${city.state?.state || ''}</a></li>
          `).join('')}
        </ul>
      </div>
    </div>
    
    <div class="mb-10">
      <h2 class="text-2xl font-bold text-pink-800 mb-4">Nail Salon Listings (${filteredSalons.length})</h2>
      <div class="bg-white p-5 rounded-lg shadow-md">
        <div class="mb-4">
          <input type="text" id="salonSearch" placeholder="Search nail salons..." 
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500">
        </div>
        <ul id="salonList" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-h-96 overflow-y-auto">
          ${filteredSalons.map(salon => `
            <li data-name="${salon.title.toLowerCase()}"><a href="${getSalonUrl(salon.slug || '')}" class="text-pink-600 hover:text-pink-800">${salon.title}</a></li>
          `).join('')}
        </ul>
      </div>
    </div>
  </main>
  
  <footer class="bg-pink-900 text-white py-6">
    <div class="container mx-auto px-4 text-center">
      <p>&copy; ${new Date().getFullYear()} NailSalonNearYou.com. All rights reserved.</p>
    </div>
  </footer>
  
  <script>
    // Simple search functionality for cities and salons
    document.getElementById('citySearch').addEventListener('input', function(e) {
      const searchTerm = e.target.value.toLowerCase();
      const cities = document.querySelectorAll('#cityList li');
      cities.forEach(city => {
        const name = city.getAttribute('data-name');
        if (name.includes(searchTerm)) {
          city.style.display = '';
        } else {
          city.style.display = 'none';
        }
      });
    });
    
    document.getElementById('salonSearch').addEventListener('input', function(e) {
      const searchTerm = e.target.value.toLowerCase();
      const salons = document.querySelectorAll('#salonList li');
      salons.forEach(salon => {
        const name = salon.getAttribute('data-name');
        if (name.includes(searchTerm)) {
          salon.style.display = '';
        } else {
          salon.style.display = 'none';
        }
      });
    });
  </script>
</body>
</html>
  `;
  
  // Write the HTML sitemap file
  const sitemapPath = path.join('public', 'sitemap.html');
  fs.writeFileSync(sitemapPath, htmlContent);
  
  console.log(`HTML sitemap generated at ${sitemapPath}`);
}

/**
 * Generate robots.txt file
 */
export async function generateRobotsTxt(multipleXmlSitemaps: boolean = false): Promise<void> {
  console.log('Generating robots.txt...');
  
  let robotsTxt = `# robots.txt for NailSalonNearYou.com
User-agent: *
Allow: /

# Disallow admin-related paths
Disallow: /admin/
Disallow: /wp-admin/
Disallow: /login/
Disallow: /cgi-bin/

# Disallow search result pages
Disallow: /*?q=*
Disallow: /*?s=*
Disallow: /*?search=*

# Sitemap locations
`;

  if (multipleXmlSitemaps) {
    robotsTxt += `Sitemap: ${BASE_URL}/sitemap-index.xml\n`;
  } else {
    robotsTxt += `Sitemap: ${BASE_URL}/sitemap.xml\n`;
  }
  
  // Add HTML sitemap
  robotsTxt += `Sitemap: ${BASE_URL}/sitemap.html\n`;
  
  // Write the robots.txt file
  const robotsPath = path.join('public', 'robots.txt');
  fs.writeFileSync(robotsPath, robotsTxt);
  
  console.log(`robots.txt generated at ${robotsPath}`);
}