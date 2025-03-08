import { trpc } from "../utils/trpc";
import { useState } from "react";
import { Loader, ProductCard, OrderItem } from '../components'
import styles from '../styles/Home.module.css'

export type Product = {
  id: number;
  category: string;
  name: string;
  price: number;
  quantity: number;
};

export default function Store() {
  const { data: products, isLoading } = trpc.getAll.useQuery();
  const [cart, setCart] = useState<Product[]>([]);
  const createOrder = trpc.createOrder.useMutation({
    onSuccess: () => {
      setCart([])
    }
  });

  function findProductInCart(product: Product, prevCart: Product[]) {
    return prevCart.find((item) => item.id === product.id)
  }

  function increaseQuantity(product: Product, prevCart: Product[]) {
    return prevCart.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  }

  function decreaseQuantity(product: Product, prevCart: Product[]) {
    const existingItem = findProductInCart(product, prevCart)
    if (existingItem && existingItem.quantity === 1) {
      return prevCart.filter((item) => item.id !== product.id);
    }

    return prevCart.map((item) => item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item);
  }

  function addToCart(product: Product) {
    setCart((prevCart) => {
      const existingItem = findProductInCart(product, prevCart)
      if (existingItem) {
        return increaseQuantity(product, prevCart)
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  function onIncreaseHandler(product: Product) {
    setCart((prevCart) => {
      return increaseQuantity(product, prevCart)
    });
  };

  function onDecreaseHandler(product: Product) {
    setCart((prevCart) => {
      return decreaseQuantity(product, prevCart)
    });
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Store ABC</h1>
      <div className={styles.container}>
        <div className={styles.productContent}>
          <h3>Products</h3>
          {isLoading ? <Loader /> : (
            <div className={styles.productsWrapper}>
              {products?.map((product) => <ProductCard key={product.id} product={product} addToCart={addToCart} />)}
            </div>
          )}
        </div>
        <div className={styles.content}>
          <h3>Order Summary</h3>
          <div className={styles.orderWrapper}>
            {cart?.map((product) => <OrderItem key={product.id} product={product} onIncrease={onIncreaseHandler} onDecrease={onDecreaseHandler} />)}
            {cart.length > 0 && <button className={styles.orderButton} onClick={()=> createOrder.mutate({list_of_products: cart})}>Create Order</button>}
          </div>
        </div>
      </div>
    </main>
  );
}
