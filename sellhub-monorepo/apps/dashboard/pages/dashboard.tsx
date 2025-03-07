import { trpc } from "../utils/trpc";
import { Loader, CreateProductForm } from '../components'
import styles from '../styles/Dashboard.module.css'

export default function Dashboard() {
  const { data: products, isLoading } = trpc.getAll.useQuery();
  const createProduct = trpc.create.useMutation();
  const deleteProduct = trpc.delete.useMutation({
    onSuccess: () => {
      alert("Product deleted successfully!");
    },
  });

  function addProduct({name, category, quantity, price}) {
    createProduct.mutate({name, category, quantity: parseInt(quantity), price: parseFloat(price)})
  }

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Product Management</h1>
      <div className={styles.container}>
        <CreateProductForm onSubmit={addProduct} />
        {isLoading ? <Loader /> : (
          <div className={styles.content}>
            {!products ? <p>No products to show</p> : 
              (<table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2">Name</th>
                      <th className="border p-2">Category</th>
                      <th className="border p-2">Quantity</th>
                      <th className="border p-2">Price</th>
                      <th className="border p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      products?.map((product) => (
                        <tr key={product.id} className="border">
                          <td className="border p-2">{product.name}</td>
                          <td className="border p-2">{product.category}</td>
                          <td className="border p-2">{product.quantity}</td>
                          <td className="border p-2">${product.price}</td>
                          <td className="border p-2">
                            <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                            <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => deleteProduct.mutate({ id: product.id })}>Delete</button>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>)
            }
          </div>
        )}
      </div>
    </div>
  );
}