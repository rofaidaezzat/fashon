
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/products";
import ProductCard from "../Components/ProductCard";

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
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;
