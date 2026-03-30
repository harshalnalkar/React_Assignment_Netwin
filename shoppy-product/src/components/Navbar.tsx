import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, Package } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { cn } from '../lib/utils';

export function Navbar() {
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-bottom border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <Package className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight">SHOPPY</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  cn(
                    "text-sm font-medium transition-colors hover:text-black",
                    isActive ? "text-black" : "text-gray-500"
                  )
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/cart"
              className="relative p-2 text-gray-500 hover:text-black transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-black text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {totalItems}
                </span>
              )}
            </Link>
            
            <button
              className="md:hidden p-2 text-gray-500"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="block text-base font-medium text-gray-600"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
