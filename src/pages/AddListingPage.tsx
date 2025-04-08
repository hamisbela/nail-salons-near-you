import React from 'react';
import { Helmet } from 'react-helmet';
import { Search, Users, TrendingUp, Upload, Check } from 'lucide-react';

const AddListingPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Add Your Nail Salon or Spa | List Your Services in Our Directory</title>
        <meta name="description" content="Add your nail salon or nail spa to our directory. Reach new customers looking for nail services and manicures in your area." />
      </Helmet>

      <main className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-pink-900">Add Your Business Listing</h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Join our directory of professional nail salons and nail spas and connect with potential customers searching for "nail salons near me"
          </p>
        </header>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <form>
              <h2 className="text-2xl font-bold text-pink-800 mb-6">Business Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label htmlFor="business_name" className="block text-gray-700 font-medium mb-2">Business Name*</label>
                  <input 
                    type="text" 
                    id="business_name"
                    placeholder="Your Business Name"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="business_category" className="block text-gray-700 font-medium mb-2">Primary Category*</label>
                  <select 
                    id="business_category"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="">Select a Category</option>
                    <option value="nail_salon">Nail Salon</option>
                    <option value="nail_spa">Nail Spa</option>
                    <option value="beauty_salon">Beauty Salon with Nail Services</option>
                    <option value="full_service_spa">Full Service Spa</option>
                    <option value="nail_bar">Nail Bar</option>
                    <option value="mobile_nail_services">Mobile Nail Services</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone Number*</label>
                  <input 
                    type="tel" 
                    id="phone"
                    placeholder="(123) 456-7890"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address*</label>
                  <input 
                    type="email" 
                    id="email"
                    placeholder="your@email.com"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="website" className="block text-gray-700 font-medium mb-2">Website</label>
                  <input 
                    type="url" 
                    id="website"
                    placeholder="https://yourbusiness.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="hours" className="block text-gray-700 font-medium mb-2">Business Hours</label>
                  <input 
                    type="text" 
                    id="hours"
                    placeholder="Mon-Fri: 9am-7pm, Sat: 10am-6pm"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-pink-800 mb-6">Address Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="md:col-span-2">
                  <label htmlFor="address" className="block text-gray-700 font-medium mb-2">Street Address*</label>
                  <input 
                    type="text" 
                    id="address"
                    placeholder="123 Main Street"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="city" className="block text-gray-700 font-medium mb-2">City*</label>
                  <input 
                    type="text" 
                    id="city"
                    placeholder="City"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="state" className="block text-gray-700 font-medium mb-2">State*</label>
                  <select 
                    id="state"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="">Select a State</option>
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="zip" className="block text-gray-700 font-medium mb-2">ZIP Code*</label>
                  <input 
                    type="text" 
                    id="zip"
                    placeholder="12345"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-pink-800 mb-6">Business Details</h2>
              
              <div className="mb-8">
                <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Business Description*</label>
                <textarea 
                  id="description"
                  rows={5}
                  placeholder="Describe your business, services, and unique offerings..."
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                ></textarea>
              </div>
              
              <div className="mb-8">
                <label htmlFor="services" className="block text-gray-700 font-medium mb-2">Services Offered*</label>
                <textarea 
                  id="services"
                  rows={3}
                  placeholder="List your nail services, treatments, and specialties..."
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                ></textarea>
              </div>
              
              <div className="mb-8">
                <h3 className="font-bold text-gray-800 mb-3">Service Categories (Select all that apply)</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2 h-4 w-4 text-pink-600" />
                    Manicures
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2 h-4 w-4 text-pink-600" />
                    Pedicures
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2 h-4 w-4 text-pink-600" />
                    Gel Nails
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2 h-4 w-4 text-pink-600" />
                    Acrylic Nails
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2 h-4 w-4 text-pink-600" />
                    Nail Art
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2 h-4 w-4 text-pink-600" />
                    Dip Powder
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2 h-4 w-4 text-pink-600" />
                    Nail Extensions
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2 h-4 w-4 text-pink-600" />
                    Paraffin Treatments
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2 h-4 w-4 text-pink-600" />
                    Nail Repair
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2 h-4 w-4 text-pink-600" />
                    Polish Changes
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2 h-4 w-4 text-pink-600" />
                    Hand/Foot Massage
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2 h-4 w-4 text-pink-600" />
                    Bridal/Special Event
                  </label>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="font-bold text-gray-800 mb-3">Payment Methods (Select all that apply)</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2 h-4 w-4 text-pink-600" />
                    Cash
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2 h-4 w-4 text-pink-600" />
                    Credit Card
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2 h-4 w-4 text-pink-600" />
                    Debit Card
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2 h-4 w-4 text-pink-600" />
                    Check
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2 h-4 w-4 text-pink-600" />
                    PayPal
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2 h-4 w-4 text-pink-600" />
                    Venmo
                  </label>
                </div>
              </div>
              
              <div className="mb-8">
                <label className="block text-gray-700 font-medium mb-2">Upload Business Images (Max 5)</label>
                <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center">
                  <input 
                    type="file" 
                    id="images" 
                    accept="image/*"
                    multiple
                    className="hidden"
                  />
                  <label htmlFor="images" className="block cursor-pointer">
                    <Upload className="mx-auto text-pink-500 mb-3" size={48} />
                    <p className="text-gray-700">Drag and drop files here or click to browse</p>
                    <p className="text-gray-500 text-sm mt-1">JPG, PNG, or GIF (Max 5MB each)</p>
                  </label>
                </div>
              </div>
              
              <div className="mb-8">
                <label className="flex items-start">
                  <input type="checkbox" className="mt-1 mr-3 h-4 w-4 text-pink-600" required />
                  <span>
                    I confirm that I am authorized to submit this information and that it is accurate. I agree to the 
                    <a href="#" className="text-pink-600 hover:text-pink-800 mx-1">Terms of Service</a> and 
                    <a href="#" className="text-pink-600 hover:text-pink-800 mx-1">Privacy Policy</a>.
                  </span>
                </label>
              </div>
              
              <div className="text-center">
                <button 
                  type="submit"
                  className="bg-pink-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-pink-700 transition-colors"
                >
                  Submit Listing
                </button>
              </div>
            </form>
          </div>
          
          <div className="mt-12 bg-pink-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-pink-800 mb-4">Why List With Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-pink-100 p-4 rounded-full text-pink-600 mb-4">
                  <Search size={32} />
                </div>
                <h3 className="font-bold text-lg mb-2">Increased Visibility</h3>
                <p className="text-gray-700">Gain exposure to potential customers actively searching for nail salons near them.</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="bg-pink-100 p-4 rounded-full text-pink-600 mb-4">
                  <Users size={32} />
                </div>
                <h3 className="font-bold text-lg mb-2">Targeted Audience</h3>
                <p className="text-gray-700">Connect with customers specifically looking for nail services in their area.</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="bg-pink-100 p-4 rounded-full text-pink-600 mb-4">
                  <TrendingUp size={32} />
                </div>
                <h3 className="font-bold text-lg mb-2">Business Growth</h3>
                <p className="text-gray-700">Expand your client base and increase bookings from your local area.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default AddListingPage;