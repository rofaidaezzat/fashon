import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Mail, CheckCircle, ArrowRight, ShoppingBag, TrendingUp } from "lucide-react";

const featuredProducts = [
  {
    id: 1,
    title: "Classic Beige Trench",
    category: "Outerwear",
    price: "EGP 1,290",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=800&fit=crop",
  },
  {
    id: 2,
    title: "Abstract Print Dress",
    category: "Dresses",
    price: "EGP 850",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=800&fit=crop",
  },
  {
    id: 3,
    title: "Urban Chic Blazer",
    category: "Jackets",
    price: "EGP 1,500",
    image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=800&fit=crop",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Laila Ahmed",
    role: "Regular Customer",
    content: "The quality of the fabrics is amazing. I bought a dress for my engagement party and it was perfect!",
    rating: 5,
  },
  {
    id: 2,
    name: "Nour El-Sherif",
    role: "Fashion Blogger",
    content: "Fashon always has the latest trends. Fast shipping and excellent customer service via WhatsApp.",
    rating: 5,
  },
  {
    id: 3,
    name: "Sarah M.",
    role: "Stylist",
    content: "My go-to place for finding unique pieces for my clients. Highly recommended for affordable luxury.",
    rating: 5,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans text-gray-900">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
            <img 
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" 
                alt="Fashion Hero" 
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-md text-white text-sm font-semibold mb-6 uppercase tracking-widest border border-white/30">
              New Collection 2026
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Elegance is not <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-200 to-pink-200">
                standing out,
              </span>
              <br />
              but being remembered.
            </h1>
            
            <p className="text-xl text-gray-200 max-w-lg mb-10 leading-relaxed">
                Discover our curated selection of timeless pieces designed to express your unique style with confidence.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link to="/shop">
                  <button className="px-10 py-4 rounded-full bg-white text-gray-900 font-bold hover:bg-rose-50 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1">
                    Shop Now <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                <button className="px-10 py-4 rounded-full bg-transparent border-2 border-white text-white font-bold hover:bg-white/10 transition-all duration-300">
                  View Lookbook
                </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Style Inspo Section (Image 1) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                "src/assets/photo_2026-01-14_14-28-22.jpg",
                "src/assets/photo_2026-01-14_14-29-04.jpg",
                "src/assets/photo_2026-01-14_14-29-42.jpg"
              ].map((img, i) => (
                <div key={i} className="aspect-[3/4] w-full overflow-hidden group relative bg-gray-50">
                   <img 
                    src={img} 
                    alt={`Style Inspo ${i+1}`}
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
              <h2 className="text-3xl md:text-4xl font-normal text-gray-800 mb-4">Our most popular products</h2>
               <div className="w-24 h-1 bg-rose-500 mx-auto"></div>
            </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group bg-white rounded-none border border-transparent hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-200">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Hover Overlay Actions */}
                   <div className="absolute inset-x-0 bottom-4 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <button className="bg-rose-500 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-rose-600 shadow-md flex items-center gap-2">
                         <ShoppingBag className="w-4 h-4" /> Add to Cart
                      </button>
                      <button className="bg-white text-rose-500 p-2 rounded-full shadow-md hover:bg-gray-50" title="Quick View">
                         <CheckCircle className="w-4 h-4" /> {/* Using CheckCircle as generic icon for now, usually Eye */}
                      </button>
                  </div>
                </div>
                
                <div className="p-6 text-center">
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    {product.title}
                  </h3>
                   <p className="text-sm text-gray-500 mb-3 uppercase tracking-wide">{product.category}</p>
                   <p className="text-xl font-bold text-rose-600">
                      {product.price}
                    </p>
                </div>
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
                      <span className="text-rose-400 font-bold tracking-wider uppercase mb-2 block">Limited Time Offer</span>
                      <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                          Winter Collection <br />
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-500">
                              Up to 50% Off
                          </span>
                      </h2>
                      <p className="text-gray-300 text-lg mb-8 max-w-md leading-relaxed">
                          Upgrade your wardrobe with our premium winter essentials. Exclusive deals available for a limited time only.
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
                              src="src/assets/photo_2026-01-14_14-46-49.jpg" 
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

      {/* Video Stories / Reels Section */}
      <section className="py-20 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-6">
           <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Shop The Look</h2>
              <p className="text-gray-500">See our products in action</p>
           </div>
           
           {/* Horizontal Scroll Layout */}
           <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide">
              {[
                  { id: 1, poster: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=1066&fit=crop", vid: "#" },
                  { id: 2, poster: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=1066&fit=crop", vid: "#" },
                  { id: 3, poster: "https://images.unsplash.com/photo-1529139574466-a302c27e3844?w=600&h=1066&fit=crop", vid: "#" },
                  { id: 4, poster: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=1066&fit=crop", vid: "#" },
                  { id: 5, poster: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=600&h=1066&fit=crop", vid: "#" },
              ].map((item) => (
                  <div key={item.id} className="min-w-[280px] md:min-w-[320px] h-[500px] md:h-[600px] relative rounded-3xl overflow-hidden snap-center group shadow-xl">
                      {/* Video/Image Placeholder - In a real app, use <video> tag here */}
                      <img 
                          src={item.poster} 
                          alt="Fashion Reel"
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                       />
                       
                       {/* Overlay Gradient */}
                       <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent"></div>

                       {/* Shop Button */}
                       <div className="absolute bottom-8 left-0 right-0 flex justify-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                           <Link to="/shop">
                                <button className="bg-white/90 backdrop-blur-sm text-gray-900 px-8 py-3 rounded-full font-bold text-sm hover:bg-white shadow-lg transition-all duration-300 flex items-center gap-2">
                                     Shop Now <ArrowRight className="w-4 h-4" />
                                </button>
                           </Link>
                       </div>
                       
                       {/* Play Icon Overlay (Decorative) */}
                       <div className="absolute top-4 right-4 bg-black/20 backdrop-blur-md p-2 rounded-full">
                           <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                       </div>
                  </div>
              ))}
           </div>
        </div>
      </section>

      {/* Features / Benefits */}
      <section className="py-24 bg-white border-y border-gray-100">
          <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                  <div className="flex flex-col items-center">
                       <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mb-6 text-rose-600">
                           <CheckCircle className="w-8 h-8"/>
                       </div>
                       <h3 className="text-xl font-bold mb-3">Premium Quality</h3>
                       <p className="text-gray-500 leading-relaxed">We source only the finest fabrics to ensure comfort and longevity.</p>
                  </div>
                   <div className="flex flex-col items-center">
                       <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mb-6 text-rose-600">
                           <TrendingUp className="w-8 h-8"/>
                       </div>
                       <h3 className="text-xl font-bold mb-3">Latest Trends</h3>
                       <p className="text-gray-500 leading-relaxed">Our collections are updated weekly with the hottest fashion trends.</p>
                  </div>
                   <div className="flex flex-col items-center">
                       <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mb-6 text-rose-600">
                           <Mail className="w-8 h-8"/>
                       </div>
                       <h3 className="text-xl font-bold mb-3">Fast Support</h3>
                       <p className="text-gray-500 leading-relaxed">24/7 Customer support via WhatsApp to assist with your orders.</p>
                  </div>
              </div>
          </div>
      </section>


     

      {/* Newsletter */}
      <section className="py-24 bg-rose-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Join the Fashon Club</h2>
            <p className="text-gray-600 text-lg mb-10">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
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
