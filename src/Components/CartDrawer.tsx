import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { type RootState } from "../store/store";
import { removeFromCart, updateQuantity } from "../store/cartSlice";
import { createPortal } from "react-dom";
import { useEffect } from "react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const safeCartItems = Array.isArray(cartItems) ? cartItems : [];

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
      dispatch(removeFromCart({ productId, selectedSize, selectedColor }));
    } else {
      dispatch(updateQuantity({ productId, quantity, selectedSize, selectedColor }));
    }
  };

  const handleCheckout = () => {
    onClose();
    navigate("/order");
  };

  const drawerContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-[500px] bg-white shadow-2xl z-[110] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Shopping Cart
                <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full ml-2">
                  {safeCartItems.length} items
                </span>
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors group"
                aria-label="Close cart"
              >
                <X className="w-6 h-6 text-gray-400 group-hover:text-gray-900" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto bg-gray-50/50 p-6 space-y-6">
              {safeCartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-10 h-10 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h3>
                    <p className="text-gray-500 max-w-[200px] mx-auto">
                      Looks like you haven't added any items to your cart yet.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      navigate("/shop");
                    }}
                    className="px-8 py-3 bg-gray-900 text-white font-bold rounded-full hover:bg-rose-600 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                safeCartItems.map((item) => (
                  <div
                    key={`${item.product._id}-${item.selectedSize}-${item.selectedColor}`}
                    className="flex gap-5 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden"
                  >
                    {/* Product Image */}
                    <div className="w-24 h-32 flex-shrink-0 bg-gray-100 rounded-xl overflow-hidden border border-gray-100">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start gap-4">
                          <h3 className="text-base font-bold text-gray-900 leading-snug">
                            {item.product.name}
                          </h3>
                          <button
                            onClick={() =>
                              dispatch(
                                removeFromCart({
                                  productId: item.product._id,
                                  selectedSize: item.selectedSize,
                                  selectedColor: item.selectedColor,
                                })
                              )
                            }
                            className="text-gray-400 hover:text-red-500 transition-colors p-1 -mr-2 -mt-2"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mt-2">
                          {item.selectedSize && (
                            <div className="inline-flex items-center px-2 py-1 rounded bg-gray-100 border border-gray-200 text-xs font-medium text-gray-600">
                              Size: <span className="text-gray-900 ml-1">{item.selectedSize}</span>
                            </div>
                          )}
                          {item.selectedColor && item.selectedColor !== "Default" && (
                            <div className="inline-flex items-center px-2 py-1 rounded bg-gray-100 border border-gray-200 text-xs font-medium text-gray-600">
                              Color: <span className="text-gray-900 ml-1">{item.selectedColor}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="mt-2 font-bold text-rose-600">
                          EGP {item.product.price.toLocaleString()}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200 p-1">
                          <button
                            onClick={() =>
                              handleUpdateQuantity(
                                item.product._id,
                                item.quantity - 1,
                                item.selectedSize,
                                item.selectedColor
                              )
                            }
                            className="w-7 h-7 flex items-center justify-center rounded-md bg-white border border-gray-200 text-gray-600 hover:border-gray-400 hover:text-rose-600 transition-all shadow-sm"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-bold w-10 text-center text-gray-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleUpdateQuantity(
                                item.product._id,
                                item.quantity + 1,
                                item.selectedSize,
                                item.selectedColor
                              )
                            }
                            className="w-7 h-7 flex items-center justify-center rounded-md bg-white border border-gray-200 text-gray-600 hover:border-gray-400 hover:text-rose-600 transition-all shadow-sm"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {safeCartItems.length > 0 && (
              <div className="border-t border-gray-100 p-6 bg-white space-y-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-gray-500">
                    <span>Subtotal</span>
                    <span>EGP {totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-100">
                    <span>Total</span>
                    <span>EGP {totalAmount.toLocaleString()}</span>
                  </div>
                </div>
                <p className="text-xs text-center text-gray-400">
                  Shipping and taxes calculated at checkout.
                </p>
                <button
                  onClick={handleCheckout}
                  className="w-full flex items-center justify-center rounded-full bg-gray-900 py-4 text-base font-bold text-white shadow-lg hover:bg-rose-600 hover:shadow-rose-500/25 transition-all hover:-translate-y-1 active:scale-[0.98]"
                >
                  Proceed to Checkout
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
