import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, CheckCircle, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/products";

import ProductCard from "../Components/ProductCard";
import styleInspo1 from "../assets/photo_2026-01-14_14-28-22.jpg";
import styleInspo2 from "../assets/photo_2026-01-14_14-29-04.jpg";
import styleInspo3 from "../assets/photo_2026-01-14_14-29-42.jpg";
import saleModel from "../assets/photo_2026-01-14_14-46-49.jpg";
import HeroSection from "../Components/HeroSection";

export default function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const products = data?.data?.slice(0, 3) || [];

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <main className="min-h-screen bg-white font-sans text-gray-900">
      {/* Hero Section */}
      <HeroSection />

      {/* Style Inspo Section (Image 1) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              styleInspo1,
              styleInspo2,
              styleInspo3,
            ].map((img, i) => (
              <div
                key={i}
                className="aspect-[3/4] w-full overflow-hidden group relative bg-gray-50"
              >
                <img
                  src={img}
                  alt={`Style Inspo ${i + 1}`}
                  className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products (Image 2) */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-normal text-gray-800 mb-4">
              Our most popular products
            </h2>
            <div className="w-24 h-1 bg-rose-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link to="/shop">
              <button className="px-10 py-3 border-2 border-gray-900 text-gray-900 font-bold uppercase tracking-widest hover:bg-gray-900 hover:text-white transition-all duration-300">
                View All Products
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Promo / Deal Section (New) */}
      <section className="py-20 bg-gray-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&fit=crop"
            alt="Sale Background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2">
              <span className="text-rose-400 font-bold tracking-wider uppercase mb-2 block">
                Limited Time Offer
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Winter Collection <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-500">
                  Up to 50% Off
                </span>
              </h2>
              <p className="text-gray-300 text-lg mb-8 max-w-md leading-relaxed">
                Upgrade your wardrobe with our premium winter essentials.
                Exclusive deals available for a limited time only.
              </p>

              <div className="flex gap-4 mb-8">
                <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm min-w-[80px]">
                  <span className="block text-2xl font-bold">02</span>
                  <span className="text-xs text-gray-400 uppercase">Days</span>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm min-w-[80px]">
                  <span className="block text-2xl font-bold">14</span>
                  <span className="text-xs text-gray-400 uppercase">Hours</span>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm min-w-[80px]">
                  <span className="block text-2xl font-bold">45</span>
                  <span className="text-xs text-gray-400 uppercase">Mins</span>
                </div>
              </div>

              <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-bold hover:bg-rose-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-rose-500/50">
                Shop The Sale
              </button>
            </div>
            <div className="md:w-1/2 relative">
              <div className="relative z-10">
                <img
                  src={saleModel}
                  alt="Sale Model"
                  className="w-full max-w-md mx-auto rounded-2xl shadow-2xl border-4 border-white/10"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute top-10 -right-10 w-32 h-32 bg-rose-500/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features / Benefits */}
      <section className="py-24 bg-white border-y border-gray-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mb-6 text-rose-600">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Premium Quality</h3>
              <p className="text-gray-500 leading-relaxed">
                We source only the finest fabrics to ensure comfort and
                longevity.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mb-6 text-rose-600">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Latest Trends</h3>
              <p className="text-gray-500 leading-relaxed">
                Our collections are updated weekly with the hottest fashion
                trends.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mb-6 text-rose-600">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Fast Support</h3>
              <p className="text-gray-500 leading-relaxed">
                24/7 Customer support via WhatsApp to assist with your orders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-rose-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Join the Fashon Club
            </h2>
            <p className="text-gray-600 text-lg mb-10">
              Subscribe to get special offers, free giveaways, and
              once-in-a-lifetime deals.
            </p>
            <form
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-white border-0 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-rose-500 transition-all shadow-sm"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-gray-900 text-white font-bold hover:bg-gray-800 transition-colors shadow-lg"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
