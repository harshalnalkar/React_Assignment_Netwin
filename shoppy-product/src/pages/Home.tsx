import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, ShoppingBag, Truck, ShieldCheck, RefreshCcw } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden bg-[#f5f5f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid md:grid-cols-2 items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/10">
              <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
              <span className="text-xs font-bold tracking-widest uppercase">New Collection 2026</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-light tracking-tighter leading-[0.9]">
              ELEVATE <br />
              <span className="font-bold">YOUR STYLE.</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-md leading-relaxed">
              Discover a curated selection of premium products designed for the modern lifestyle. Quality meets aesthetics in every piece.
            </p>
            <div className="flex items-center gap-4">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-all group"
              >
                Shop Collection
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-8 py-4 border border-black/10 rounded-full font-semibold hover:bg-black/5 transition-all"
              >
                View Lookbook
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative hidden md:block"
          >
            <div className="aspect-[4/5] rounded-[40px] overflow-hidden bg-gray-200">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1000"
                alt="Hero"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-2xl shadow-black/5 space-y-4 max-w-[240px]">
               <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-black flex items-center justify-center text-[10px] text-white font-bold">
                    +2k
                  </div>
               </div>
               <p className="text-sm font-medium text-gray-900">
                 Trusted by over 2,000+ happy customers worldwide.
               </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: Truck, title: "Free Shipping", desc: "On orders over $100" },
            { icon: ShieldCheck, title: "Secure Payment", desc: "100% secure checkout" },
            { icon: RefreshCcw, title: "Easy Returns", desc: "30-day return policy" },
            { icon: ShoppingBag, title: "Quality Goods", desc: "Handpicked selection" },
          ].map((feature, i) => (
            <div key={i} className="space-y-3 text-center md:text-left">
              <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center mx-auto md:mx-0">
                <feature.icon className="w-6 h-6 text-gray-900" />
              </div>
              <h3 className="font-bold text-gray-900">{feature.title}</h3>
              <p className="text-sm text-gray-500">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-black rounded-[40px] p-12 md:p-24 text-center space-y-8 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
            Ready to upgrade your <br /> lifestyle?
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            Join our newsletter and get 10% off your first order. Stay updated with the latest trends and exclusive offers.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-80 px-6 py-4 bg-white/10 border border-white/20 rounded-full text-white placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-colors"
            />
            <button className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors">
              Subscribe Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
