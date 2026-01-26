import { useState, useMemo, useEffect } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getProducts } from "../api/products";
import ProductCard from "../Components/ProductCard";
import ProductSkeleton from "../Components/ProductSkeleton";
import Pagination from "../Components/Pagination";
import { useLanguage } from "../context/LanguageContext";

const ITEMS_PER_PAGE = 12;

const Shop = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("Default");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch all products just for categories (once)
  const { data: allProductsData } = useQuery({
    queryKey: ["allProductsForCategories"],
    queryFn: () => getProducts({ limit: 1000 }),
    staleTime: Infinity,
  });

  const categories = useMemo(() => {
    const products = allProductsData?.data || [];
    const cats = products.map((p) => p.category);
    return ["All", ...new Set(cats)];
  }, [allProductsData]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", currentPage, selectedCategory, sortOption],
    queryFn: () =>
      getProducts({
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        category: selectedCategory,
        sort:
          sortOption === "Price: Low to High"
            ? "price"
            : sortOption === "Price: High to Low"
            ? "-price"
            : undefined,
      }),
    placeholderData: keepPreviousData,
  });

  const products = data?.data || [];
  const totalPages = data?.pagination?.numberOfPages || 1;

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, sortOption]);


  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        {t.shop.load_error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-100 py-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-light text-gray-900 mb-4 tracking-wide uppercase">
            {t.shop.title}
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            {t.shop.subtitle}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col gap-12">
          {/* Filters & Sort */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
             {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full text-sm uppercase tracking-wider transition-all duration-300 ${
                    (selectedCategory === category) || (selectedCategory === "All" && category === "All")
                      ? "bg-gray-900 text-white shadow-lg scale-105"
                      : "bg-white text-gray-500 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {category === "All" ? t.shop.filters.all : category}
                </button>
              ))}
            </div>
            
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="appearance-none bg-white border border-gray-200 text-gray-700 py-3 px-6 ltr:pr-8 rtl:pl-8 rounded-full leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm uppercase tracking-wider cursor-pointer hover:bg-gray-50 transition-colors"
                style={{ backgroundImage: "none" }} 
              >
                <option value="Default">{t.shop.sort.default}</option>
                <option value="Price: Low to High">{t.shop.sort.price_low_high}</option>
                <option value="Price: High to Low">{t.shop.sort.price_high_low}</option>
              </select>
               <div className="pointer-events-none absolute inset-y-0 ltr:right-0 rtl:left-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
            </div>
          </div>

          {/* Product Grid - Full Width */}
          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {isLoading
                ? Array.from({ length: 8 }).map((_, index) => (
                    <ProductSkeleton key={index} />
                  ))
                : products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
            </div>
          </div>
          
          {/* Pagination */}
          {!isLoading && totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

        </div>
      </div>
    </div>
  );
};

export default Shop;
