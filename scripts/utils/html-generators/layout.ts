import { BeautySalon } from '../models.js';

export function generateHead(title: string, description: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${description}">
  <title>${title}</title>
  <link rel="icon" type="image/png" href="https://img.icons8.com/fluency/48/nail-polish.png" />
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  <link rel="stylesheet" href="/assets/css/styles.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body class="bg-gray-50 text-gray-800">`;
}

export function generateNavbar(): string {
  return `
  <header class="bg-pink-900 text-white sticky top-0 z-50 shadow-md">
    <div class="container mx-auto px-4 py-3">
      <nav class="flex justify-between items-center">
        <div>
          <a href="/" class="text-2xl font-bold flex items-center">
            <i class="fas fa-paint-brush mr-2"></i>
            <span class="hidden md:inline">NailSalonNearYou.com</span>
            <span class="md:hidden">Nail Salons</span>
          </a>
        </div>
        <div class="hidden md:flex space-x-8 text-lg">
          <a href="/" class="hover:text-pink-200">Home</a>
          <a href="/about/" class="hover:text-pink-200">About</a>
          <a href="/contact/" class="hover:text-pink-200">Contact</a>
          <a href="/add-a-listing/" class="bg-white text-pink-900 px-4 py-2 rounded-lg hover:bg-pink-100 transition-colors font-medium">
            Add Listing
          </a>
        </div>
        <div class="md:hidden">
          <button class="text-xl p-2" id="mobile-menu-button">
            <i class="fas fa-bars"></i>
          </button>
        </div>
      </nav>
      <div id="mobile-menu" class="hidden md:hidden py-4 space-y-4 overflow-hidden">
        <a href="/" class="block hover:text-pink-200 py-1">Home</a>
        <a href="/about/" class="block hover:text-pink-200 py-1">About</a>
        <a href="/contact/" class="block hover:text-pink-200 py-1">Contact</a>
        <a href="/add-a-listing/" class="bg-white text-pink-900 py-2 px-4 rounded-lg hover:bg-pink-100 transition-colors text-center font-medium mt-2 block">
          Add Listing
        </a>
      </div>
    </div>
  </header>`;
}

export function generateFooter(): string {
  const currentYear = new Date().getFullYear();
  
  return `
  <footer class="bg-pink-900 text-white mt-12 py-12">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 class="text-xl font-bold mb-4">
            <span class="block">Nail Salons</span>
            <span class="block">NearYou.com</span>
          </h3>
          <p class="text-pink-200">Find the best nail salons, nail spas, and nail technicians in your area.</p>
        </div>
        <div>
          <h3 class="text-xl font-bold mb-4">Quick Links</h3>
          <ul class="space-y-2">
            <li><a href="/" class="text-pink-200 hover:text-white">Home</a></li>
            <li><a href="/about/" class="text-pink-200 hover:text-white">About</a></li>
            <li><a href="/contact/" class="text-pink-200 hover:text-white">Contact</a></li>
            <li><a href="/add-a-listing/" class="text-pink-200 hover:text-white">Add Listing</a></li>
          </ul>
        </div>
        <div>
          <h3 class="text-xl font-bold mb-4">Popular States</h3>
          <div class="grid grid-cols-2 gap-2">
            <ul class="space-y-2">
              <li><a href="/states/california/" class="text-pink-200 hover:text-white">California</a></li>
              <li><a href="/states/new-york/" class="text-pink-200 hover:text-white">New York</a></li>
              <li><a href="/states/florida/" class="text-pink-200 hover:text-white">Florida</a></li>
              <li><a href="/states/texas/" class="text-pink-200 hover:text-white">Texas</a></li>
              <li><a href="/states/illinois/" class="text-pink-200 hover:text-white">Illinois</a></li>
              <li><a href="/states/pennsylvania/" class="text-pink-200 hover:text-white">Pennsylvania</a></li>
            </ul>
            <ul class="space-y-2">
              <li><a href="/states/ohio/" class="text-pink-200 hover:text-white">Ohio</a></li>
              <li><a href="/states/georgia/" class="text-pink-200 hover:text-white">Georgia</a></li>
              <li><a href="/states/michigan/" class="text-pink-200 hover:text-white">Michigan</a></li>
              <li><a href="/states/north-carolina/" class="text-pink-200 hover:text-white">North Carolina</a></li>
              <li><a href="/states/new-jersey/" class="text-pink-200 hover:text-white">New Jersey</a></li>
              <li><a href="/states/arizona/" class="text-pink-200 hover:text-white">Arizona</a></li>
            </ul>
          </div>
        </div>
        <div>
          <h3 class="text-xl font-bold mb-4">Popular Cities</h3>
          <div class="grid grid-cols-2 gap-2">
            <ul class="space-y-2">
              <li><a href="/cities/new-york/" class="text-pink-200 hover:text-white">New York</a></li>
              <li><a href="/cities/los-angeles/" class="text-pink-200 hover:text-white">Los Angeles</a></li>
              <li><a href="/cities/chicago/" class="text-pink-200 hover:text-white">Chicago</a></li>
              <li><a href="/cities/houston/" class="text-pink-200 hover:text-white">Houston</a></li>
              <li><a href="/cities/phoenix/" class="text-pink-200 hover:text-white">Phoenix</a></li>
              <li><a href="/cities/philadelphia/" class="text-pink-200 hover:text-white">Philadelphia</a></li>
            </ul>
            <ul class="space-y-2">
              <li><a href="/cities/san-antonio/" class="text-pink-200 hover:text-white">San Antonio</a></li>
              <li><a href="/cities/san-diego/" class="text-pink-200 hover:text-white">San Diego</a></li>
              <li><a href="/cities/dallas/" class="text-pink-200 hover:text-white">Dallas</a></li>
              <li><a href="/cities/san-jose/" class="text-pink-200 hover:text-white">San Jose</a></li>
              <li><a href="/cities/austin/" class="text-pink-200 hover:text-white">Austin</a></li>
              <li><a href="/cities/jacksonville/" class="text-pink-200 hover:text-white">Jacksonville</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="mt-12 pt-8 border-t border-pink-800 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="flex space-x-6 text-2xl justify-center md:justify-start">
          <a href="#" class="text-pink-200 hover:text-white"><i class="fab fa-facebook"></i></a>
          <a href="#" class="text-pink-200 hover:text-white"><i class="fab fa-twitter"></i></a>
          <a href="#" class="text-pink-200 hover:text-white"><i class="fab fa-instagram"></i></a>
          <a href="#" class="text-pink-200 hover:text-white"><i class="fab fa-linkedin"></i></a>
        </div>
        <div class="text-center md:text-right text-pink-200">
          <p>&copy; ${currentYear} Nail Salons Near You. All rights reserved.</p>
        </div>
      </div>
    </div>
  </footer>
  
  <script>
    document.getElementById('mobile-menu-button').addEventListener('click', function() {
      const mobileMenu = document.getElementById('mobile-menu');
      mobileMenu.classList.toggle('hidden');
    });
    
    // Add script to scroll to top when clicking on links
    document.addEventListener('DOMContentLoaded', function() {
      document.querySelectorAll('a[href^="/"]').forEach(function(link) {
        link.addEventListener('click', function() {
          // Smooth scroll to top for internal links
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      });
    });
  </script>
</body>
</html>`;
}

