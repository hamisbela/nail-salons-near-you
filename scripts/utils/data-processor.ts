import {
  BeautySalon,
  City,
  State,
  Category,
  SalonDetail,
  Amenity,
  Payment,
  Image,
  Review,
  SalonCategory,
  CityBeautySalon,
  AmenityBeautySalon,
  PaymentBeautySalon
} from './models.js';
import { createSlug } from './path-utils.js';

export function processData(rawData: {
  beautySalons: BeautySalon[];
  cities: City[];
  states: State[];
  categories: Category[];
  salonDetails: SalonDetail[];
  amenities: Amenity[];
  payments: Payment[];
  images: Image[];
  reviews: Review[];
  salonCategories: SalonCategory[];
  cityBeautySalons: CityBeautySalon[];
  amenityBeautySalons: AmenityBeautySalon[];
  paymentBeautySalons: PaymentBeautySalon[];
}) {
  const {
    beautySalons,
    cities,
    states,
    categories,
    salonDetails,
    amenities,
    payments,
    images,
    reviews,
    salonCategories,
    cityBeautySalons,
    amenityBeautySalons,
    paymentBeautySalons
  } = rawData;

  console.log(`Total salons from input: ${beautySalons.length}`);

  // Generate slugs for states if not available
  states.forEach(state => {
    if (!state.slug) {
      state.slug = createSlug(state.state);
    }
  });

  // Generate slugs for categories if not available
  categories.forEach(category => {
    if (!category.slug) {
      category.slug = createSlug(category.category);
    }
  });

  // Generate slugs for cities if not available
  cities.forEach(city => {
    if (!city.slug) {
      city.slug = createSlug(city.city);
    }
  });

  // Create a map for quick lookups
  const stateMap = new Map<string, State>();
  states.forEach(state => {
    stateMap.set(state.id, state);
    state.salons = []; // Initialize empty salons array for counting
  });

  const cityMap = new Map<string, City>();
  const citiesByState = new Map<string, City[]>();

  // Process cities and associate with states
  cities.forEach(city => {
    const state = stateMap.get(city.state_id);
    if (state) {
      city.state = state;
      
      // Initialize state's cities array if it doesn't exist
      if (!state.cities) {
        state.cities = [];
      }
      state.cities.push(city);

      // Keep track of cities by state for easier lookup
      if (!citiesByState.has(state.id)) {
        citiesByState.set(state.id, []);
      }
      citiesByState.get(state.id)?.push(city);
    }
    cityMap.set(city.id, city);
    city.salons = []; // Initialize empty salons array for counting
  });

  const categoryMap = new Map<string, Category>();
  categories.forEach(category => {
    categoryMap.set(category.id, category);
    category.salons = []; // Initialize empty salons array for counting
  });

  const amenityMap = new Map<string, Amenity>();
  amenities.forEach(amenity => amenityMap.set(amenity.id, amenity));

  const paymentMap = new Map<string, Payment>();
  payments.forEach(payment => paymentMap.set(payment.id, payment));

  // Group salon details by salon ID
  const salonDetailsMap = new Map<string, SalonDetail[]>();
  salonDetails.forEach(detail => {
    if (!salonDetailsMap.has(detail.beauty_salon_id)) {
      salonDetailsMap.set(detail.beauty_salon_id, []);
    }
    salonDetailsMap.get(detail.beauty_salon_id)?.push(detail);
  });

  // Group images by salon ID
  const imagesMap = new Map<string, Image[]>();
  images.forEach(image => {
    if (!imagesMap.has(image.beauty_salon_id)) {
      imagesMap.set(image.beauty_salon_id, []);
    }
    imagesMap.get(image.beauty_salon_id)?.push(image);
  });

  // Group reviews by salon ID
  const reviewsMap = new Map<string, Review[]>();
  reviews.forEach(review => {
    if (!reviewsMap.has(review.beauty_salon_id)) {
      reviewsMap.set(review.beauty_salon_id, []);
    }
    reviewsMap.get(review.beauty_salon_id)?.push(review);
  });

  // Create category relationships
  const salonCategoriesMap = new Map<string, string[]>();
  salonCategories.forEach(relation => {
    if (!salonCategoriesMap.has(relation.beauty_salon_id)) {
      salonCategoriesMap.set(relation.beauty_salon_id, []);
    }
    salonCategoriesMap.get(relation.beauty_salon_id)?.push(relation.category_id);
  });

  // Create city relationships
  const salonCitiesMap = new Map<string, string>();
  cityBeautySalons.forEach(relation => {
    salonCitiesMap.set(relation.beauty_salon_id, relation.city_id);
  });

  console.log(`Number of city-salon relationships: ${cityBeautySalons.length}`);

  // Create amenity relationships
  const salonAmenitiesMap = new Map<string, string[]>();
  amenityBeautySalons.forEach(relation => {
    if (!salonAmenitiesMap.has(relation.beauty_salon_id)) {
      salonAmenitiesMap.set(relation.beauty_salon_id, []);
    }
    salonAmenitiesMap.get(relation.beauty_salon_id)?.push(relation.amenity_id);
  });

  // Create payment relationships
  const salonPaymentsMap = new Map<string, string[]>();
  paymentBeautySalons.forEach(relation => {
    if (!salonPaymentsMap.has(relation.beauty_salon_id)) {
      salonPaymentsMap.set(relation.beauty_salon_id, []);
    }
    salonPaymentsMap.get(relation.beauty_salon_id)?.push(relation.payment_id);
  });

  // Create a temporary map to store salons associated with cities and states
  const processedSalons = new Set<string>();

  // CRITICAL: Ensure every salon has a valid slug before doing anything else
  // This was the main issue causing salons to not be generated
  console.log('Ensuring all salons have valid slugs...');
  beautySalons.forEach(salon => {
    // If the salon doesn't have a slug, create one from the title
    if (!salon.slug) {
      salon.slug = createSlug(salon.title);
      console.log(`Created slug for salon ${salon.id}: ${salon.slug}`);
    } else {
      // If the salon already has a slug, make sure it's clean (no special characters, etc.)
      const cleanSlug = createSlug(salon.slug);
      if (cleanSlug !== salon.slug) {
        console.log(`Cleaned slug for salon ${salon.id}: ${salon.slug} -> ${cleanSlug}`);
        salon.slug = cleanSlug;
      }
    }

    // Handle _yf_slug if it exists but don't overwrite the main slug property
    if (salon._yf_slug && !salon._yf_slug.includes('?')) {
      // Store it but don't use it to replace the main slug
      salon._yf_slug = salon._yf_slug.trim();
    }
  });

  // Now, enrich each salon with related data
  beautySalons.forEach(salon => {
    // Associate salon with city and state
    const cityId = salonCitiesMap.get(salon.id);
    if (cityId) {
      const city = cityMap.get(cityId);
      if (city) {
        salon.city = city;
        salon.state = city.state;

        // Add salon to city's salons array
        if (!city.salons) {
          city.salons = [];
        }
        city.salons.push(salon);

        // Add salon to state's salons array
        if (city.state && !city.state.salons) {
          city.state.salons = [];
        }
        city.state?.salons?.push(salon);
        
        processedSalons.add(salon.id);
      }
    }

    // Add categories to salon
    const categoryIds = salonCategoriesMap.get(salon.id) || [];
    salon.categories = categoryIds.map(categoryId => {
      const category = categoryMap.get(categoryId);
      if (category) {
        // Add salon to category's salons array
        if (!category.salons) {
          category.salons = [];
        }
        category.salons.push(salon);
        return category;
      }
      return null;
    }).filter(Boolean) as Category[];

    // Add details to salon
    salon.details = salonDetailsMap.get(salon.id) || [];

    // Add amenities to salon
    const amenityIds = salonAmenitiesMap.get(salon.id) || [];
    salon.amenities = amenityIds.map(amenityId => amenityMap.get(amenityId)).filter(Boolean) as Amenity[];

    // Add payment methods to salon
    const paymentIds = salonPaymentsMap.get(salon.id) || [];
    salon.payments = paymentIds.map(paymentId => paymentMap.get(paymentId)).filter(Boolean) as Payment[];

    // Add images to salon
    salon.images = imagesMap.get(salon.id) || [];

    // Add reviews to salon
    salon.reviews_data = reviewsMap.get(salon.id) || [];
  });

  // Handle salons that weren't assigned to a city (orphaned salons)
  const orphanedSalons = beautySalons.filter(salon => !processedSalons.has(salon.id));
  console.log(`Orphaned salons (not associated with a city): ${orphanedSalons.length}`);

  // Create a default "Unknown" state and city for orphaned salons if needed
  if (orphanedSalons.length > 0) {
    let unknownState = states.find(s => s.state === 'Unknown');
    if (!unknownState) {
      unknownState = {
        id: 'unknown',
        state: 'Unknown',
        slug: 'unknown',
        salons: []
      };
      states.push(unknownState);
      stateMap.set(unknownState.id, unknownState);
    }

    let unknownCity = cities.find(c => c.city === 'Unknown');
    if (!unknownCity) {
      unknownCity = {
        id: 'unknown',
        city: 'Unknown',
        slug: 'unknown',
        state_id: unknownState.id,
        state: unknownState,
        salons: []
      };
      cities.push(unknownCity);
      cityMap.set(unknownCity.id, unknownCity);
      
      if (!unknownState.cities) {
        unknownState.cities = [];
      }
      unknownState.cities.push(unknownCity);
    }

    // Assign orphaned salons to the unknown city/state
    orphanedSalons.forEach(salon => {
      if (unknownCity && unknownState) {
        salon.city = unknownCity;
        salon.state = unknownState;
        
        unknownCity.salons?.push(salon);
        unknownState.salons?.push(salon);
      }
    });
  }

  // Ensure accurate salon counts for each state and city
  states.forEach(state => {
    if (state.salons) {
      state.salonCount = state.salons.length;
    } else {
      state.salonCount = 0;
    }
  });

  cities.forEach(city => {
    if (city.salons) {
      city.salonCount = city.salons.length;
    } else {
      city.salonCount = 0;
    }
  });

  categories.forEach(category => {
    if (category.salons) {
      category.salonCount = category.salons.length;
    } else {
      category.salonCount = 0;
    }
  });

  // Count total processed salons
  const totalProcessed = states.reduce((sum, state) => sum + (state.salonCount || 0), 0);
  console.log(`Total salons processed and assigned to states: ${totalProcessed}`);
  console.log(`Total salons that should have pages generated: ${beautySalons.length}`);

  return {
    beautySalons,
    cities,
    states,
    categories,
    cityMap,
    stateMap,
    categoryMap
  };
}