import { useState, FormEvent, ChangeEvent } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, CreditCard, ChevronRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { formatPrice } from '../lib/utils';

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsSuccess(true);
      clearCart();
    }, 1500);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isSuccess) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto"
        >
          <CheckCircle2 className="w-12 h-12" />
        </motion.div>
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Order Confirmed!</h1>
          <p className="text-gray-500 text-lg">
            Thank you for your purchase. We've sent a confirmation email to <span className="font-bold text-black">{formData.email}</span>.
          </p>
        </div>
        <button
          onClick={() => navigate('/')}
          className="px-8 py-4 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-all"
        >
          Return to Home
        </button>
      </div>
    );
  }

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid lg:grid-cols-2 gap-16">
        <div className="space-y-10">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-gray-900">Checkout</h1>
            <p className="text-gray-500">Complete your order by providing your details.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <section className="space-y-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center">1</span>
                Contact Information
              </h2>
              <div className="grid gap-4">
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-black transition-all"
                />
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center">2</span>
                Shipping Address
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <input
                  required
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-black transition-all"
                />
                <input
                  required
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-black transition-all"
                />
              </div>
              <input
                required
                type="text"
                name="address"
                placeholder="Street Address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-black transition-all"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  required
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-black transition-all"
                />
                <input
                  required
                  type="text"
                  name="zipCode"
                  placeholder="Zip Code"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-black transition-all"
                />
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center">3</span>
                Payment Method
              </h2>
              <div className="p-6 border border-black rounded-2xl bg-gray-50 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold">
                    <CreditCard className="w-5 h-5" />
                    Credit Card
                  </div>
                  <Lock className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  required
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-black transition-all"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    required
                    type="text"
                    name="expiry"
                    placeholder="MM/YY"
                    value={formData.expiry}
                    onChange={handleChange}
                    className="px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-black transition-all"
                  />
                  <input
                    required
                    type="text"
                    name="cvv"
                    placeholder="CVV"
                    value={formData.cvv}
                    onChange={handleChange}
                    className="px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-black transition-all"
                  />
                </div>
              </div>
            </section>

            <button
              type="submit"
              className="w-full py-5 bg-black text-white rounded-2xl font-bold text-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
            >
              Pay {formatPrice(totalPrice)}
              <ChevronRight className="w-5 h-5" />
            </button>
          </form>
        </div>

        <div className="hidden lg:block">
          <div className="bg-gray-50 rounded-[40px] p-10 sticky top-28 space-y-8">
            <h3 className="text-2xl font-bold">Order Summary</h3>
            <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 h-20 bg-white rounded-2xl p-2 flex items-center justify-center flex-shrink-0 border border-gray-100">
                    <img src={item.image} alt={item.title} className="max-w-full max-h-full object-contain" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h4 className="font-bold text-sm line-clamp-2">{item.title}</h4>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Qty: {item.quantity}</span>
                      <span className="font-bold">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-8 border-t border-gray-200 space-y-4">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span className="font-bold text-gray-900">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Shipping</span>
                <span className="font-bold text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-xl font-bold pt-4 border-t border-gray-200">
                <span>Total</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100">
              <ShieldCheck className="w-6 h-6 text-green-600" />
              <div className="text-xs text-gray-500">
                <p className="font-bold text-gray-900">Secure Checkout</p>
                <p>Your data is encrypted and protected.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
