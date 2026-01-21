import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { type RootState } from "../store/store";
import { removeFromCart, updateQuantity } from "../store/cartSlice";
import { createPortal } from "react-dom";
import { useEffect } from "react";
import ImageWithFallback from "./ImageWithFallback";
import { useLanguage } from "../context/LanguageContext";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { items } = useSelector((state: RootState) => state.cart);
  const safeCartItems = Array.isArray(items) ? items : [];

  const totalAmount = safeCartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  // Close drawer on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleUpdateQuantity = (
    productId: string,
    quantity: number,
    selectedSize?: string,
    selectedColor?: string
  ) => {
    if (quantity < 1) {
      return; 
    }
    dispatch(updateQuantity({ productId, quantity, selectedSize, selectedColor }));
  };

  const handleRemoveItem = (
    productId: string,
    selectedSize?: string,
    selectedColor?: string
  ) => {
    dispatch(removeFromCart({ productId, selectedSize, selectedColor }));
  };

  const handleCheckout = () => {
    onClose();
    navigate('/order');
  };

  if (!isOpen) return null;

  const drawerContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
             initial={{ x: language === 'ar' ? '-100%' : '100%' }}
             animate={{ x: 0 }}
             exit={{ x: language === 'ar' ? '-100%' : '100%' }}
             transition={{ type: "spring", damping: 25, stiffness: 200 }}
             className={`fixed top-0 ${language === 'ar' ? 'left-0' : 'right-0'} h-full w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col`}
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white z-10 w-full">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-rose-500" />
                <h2 className="text-xl font-bold text-gray-900">{t.cart.title}</h2>
                <span className="bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full text-sm font-bold">
                  {items.length} {t.cart.items}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors group"
                aria-label="Close cart"
              >
                <X className="w-6 h-6 text-gray-500 group-hover:text-rose-500" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-10 h-10 text-gray-300" />
                  </div>
                  <div>
                     <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {t.cart.empty_title}
                      </h3>
                      <p className="text-gray-500 max-w-xs mx-auto">
                        {t.cart.empty_desc}
                      </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
                  >
                    {t.cart.start_shopping}
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item, idx) => (
                    <div 
                      key={`${item.product._id}-${item.selectedSize}-${item.selectedColor}-${idx}`}
                      className="flex gap-4"
                    >
                      <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden border border-gray-100">
                        <ImageWithFallback 
                          src={item.product.images[0]} 
                          alt={item.product.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="font-medium text-gray-900 line-clamp-1">{item.product.name}</h3>
                            <button 
                              onClick={() => handleRemoveItem(item.product._id, item.selectedSize, item.selectedColor)}
                              className="text-gray-400 hover:text-red-500 transition-colors p-1"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <div className="text-sm text-gray-500 space-y-1">
                            {item.selectedSize && item.selectedSize !== "Default" && (
                              <p>{t.cart.size}: {item.selectedSize}</p>
                            )}
                            {item.selectedColor && item.selectedColor !== "Default" && (
                              <p>{t.cart.color}: {item.selectedColor}</p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <span className="font-bold text-rose-600">
                            {t.product.price} {item.product.price.toFixed(2)}
                          </span>
                          
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleUpdateQuantity(
                                item.product._id,
                                item.quantity - 1,
                                item.selectedSize,
                                item.selectedColor
                              )}
                              className={`w-7 h-7 flex items-center justify-center rounded-md bg-white border border-gray-200 text-gray-600 transition-all shadow-sm ${
                                item.quantity <= 1 
                                  ? "opacity-50 cursor-not-allowed" 
                                  : "hover:border-gray-400 hover:text-rose-600"
                              }`}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                            <button
                              onClick={() => handleUpdateQuantity(
                                item.product._id,
                                item.quantity + 1,
                                item.selectedSize,
                                item.selectedColor
                              )}
                              className="w-7 h-7 flex items-center justify-center rounded-md bg-white border border-gray-200 text-gray-600 hover:border-gray-400 hover:text-rose-600 transition-all shadow-sm"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {safeCartItems.length > 0 && (
              <div className="border-t border-gray-100 p-6 bg-white space-y-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-gray-500">
                    <span>{t.cart.subtotal}</span>
                    <span>{t.product.price} {totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-100">
                    <span>{t.cart.total}</span>
                    <span>{t.product.price} {totalAmount.toLocaleString()}</span>
                  </div>
                </div>
                <p className="text-xs text-center text-gray-400">
                  {t.cart.shipping_note}
                </p>
                <button
                  onClick={handleCheckout}
                  className="w-full flex items-center justify-center rounded-full bg-gray-900 py-4 text-base font-bold text-white shadow-lg hover:bg-rose-600 hover:shadow-rose-500/25 transition-all hover:-translate-y-1 active:scale-[0.98]"
                >
                  {t.cart.checkout}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(drawerContent, document.body);
};

export default CartDrawer;
