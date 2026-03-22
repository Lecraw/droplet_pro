import { create } from 'zustand';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'sensor' | 'accessory';
  image: string;
  options?: { label: string; values: string[] }[];
}

export interface CartItem {
  id: string; // unique cart item id (product id + options)
  productId: string;
  name: string;
  price: number;
  quantity: number;
  selectedOptions?: Record<string, string>;
  image: string;
}

interface ShopStore {
  cart: CartItem[];
  isCartOpen: boolean;
  addToCart: (product: Product, quantity: number, options?: Record<string, string>) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  toggleCart: () => void;
  clearCart: () => void;
}

export const useShopStore = create<ShopStore>((set) => ({
  cart: [],
  isCartOpen: false,
  addToCart: (product, quantity, options) => set((state) => {
    const optionsHash = options ? JSON.stringify(options) : '';
    const cartItemId = `${product.id}-${optionsHash}`;
    
    const existingItem = state.cart.find(item => item.id === cartItemId);
    
    if (existingItem) {
      return {
        cart: state.cart.map(item => 
          item.id === cartItemId 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        ),
        isCartOpen: true
      };
    }
    
    return {
      cart: [...state.cart, {
        id: cartItemId,
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity,
        selectedOptions: options,
        image: product.image
      }],
      isCartOpen: true
    };
  }),
  removeFromCart: (cartItemId) => set((state) => ({
    cart: state.cart.filter(item => item.id !== cartItemId)
  })),
  updateQuantity: (cartItemId, quantity) => set((state) => ({
    cart: state.cart.map(item => 
      item.id === cartItemId ? { ...item, quantity: Math.max(1, quantity) } : item
    )
  })),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  clearCart: () => set({ cart: [] })
}));
