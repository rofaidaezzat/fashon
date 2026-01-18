import { useState } from "react";
import { Search, ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react";
import { type IProduct } from "../api/products";

interface ProductCardProps {
    product: IProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleBuyOnWhatsApp = () => {
        const phoneNumber = "201034511777";
        const message = encodeURIComponent(`Hello, I would like to order: ${product.name} - EGP ${product.price}`);
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    };

    const nextImage = (e: React.MouseEvent) => {
        e.preventDefault();
        setCurrentImageIndex((prev) => 
            prev === product.images.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = (e: React.MouseEvent) => {
        e.preventDefault();
        setCurrentImageIndex((prev) => 
            prev === 0 ? product.images.length - 1 : prev - 1
        );
    };

    return (
        <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col">
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 group">
                <img
                    src={product.images[currentImageIndex]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Navigation Arrows */}
                {product.images.length > 1 && (
                    <>
                        <button 
                            onClick={prevImage}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button 
                            onClick={nextImage}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                        
                        {/* Dots Indicator */}
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                            {product.images.map((_, idx) => (
                                <div 
                                    key={idx}
                                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                                        idx === currentImageIndex ? "bg-white w-3" : "bg-white/50"
                                    }`}
                                />
                            ))}
                        </div>
                    </>
                )}

                {/* Overlay Buttons */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 pointer-events-none">
                    <button className="bg-white text-gray-900 p-3 rounded-full hover:bg-rose-500 hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 pointer-events-auto">
                        <Search className="w-5 h-5" />
                    </button>
                    <button
                        onClick={handleBuyOnWhatsApp}
                        className="bg-white text-gray-900 p-3 rounded-full hover:bg-green-500 hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75 pointer-events-auto"
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
                    onClick={handleBuyOnWhatsApp}
                    className="w-full mt-4 bg-gray-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-rose-600 transition-colors flex items-center justify-center gap-2"
                >
                    Buy Now
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
