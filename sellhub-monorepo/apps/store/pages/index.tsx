import { trpc } from "../utils/trpc";
import { useState } from "react";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

export default function Store() {
  const { data: products, isLoading } = trpc.getAll.useQuery();
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      {isLoading ? <p>Loading...</p> : (
        <div className="grid grid-cols-3 gap-4">
          {products?.map((product) => (
            <div key={product.id} className="border p-4">
              <h2 className="text-lg font-bold">{product.name}</h2>
              <p>${product.price}</p>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
