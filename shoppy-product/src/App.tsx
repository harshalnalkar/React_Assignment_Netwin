import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Loader2 } from 'lucide-react';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const ProductList = lazy(() => import('./pages/ProductList'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));

function LoadingFallback() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <Loader2 className="w-10 h-10 animate-spin text-gray-300" />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-black selection:text-white">
          <Navbar />
          <main>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
              </Routes>
            </Suspense>
          </main>
          
          <footer className="border-t border-gray-100 py-12 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold">L</span>
                  </div>
                  <span className="font-bold tracking-tight">LUXECART</span>
                </div>
                <div className="flex gap-8 text-sm text-gray-500">
                  <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
                  <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
                  <a href="#" className="hover:text-black transition-colors">Contact Us</a>
                </div>
                <p className="text-sm text-gray-400">
                  © 2026 LuxeCart. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </CartProvider>
  );
}
