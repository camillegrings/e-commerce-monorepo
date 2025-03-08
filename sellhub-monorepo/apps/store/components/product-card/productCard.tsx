import styles from './ProductCard.module.css'
import type {Product} from '../../pages/index'

export function ProductCard({product, addToCart}:{product:Product, addToCart: (product:Product)=>void}) {
    return (
        <div key={product.id} className={styles.card}>
            <img src="https://placehold.co/150x100" alt="Placeholder"/>
            <h4>{product.name}</h4>
            <p>${product.price}</p>
            <button
                className={styles.addToCart}
                onClick={() => addToCart(product)}>
                Add to Cart
              </button>
        </div>
    )
}