export function pageWrapper(
  title: string, 
  description: string, 
  content: string
): string {
  return `${generateHead(title, description)}
${generateNavbar()}
${content}
${generateFooter()}`;
}

export function generateBreadcrumbs(
  items: Array<{ label: string; url?: string }>
): string {
  const breadcrumbItems = items
    .map((item, index, arr) => {
      if (index === arr.length - 1) {
        return `<li class="text-pink-700">${item.label}</li>`;
      }
      return `<li><a href="${item.url}" class="text-pink-500 hover:text-pink-800">${item.label}</a></li>`;
    })
    .join(`<li class="mx-2 text-gray-400">/</li>`);

  return `
  <nav class="container mx-auto px-4 py-4">
    <ol class="flex items-center text-sm">
      ${breadcrumbItems}
    </ol>
  </nav>`;
}

export function generateListingCard(salon: BeautySalon): string {
  const image = salon.images && salon.images.length > 0
    ? salon.images[0].path
    : 'https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';
  
  const cityState = [
    salon.city?.city,
    salon.state?.state
  ].filter(Boolean).join(', ');
  
  const categories = salon.categories
    ? salon.categories.map(c => c.category).join(', ')
    : '';

  // Use the original salon slug - don't try to process it
  const salonSlug = salon.slug || '';

  return `
  <div class="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg">
    <a href="${getSalonUrl(salonSlug)}">
      <img src="${image}" alt="${salon.title}" class="w-full h-48 object-cover">
    </a>
    <div class="p-4">
      <a href="${getSalonUrl(salonSlug)}" class="block">
        <h3 class="text-xl font-bold text-pink-800 mb-2 hover:text-pink-600">${salon.title}</h3>
      </a>
      <p class="text-gray-600 mb-2">
        <i class="fas fa-map-marker-alt text-pink-500 mr-2"></i>${cityState || 'Location unavailable'}
      </p>
      ${categories ? `<p class="text-gray-600 mb-3"><i class="fas fa-tag text-pink-500 mr-2"></i>${categories}</p>` : ''}
      <div class="mt-4 flex justify-between items-center">
        <div>
          ${salon.telephone ? `<a href="tel:${salon.telephone}" class="text-pink-500 hover:text-pink-700"><i class="fas fa-phone mr-1"></i> Call</a>` : ''}
        </div>
        <a href="${getSalonUrl(salonSlug)}" class="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition-colors">View Details</a>
      </div>
    </div>
  </div>`;
}

export function generateListingsGrid(salons: BeautySalon[], title?: string): string {
  const titleHtml = title ? `<h2 class="text-2xl font-bold text-center mb-8">${title}</h2>` : '';
  
  return `
  <div class="container mx-auto px-4 py-8">
    ${titleHtml}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      ${salons.map(salon => generateListingCard(salon)).join('')}
    </div>
  </div>`;
}

export function getSalonUrl(slug: string): string {
  return `/salon/${slug}/`;
}

export function getCityUrl(slug: string): string {
  if (!slug) {
    console.warn('Warning: Empty city slug detected when generating URL');
    return '/cities/';
  }
  return `/cities/${slug}/`;
}

export function getStateUrl(slug: string): string {
  if (!slug) {
    console.warn('Warning: Empty state slug detected when generating URL');
    return '/states/';
  }
  return `/states/${slug}/`;
}

export function getCategoryUrl(slug: string): string {
  if (!slug) {
    console.warn('Warning: Empty category slug detected when generating URL');
    return '/categories/';
  }
  return `/categories/${slug}/`;
}

export function getAllStatesUrl(): string {
  return `/states/`;
}

export function getAllCitiesUrl(): string {
  return `/cities/`;
}