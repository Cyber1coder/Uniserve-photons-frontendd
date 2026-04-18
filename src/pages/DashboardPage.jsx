import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  HeartPulse,
  Home,
  User
} from 'lucide-react';

const categories = [
  { id: 'cab', name: 'Transportation', image: '/images/categories/transportation.png' },
  { id: 'grocery', name: 'Groceries', image: '/images/categories/grocery.png' },
  { id: 'services', name: 'Home Services', image: '/images/categories/services.png' },
  { id: 'food', name: 'Food Delivery', image: '/images/categories/food.png' },
  { id: 'healthcare', name: 'Healthcare', image: '/images/categories/healthcare.png' },
  { id: 'movies', name: 'Movie Tickets', image: '/images/categories/movies.png' },
  { id: 'shopping', name: 'Online Shopping', image: '/images/categories/shopping.png' },
  { id: 'fashion', name: 'Fashion Store', image: '/images/categories/fashion.png' },
  { id: 'travel', name: 'Travel & Hotels', image: '/images/categories/travel.png' },
];

const DashboardPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-24">
      <header className="p-6 sticky top-0 z-10 glass backdrop-blur-md border-b-0 pb-10">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Hello, User</h1>
            <p className="text-sm text-slate-500">What do you need today?</p>
          </div>
          <div className="h-10 w-10 glass rounded-full flex items-center justify-center">
            <User size={20} className="text-slate-600" />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat) => (
            <div 
              key={cat.id}
              onClick={() => navigate(`/search/${cat.id}`)}
              className="glass p-6 rounded-[2rem] flex flex-col items-center justify-center gap-4 cursor-pointer 
                         transition-all duration-300 hover:scale-105 hover:bg-white/30 group"
            >
              <div className="w-24 h-24 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-contain drop-shadow-xl"
                />
              </div>
              <span className="font-semibold text-slate-700">{cat.name}</span>
            </div>
          ))}
        </div>
      </main>

      {/* Bottom Nav Bar (Mobile Fixed) */}
      <nav className="fixed bottom-0 left-0 right-0 glass backdrop-blur-xl border-t border-white/20 p-4 md:hidden">
        <div className="flex justify-around items-center">
          <Home className="text-blue-600" size={24} />
          <ShoppingBag className="text-slate-400" size={24} />
          <HeartPulse className="text-slate-400" size={24} />
          <User className="text-slate-400" size={24} />
        </div>
      </nav>
    </div>
  );
};

export default DashboardPage;
