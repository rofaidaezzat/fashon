import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "../store/store";
import { removeFromCart, updateQuantity, clearCart } from "../store/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { useState } from "react";
import { createOrder, getShippingPrice, type CreateOrderPayload, type OrderItem } from "../api/orders";
import toast from 'react-hot-toast';
import { EGYPTIAN_CITIES } from "../data/cities";
import ImageWithFallback from "../Components/ImageWithFallback";

import { useLanguage } from "../context/LanguageContext";

const Order = () => {
    const { t } = useLanguage();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const rawCartItems = useSelector((state: RootState) => state.cart.items);
    const cartItems = Array.isArray(rawCartItems) ? rawCartItems : [];
    
    // Import cities directly or use the one we created. 
    // For simplicity in this replace, I'll inline a few major ones or use the file if imported.
    // Let's assume we import EGYPTIAN_CITIES from ../data/cities or just define it here to be safe and self-contained if the file creation wasn't perfect, 
    // but better to use the file if I can. I'll rely on the import.
    
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "", 
        city: "",
        district: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [shippingData, setShippingData] = useState<{
        priceBeforeVat: number;
        vat: number;
        priceAfterVat: number;
    } | null>(null);
    const [isLoadingShipping, setIsLoadingShipping] = useState(false);

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
    );

    const total = shippingData ? subtotal + shippingData.priceAfterVat : subtotal;

    // Fetch shipping when city changes
    const handleCityChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const city = e.target.value;
        setFormData(prev => ({ ...prev, city }));
        setShippingData(null); // Reset while fetching

        if (city) {
            setIsLoadingShipping(true);
            try {
                const response = await getShippingPrice(city);
                if (response.status === "success" && response.data) {
                    setShippingData(response.data);
                }
            } catch (error) {
                console.error("Failed to fetch shipping price", error);
                toast.error(t.order.error);
            } finally {                setIsLoadingShipping(false);
            }
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.city) {
            toast.error(t.order.form.select_city_ph);
            return;
        }

        setIsSubmitting(true);

        try {
            const groupedItemsMap = new Map<string, OrderItem>();

            cartItems.forEach(item => {
                const productId = item.product._id;
                
                if (!groupedItemsMap.has(productId)) {
                    groupedItemsMap.set(productId, {
                        product: productId,
                        variations: []
                    });
                }

                const group = groupedItemsMap.get(productId)!;
                group.variations.push({
                    quantity: item.quantity,
                    size: item.selectedSize || "Default", 
                    color: item.selectedColor || "Default",
                    note: item.note || "" 
                });
            });

            const payload: CreateOrderPayload = {
                userInfo: {
                    name: formData.name,
                    email: formData.email,
                },
                cartItems: Array.from(groupedItemsMap.values()),
                shippingAddress: {
                    city: formData.city,
                    district: formData.district,
                    details: formData.address,
                    phone: formData.phone
                }
            };

            const response = await createOrder(payload);

            if (response.status === "success") {
                dispatch(clearCart());
                toast.success(t.order.success);
                // Navigate to Thank You page with details
                navigate('/thank-you', { 
                    state: { 
                        orderId: response.data?._id || "N/A", // Assuming response might have ID
                        subtotal,
                        shipping: shippingData,
                        total
                    } 
                }); 
            } else {
                toast.error(t.order.error + ": " + response.message);
            }

        } catch (error: any) {
            console.error("Order creation error:", error);
            toast.error(t.order.error);
        } finally {            setIsSubmitting(false);
        }
    };

    // ... (Empty cart check remains the same, omitting for brevity in this replace block if possible, but I need to replace the whole component to be safe)
    if (cartItems.length === 0) {
         return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50 px-4">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.order.empty_title}</h2>
                <p className="text-gray-500 mb-8">{t.order.empty_desc}</p>
                <Link
                    to="/shop"
                    className="bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-rose-600 transition-colors flex items-center gap-2"
                >
                    {t.cart.start_shopping} <ArrowRight className="w-5 h-5 rtl:rotate-180" />
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">{t.order.title}</h1>
                
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items */}
                    <div className="lg:w-2/3 space-y-4">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            {cartItems.map((item, idx) => (
                                <div 
                                    key={`${item.product._id}-${item.selectedSize}-${item.selectedColor}-${idx}`}
                                    className="p-6 flex flex-col sm:flex-row items-center gap-6 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
                                >
                                    <ImageWithFallback 
                                        src={item.product.images[0]} 
                                        alt={item.product.name} 
                                        className="w-24 h-24 object-cover rounded-lg"
                                    />
                                    
                                    <div className="flex-grow text-center sm:text-left">
                                        <h3 className="font-bold text-gray-900">{item.product.name}</h3>
                                        <p className="text-sm text-gray-500 mb-1">{item.product.category}</p>
                                        <div className="flex gap-2 mt-1">
                                            {item.selectedSize && (
                                                <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                                                    {t.cart.size}: {item.selectedSize}
                                                </span>
                                            )}
                                            {item.selectedColor && item.selectedColor !== "Default" && (
                                                <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                                                    {t.cart.color}: {item.selectedColor}
                                                </span>
                                            )}
                                            {item.note && (
                                                <span className="block w-full mt-1 text-gray-500 text-xs italic">
                                                    {t.product.note}: {item.note}
                                                </span>
                                            )}
                                        </div>
                                        <div className="mt-2 font-bold text-rose-600">
                                            {t.product.price} {item.product.price.toFixed(2)}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <button 
                                            onClick={() => dispatch(updateQuantity({ productId: item.product._id, quantity: item.quantity - 1, selectedSize: item.selectedSize, selectedColor: item.selectedColor, note: item.note }))}
                                            className="p-1 rounded-full border border-gray-200 hover:bg-gray-100"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                                        <button 
                                            onClick={() => dispatch(updateQuantity({ productId: item.product._id, quantity: item.quantity + 1, selectedSize: item.selectedSize, selectedColor: item.selectedColor, note: item.note }))}
                                            className="p-1 rounded-full border border-gray-200 hover:bg-gray-100"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <button 
                                        onClick={() => dispatch(removeFromCart({ productId: item.product._id, selectedSize: item.selectedSize, selectedColor: item.selectedColor, note: item.note }))}
                                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Checkout Form */}
                    <div className="lg:w-1/3">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">{t.order.summary}</h2>
                            
                            <div className="space-y-3 mb-6 text-gray-600">
                                <div className="flex justify-between">
                                    <span>{t.cart.subtotal}</span>
                                    <span>{t.product.price} {subtotal.toFixed(2)}</span>
                                </div>
                                {shippingData ? (
                                    <>
                                        <div className="flex justify-between text-sm">
                                            <span>{t.order.shipping}</span>
                                            <span>{t.product.price} {shippingData.priceBeforeVat.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span>{t.order.vat} ({(shippingData.vat * 100).toFixed(0)}%)</span>
                                            <span>{t.product.price} {(shippingData.priceAfterVat - shippingData.priceBeforeVat).toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm font-medium text-rose-600">
                                            <span>{t.order.shipping_cost}</span>
                                            <span>{t.product.price} {shippingData.priceAfterVat.toFixed(2)}</span>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex justify-between text-sm text-gray-400 italic">
                                        <span>{t.order.shipping}</span>
                                        <span>{t.order.select_city}</span>
                                    </div>
                                )}
                            </div>
                            
                            <div className="flex justify-between mb-8 text-xl font-bold text-gray-900 border-t pt-4">
                                <span>{t.cart.total}</span>
                                <span>{t.product.price} {total.toFixed(2)}</span>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.order.form.name}</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                                        placeholder={t.order.form.placeholders.name}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.order.form.email}</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                                        placeholder={t.order.form.placeholders.email}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.order.form.phone}</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                                        placeholder={t.order.form.placeholders.phone}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">{t.order.form.city}</label>
                                         <select
                                            name="city"
                                            required
                                            value={formData.city}
                                            onChange={handleCityChange}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none bg-white"
                                        >
                                            <option value="">{t.order.form.select_city_ph}</option>
                                            {EGYPTIAN_CITIES.map(city => (
                                                <option key={city} value={city}>{city}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">{t.order.form.district}</label>
                                        <input
                                            type="text"
                                            name="district"
                                            required
                                            value={formData.district}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                                            placeholder={t.order.form.placeholders.district}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.order.form.address}</label>
                                    <input
                                        type="text"
                                        name="address"
                                        required
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                                        placeholder={t.order.form.placeholders.address}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting || (!!formData.city && isLoadingShipping)}
                                    className={`w-full mt-6 bg-gray-900 text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1 ${isSubmitting || isLoadingShipping ? 'opacity-75 cursor-not-allowed' : ''}`}
                                >
                                    {isSubmitting ? t.order.placing : (isLoadingShipping ? t.order.calculating : t.order.place_order)}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Order;
