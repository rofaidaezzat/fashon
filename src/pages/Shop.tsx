
import { useState, useMemo } from "react";
import { Search, ShoppingBag } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getProducts, type IProduct } from "../api/products";

const Shop = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortOption, setSortOption] = useState("Default");

    const { data, isLoading, error } = useQuery({
        queryKey: ["products"],
        queryFn: getProducts,
    });

    const products = data?.data || [];

    const categories = useMemo(() => {
        const cats = products.map(p => p.category);
        return ["All", ...new Set(cats)];
    }, [products]);

    const filteredProducts = useMemo(() => {
        let result = products;

        if (selectedCategory !== "All") {
            result = result.filter(product => product.category === selectedCategory);
        }

        if (sortOption === "Price: Low to High") {
            result = [...result].sort((a, b) => a.price - b.price);
        } else if (sortOption === "Price: High to Low") {
            result = [...result].sort((a, b) => b.price - a.price);
        }

        return result;
    }, [products, selectedCategory, sortOption]);

    const handleBuyOnWhatsApp = (product: IProduct) => {
        const phoneNumber = "201099279585"; // Replace with actual number if provided
        const message = encodeURIComponent(`Hello, I would like to order: ${product.name} - EGP ${product.price}`);
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    };

    if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (error) return <div className="min-h-screen flex items-center justify-center">Error loading products</div>;

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Page Header */}
            <div className="bg-white border-b border-gray-100 py-12">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl font-light text-gray-900 mb-4 tracking-wide uppercase">Shop Collection</h1>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Discover our latest arrivals, designed for elegance and comfort.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-6 py-12">
                <div className="flex flex-col gap-12">
                    
                     {/* Category Filter */}
                     <div className="flex flex-wrap justify-center gap-4 mb-8">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-2 rounded-full text-sm uppercase tracking-wider transition-all duration-300 ${
                                    selectedCategory === category
                                        ? "bg-gray-900 text-white shadow-lg scale-105"
                                        : "bg-white text-gray-500 hover:bg-gray-100 border border-gray-200"
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Product Grid - Full Width */}
                    <div className="w-full">
                       

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {filteredProducts.map((product) => (
                                <div key={product._id} className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col">
                                    <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                                        {/* New Badge - Logic might need adjustment based on date or explicit flag if available in API */}
                                        {/* {product.isNew && (
                                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full z-10 uppercase tracking-wider">
                                    New
                                </span>
                             )} */}
                                        <img
                                            src={product.images[0]}
                                            alt={product.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        {/* Overlay Buttons */}
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                                            <button className="bg-white text-gray-900 p-3 rounded-full hover:bg-rose-500 hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300">
                                                <Search className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handleBuyOnWhatsApp(product)}
                                                className="bg-white text-gray-900 p-3 rounded-full hover:bg-green-500 hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75"
                                                title="Buy on WhatsApp"
                                            >
                                                <ShoppingBag className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="p-5 flex flex-col flex-grow">
                                        <h3 className="text-gray-900 font-medium text-lg mb-1 group-hover:text-rose-600 transition-colors">
                                            {product.name}
                                        </h3>
                                        <p className="text-gray-400 text-sm mb-4">{product.category}</p>
                                        <div className="mt-auto flex items-center justify-between">
                                            <span className="text-xl font-bold text-gray-900">
                                                EGP {product.price.toFixed(2)}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => handleBuyOnWhatsApp(product)}
                                            className="w-full mt-4 bg-gray-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-rose-600 transition-colors flex items-center justify-center gap-2"
                                        >
                                            Buy Now
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;
