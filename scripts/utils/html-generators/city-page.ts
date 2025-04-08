import { City } from '../models.js';
import { pageWrapper, generateBreadcrumbs, generateListingsGrid, getStateUrl } from './layout.js';

export function generateCityPage(city: City): string {
  const stateName = city.state?.state || 'Unknown State';
  const stateSlug = city.state?.slug || '';
  const salons = city.salons || [];
  const salonCount = city.salonCount || salons.length;
  
  // Build meta description
  const metaDescription = `Find nail salons in ${city.city}, ${stateName}. Browse our listings of top-rated nail spas and nail technicians with professional services.`;

  const breadcrumbs = generateBreadcrumbs([
    { label: 'Home', url: '/' },
    { label: stateName, url: getStateUrl(stateSlug) },
    { label: city.city }
  ]);

  // Format the main content
  const content = `
  ${breadcrumbs}
  
  <main class="container mx-auto px-4 py-6">
    <header class="mb-12 text-center">
      <h1 class="text-4xl font-bold text-pink-900">
        Nail Salons in ${city.city}, ${stateName}
      </h1>
      <p class="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
        Find professional nail salons in ${city.city}. Browse our comprehensive directory of local nail spas and nail technicians.
      </p>
      <div class="mt-2 text-pink-600 font-medium">
        <span class="inline-flex items-center">
          <i class="fas fa-list-ul mr-2"></i>
          ${salonCount} listing${salonCount !== 1 ? 's' : ''} found
        </span>
      </div>
    </header>

    ${salons.length > 0 
      ? generateListingsGrid(salons, `Nail Salons in ${city.city}`)
      : `
        <div class="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 class="text-2xl font-bold text-pink-800 mb-4">No Listings Found</h2>
          <p class="text-gray-600 mb-6">We couldn't find any nail salons in ${city.city} at this time.</p>
          <a href="/add-a-listing/" class="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors">
            Add Your Business
          </a>
        </div>
      `
    }

    <div class="mt-16 bg-pink-50 p-8 rounded-lg">
      <h2 class="text-2xl font-bold text-pink-800 mb-4">About Nail Salons in ${city.city}</h2>
      <p class="text-gray-700 mb-4">
        Nail salons offer a comprehensive selection of services including manicures, pedicures, gel nails, acrylics, and nail art. ${city.city}, ${stateName} is home to a range of quality nail spas to help you look and feel your best.
      </p>
      <p class="text-gray-700 mb-4">
        Professional nail salons in ${city.city} offer access to high-quality, specialized nail services and products that may not be available with at-home nail care. Their knowledgeable staff can offer expert advice for all your nail care needs.
      </p>
      <p class="text-gray-700">
        Browse our listings to find nail salons in ${city.city}. Visit them directly to explore their service menu and to get personalized recommendations for your nail care journey.
      </p>
    </div>
  </main>`;

  return pageWrapper(`Nail Salons in ${city.city}, ${stateName} - Directory`, metaDescription, content);
}