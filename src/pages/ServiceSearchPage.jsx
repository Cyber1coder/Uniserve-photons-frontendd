import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, MapPin, Navigation, Utensils, ShoppingBag, Wrench, HeartPulse, Activity, Ticket, ShoppingCart, Shirt, Plane, Clapperboard, Package } from 'lucide-react';

const categoryVendors = {
  cab: [
    { id: 'uber', name: 'Uber', logo: '/logos/uber.png', tagline: 'Fastest pick-up' },
    { id: 'ola', name: 'Ola', logo: '/logos/ola.png', tagline: 'Ride in comfort' },
    { id: 'rapido', name: 'Rapido', logo: '/logos/rapido.png', tagline: 'Best for traffic' },
  ],
  food: [
    { id: 'zomato', name: 'Zomato', logo: '/logos/zomato.png', tagline: 'Cravings satisfied' },
    { id: 'swiggy', name: 'Swiggy', logo: '/logos/swiggy.png', tagline: 'Lightning delivery' },
  ],
  grocery: [
    { id: 'blinkit', name: 'Blinkit', logo: '/logos/blinkit.png', tagline: '10 min delivery' },
    { id: 'bigbasket', name: 'BigBasket', logo: '/logos/bigbasket.png', tagline: 'Fresh & organic' },
  ],
  services: [
    { id: 'urbancompany', name: 'Urban Company', logo: '/logos/urban.png', tagline: 'Pro home services' },
    { id: 'housejoy', name: 'Housejoy', logo: '/logos/housejoy.png', tagline: 'Quality repairs' },
  ],
  healthcare: [
    { id: 'practo', name: 'Practo', logo: '/logos/practo.png', tagline: 'Expert doctors' },
    { id: 'tata1mg', name: 'Tata 1mg', logo: '/logos/tata1mg.png', tagline: 'Medicines & more' },
  ],
  movies: [
    { id: 'bookmyshow', name: 'BookMyShow', logo: '/logos/bookmyshow.png', tagline: 'Movies & Events' },
    { id: 'pvr', name: 'PVR INOX', logo: '/logos/pvr.png', tagline: 'Premium Cinema' },
    { id: 'district', name: 'District', logo: '/logos/district.png', tagline: 'Social & Movies' },
  ],
  shopping: [
    { id: 'amazon', name: 'Amazon', logo: '/logos/amazon.png', tagline: 'Global Store' },
    { id: 'flipkart', name: 'Flipkart', logo: '/logos/flipkart.png', tagline: 'Big Savings' },
  ],
  fashion: [
    { id: 'souledstore', name: 'Souled Store', logo: '/logos/souledstore.png', tagline: 'Official Merch' },
    { id: 'myntra', name: 'Myntra', logo: '/logos/myntra.png', tagline: 'Latest Trends' },
    { id: 'ajio', name: 'Ajio', logo: '/logos/ajio.png', tagline: 'Premium Fashion' },
  ],
  travel: [
    { id: 'mmt', name: 'MakeMyTrip', logo: '/logos/mmt.png', tagline: 'Hotels & Flights' },
    { id: 'railone', name: 'RailOne', logo: '/logos/railone.png', tagline: 'IRCTC Partner' },
    { id: 'redbus', name: 'Red Bus', logo: '/logos/redbus.png', tagline: 'Bus Bookings' },
    { id: 'goibibo', name: 'Goibibo', logo: '/logos/goibibo.png', tagline: 'Go for it' },
  ]
};

const categoryConfigs = {
  cab: {
    inputs: [
      { id: 'source', label: 'Source Location', icon: MapPin, placeholder: 'Enter pick-up point' },
      { id: 'destination', label: 'Destination Location', icon: Navigation, placeholder: 'Enter drop-off point' }
    ],
    buttonText: 'Search & Compare Cabs'
  },
  food: {
    inputs: [
      { id: 'query', label: 'What are you craving?', icon: Utensils, placeholder: 'Search for dish or restaurant (e.g. Biryani, Pizza)...' },
      { id: 'location', label: 'Delivery Location', icon: MapPin, placeholder: 'Your current address' }
    ],
    buttonText: 'Find Best Deals'
  },
  grocery: {
    inputs: [
      { id: 'query', label: 'What do you need today?', icon: ShoppingBag, placeholder: 'Items: Milk, Eggs, Bread...' },
      { id: 'location', label: 'Delivery Location', icon: MapPin, placeholder: 'Your current address' }
    ],
    buttonText: 'Compare Grocery Prices'
  },
  services: {
    inputs: [
      { id: 'query', label: 'What needs fixing or cleaning?', icon: Wrench, placeholder: 'e.g. AC Repair, Deep Cleaning...' },
      { id: 'location', label: 'Service Address', icon: MapPin, placeholder: 'Where do you need the service?' }
    ],
    buttonText: 'Find Professionals'
  },
  healthcare: {
    inputs: [
      { id: 'query', label: 'How are you feeling today?', icon: Activity, placeholder: 'Describe symptoms or search for doctors...' },
      { id: 'location', label: 'Location', icon: MapPin, placeholder: 'Search for clinics/hospitals near you' }
    ],
    buttonText: 'Book Consultation'
  },
  movies: {
    inputs: [
      { id: 'query', label: 'Search Movies or Events', icon: Clapperboard, placeholder: 'Movie name, theater, or showtime...' },
      { id: 'location', label: 'City / Cinema Location', icon: MapPin, placeholder: 'Select your city' }
    ],
    buttonText: 'Check Showtimes'
  },
  shopping: {
    inputs: [
      { id: 'query', label: 'Search Products', icon: Package, placeholder: 'Search for gadgets, home decor, electronics...' },
      { id: 'location', label: 'Delivery Pincode', icon: MapPin, placeholder: 'Enter delivery location' }
    ],
    buttonText: 'Compare Prices'
  },
  fashion: {
    inputs: [
      { id: 'query', label: 'What are you looking for?', icon: Shirt, placeholder: 'Search for apparel, footwear, accessories...' },
      { id: 'location', label: 'Delivery Location', icon: MapPin, placeholder: 'Enter delivery location' }
    ],
    buttonText: 'Explore Collection'
  },
  travel: {
    inputs: [
      { id: 'source', label: 'Leaving From', icon: MapPin, placeholder: 'Enter departure city' },
      { id: 'destination', label: 'Going To', icon: Plane, placeholder: 'Enter destination city' }
    ],
    buttonText: 'Search Tickets'
  }
};

const ServiceSearchPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const vendors = categoryVendors[category] || [];
  const config = categoryConfigs[category] || categoryConfigs.cab;
  
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setSelectedVendors(vendors.map(v => v.id));
    // Reset form data when category changes
    setFormData({});
  }, [category]);

  const handleInputChange = (id, value) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const toggleVendor = (id) => {
    setSelectedVendors(prev =>
      prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]
    );
  };

  const handleSearch = () => {
    console.log('Searching for:', { category, selectedVendors, formData });
    // Teammate will inject results in comparison-results-container
  };

  return (
    <div className="min-h-screen p-6 max-w-2xl mx-auto">
      <header className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate('/dashboard')}
          className="glass p-3 rounded-2xl hover:bg-white/40 transition-colors"
        >
          <ArrowLeft size={20} className="text-slate-600" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-slate-800 capitalize">{category}</h1>
          <p className="text-sm text-slate-500">Compare & Book</p>
        </div>
      </header>

      <section className="space-y-6">
        {/* Vendor Selection */}
        <div className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Select Platforms</label>
            <span className="text-xs text-slate-400 font-medium">{selectedVendors.length} platforms selected</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {vendors.map(vendor => (
              <button
                key={vendor.id}
                onClick={() => toggleVendor(vendor.id)}
                className={`flex items-center gap-4 p-4 rounded-3xl border transition-all duration-500 relative overflow-hidden group ${selectedVendors.includes(vendor.id)
                    ? 'bg-blue-600/5 border-blue-500/50 shadow-lg shadow-blue-500/5'
                    : 'bg-white/40 border-white/20 glass hover:bg-white/60'
                  }`}
              >
                {/* Selection indicator dot */}
                <div className={`absolute top-4 right-4 w-2 h-2 rounded-full transition-all duration-300 ${
                  selectedVendors.includes(vendor.id) ? 'bg-blue-500 scale-125' : 'bg-slate-200'
                }`} />

                <div className={`p-3 rounded-2xl transition-all duration-300 ${
                  selectedVendors.includes(vendor.id) ? 'bg-blue-500/10 scale-110' : 'bg-white/50'
                }`}>
                  <img
                    src={vendor.logo}
                    alt={vendor.name}
                    className="w-8 h-8 object-contain"
                  />
                </div>
                
                <div className="text-left">
                  <h3 className={`font-bold transition-colors ${
                    selectedVendors.includes(vendor.id) ? 'text-blue-600' : 'text-slate-700'
                  }`}>{vendor.name}</h3>
                  <p className="text-xs text-slate-500 line-clamp-1">{vendor.tagline}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Inputs */}
        <div className="glass p-6 rounded-[2rem] space-y-5">
          {config.inputs.map((input) => (
            <div key={input.id} className="relative group">
              <input.icon className="absolute left-4 top-[64%] -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
              <div className="absolute left-10 -top-2.5 px-3 py-0.5 bg-white shadow-sm rounded-full text-[10px] font-extrabold text-blue-600 uppercase tracking-widest border border-slate-100 z-10 shadow-blue-500/5">
                {input.label}
              </div>
              <input
                type="text"
                placeholder={input.placeholder}
                value={formData[input.id] || ''}
                onChange={(e) => handleInputChange(input.id, e.target.value)}
                className="w-full input-field pl-12 bg-white/50 pt-7 pb-3 placeholder:text-slate-300 placeholder:font-normal focus:bg-white transition-all duration-300"
              />
            </div>
          ))}

          <button
            onClick={handleSearch}
            className="w-full btn-primary flex items-center justify-center gap-2 mt-2"
          >
            <Search size={20} />
            {config.buttonText}
          </button>
        </div>

        <div className="text-center">
          <a href="#" className="text-sm text-blue-600 font-medium hover:underline">
            Browse directly in selected platform
          </a>
        </div>

        {/* Comparison Point */}
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-4 opacity-50">
            <div className="h-px bg-slate-200 flex-1"></div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Comparison Results</span>
            <div className="h-px bg-slate-200 flex-1"></div>
          </div>

          <div id="comparison-results-container" className="min-h-[200px] flex items-center justify-center border-2 border-dashed border-slate-200 rounded-[2rem]">
            <p className="text-slate-400 text-center px-8">
              Fill in the details above to see real-time comparisons from {selectedVendors.length} platforms.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceSearchPage;
