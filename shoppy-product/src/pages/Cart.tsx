import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { formatPrice } from '../lib/utils';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-8">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-gray-900">Your cart is empty</h2>
          <p className="text-gray-500 max-w-sm mx-auto">
            Looks like you haven't added anything to your cart yet. Explore our collection and find something you love.
          </p>
        </div>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-all"
        >
          Start Shopping
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-12">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-12 items-start">
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence mode="popLayout">
            {cart.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-white rounded-3xl border border-gray-100 group"
              >
                <Link to={`/products/${item.id}`} className="w-32 h-32 flex-shrink-0 bg-gray-50 rounded-2xl p-4 flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="max-w-full max-h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </Link>

                <div className="flex-1 space-y-1 text-center sm:text-left">
                  <Link to={`/products/${item.id}`}>
                    <h3 className="font-bold text-gray-900 hover:text-gray-600 transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-500 capitalize">{item.category}</p>
                  <div className="pt-2 text-lg font-bold text-gray-900">
                    {formatPrice(item.price)}
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-100">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all text-gray-500 hover:text-black"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center font-bold text-gray-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all text-gray-500 hover:text-black"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="space-y-6 sticky top-28">
          <div className="bg-gray-900 text-white rounded-[32px] p-8 space-y-8">
            <h2 className="text-2xl font-bold">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal ({totalItems} items)</span>
                <span className="text-white font-medium">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Shipping</span>
                <span className="text-green-400 font-medium">Free</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Tax</span>
                <span className="text-white font-medium">{formatPrice(0)}</span>
              </div>
              <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                <span className="text-lg font-medium">Total</span>
                <span className="text-3xl font-bold">{formatPrice(totalPrice)}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="flex items-center justify-center gap-3 w-full py-5 bg-white text-black rounded-2xl font-bold hover:bg-gray-100 transition-all"
            >
              <CreditCard className="w-5 h-5" />
              Checkout Now
            </Link>

            <div className="flex items-center justify-center gap-4 pt-4">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4 opacity-50 grayscale invert" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6 opacity-50 grayscale invert" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="Paypal" className="h-4 opacity-50 grayscale invert" />
            </div>
          </div>

          <Link
            to="/products"
            className="flex items-center justify-center gap-2 w-full py-4 border border-gray-200 rounded-2xl font-bold text-gray-600 hover:bg-gray-50 transition-all"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
