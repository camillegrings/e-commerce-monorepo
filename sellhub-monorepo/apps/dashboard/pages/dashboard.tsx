import { useState } from 'react'
import { trpc } from "../utils/trpc";
import { Loader, ProductForm, ProductsTable } from '../components'
import styles from '../styles/Dashboard.module.css'

export type Product = {
  id: number;
  category: string;
  name: string;
  price: number;
};

export default function Dashboard() {
  const [isEditing, setIsEditing] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product|null>(null)
  const {data: products, isLoading, refetch} = trpc.getAll.useQuery();

  const createProduct = trpc.create.useMutation({
    onSuccess: () => {
      refetch()
    }
  });
  const deleteProduct = trpc.delete.useMutation({
    onSuccess: () => {
      refetch()
    },
  });
  const updateProduct = trpc.update.useMutation({
    onSuccess: () => {
      refetch()
    },
  });

  function addProduct({name, category, price}: {name: string, category: string, price: string}) {
    createProduct.mutate({name, category, quantity: 0, price: parseInt(price)})
  }

  function deleteProductHandler(id:number) {
    deleteProduct.mutate({id})
    setIsEditing(false)
    setEditingProduct(null)
  }

  function editProductHandler(product: Product) {
    setIsEditing(true)
    setEditingProduct(product)
  }

  function cancelEdit() {
    setIsEditing(false)
    setEditingProduct(null)
  }

  function formSubmitHandler({name, category, price}: {name: string, category: string, price: string}) {
    if(isEditing && editingProduct) {
      updateProduct.mutate({id: editingProduct.id, name, category, quantity: 0, price: parseFloat(price)})
    } else {
      addProduct({name, category, price})
    }
  }

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Product Management</h1>
      <div className={styles.container}>
        <div>
          <h3>{isEditing ? 'Edit Product' : 'Create new Product'}</h3>
          <ProductForm onSubmit={formSubmitHandler} onReset={cancelEdit} product={editingProduct} />
        </div>
        <div className={styles.productList}>
          <h3>Products List</h3>
          {isLoading ? <Loader /> : (
            <div>
              <ProductsTable products={products as Array<Product>} onDelete={deleteProductHandler} onEdit={editProductHandler} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}