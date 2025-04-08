import React from 'react';
import { Helmet } from 'react-helmet';
import { Search, Users, TrendingUp, Star, Paintbrush, Info, MapPin, Phone } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>About Nail Salons Near You | Our Mission & Services</title>
        <meta name="description" content="Learn about NailSalonNearYou.com, the premier resource for finding professional nail salons, nail spas, and nail technicians in your local area." />
      </Helmet>

      <main className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-pink-900">About NailSalonNearYou.com</h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Your comprehensive resource for finding quality nail salons, nail spas, and nail technicians in your local area
          </p>
        </header>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-lg mb-12">
            <h2 className="text-2xl font-bold text-pink-800 mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-6">
              At NailSalonNearYou.com, our mission is to connect individuals seeking quality nail services with professional nail salons and nail technicians in their local area. We believe everyone deserves access to skilled nail artists who can help them look and feel their best.
            </p>
            <p className="text-gray-700">
              We've created the most comprehensive online directory of nail care providers, making it easy to find the right salon or nail spa near you. Our platform allows you to browse listings by location, read detailed business profiles, and make informed decisions about where to get your next manicure or pedicure.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-pink-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-pink-800 mb-4">For Customers</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Search className="text-pink-600 mt-1 mr-3" size={20} />
                  <span>Find quality nail salons and nail spas in your local area</span>
                </li>
                <li className="flex items-start">
                  <Info className="text-pink-600 mt-1 mr-3" size={20} />
                  <span>Access detailed salon profiles with services, pricing, and contact information</span>
                </li>
                <li className="flex items-start">
                  <MapPin className="text-pink-600 mt-1 mr-3" size={20} />
                  <span>Browse by location to find convenient options near you</span>
                </li>
                <li className="flex items-start">
                  <Phone className="text-pink-600 mt-1 mr-3" size={20} />
                  <span>Connect directly with nail care professionals</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-pink-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-pink-800 mb-4">For Businesses</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Search className="text-pink-600 mt-1 mr-3" size={20} />
                  <span>Increase your online visibility to potential customers</span>
                </li>
                <li className="flex items-start">
                  <Users className="text-pink-600 mt-1 mr-3" size={20} />
                  <span>Showcase your services, specialties, and business details</span>
                </li>
                <li className="flex items-start">
                  <TrendingUp className="text-pink-600 mt-1 mr-3" size={20} />
                  <span>Grow your client base with targeted exposure</span>
                </li>
                <li className="flex items-start">
                  <Star className="text-pink-600 mt-1 mr-3" size={20} />
                  <span>Stand out in a specialized, niche directory</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-lg mb-12">
            <h2 className="text-2xl font-bold text-pink-800 mb-4">Why Professional Nail Care Matters</h2>
            <p className="text-gray-700 mb-4">
              Quality nail care is more than just a beauty treatment—it's an investment in your personal appearance and confidence. Professional nail technicians have the training, skills, and expertise to create beautiful nails that enhance your style and boost your confidence.
            </p>
            <p className="text-gray-700 mb-4">
              Professional nail salons and spas offer personalized services that take into account your nail type, lifestyle, and aesthetic preferences. They provide expert advice on nail health, maintenance, and products that help you maintain beautiful nails between visits.
            </p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-bold text-lg mb-2">Professional Nail Salons & Spas</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Paintbrush className="text-pink-500 mt-1 mr-2" size={16} />
                    <span>Skilled, licensed professionals</span>
                  </li>
                  <li className="flex items-start">
                    <Paintbrush className="text-pink-500 mt-1 mr-2" size={16} />
                    <span>Personalized consultations</span>
                  </li>
                  <li className="flex items-start">
                    <Paintbrush className="text-pink-500 mt-1 mr-2" size={16} />
                    <span>Quality, professional products</span>
                  </li>
                  <li className="flex items-start">
                    <Paintbrush className="text-pink-500 mt-1 mr-2" size={16} />
                    <span>Trend-aware styling options</span>
                  </li>
                </ul>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-bold text-lg mb-2">DIY Nail Care</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Paintbrush className="text-gray-500 mt-1 mr-2" size={16} />
                    <span>Limited expertise and technique</span>
                  </li>
                  <li className="flex items-start">
                    <Paintbrush className="text-gray-500 mt-1 mr-2" size={16} />
                    <span>Difficulty with precision and detail</span>
                  </li>
                  <li className="flex items-start">
                    <Paintbrush className="text-gray-500 mt-1 mr-2" size={16} />
                    <span>Consumer-grade products</span>
                  </li>
                  <li className="flex items-start">
                    <Paintbrush className="text-gray-500 mt-1 mr-2" size={16} />
                    <span>Often less durable results</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-lg mb-12">
            <h2 className="text-2xl font-bold text-pink-800 mb-4">Our Story</h2>
            <p className="text-gray-700 mb-4">
              NailSalonNearYou.com was founded by a team of digital marketing specialists who recognized the need for a specialized platform connecting nail care professionals with customers seeking quality services in their local communities.
            </p>
            <p className="text-gray-700 mb-4">
              After speaking with both nail technicians and clients, we discovered a gap in the market for a dedicated, comprehensive resource focused specifically on nail salons and spas. Many quality establishments were difficult to find online, and customers struggled to identify which salons specialized in their preferred nail services or specific techniques.
            </p>
            <p className="text-gray-700">
              Today, NailSalonNearYou.com is the premier online resource for nail care providers across the United States. We continue to expand our listings and improve our platform to better serve both businesses and their clients.
            </p>
          </div>
          
          <div className="bg-pink-900 text-white p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Join Our Directory</h2>
            <p className="text-lg mb-6">
              Are you a nail salon or nail spa owner? Add your business to our directory and connect with potential customers in your area today.
            </p>
            <a href="/add-a-listing/" className="inline-block bg-white text-pink-900 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl">
              Add Your Listing
            </a>
          </div>
        </div>
      </main>
    </>
  );
};

export default AboutPage;