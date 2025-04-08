import { State } from '../models.js';
import { pageWrapper, getStateUrl } from './layout.js';

export function generateAllStatesPage(states: State[]): string {
  // Sort states alphabetically
  const sortedStates = [...states].sort((a, b) => a.state.localeCompare(b.state));
  
  // Build meta description
  const metaDescription = "Browse nail salons by state. Find nail spas with manicures, pedicures, and specialty nail services across the United States.";

  // Calculate total listings
  const totalListings = states.reduce((sum, state) => sum + (state.salonCount || 0), 0);

  // Format the main content
  const content = `
  <main class="container mx-auto px-4 py-6">
    <header class="mb-12 text-center">
      <h1 class="text-4xl font-bold text-pink-900">
        Browse Nail Salons by State
      </h1>
      <p class="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
        Find professional nail salons across the United States. Browse by state to discover nail spas and nail technicians in your area.
      </p>
      <div class="mt-2 text-pink-600 font-medium">
        <span class="inline-flex items-center">
          <i class="fas fa-list-ul mr-2"></i>
          ${totalListings} listing${totalListings !== 1 ? 's' : ''} across ${states.length} states
        </span>
      </div>
    </header>

    <div class="bg-white p-8 rounded-lg shadow-md mb-12">
      <h2 class="text-2xl font-bold text-pink-800 mb-6">All States</h2>
      
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        ${sortedStates.map(state => {
          const stateSlug = state.slug || '';
          const citiesCount = state.cities?.length || 0;
          const listingsCount = state.salonCount || 0;
          
          return `
          <a href="${getStateUrl(stateSlug)}" class="block bg-gray-50 p-4 rounded-lg hover:bg-pink-50 transition-colors border border-gray-100">
            <h3 class="font-bold text-lg text-pink-700">${state.state}</h3>
            <p class="text-sm text-gray-600 mt-1">${listingsCount} listing${listingsCount !== 1 ? 's' : ''}</p>
            <p class="text-xs text-gray-500 mt-1">${citiesCount} cit${citiesCount !== 1 ? 'ies' : 'y'}</p>
          </a>
        `}).join('')}
      </div>
    </div>

    <div class="bg-pink-50 p-8 rounded-lg">
      <h2 class="text-2xl font-bold text-pink-800 mb-4">About Our Nail Salon Directory</h2>
      <p class="text-gray-700 mb-4">
        Our nationwide directory of nail salons helps you find professional nail services and nail technicians in your state. These salons offer a comprehensive selection of nail care treatments, including manicures, pedicures, gel nails, acrylics, and nail art.
      </p>
      <p class="text-gray-700 mb-4">
        Professional nail salons provide access to high-quality nail services and specialized techniques that may not be available with at-home nail care. Whether you're looking for a simple manicure or elaborate nail designs, these salons have skilled technicians to meet your needs.
      </p>
      <p class="text-gray-700">
        Browse our listings by state to find quality nail salons in your area. Most salons offer a wide range of services for various nail care needs, with knowledgeable staff to help you achieve the perfect nails.
      </p>
    </div>
  </main>`;

  return pageWrapper("Browse Nail Salons by State - National Directory", metaDescription, content);
}