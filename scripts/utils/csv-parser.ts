import fs from 'fs-extra';
import path from 'path';
import admZip from 'adm-zip';
import csv from 'csv-parser';
import { createReadStream } from 'fs';
import {
  BeautySalon, 
  City, 
  State, 
  Category, 
  SalonDetail,
  Amenity,
  Payment,
  Image,
  ImageSlug,
  Review,
  SalonCategory,
  CityBeautySalon,
  AmenityBeautySalon,
  PaymentBeautySalon
} from './models.js';

const DATA_ZIP_PATH = './data/data.zip';
const TMP_DIR = './tmp';

export async function extractZipFile(): Promise<void> {
  try {
    // Ensure tmp directory exists
    await fs.ensureDir(TMP_DIR);
    
    // Extract ZIP file
    const zip = new admZip(DATA_ZIP_PATH);
    zip.extractAllTo(TMP_DIR, true);
    
    console.log('CSV files extracted successfully');
  } catch (error) {
    console.error('Error extracting ZIP file:', error);
    throw error;
  }
}

async function parseCSV<T>(filePath: string): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const results: T[] = [];
    
    createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data as T))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}

export async function parseBeautySalons(): Promise<BeautySalon[]> {
  return parseCSV<BeautySalon>(path.join(TMP_DIR, 'beauty_salon.csv'));
}

export async function parseCities(): Promise<City[]> {
  return parseCSV<City>(path.join(TMP_DIR, 'city.csv'));
}

export async function parseStates(): Promise<State[]> {
  return parseCSV<State>(path.join(TMP_DIR, 'state.csv'));
}

export async function parseCategories(): Promise<Category[]> {
  return parseCSV<Category>(path.join(TMP_DIR, 'category.csv'));
}

export async function parseSalonDetails(): Promise<SalonDetail[]> {
  return parseCSV<SalonDetail>(path.join(TMP_DIR, 'beauty_salon_detail.csv'));
}

export async function parseAmenities(): Promise<Amenity[]> {
  return parseCSV<Amenity>(path.join(TMP_DIR, 'amenity.csv'));
}

export async function parsePayments(): Promise<Payment[]> {
  return parseCSV<Payment>(path.join(TMP_DIR, 'payment.csv'));
}

export async function parseImages(): Promise<Image[]> {
  return parseCSV<Image>(path.join(TMP_DIR, 'image.csv'));
}

export async function parseImageSlugs(): Promise<ImageSlug[]> {
  return parseCSV<ImageSlug>(path.join(TMP_DIR, 'image_slug.csv'));
}

export async function parseReviews(): Promise<Review[]> {
  return parseCSV<Review>(path.join(TMP_DIR, 'review.csv'));
}

export async function parseSalonCategories(): Promise<SalonCategory[]> {
  return parseCSV<SalonCategory>(path.join(TMP_DIR, 'beauty_salon_x_category.csv'));
}

export async function parseCityBeautySalons(): Promise<CityBeautySalon[]> {
  return parseCSV<CityBeautySalon>(path.join(TMP_DIR, 'city_x_beauty_salon.csv'));
}

export async function parseAmenityBeautySalons(): Promise<AmenityBeautySalon[]> {
  return parseCSV<AmenityBeautySalon>(path.join(TMP_DIR, 'amenity_x_beauty_salon.csv'));
}

export async function parsePaymentBeautySalons(): Promise<PaymentBeautySalon[]> {
  return parseCSV<PaymentBeautySalon>(path.join(TMP_DIR, 'payment_x_beauty_salon.csv'));
}

// Parse all CSV files and return the data
export async function parseAllCsvData() {
  try {
    await extractZipFile();
    
    const [
      beautySalons,
      cities,
      states,
      categories,
      salonDetails,
      amenities,
      payments,
      images,
      imageSlugs,
      reviews,
      salonCategories,
      cityBeautySalons,
      amenityBeautySalons,
      paymentBeautySalons
    ] = await Promise.all([
      parseBeautySalons(),
      parseCities(),
      parseStates(),
      parseCategories(),
      parseSalonDetails(),
      parseAmenities(),
      parsePayments(),
      parseImages(),
      parseImageSlugs(),
      parseReviews(),
      parseSalonCategories(),
      parseCityBeautySalons(),
      parseAmenityBeautySalons(),
      parsePaymentBeautySalons()
    ]);
    
    return {
      beautySalons,
      cities,
      states,
      categories,
      salonDetails,
      amenities,
      payments,
      images,
      imageSlugs,
      reviews,
      salonCategories,
      cityBeautySalons,
      amenityBeautySalons,
      paymentBeautySalons
    };
  } catch (error) {
    console.error('Error parsing CSV data:', error);
    throw error;
  }
}