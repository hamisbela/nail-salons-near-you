import { Category } from '../models.js';
import { pageWrapper, generateBreadcrumbs, generateListingsGrid } from './layout.js';

export function generateCategoryPage(category: Category): string {
  const salons = category.salons || [];
  const salonCount = category.salonCount || salons.length;
  
  // Build meta description
  const metaDescription = `Find ${category.category.toLowerCase()} specializing in nail services and treatments. Browse our directory of professional nail salons and nail technicians.`;

  const breadcrumbs = generateBreadcrumbs([
    { label: 'Home', url: '/' },
    { label: 'Categories', url: '/categories/' },
    { label: category.category }
  ]);

  // Format the main content
  const content = `
  ${breadcrumbs}
  
  <main class="container mx-auto px-4 py-6">
    <header class="mb-12 text-center">
      <h1 class="text-4xl font-bold text-pink-900">
        ${category.category}
      </h1>
      <p class="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
        Browse our directory of ${category.category.toLowerCase()} specializing in nail services and beauty treatments.
      </p>
      <div class="mt-2 text-pink-600 font-medium">
        <span class="inline-flex items-center">
          <i class="fas fa-list-ul mr-2"></i>
          ${salonCount} listing${salonCount !== 1 ? 's' : ''} found
        </span>
      </div>
    </header>

    ${salons.length > 0 
      ? generateListingsGrid(salons, `${category.category} Listings`)
      : `
        <div class="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 class="text-2xl font-bold text-pink-800 mb-4">No Listings Found</h2>
          <p class="text-gray-600 mb-6">We couldn't find any ${category.category.toLowerCase()} listings at this time.</p>
          <a href="/add-a-listing/" class="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors">
            Add Your Business
          </a>
        </div>
      `
    }

    <div class="mt-16 bg-pink-50 p-8 rounded-lg">
      <h2 class="text-2xl font-bold text-pink-800 mb-4">About ${category.category}</h2>
      <p class="text-gray-700 mb-4">
        ${category.category} offer a comprehensive range of nail services, including manicures, pedicures, and specialty nail treatments to enhance your appearance and wellbeing. These specialized providers offer access to professional-grade products and expert advice.
      </p>
      <p class="text-gray-700 mb-4">
        When choosing a ${category.category.toLowerCase()}, look for providers with a wide selection of services and products for your specific nail care needs. Many salons have certified nail technicians who can provide personalized recommendations.
      </p>
      <p class="text-gray-700">
        Browse our listings to find quality ${category.category.toLowerCase()} in your area. Visit them directly to explore their service menu and to get expert advice for your nail care journey.
      </p>
    </div>
  </main>`;

  return pageWrapper(`${category.category} - Nail Salon Directory`, metaDescription, content);
}