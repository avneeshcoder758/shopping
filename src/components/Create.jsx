import { useContext, useState } from "react";
import { productContext } from "../utils/Context";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useContext(productContext);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  console.log(products);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if any input field length is less than 4
    if (
      String(title).length < 4 ||
      String(category).length < 4 ||
      String(price).length < 4 ||
      String(image).length < 4 ||
      String(description).length < 4
    ) {
      alert("All fields must be at least 4 characters long.");
      return;
    }
    setLoading(true);
    const productData = {
      id: nanoid(),
      title,
      category,
      price,
      image,
      description,
    };
    setProducts((prev) => {
      const updatedProducts = [...prev, productData];
      console.log("Product Data:", productData);
      console.log("All Products:", updatedProducts);
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      navigate("/");
      setLoading(false);
      return updatedProducts;
    });
    
    // Reset form fields
    setTitle("");
    setCategory("");
    setPrice("");
    setImage("");
    setDescription("");
  };
  if (loading) {
    return <div>Loading...</div>;
  }
return (
	<form
		className="min-h-screen container mx-auto flex items-center justify-center bg-gradient-to-br from-indigo-300 via-purple-200 to-pink-200 py-10"
		onSubmit={handleSubmit}
	>
		<div className="flex flex-col gap-5 w-full max-w-lg p-8 rounded-3xl shadow-2xl bg-white/80 backdrop-blur-md border border-purple-200">
			<h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-4 drop-shadow-lg">Create New Product</h2>
			<label className="text-base font-semibold text-indigo-600">Title</label>
			<input
				type="text"
				placeholder="Enter Product Title"
				className="p-3 border-2 border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<label className="text-base font-semibold text-indigo-600">Category</label>
			<input
				type="text"
				placeholder="Enter Product Category"
				className="p-3 border-2 border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
				value={category}
				onChange={(e) => setCategory(e.target.value)}
			/>

			<label className="text-base font-semibold text-indigo-600">Price</label>
			<input
				type="number"
				placeholder="Enter Product Price"
				className="p-3 border-2 border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
				value={price}
				onChange={(e) =>
					setPrice(e.target.value === "" ? "" : parseInt(e.target.value, 10))
				}
			/>
			<label className="text-base font-semibold text-indigo-600">Image URL</label>
			<input
				type="text"
				placeholder="Enter Image URL"
				className="p-3 border-2 border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
				value={image}
				onChange={(e) => setImage(e.target.value)}
			/>
			<label className="text-base font-semibold text-indigo-600">Description</label>
			<textarea
				rows={5}
				placeholder="Enter Product Description"
				className="p-3 border-2 border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition resize-none"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			></textarea>
			<button
				type="submit"
				className="mt-4 bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-pink-500 hover:to-indigo-500 text-white font-bold py-3 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
			>
				Create Product
			</button>
		</div>
	</form>
);
};

export default Create;
