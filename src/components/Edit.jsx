import React from 'react'
import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { productContext } from '../utils/Context'
import { nanoid } from 'nanoid'

const Edit = () => {
  const [products, setProducts] = useContext(productContext)
  const [product, setProduct] = useState(null)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const foundProduct = products.find((item) => item.id == id)
    if (foundProduct) {
      setProduct(foundProduct)
    }
  }, [products, id])

  const handleUpdate = () => {
    const updatedProducts = products.map((item) =>
      item.id == id ? { ...item, ...product } : item
    )
    setProducts(updatedProducts)
    localStorage.setItem('products', JSON.stringify(updatedProducts))
    navigate(-1)
  }

return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
        <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
            <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">Edit Product</h1>
            {product && (
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleUpdate()
                    }}
                    className="space-y-5"
                >
                    <input
                        type="text"
                        value={product.title}
                        onChange={(e) => setProduct({ ...product, title: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                        placeholder="Product Title"
                    />
                    <input
                        type="text"
                        value={product.category}
                        onChange={(e) => setProduct({ ...product, category: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                        placeholder="Category"
                    />
                    <input
                        type="number"
                        value={product.price}
                        onChange={(e) => setProduct({ ...product, price: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                        placeholder="Price"
                    />
                    <textarea
                        value={product.description}
                        onChange={(e) => setProduct({ ...product, description: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
                        placeholder="Description"
                        rows={4}
                    />
                    <button
                        type="submit"
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded transition duration-200"
                    >
                        Update
                    </button>
                </form>
            )}
        </div>
    </div>
)
}

export default Edit
