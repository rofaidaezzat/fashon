import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../api/products";
import { ArrowLeft, ShoppingCart, Minus, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id!),
    enabled: !!id,
  });

  const product = data?.data;

  // Auto-select first size
  useEffect(() => {
    if (product?.sizes && product.sizes.length > 0 && !selectedSize) {
      const availableSizes = product.sizes
        .flatMap((s) => s.split(",").map((i) => i.trim()))
        .filter(Boolean);
      
      if (availableSizes.length > 0) {
        setSelectedSize(availableSizes[0]);
      }
    }
  }, [product, selectedSize]);

  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(addToCart({ product, quantity, selectedSize }));
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Product not found
        </h2>
        <Link
          to="/shop"
          className="text-white bg-gray-900 px-6 py-3 rounded-full hover:bg-gray-800 transition-colors"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Link
          to="/shop"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Shop
        </Link>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Image Gallery */}
            <div className="p-8 bg-gray-100 flex flex-col items-center justify-center">
              <div className="aspect-[3/4] w-full max-w-md bg-white rounded-xl overflow-hidden shadow-lg mb-4">
                <img
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-4 overflow-x-auto pb-2 w-full max-w-md">
                {product.images.map((image, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                      currentImageIndex === idx
                        ? "border-gray-900 ring-2 ring-gray-900 ring-offset-2"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="p-8 md:p-12 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-rose-500 font-bold uppercase tracking-wider text-sm">
                      {product.category}
                    </span>
                    <h1 className="text-4xl font-bold text-gray-900 mt-2 mb-2">
                      {product.name}
                    </h1>
                  </div>
                  <span className="text-2xl font-bold text-gray-900 bg-gray-100 px-4 py-2 rounded-lg">
                    EGP {product.price.toFixed(2)}
                  </span>
                </div>

                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  {product.description}
                </p>

                {product.sizes && product.sizes.length > 0 && (
                <div className="mb-8">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                      Select Size
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {product.sizes
                        .flatMap((s) => s.split(",").map((i) => i.trim()))
                        .filter(Boolean)
                        .map((size) => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`min-w-[3rem] h-12 px-4 flex items-center justify-center rounded-lg border text-sm font-medium transition-all duration-200 ${
                              selectedSize === size
                                ? "border-gray-900 bg-gray-900 text-white shadow-md transform scale-105"
                                : "border-gray-200 text-gray-700 hover:border-gray-900 hover:text-gray-900 bg-white"
                            }`}
                          >
                            {size.toUpperCase()}
                          </button>
                        ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="mb-8">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                  Quantity
                </h3>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-xl font-bold w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-8 mt-8">
                <button
                  onClick={handleAddToCart}
                  disabled={
                    (product.sizes &&
                    product.sizes.length > 0 &&
                    !selectedSize) || isAdded
                  }
                  className={`w-full py-4 rounded-full text-white font-bold text-lg flex items-center justify-center gap-3 transition-all ${
                    product.sizes &&
                    product.sizes.length > 0 &&
                    !selectedSize
                      ? "bg-gray-300 cursor-not-allowed"
                      : isAdded 
                        ? "bg-green-600 shadow-none scale-95"
                        : "bg-gray-900 hover:bg-rose-600 shadow-lg hover:shadow-xl hover:-translate-y-1"
                  }`}
                >
                  {isAdded ? (
                    <>
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-6 h-6" />
                      Add to Cart
                    </>
                  )}
                </button>
                {product.sizes &&
                  product.sizes.length > 0 &&
                  !selectedSize && (
                    <p className="text-red-500 text-sm mt-3 text-center">
                      Please select a size to continue
                    </p>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
