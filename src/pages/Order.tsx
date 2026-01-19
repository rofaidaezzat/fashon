import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "../store/store";
import { removeFromCart, updateQuantity, clearCart } from "../store/cartSlice";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { useState } from "react";

const Order = () => {
    const dispatch = useDispatch();
    const rawCartItems = useSelector((state: RootState) => state.cart.items);
    const cartItems = Array.isArray(rawCartItems) ? rawCartItems : [];
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
        city: "",
    });

    const totalPrice = cartItems.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Construct the message for WhatsApp
        const itemsList = cartItems.map(item => 
            `- ${item.product.name} (x${item.quantity}) ${item.selectedSize ? `[Size: ${item.selectedSize}]` : ''} - EGP ${(item.product.price * item.quantity).toFixed(2)}`
        ).join('\n');

        const message = encodeURIComponent(
            `New Order from ${formData.name}\n\n` +
            `Phone: ${formData.phone}\n` +
            `Address: ${formData.address}, ${formData.city}\n\n` +
            `Order Details:\n${itemsList}\n\n` +
            `Total: EGP ${totalPrice.toFixed(2)}`
        );

        const phoneNumber = "201034511777";
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
        
        
        dispatch(clearCart());
        alert("Order submitted to WhatsApp!");
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50 px-4">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
                <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
                <Link
                    to="/shop"
                    className="bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-rose-600 transition-colors flex items-center gap-2"
                >
                    Start Shopping <ArrowRight className="w-5 h-5" />
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart & Checkout</h1>
                
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items */}
                    <div className="lg:w-2/3 space-y-4">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            {cartItems.map((item, idx) => (
                                <div 
                                    key={`${item.product._id}-${item.selectedSize}-${idx}`}
                                    className="p-6 flex flex-col sm:flex-row items-center gap-6 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
                                >
                                    <img 
                                        src={item.product.images[0]} 
                                        alt={item.product.name} 
                                        className="w-24 h-24 object-cover rounded-lg"
                                    />
                                    
                                    <div className="flex-grow text-center sm:text-left">
                                        <h3 className="font-bold text-gray-900">{item.product.name}</h3>
                                        <p className="text-sm text-gray-500 mb-1">{item.product.category}</p>
                                        {item.selectedSize && (
                                            <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                                                Size: {item.selectedSize}
                                            </span>
                                        )}
                                        <div className="mt-2 font-bold text-rose-600">
                                            EGP {item.product.price.toFixed(2)}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <button 
                                            onClick={() => dispatch(updateQuantity({ productId: item.product._id, quantity: item.quantity - 1, selectedSize: item.selectedSize }))}
                                            className="p-1 rounded-full border border-gray-200 hover:bg-gray-100"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                                        <button 
                                            onClick={() => dispatch(updateQuantity({ productId: item.product._id, quantity: item.quantity + 1, selectedSize: item.selectedSize }))}
                                            className="p-1 rounded-full border border-gray-200 hover:bg-gray-100"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <button 
                                        onClick={() => dispatch(removeFromCart({ productId: item.product._id, selectedSize: item.selectedSize }))}
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
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
                            
                            <div className="flex justify-between mb-4 text-gray-600">
                                <span>Subtotal</span>
                                <span>EGP {totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between mb-6 text-xl font-bold text-gray-900 border-t pt-4">
                                <span>Total</span>
                                <span>EGP {totalPrice.toFixed(2)}</span>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                                        placeholder="01xxxxxxxxx"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            required
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                                            placeholder="Cairo"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                        <input
                                            type="text"
                                            name="address"
                                            required
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                                            placeholder="Street info"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1"
                                >
                                    Complete Order on WhatsApp
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
