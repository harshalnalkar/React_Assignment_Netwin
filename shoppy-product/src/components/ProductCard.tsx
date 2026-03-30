import { Link } from 'react-router-dom';
import { Star, ShoppingCart, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { motion } from 'motion/react';
import { formatPrice } from '../lib/utils';

interface ProductCardProps {
  product: Product;
  key?: number;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300"
    >
      <Link to={`/products/${product.id}`} className="block relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4">
          <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider rounded-md border border-gray-100">
            {product.category}
          </span>
        </div>
      </Link>

      <div className="p-5">
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-medium text-gray-500">
            {product.rating.rate} ({product.rating.count})
          </span>
        </div>
        
        <Link to={`/products/${product.id}`}>
          <h3 className="font-semibold text-gray-900 line-clamp-1 group-hover:text-black transition-colors mb-1">
            {product.title}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-500 line-clamp-2 mb-4 h-10">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          <button
            onClick={() => addToCart(product)}
            className="p-2 bg-gray-900 text-white rounded-xl hover:bg-black transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
