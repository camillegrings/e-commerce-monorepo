import styles from './ProductsTable.module.css'
import type {Product} from '../../pages/dashboard'


export function ProductsTable({products, onDelete, onEdit} : {products: Array<Product>, onDelete:Function, onEdit:Function}) {
    if(!products || !products.length) {
        return <p>Empty list!</p>
    }

    return (
        <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{product.quantity}</td>
                    <td>${product.price}</td>
                    <td>
                      <button className={styles.edit} onClick={() => onEdit(product)}>Edit</button>
                      <button className={styles.delete} onClick={() => onDelete(product.id)}>Delete</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
        </table>
    );
}