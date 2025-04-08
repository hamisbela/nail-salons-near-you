import { State } from '../models.js';
import { pageWrapper, generateBreadcrumbs, generateListingsGrid, getCityUrl } from './layout.js';

export function generateStatePage(state: State): string {
  const cities = state.cities || [];
  const salons = state.salons || [];
  const salonCount = state.salonCount || salons.length;
  
  // Sort cities alphabetically
  cities.sort((a, b) => a.city.localeCompare(b.city));
  
  // Build meta description
  const metaDescription = `Find nail salons in ${state.state}. Browse our directory of nail spas and nail technicians by city.`;

  const breadcrumbs = generateBreadcrumbs([
    { label: 'Home', url: '/' },
    { label: state.state }
  ]);

  // Format the main content
  const content = `
  ${breadcrumbs}
  
  <main class="container mx-auto px-4 py-6">
    <header class="mb-12 text-center">
      <h1 class="text-4xl font-bold text-pink-900">
        Nail Salons in ${state.state}
      </h1>
      <p class="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
        Find professional nail salons across ${state.state}. Browse by city or view all listings.
      </p>
      <div class="mt-2 text-pink-600 font-medium">
        <span class="inline-flex items-center">
          <i class="fas fa-list-ul mr-2"></i>
          ${salonCount} listing${salonCount !== 1 ? 's' : ''} across ${cities.length} cities
        </span>
      </div>
    </header>

    <!-- Cities List -->
    <section class="mb-16">
      <h2 class="text-2xl font-bold text-pink-800 mb-6">Cities in ${state.state}</h2>
      
      ${cities.length > 0 ? `
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        ${cities.map(city => {
          // Make sure we have a valid slug
          const citySlug = city.slug || '';
          const citySalonCount = city.salonCount || (city.salons ? city.salons.length : 0);
          return `
          <a href="${getCityUrl(citySlug)}" class="block bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 class="font-semibold text-pink-700 hover:text-pink-500">${city.city}</h3>
            <p class="text-sm text-gray-500 mt-1">${citySalonCount} listing${citySalonCount !== 1 ? 's' : ''}</p>
          </a>
        `}).join('')}
      </div>
      ` : `
      <div class="bg-white p-6 rounded-lg shadow-md text-center">
        <p class="text-gray-600">No cities found in ${state.state}.</p>
      </div>
      `}
    </section>

    <!-- Featured Listings -->
    ${salons.length > 0 ? `
    <section class="mb-16">
      <h2 class="text-2xl font-bold text-pink-800 mb-6">Featured Nail Salons in ${state.state}</h2>
      ${generateListingsGrid(salons.slice(0, 6))}
      
      ${salons.length > 6 ? `
      <div class="text-center mt-8">
        <a href="#" class="inline-block bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors">
          View All ${salons.length} Listings
        </a>
      </div>
      ` : ''}
    </section>
    ` : ''}

    <!-- About Section -->
    <section class="bg-pink-50 p-8 rounded-lg">
      <h2 class="text-2xl font-bold text-pink-800 mb-4">About Nail Salons in ${state.state}</h2>
      <p class="text-gray-700 mb-4">
        Nail salons offer a comprehensive selection of services including manicures, pedicures, gel nails, acrylics, and nail art. In ${state.state}, you'll find quality nail spas that cater to all your nail care needs.
      </p>
      <p class="text-gray-700 mb-4">
        These specialized providers offer access to high-quality nail services and products that enhance your appearance and boost your confidence. From simple manicures for a polished look to elaborate nail designs for special occasions, nail salons have everything you need for beautiful, well-maintained nails.
      </p>
      <p class="text-gray-700">
        Browse our directory to find nail salons near you in ${state.state}. Visit them directly to explore their service menu and to get expert advice from certified nail technicians who understand different nail types and aesthetic preferences.
      </p>
    </section>
  </main>`;

  return pageWrapper(`Nail Salons in ${state.state} - Directory by City`, metaDescription, content);
}