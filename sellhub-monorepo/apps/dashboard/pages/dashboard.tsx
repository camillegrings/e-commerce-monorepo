import { useState } from "react";
import { trpc } from "../utils/trpc";

export default function Dashboard() {
  const { data: products, isLoading } = trpc.getAll.useQuery();
  const createProduct = trpc.create.useMutation();

  console.log(trpc.getAll.useQuery())

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Product Management</h1>
      
      <button 
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => createProduct.mutate({ name: "New Product", category: "Electronics", quantity: 10, price: 100 })}
      >
        + Add Product
      </button>

      {isLoading ? <p>Loading products...</p> : (
        <table className="w-full border-collapse border border-gray-300">
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
            {products?.map((product) => (
              <tr key={product.id} className="border">
                <td className="border p-2">{product.name}</td>
                <td className="border p-2">{product.category}</td>
                <td className="border p-2">{product.quantity}</td>
                <td className="border p-2">${product.price}</td>
                <td className="border p-2">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}