import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type IProduct } from '../api/products';

export interface CartItem {
    product: IProduct;
    quantity: number;
    selectedSize?: string;
    selectedColor?: string;
    note?: string;
}

interface CartState {
    items: CartItem[];
}

// Helper to safely parse cart from localStorage
const loadCartFromStorage = (): CartItem[] => {
    try {
        const savedCart = localStorage.getItem('cart');
        const parsedCart = savedCart ? JSON.parse(savedCart) : [];
        return Array.isArray(parsedCart) ? parsedCart : [];
    } catch (error) {
        console.error("Failed to load cart from localStorage", error);
        return [];
    }
};

const initialState: CartState = {
    items: loadCartFromStorage(),
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<{ product: IProduct; quantity?: number; selectedSize?: string; selectedColor?: string; note?: string }>) => {
            const { product, quantity = 1, selectedSize, selectedColor, note } = action.payload;
            const existingItem = state.items.find(
                (item) => item.product._id === product._id && item.selectedSize === selectedSize && item.selectedColor === selectedColor && item.note === note
            );

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                state.items.push({ product, quantity, selectedSize, selectedColor, note });
            }
            localStorage.setItem('cart', JSON.stringify(state.items)); // Persist
        },
        removeFromCart: (state, action: PayloadAction<{ productId: string; selectedSize?: string; selectedColor?: string; note?: string }>) => {
            const { productId, selectedSize, selectedColor, note } = action.payload;
            state.items = state.items.filter(
                (item) => !(item.product._id === productId && item.selectedSize === selectedSize && item.selectedColor === selectedColor && item.note === note)
            );
            localStorage.setItem('cart', JSON.stringify(state.items)); // Persist
        },
        updateQuantity: (state, action: PayloadAction<{ productId: string; quantity: number; selectedSize?: string; selectedColor?: string; note?: string }>) => {
            const { productId, quantity, selectedSize, selectedColor, note } = action.payload;
            if (quantity <= 0) {
                state.items = state.items.filter(
                    (item) => !(item.product._id === productId && item.selectedSize === selectedSize && item.selectedColor === selectedColor && item.note === note)
                );
            } else {
                const item = state.items.find(
                    (item) => item.product._id === productId && item.selectedSize === selectedSize && item.selectedColor === selectedColor && item.note === note
                );
                if (item) {
                    item.quantity = quantity;
                }
            }
            localStorage.setItem('cart', JSON.stringify(state.items)); // Persist
        },
        clearCart: (state) => {
            state.items = [];
            localStorage.setItem('cart', JSON.stringify([])); // Persist
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
