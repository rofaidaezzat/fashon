import { motion, AnimatePresence } from "framer-motion";
import heroImg1 from "@/assets/photo_2026-01-21_17-22-24.jpg";
import heroImg2 from "@/assets/photo_2026-01-21_17-33-58.jpg";
import heroImg3 from "@/assets/photo_2026-01-21_17-34-20.jpg";
import ImageWithFallback from "./ImageWithFallback";
import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

const heroImages = [heroImg1, heroImg2, heroImg3];

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { t, direction } = useLanguage();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full py-10 px-4 md:px-8 bg-gray-50 flex items-center justify-center min-h-[85vh]">
      <div className="relative w-full max-w-7xl mx-auto bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[60vh]">
        {/* Discount Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className={`absolute top-6 ${direction === 'rtl' ? 'left-6 md:left-12' : 'right-6 md:right-12'} z-30 md:top-8`}
        >
          <div className="discount-badge rounded-full">
            {t.hero.discount}
          </div>
        </motion.div>

        {/* Left Content */}
        <div className="relative flex flex-1 flex-col justify-center p-8 md:p-12 lg:p-20 overflow-hidden">
          

          <div className="relative z-10 max-w-xl">
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-4 font-body text-sm font-medium uppercase tracking-[0.2em] text-warm-gray"
            >
              {t.hero.eyebrow}
            </motion.p>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mb-6 font-display text-5xl font-bold leading-[1.1] tracking-tight text-foreground md:text-6xl lg:text-7xl"
            >
              {t.hero.title_1}
              <br />
              <span className="italic">{t.hero.title_2}</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mb-10 max-w-md font-body text-lg leading-relaxed text-muted-foreground"
            >
              {t.hero.description}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <button className="btn-gold rounded-sm">
                {t.hero.shop_now}
              </button>
              <button className="btn-outline rounded-sm">
                {t.hero.explore}
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mt-16 flex gap-12 border-t border-border pt-8"
            >
              <div>
                <p className="font-display text-3xl font-semibold text-foreground">50K+</p>
                <p className="mt-1 font-body text-sm text-muted-foreground">{t.hero.stats.customers}</p>
              </div>
              <div>
                <p className="font-display text-3xl font-semibold text-foreground">200+</p>
                <p className="mt-1 font-body text-sm text-muted-foreground">{t.hero.stats.arrivals}</p>
              </div>
              <div>
                <p className="font-display text-3xl font-semibold text-foreground">4.9★</p>
                <p className="mt-1 font-body text-sm text-muted-foreground">{t.hero.stats.rating}</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="relative flex-1 lg:flex-[1.1] overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-full w-full"
            >
              <ImageWithFallback
                src={heroImages[currentImageIndex]}
                alt={`Fashion model ${currentImageIndex + 1}`}
                className="h-full w-full object-cover object-top"
                style={{ minHeight: "100%" }}
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
