import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroModel from "@/assets/hero-fashion.png";

const HeroSection = () => {
  const scrollToProducts = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Discount Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute top-6 right-6 z-20 md:top-8 md:right-12"
      >
        <div className="discount-badge rounded-full">
          Up to 40% Off
        </div>
      </motion.div>

      <div className="mx-auto flex min-h-screen flex-col lg:flex-row">
        {/* Left Content */}
        <div className="flex flex-1 flex-col justify-center px-6 py-20 md:px-12 lg:px-20 lg:py-0">
          <div className="max-w-xl">
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-4 font-body text-sm font-medium uppercase tracking-[0.2em] text-warm-gray"
            >
              New Collection 2026
            </motion.p>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mb-6 font-display text-5xl font-bold leading-[1.1] tracking-tight text-foreground md:text-6xl lg:text-7xl"
            >
              Upgrade
              <br />
              <span className="italic">Your Style</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mb-10 max-w-md font-body text-lg leading-relaxed text-muted-foreground"
            >
              Discover timeless pieces crafted with premium quality fabrics. 
              Modern elegance meets everyday comfort.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <button className="btn-gold rounded-sm">
                Shop Now
              </button>
              <button className="btn-outline rounded-sm">
                Explore Collection
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
                <p className="mt-1 font-body text-sm text-muted-foreground">Happy Customers</p>
              </div>
              <div>
                <p className="font-display text-3xl font-semibold text-foreground">200+</p>
                <p className="mt-1 font-body text-sm text-muted-foreground">New Arrivals</p>
              </div>
              <div>
                <p className="font-display text-3xl font-semibold text-foreground">4.9★</p>
                <p className="mt-1 font-body text-sm text-muted-foreground">Rating</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
          className="relative flex-1 lg:flex-[1.1]"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent lg:bg-gradient-to-r lg:from-background/30" />
          <img
            src={heroModel}
            alt="Fashion model wearing elegant neutral-toned outfit"
            className="h-full w-full object-cover object-top"
            style={{ minHeight: "50vh" }}
          />
          
          {/* Decorative element */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.4, duration: 0.6, ease: "backOut" }}
            className="absolute bottom-12 left-6 hidden rounded-lg bg-background/90 p-6 shadow-medium backdrop-blur-sm lg:block"
          >
            <p className="font-body text-xs uppercase tracking-wider text-muted-foreground">Featured</p>
            <p className="mt-1 font-display text-lg font-semibold text-foreground">Silk Blend Blazer</p>
            <p className="mt-1 font-body text-gold">$289.00</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        onClick={scrollToProducts}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
      >
        <span className="font-body text-xs uppercase tracking-widest">Scroll</span>
        <ChevronDown className="h-5 w-5 animate-scroll-hint" />
      </motion.button>
    </section>
  );
};

export default HeroSection;
