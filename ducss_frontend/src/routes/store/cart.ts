import { browser } from "$app/environment";
import { get, writable } from "svelte/store";

interface Product {
  id: number;
  name: string;
  price: number;
}

export interface CartItem extends Product {
  amount: number;
}

export const cartItems = writable<CartItem[]>([]);

if (browser) {
  if (localStorage.cartItems) {
    cartItems.set(JSON.parse(localStorage.cartItems));
  }
  cartItems.subscribe((items) => localStorage.cartItems = JSON.stringify(items));
}

export function addToCart(product: Product) {
  let items = get(cartItems);
console.log(items);
  for (let item of items) {
    if (item.id === product.id) {
      item.amount++;
      cartItems.set(items);
      return;
    }
  }
  const cartItem = { ...product, amount: 1 };
  cartItems.set([...items, cartItem]);
}

export function removeFromCart(id: number) {
  let items = get(cartItems);

  for (let item of items) {
    if (item.id === id) {
      if (item.amount > 1) {
        item.amount--;
      } else {
        items = items.filter((item) => item.id !== id);
      }
      cartItems.set(items);
      return;
    }
  }
}