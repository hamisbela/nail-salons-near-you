import { BeautySalon } from '../models.js';
import { pageWrapper, generateBreadcrumbs, getCityUrl, getStateUrl, getSalonUrl } from './layout.js';

// Format opening hours into a clean table format
function formatOpeningHours(hoursText?: string): string {
  if (!hoursText) return '';
  
  try {
    // Handle multiple formats for business hours
    // Split by commas or newlines to get individual day segments
    const segments = hoursText.split(/,|\n/).map(s => s.trim()).filter(s => s);
    
    if (segments.length === 0) {
      return `<p class="text-gray-700">${hoursText}</p>`;
    }
    
    let formattedHours = `
    <table class="w-full text-left border-collapse hours-table">
      <tbody>`;
    
    for (const segment of segments) {
      // Remove any quotes from the segment
      const cleanSegment = segment.replace(/"/g, '');
      
      // Try different parsing strategies based on the format
      
      // Format: "Tu-We 10 00-17:00" or similar with spaces between hours and minutes
      let match = cleanSegment.match(/^([A-Za-z]{2}(?:-[A-Za-z]{2})?)(?:\s+)(\d{1,2})(?:\s+)(\d{2}(?:-\d{1,2}:\d{2})?)/);
      if (match) {
        const [_, days, startHour, timeRange] = match;
        formattedHours += `
        <tr>
          <td>${days}</td>
          <td>${startHour}:${timeRange}</td>
        </tr>`;
        continue;
      }
      
      // Standard format with colon (e.g., "Mon-Fri: 9am-5pm")
      match = cleanSegment.match(/^(.+?):\s*(.+)$/);
      if (match) {
        const [_, days, hours] = match;
        formattedHours += `
        <tr>
          <td>${days}</td>
          <td>${hours}</td>
        </tr>`;
        continue;
      }
      
      // Alternative format like "Tu-We 10 00-17:00"
      match = cleanSegment.match(/^([A-Za-z]{2}(?:-[A-Za-z]{2})?)(?:\s+)(\d{1,2})(?:\s+)(\d{2})-(\d{1,2}):(\d{2})/);
      if (match) {
        const [_, days, startHour, startMin, endHour, endMin] = match;
        formattedHours += `
        <tr>
          <td>${days}</td>
          <td>${startHour}:${startMin} - ${endHour}:${endMin}</td>
        </tr>`;
        continue;
      }
      
      // Any other format - just split by spaces
      const parts = cleanSegment.split(/\s+/);
      if (parts.length >= 2) {
        // Assume first part is days, rest is hours
        const days = parts[0];
        const hours = parts.slice(1).join(' ');
        
        formattedHours += `
        <tr>
          <td>${days}</td>
          <td>${hours}</td>
        </tr>`;
      } else {
        // Fallback: just put the whole thing in one column
        formattedHours += `
        <tr>
          <td colspan="2">${cleanSegment}</td>
        </tr>`;
      }
    }
    
    formattedHours += `
      </tbody>
    </table>`;
    
    return formattedHours;
  } catch (e) {
    // If parsing fails, just display the original text
    return `<p class="text-gray-700">${hoursText?.replace(/"/g, '')}</p>`;
  }
}

export function generateSalonPage(salon: BeautySalon): string {
  const cityName = salon.city?.city || 'Unknown City';
  const stateName = salon.state?.state || 'Unknown State';
  
  // Build meta description
  const metaDescription = `${salon.title} is a nail salon in ${cityName}, ${stateName}. ${salon.description?.substring(0, 150) || 'Visit us for quality manicures, pedicures, gel nails, acrylics, and nail art services.'}`;

  const breadcrumbs = generateBreadcrumbs([
    { label: 'Home', url: '/' },
    { label: stateName, url: getStateUrl(salon.state?.slug || '') },
    { label: cityName, url: getCityUrl(salon.city?.slug || '') },
    { label: salon.title }
  ]);

  // Generate related nearby listings
  let relatedListingsHtml = '';
  if (salon.city && salon.city.salons && salon.city.salons.length > 1) {
    const nearbySalons = salon.city.salons
      .filter(s => s.id !== salon.id)
      .slice(0, 3);
    
    if (nearbySalons.length > 0) {
      relatedListingsHtml = `
      <div class="mt-12 border-t border-gray-200 pt-12">
        <h2 class="text-2xl font-bold mb-6 text-pink-800">More Nail Salons in ${cityName}</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          ${nearbySalons.map(nearbySalon => {
            // Use original slug implementation
            const nearbySlug = nearbySalon.slug || '';
            
            return `
            <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <a href="${getSalonUrl(nearbySlug)}">
                ${nearbySalon.images && nearbySalon.images.length > 0 
                  ? `<img src="https://img.nailsalonnearyou.com/your-r2-bucket-name${nearbySalon.images[0].path}" alt="${nearbySalon.title}" class="w-full h-40 object-cover">`
                  : `<div class="w-full h-40 bg-gradient-to-r from-pink-400 to-rose-500 flex items-center justify-center text-white text-3xl">
                      <i class="fas fa-spa"></i>
                    </div>`
                }
              </a>
              <div class="p-4">
                <a href="${getSalonUrl(nearbySlug)}" class="block">
                  <h3 class="font-bold text-lg text-pink-800 hover:text-pink-600">${nearbySalon.title}</h3>
                </a>
                <p class="text-gray-600 mt-1 text-sm">
                  <i class="fas fa-map-marker-alt text-pink-500 mr-1"></i> ${cityName}, ${stateName}
                </p>
                ${nearbySalon.telephone ? `
                <p class="mt-3">
                  <a href="tel:${nearbySalon.telephone}" class="inline-block bg-pink-600 text-white px-3 py-1 rounded text-sm hover:bg-pink-700">
                    <i class="fas fa-phone mr-1"></i> Call Now
                  </a>
                </p>` : ''}
              </div>
            </div>
          `}).join('')}
        </div>
      </div>
      `;
    }
  }

  // Generate OpenStreetMap embed with closer zoom if coordinates are available
  let mapEmbed = '';
  if (salon.latitude && salon.longitude) {
    // Use a closer zoom level by reducing the bounding box size
    const lat = parseFloat(salon.latitude);
    const lon = parseFloat(salon.longitude);
    const zoomFactor = 0.002; // Smaller value = closer zoom
    
    mapEmbed = `
    <div class="mb-6">
      <h4 class="font-semibold mb-3 text-pink-800">Location</h4>
      <div class="rounded-lg overflow-hidden shadow-md h-64 mb-3">
        <iframe 
          width="100%" 
          height="100%" 
          frameborder="0" 
          scrolling="no" 
          marginheight="0" 
          marginwidth="0" 
          src="https://www.openstreetmap.org/export/embed.html?bbox=${lon-zoomFactor}%2C${lat-zoomFactor}%2C${lon+zoomFactor}%2C${lat+zoomFactor}&amp;layer=mapnik&amp;marker=${lat}%2C${lon}" 
          style="border:0"
          loading="lazy"
        ></iframe>
      </div>
      <a 
        href="https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=18/${lat}/${lon}" 
        target="_blank" 
        rel="nofollow noopener noreferrer"
        class="block w-full bg-pink-600 text-white text-center py-2 px-4 rounded-lg hover:bg-pink-700 transition-colors"
      >
        <i class="fas fa-directions mr-2"></i> Get Directions
      </a>
    </div>
    `;
  }

  // Format the main content
  const content = `
  ${breadcrumbs}
  
  <main class="container mx-auto px-4 py-6">
    <div class="bg-white rounded-lg shadow-lg overflow-hidden">
      <!-- Header Section with Hero Image - REDUCED HEIGHT -->
      <div class="relative h-40 md:h-56 bg-pink-800">
        ${salon.images && salon.images.length > 0 
          ? `<img src="https://img.nailsalonnearyou.com/your-r2-bucket-name${salon.images[0].path}" alt="${salon.title}" class="w-full h-full object-cover opacity-70">`
          : `<div class="w-full h-full bg-gradient-to-r from-pink-800 to-rose-800"></div>`
        }
        <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <div class="container mx-auto">
            <h1 class="text-2xl md:text-3xl font-bold text-white">${salon.title} - Nail Salon in ${cityName}, ${stateName}</h1>
            <div class="flex flex-wrap items-center gap-2 mt-1 text-white/90 text-sm">
              ${salon.categories && salon.categories.length > 0 ? 
                `<div class="flex items-center">
                  <i class="fas fa-tag text-pink-300 mr-1"></i>
                  ${salon.categories.map(cat => cat.category).join(' • ')}
                </div>` : 
                `<div class="flex items-center">
                  <i class="fas fa-spa text-pink-300 mr-1"></i>
                  Nail Salon
                </div>`
              }
              
              ${salon.city ? 
                `<div class="flex items-center ml-2">
                  <i class="fas fa-map-marker-alt text-pink-300 mr-1"></i>
                  ${cityName}, ${stateName}
                </div>` : ''
              }
              
              ${salon.telephone ? 
                `<div class="flex items-center ml-2">
                  <i class="fas fa-phone text-pink-300 mr-1"></i>
                  ${salon.telephone}
                </div>` : ''
              }
            </div>
          </div>
        </div>
      </div>
      
      <!-- Business Details -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        <!-- Left Column: Info and Contact -->
        <div class="md:col-span-2">
          <div class="mb-8">
            <h2 class="text-2xl font-bold mb-4 text-pink-800 flex items-center">
              <i class="fas fa-info-circle text-pink-600 mr-3"></i>
              About
            </h2>
            <div class="bg-gray-50 p-5 rounded-lg border-l-4 border-pink-500">
              <p class="text-gray-700 leading-relaxed">
                ${salon.description || `${salon.title} offers a wide range of nail services in ${cityName}, ${stateName}. Visit us for manicures, pedicures, gel nails, acrylics, and nail art services that will leave you feeling pampered and polished.`}
              </p>
            </div>
          </div>
          
          ${salon.service_product ? `
          <div class="mb-8">
            <h2 class="text-2xl font-bold mb-4 text-pink-800 flex items-center">
              <i class="fas fa-list-check text-pink-600 mr-3"></i>
              Services & Products
            </h2>
            <div class="bg-gray-50 p-5 rounded-lg">
              <p class="text-gray-700 leading-relaxed">${salon.service_product}</p>
            </div>
          </div>
          ` : ''}
          
          ${salon.amenities && salon.amenities.length > 0 ? `
          <div class="mb-8">
            <h2 class="text-2xl font-bold mb-4 text-pink-800 flex items-center">
              <i class="fas fa-star text-pink-600 mr-3"></i>
              Salon Features
            </h2>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-3 bg-gray-50 p-5 rounded-lg">
              ${salon.amenities.map(amenity => 
                `<div class="flex items-center">
                  <i class="fas fa-check-circle text-green-500 mr-2"></i>
                  <span>${amenity.amenity}</span>
                </div>`
              ).join('')}
            </div>
          </div>
          ` : ''}
          
          ${salon.details && salon.details.length > 0 ? `
          <div class="mb-8">
            <h2 class="text-2xl font-bold mb-4 text-pink-800 flex items-center">
              <i class="fas fa-clipboard-list text-pink-600 mr-3"></i>
              Additional Information
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 bg-gray-50 p-5 rounded-lg">
              ${salon.details.map(detail => 
                `<div class="flex items-center">
                  <i class="fas fa-info-circle text-pink-500 mr-2"></i>
                  <span><strong>${detail.key}:</strong> ${detail.value}</span>
                </div>`
              ).join('')}
            </div>
          </div>
          ` : ''}
          
          ${salon.reviews_data && salon.reviews_data.length > 0 ? `
          <div class="mb-8">
            <h2 class="text-2xl font-bold mb-4 text-pink-800 flex items-center">
              <i class="fas fa-comments text-pink-600 mr-3"></i>
              Reviews
            </h2>
            <div class="space-y-4">
              ${salon.reviews_data.map(review => `
                <div class="bg-gray-50 p-5 rounded-lg border-l-4 border-pink-300">
                  <div class="flex justify-between items-center mb-2">
                    <span class="font-bold text-pink-900">${review.author || 'Anonymous'}</span>
                    <span class="text-gray-500 text-sm">${review.time || 'N/A'}</span>
                  </div>
                  <p class="text-gray-700">${review.review}</p>
                  ${review.rating_stars ? `<div class="mt-2 text-yellow-500">
                    ${'★'.repeat(parseInt(review.rating_stars) || 5)}
                  </div>` : ''}
                </div>
              `).join('')}
            </div>
          </div>
          ` : ''}
          
          ${salon.images && salon.images.length > 1 ? `
          <div class="mb-8">
            <h2 class="text-2xl font-bold mb-4 text-pink-800 flex items-center">
              <i class="fas fa-images text-pink-600 mr-3"></i>
              Gallery
            </h2>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              ${salon.images.slice(1).map(image => 
                `<a href="https://img.nailsalonnearyou.com/your-r2-bucket-name${image.path}" target="_blank" class="block h-40 overflow-hidden rounded-lg shadow-md">
                  <img src="https://img.nailsalonnearyou.com/your-r2-bucket-name${image.path}" alt="${salon.title}" class="w-full h-full object-cover hover:opacity-90 transition-opacity">
                </a>`
              ).join('')}
            </div>
          </div>
          ` : ''}
        </div>
        
        <!-- Right Column: Contact Info Card -->
        <div>
          <div class="bg-gray-50 rounded-lg p-6 shadow-md sticky top-20">
            <h3 class="text-xl font-bold mb-4 text-pink-800 border-b pb-2 border-gray-200">
              <i class="fas fa-address-card text-pink-600 mr-2"></i>
              Contact Information
            </h3>
            
            ${salon.address ? `
            <div class="flex mb-4">
              <div class="text-center mr-3">
                <div class="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                  <i class="fas fa-map-marker-alt text-pink-600"></i>
                </div>
              </div>
              <div>
                <h4 class="font-semibold text-gray-800">Address</h4>
                <p class="text-gray-700">${salon.address}</p>
                <p class="text-gray-700">${cityName}, ${stateName} ${salon.postal_code || ''}</p>
              </div>
            </div>
            ` : ''}
            
            ${salon.telephone ? `
            <div class="flex mb-4">
              <div class="text-center mr-3">
                <div class="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                  <i class="fas fa-phone text-pink-600"></i>
                </div>
              </div>
              <div>
                <h4 class="font-semibold text-gray-800">Phone</h4>
                <a href="tel:${salon.telephone}" class="text-pink-600 hover:text-pink-800">${salon.telephone}</a>
              </div>
            </div>
            ` : ''}
            
            ${salon.email ? `
            <div class="flex mb-4">
              <div class="text-center mr-3">
                <div class="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                  <i class="fas fa-envelope text-pink-600"></i>
                </div>
              </div>
              <div>
                <h4 class="font-semibold text-gray-800">Email</h4>
                <a href="mailto:${salon.email}" class="text-pink-600 hover:text-pink-800">${salon.email}</a>
              </div>
            </div>
            ` : ''}
            
            ${salon.website ? `
            <div class="flex mb-4">
              <div class="text-center mr-3">
                <div class="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                  <i class="fas fa-globe text-pink-600"></i>
                </div>
              </div>
              <div>
                <h4 class="font-semibold text-gray-800">Website</h4>
                <a href="${salon.website.startsWith('http') ? salon.website : 'https://' + salon.website}" 
                   target="_blank" rel="nofollow noopener noreferrer" 
                   class="text-pink-600 hover:text-pink-800">
                  ${salon.website.replace(/^https?:\/\//, '')}
                </a>
              </div>
            </div>
            ` : ''}
            
            ${salon.opening_hours ? `
            <div class="mb-4">
              <h4 class="font-semibold text-gray-800 mb-3 flex items-center">
                <div class="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center mr-2">
                  <i class="fas fa-clock text-pink-600"></i>
                </div>
                Business Hours
              </h4>
              <div class="border-t border-b border-gray-200 py-2">
                ${formatOpeningHours(salon.opening_hours)}
              </div>
            </div>
            ` : ''}
            
            ${salon.payments && salon.payments.length > 0 ? `
            <div class="flex mb-5">
              <div class="text-center mr-3">
                <div class="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                  <i class="fas fa-credit-card text-pink-600"></i>
                </div>
              </div>
              <div>
                <h4 class="font-semibold text-gray-800">Payment Methods</h4>
                <div class="flex flex-wrap gap-2 mt-2">
                  ${salon.payments.map(p => 
                    `<span class="bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-sm">${p.payment}</span>`
                  ).join('')}
                </div>
              </div>
            </div>
            ` : ''}
            
            ${mapEmbed}
            
            <div class="mt-4">
              <a href="tel:${salon.telephone || ''}" 
                 class="block w-full bg-green-600 text-white text-center py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-semibold">
                <i class="fas fa-phone mr-2"></i> Call Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Related Nearby Listings -->
    ${relatedListingsHtml}
  </main>`;

  return pageWrapper(`${salon.title} - Nail Salon in ${cityName}, ${stateName}`, metaDescription, content);
}