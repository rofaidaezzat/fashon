import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { Mail, CheckCircle, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { getProducts } from "../api/products";
import ProductSkeleton from "../Components/ProductSkeleton";
import ProductCard from "../Components/ProductCard";
import saleModel from "../assets/photo_2026-01-14_14-46-49.jpg";
import HeroSection from "../Components/HeroSection";
import ImageWithFallback from "../Components/ImageWithFallback";
import { useLanguage } from "../context/LanguageContext";
export default function Home() {
  const popularSectionRef = useRef(null);
  const isInView = useInView(popularSectionRef, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const { data, isLoading } = useQuery({
    queryKey: ["products", "popular"],
    queryFn: getProducts,
    enabled: isInView,
  });

  const products = data?.data?.slice(0, 3) || [];

  return (
    <main className="min-h-screen bg-white font-sans text-gray-900">
      {/* Hero Section */}
      <HeroSection />

      {/* Popular Products (Image 2) */}
      <section className="py-24 bg-gray-50" ref={popularSectionRef}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-normal text-gray-800 mb-4">
              {t.home.popular_title}
            </h2>
            <div className="w-24 h-1 bg-rose-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {isLoading ? (
               Array.from({ length: 3 }).map((_, index) => (
                 <ProductSkeleton key={index} />
               ))
            ) : (
              products.map((product) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            )))}
          </div>

          <div className="mt-16 text-center">
            <Link to="/shop">
              <button className="px-10 py-3 border-2 border-gray-900 text-gray-900 font-bold uppercase tracking-widest hover:bg-gray-900 hover:text-white transition-all duration-300">
                {t.home.view_all}
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Promo / Deal Section (New) */}
      <section className="py-20 bg-gray-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&fit=crop"
            alt="Sale Background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2">
              <span className="text-rose-400 font-bold tracking-wider uppercase mb-2 block">
                {t.home.promo.offer}
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {t.home.promo.title_1} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-500">
                  {t.home.promo.title_2}
                </span>
              </h2>
              <p className="text-gray-300 text-lg mb-8 max-w-md leading-relaxed">
                {t.home.promo.description}
              </p>

              <div className="flex gap-4 mb-8">
                <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm min-w-[80px]">
                  <span className="block text-2xl font-bold">02</span>
                  <span className="text-xs text-gray-400 uppercase">{t.home.promo.days}</span>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm min-w-[80px]">
                  <span className="block text-2xl font-bold">14</span>
                  <span className="text-xs text-gray-400 uppercase">{t.home.promo.hours}</span>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm min-w-[80px]">
                  <span className="block text-2xl font-bold">45</span>
                  <span className="text-xs text-gray-400 uppercase">{t.home.promo.mins}</span>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="relative z-10">
                <ImageWithFallback
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
              <h3 className="text-xl font-bold mb-3">{t.home.features.quality_title}</h3>
              <p className="text-gray-500 leading-relaxed">
                {t.home.features.quality_desc}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mb-6 text-rose-600">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t.home.features.trends_title}</h3>
              <p className="text-gray-500 leading-relaxed">
                {t.home.features.trends_desc}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mb-6 text-rose-600">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t.home.features.support_title}</h3>
              <p className="text-gray-500 leading-relaxed">
                {t.home.features.support_desc}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
