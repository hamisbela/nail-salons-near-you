import fs from 'fs-extra';
import path from 'path';

/**
 * Creates a directory if it doesn't exist
 */
export function ensureDirectoryExists(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Writes content to a file, creating any necessary directories
 */
export function writeToFile(filePath: string, content: string): void {
  const dirPath = path.dirname(filePath);
  ensureDirectoryExists(dirPath);
  fs.writeFileSync(filePath, content);
}

/**
 * Creates a CSS file with styles for the website
 */
export function generateCssFile(): void {
  const cssDir = path.join('public', 'assets', 'css');
  ensureDirectoryExists(cssDir);
  
  const cssContent = `
/* Custom styles for Nail Salon Directory */

:root {
  --primary-color: #be185d;
  --primary-light: #fbcfe8;
  --primary-dark: #9d174d;
  --secondary-color: #ec4899;
  --text-color: #1f2937;
  --light-text: #6b7280;
  --background: #f9fafb;
  --white: #ffffff;
  --gray-light: #f3f4f6;
  --success: #10b981;
  --warning: #f59e0b;
}

/* Global Styles */
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  line-height: 1.5;
  color: var(--text-color);
}

a {
  transition: color 0.2s ease;
}

/* Store Cards */
.salon-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.salon-card:hover {
  transform: translateY(-5px);
}

/* Button Hover Effects */
.btn-primary:hover {
  box-shadow: 0 4px 12px rgba(190, 24, 93, 0.15);
}

/* Header Shadow on Scroll */
.header-scrolled {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* Image Gallery Styles */
.gallery-image {
  transition: opacity 0.2s ease;
}

.gallery-image:hover {
  opacity: 0.9;
}

/* Custom Features Icons */
.feature-icon {
  width: 48px;
  height: 48px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

/* Map Container */
.map-container {
  height: 300px;
  border-radius: 0.5rem;
  overflow: hidden;
}

/* Hero Section Gradient */
.hero-gradient {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
}

/* Custom Pagination */
.pagination-item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 0 4px;
}

.pagination-item.active {
  background-color: var(--primary-color);
  color: white;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--gray-light);
}

::-webkit-scrollbar-thumb {
  background: var(--primary-light);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--primary-color);
}

/* Form Focus States */
input:focus, 
select:focus, 
textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(190, 24, 93, 0.1);
}

/* Rating Stars */
.stars-container {
  color: #f59e0b;
}

/* Business Hours Table */
.hours-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

.hours-table tr {
  border-bottom: 1px solid #eee;
}

.hours-table tr:last-child {
  border-bottom: none;
}

.hours-table td {
  padding: 8px 0;
}

.hours-table td:first-child {
  font-weight: 500;
  width: 40%;
}

/* Card Elements */
.card-fancy {
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card-fancy:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05);
}

/* Store Page Specific Styles */
.salon-hero {
  position: relative;
}

.salon-hero-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%);
  padding: 3rem 1rem 1rem;
}

.amenity-tag {
  display: inline-flex;
  align-items: center;
  background: var(--gray-light);
  border-radius: 9999px;
  padding: 0.35rem 0.75rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

.amenity-tag i {
  margin-right: 0.35rem;
  color: var(--primary-color);
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  h1 {
    font-size: 1.875rem !important;
  }
  
  h2 {
    font-size: 1.5rem !important;
  }
}
`;

  fs.writeFileSync(path.join(cssDir, 'styles.css'), cssContent);
}

/**
 * Cleans up the target directory (removing old files)
 */
export function cleanPublicDirectory(): void {
  if (fs.existsSync('public')) {
    // Preserve the .gitkeep file
    const files = fs.readdirSync('public');
    
    for (const file of files) {
      if (file !== '.gitkeep') {
        const filePath = path.join('public', file);
        fs.removeSync(filePath);
      }
    }
  } else {
    fs.mkdirSync('public');
  }
}