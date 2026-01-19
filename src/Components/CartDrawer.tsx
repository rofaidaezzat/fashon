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
    selectedSize?: string
  ) => {
    if (quantity < 1) {
      dispatch(removeFromCart({ productId, selectedSize }));
    } else {
      dispatch(updateQuantity({ productId, quantity, selectedSize }));
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
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[110] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Your Cart ({safeCartItems.length})
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {safeCartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-gray-500">
                  <ShoppingBag className="w-16 h-16 opacity-20" />
                  <p className="text-lg font-medium">Your cart is empty</p>
                  <button
                    onClick={() => {
                      onClose();
                      navigate("/shop");
                    }}
                    className="text-rose-600 font-semibold hover:underline"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                safeCartItems.map((item) => (
                  <div
                    key={`${item.product._id}-${item.selectedSize}`}
                    className="flex gap-4 p-3 rounded-xl bg-gray-50/50 border border-gray-100 group"
                  >
                    {/* Product Image */}
                    <div className="w-20 h-24 flex-shrink-0 bg-white rounded-lg overflow-hidden border border-gray-100">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="text-sm font-bold text-gray-900 line-clamp-2">
                            {item.product.name}
                          </h3>
                          <button
                            onClick={() =>
                              dispatch(
                                removeFromCart({
                                  productId: item.product._id,
                                  selectedSize: item.selectedSize,
                                })
                              )
                            }
                            className="text-gray-400 hover:text-rose-500 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Size: <span className="font-medium text-gray-900">{item.selectedSize}</span> | 
                          <span className="ml-1 text-rose-600 font-bold">EGP {item.product.price}</span>
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(
                              item.product._id,
                              item.quantity - 1,
                              item.selectedSize
                            )
                          }
                          className="p-1 rounded-md bg-white border border-gray-200 hover:border-gray-400 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-semibold w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(
                              item.product._id,
                              item.quantity + 1,
                              item.selectedSize
                            )
                          }
                          className="p-1 rounded-md bg-white border border-gray-200 hover:border-gray-400 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {safeCartItems.length > 0 && (
              <div className="border-t border-gray-100 p-4 bg-white space-y-4">
                <div className="flex items-center justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>EGP {totalAmount.toFixed(2)}</p>
                </div>
                <p className="text-xs text-gray-500 text-center">
                  Shipping and taxes calculated at checkout.
                </p>
                <button
                  onClick={handleCheckout}
                  className="w-full flex items-center justify-center rounded-full border border-transparent bg-gray-900 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800 transition-all hover:shadow-lg active:scale-[0.98]"
                >
                  Checkout
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
