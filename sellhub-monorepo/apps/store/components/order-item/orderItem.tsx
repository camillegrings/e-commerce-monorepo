import styles from './OrderItem.module.css'
import type {Product} from '../../pages/index'

export function OrderItem({product, onIncrease, onDecrease}:{product:Product, onIncrease:Function, onDecrease:Function}) {
    return (
        <div className={styles.item}>
            <p>Product: {product.name}</p>
            <div className={styles.quantityWrapper}>
                <button className={styles.decrease} onClick={()=>onDecrease(product)}>-</button>
                <span>Quantity: {product.quantity}</span>
                <button className={styles.increase} onClick={()=>onIncrease(product)}>+</button>
            </div>
        </div>
    )
}