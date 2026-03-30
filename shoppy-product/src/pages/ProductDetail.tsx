import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { Star, ShoppingCart, ArrowLeft, ShieldCheck, Truck, RefreshCcw, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { formatPrice } from '../lib/utils';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) throw new Error('Product not found');
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-gray-400" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4">
        <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
        <button
          onClick={() => navigate('/products')}
          className="px-6 py-2 bg-black text-white rounded-full font-medium"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors mb-12 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back
      </button>

      <div className="grid md:grid-cols-2 gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-3xl border border-gray-100 p-12 aspect-square flex items-center justify-center sticky top-28"
        >
          <img
            src={product.image}
            alt={product.title}
            className="max-w-full max-h-full object-contain"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <span className="px-3 py-1 bg-gray-100 text-[10px] font-bold uppercase tracking-widest rounded-full text-gray-600">
              {product.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              {product.title}
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-4 h-4",
                      i < Math.floor(product.rating.rate)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-200"
                    )}
                  />
                ))}
                <span className="ml-2 text-sm font-bold text-gray-900">
                  {product.rating.rate}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                {product.rating.count} reviews
              </span>
            </div>
          </div>

          <div className="text-3xl font-bold text-gray-900">
            {formatPrice(product.price)}
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-gray-900">Description</h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              {product.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={() => addToCart(product)}
              className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-black text-white rounded-2xl font-bold hover:bg-gray-800 transition-all"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
            <button className="flex-1 px-8 py-4 border border-gray-200 rounded-2xl font-bold hover:bg-gray-50 transition-all">
              Add to Wishlist
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 border-t border-gray-100">
            {[
              { icon: Truck, text: "Free Delivery" },
              { icon: RefreshCcw, text: "30-Day Returns" },
              { icon: ShieldCheck, text: "2-Year Warranty" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-gray-600">
                <item.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
